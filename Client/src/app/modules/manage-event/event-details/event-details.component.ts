import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LogStatus, Metadata, RunView, RunViewResult } from '@memberjunction/core';
import { EventEntity, SessionEntityType } from 'mj_generatedentities';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  eventId: string | null = null;
  event!: EventEntity;
  sessions: SessionEntityType[] = [];
  editMode: boolean = false;
  eventForm: FormGroup;
  md = new Metadata();


  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]    
    });
  }

  async ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
    console.log('Event ID:', this.eventId); // Log the event ID

    if (this.eventId) {
      await this.loadEventDetails();
      await this.loadSessionDetails();
    }
  }

  async loadEventDetails() {
    console.log('Loading event details...'); // Log the start of the method
    const eventEntity = await this.getEventEntity(this.eventId);
    if (eventEntity) {
      this.event = eventEntity;
      this.eventForm.patchValue({
        name: this.event.Name,
        startDate: this.event.EventStartDate,
        endDate: this.event.EventEndDate,
        // description: this.event.Description
      });
      console.log('Loaded event:', this.event); // Log the loaded event
    } else {
      console.error('Event not found');
    }
  }

  async loadSessionDetails() {
    console.log('Loading session details...'); // Log the start of the method
    const sessionEntities = await this.getSessionEntity(this.eventId);
    if (sessionEntities) {
      this.sessions = sessionEntities;
      console.log('Loaded sessions:', this.sessions); // Log the loaded sessions
    } else {
      console.error('Sessions not found');
    }
  }
 async getSessionEntity(eventId: string): Promise<SessionEntityType[] | null> {
    try {
      const rv = new RunView();
      const result: RunViewResult<SessionEntityType> = await rv.RunView<SessionEntityType>({
        EntityName: 'Sessions',
        Fields: ['ID', 'EventID', 'Name', 'SessionStartDate', 'SessionEndDate', 'Title'],
        ExtraFilter: `EventID = '${eventId}'`
      });
      console.log('RunView result:', result); // Log the result of RunView
      return result.Success ? result.Results : null;
    } catch (error) {
      LogStatus(error);
      return null;
    }
  }
  getEventStatus(startDate: any, endDate: any): string {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (end && end < today) {
      return 'Completed';
    } else if (start && start <= today && (!end || end >= today)) {
      return 'Live';
    }
    return 'Upcoming';
  }
  async getEventEntity(eventId: string): Promise<EventEntity | null> {
    try {
      const rv = new RunView();
      const result: RunViewResult<EventEntity> = await rv.RunView<EventEntity>({
        EntityName: 'Events',
        Fields: ['ID', 'Name', 'EventStartDate', 'EventEndDate'],
        ExtraFilter: `ID = '${eventId}'`,
        MaxRows: 1
      });
      console.log('RunView result:', result); // Log the result of RunView
      return result.Success && result.Results.length > 0 ? result.Results[0] : null;
    } catch (error) {
      LogStatus(error);
      return null;
    }
  }
  onEditEvent(){
    console.log('Edit Event');
    this.editMode = true;
  }
  async onSaveEvent() {
   const eventEntity= await this.md.GetEntityObject<EventEntity>('Events');
    
    if (this.eventForm.valid) {
      if (this.eventId) {
        await eventEntity.Load(this.eventId);
      }
      // Update the event entity with form values
      eventEntity.Name = this.eventForm.value.name;
      eventEntity.EventStartDate = this.eventForm.value.startDate;
      eventEntity.EventEndDate = this.eventForm.value.endDate;
      // this.event.Description = this.eventForm.value.description;
  
      // Log the event entity values
      console.log('Saving event:', eventEntity);
      // Save the event entity
      try {
        const saveResult: boolean = await eventEntity.Save();
        if (!saveResult) {
          LogStatus('Error saving event entity:', eventEntity.LatestResult.Message);
          alert(`Failed to save event: ${eventEntity.LatestResult.Message}`);
        } else {
          alert("Event Updated");
          window.location.reload();
          this.editMode = false;
        }
      } catch (error) {
        LogStatus('Failed to save event', error);
        alert("Failed to save event");
      }
    } else {
      LogStatus('Form is invalid');
      alert("Form is invalid");
    }
  }
}
