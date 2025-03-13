import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RunView, LogStatus, Metadata } from '@memberjunction/core';
import { EventEntity, SessionEntity } from 'mj_generatedentities';

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
displayedColumns: string[] = ['srNo', 'name', 'startDate', 'abstractStatus'];
  constructor(private route: ActivatedRoute) { }

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
      LogStatus('Error loading event details:', error);
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
      LogStatus('Error getting event entity:', error);
      return null;
    }
  }

  async getEventSessions(eventId: string) {
    try {
      const rv = new RunView();
      const result = await rv.RunView<SessionEntity>({
        EntityName: 'Sessions', // Ensure this matches the entity name in metadata
        Fields: ['ID', 'Name', 'SessionStartDate', 'SessionEndDate'],
        ExtraFilter: `EventID = '${eventId}'`
      });

      if (result.Success) {
        console.log('Sessions Result:', result); // Log the result of RunView
        return result.Results.map((session, index) => ({
          srNo: index + 1, // Add SR No based on the index
          id: session.ID,
          name: session.Name,
          startDate: session.SessionStartDate,
          endDate: session.SessionEndDate,
          // title: session.Title ,
          abstractStatus: '' // Add empty Abstract Status
        }));
      } else {
        console.error('Failed to fetch sessions:', result.ErrorMessage);
      }
    } catch (error) {
      LogStatus('Error getting event sessions:', error);
    }
    return [];
  }

  formatSessionTime(startDate: Date, endDate: Date): string {
    if (!startDate) return 'TBD';

    const start = new Date(startDate);
    let timeStr = start.toLocaleDateString() + ' ' +
                  start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    if (endDate) {
      const end = new Date(endDate);
      timeStr += ' - ' + end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
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
