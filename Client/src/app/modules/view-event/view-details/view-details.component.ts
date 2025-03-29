import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RunView, LogStatus, Metadata } from '@memberjunction/core';
import { AbstractEntity, EventEntity, SessionEntity } from 'mj_generatedentities';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {
  eventId: string | null = null;
  event: EventEntity | null = null;
  sessions: any[] = [];
  md = new Metadata();

  // Table columns definition
  displayedColumns: string[] = ['srNo', 'name', 'startDate', 'title', 'abstractStatus'];
  constructor(private route: ActivatedRoute, @Inject(UserService) private user: UserService, private router: Router) { }

  async ngOnInit() {
    // Load metadata first
    await this.loadMetadata();

    // Get eventId from route parameters
    this.eventId = this.route.snapshot.paramMap.get('id');
    console.log('Event ID:', this.eventId); // Log the event ID

    if (this.eventId) {
      await this.loadEventDetails();
    }
  }

  async loadMetadata() {
    try {
      // Access the Entities property to ensure metadata is loaded
      console.log('Available Entities:', this.md.Entities); // Log available entities for debugging
    } catch (error) {
      console.error('Error accessing metadata:', error);
    }
  }

  async loadEventDetails() {
    try {
      // Load event details
      this.event = await this.getEventEntity(this.eventId!);
      if (this.event) {
        console.log('Loaded event:', this.event); // Log the loaded event

        // Load sessions for this event
        this.sessions = await this.getEventSessions(this.eventId!);
        console.log('Loaded sessions:', this.sessions); // Log the loaded sessions
      } else {
        console.error('Event not found');
      }
    } catch (error) {
      LogStatus('Error loading event details:', String(error));
    }
  }

  async getEventEntity(eventId: string): Promise<EventEntity | null> {
    try {
      const rv = new RunView();
      const result = await rv.RunView<EventEntity>({
        EntityName: 'Events',
        Fields: ['ID', 'Name', 'EventStartDate', 'EventEndDate'],
        ExtraFilter: `ID = '${eventId}'`,
        MaxRows: 1
      });

      console.log('RunView result for event:', result); // Log the result of RunView
      return result.Success && result.Results.length > 0 ? result.Results[0] : null;
    } catch (error) {
      LogStatus('Error getting event entity:', String(error));
      return null;
    }
  }

  async getEventSessions(eventId: string) {
    try {
      const rv = new RunView();
      const result = await rv.RunView<SessionEntity>({
        EntityName: 'Sessions', // Ensure this matches the entity name in metadata
        Fields: ['ID', 'Name', 'SessionStartDate', 'SessionEndDate', 'Title'],
        ExtraFilter: `EventID = '${eventId}'`
      });

      if (result.Success) {
        console.log('Sessions Result:', result); // Log the result of RunView
        return Promise.all(
          result.Results.map(async (session, index) => ({
            srNo: index + 1, // Add SR No based on the index
            id: session.ID,
            name: session.Name,
            startDate: session.SessionStartDate,
            endDate: session.SessionEndDate,
            title: session.Title,
            abstractStatus: await this.getAbstractStatus(session.ID)
          }))
        );
      } else {
        console.error('Failed to fetch sessions:', result.ErrorMessage);
      }
    } catch (error) {
      LogStatus('Error getting event sessions:', String(error));
    }
    return [];
  }

  async getAbstractStatus(session: string): Promise<string> {
    try {
      const userInfo = this.user.getUserInfo();
      const rv = new RunView();
      const result = await rv.RunView<AbstractEntity>({
        EntityName: 'Abstracts',
        Fields: ['ID'],
        ExtraFilter: `SessionID = '${session}' AND UserID = '${userInfo.ID}'`,
        MaxRows: 1
      });
      console.log('Abstract Status Result:', result);
      if (result.Success && result.Results.length > 0) return 'submitted';
      return 'pending';
    } catch (error) {
      LogStatus('Error getting Abstract Status:', String(error));
      console.log('Error:', error);
      return 'pending';
    }
  };

  submitAbstract(sessionID: string) {
    this.router.navigate(['/abstract-form', this.eventId, sessionID]);
  };

  formatSessionTime(startDate: Date, endDate: Date): string {
    if (!startDate) return 'TBD';

    const start = new Date(startDate);
    let timeStr = start.toLocaleDateString() + ' ' +
      start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (endDate) {
      const end = new Date(endDate);
      timeStr += ' - ' + end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    return timeStr;
  }


  getEventStatus(event: EventEntity): string {
    const today = new Date();
    if (event.EventEndDate && new Date(event.EventEndDate) < today) {
      return 'Completed';
    } else if (event.EventStartDate && new Date(event.EventStartDate) <= today && (!event.EventEndDate || new Date(event.EventEndDate) >= today)) {
      return 'Live';
    }
    return 'Upcoming';
  }
}
