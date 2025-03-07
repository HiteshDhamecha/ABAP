import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEventDialogComponent } from '../../components/create-event-dialog/create-event-dialog.component';
import { EventEntity } from 'mj_generatedentities';
import { LogStatus, Metadata, RunView } from '@memberjunction/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.css'],
})
export class ManageEventComponent implements OnInit {
  eventEntity: EventEntity[] = [];
  md = new Metadata();

  public selectedTab: string = 'event-settings';
  public displayedColumns: string[] = ['name', 'date', 'status'];
  public events: any[] = [];
  public selectedEvent: any;

  constructor(public dialog: MatDialog, private router: Router) {}

  async ngOnInit() {
    console.log('ManageEventComponent: ngOnInit');
    await this.loadEvent();
  }
  selectEvent(event: any) {
    this.selectedEvent = event;
  }
  async loadEvent() {
    this.eventEntity = await this.getEventEntity();
    this.events = this.eventEntity.map(event => ({
      id: event.ID, // Ensure you have an ID field
      name: event.Name,
      date: event.EventStartDate,
      status: this.getEventStatus(event)
    }));
  }

  getEventStatus(event: any): string {
    const today = new Date();
    if (event.EventEndDate && new Date(event.EventEndDate) < today) {
      return 'Completed';
    } else if (event.EventStartDate && new Date(event.EventStartDate) <= today && (!event.EventEndDate || new Date(event.EventEndDate) >= today)) {
      return 'Live';
    }
    return 'Upcoming';
  }

  viewEventDetails(event: any) {
    this.router.navigate(['/event-details', event.id]);
  }
  async getEventEntity() {
    try {
      const rv = new RunView();
      const result = await rv.RunView({
        EntityName: 'Events'
      });
      if (result.Success) {
        return result.Results;
      }
    } catch (error) {
      LogStatus('Error getting event entity:', error);
    }
    return [];
  }

  selectTab(tab: string) {
    if (tab === 'event-settings' || tab === 'publish-preview') {
      this.selectedTab = tab;
    }
  }

  openCreateEventDialog(): void {
    const dialogRef = this.dialog.open(CreateEventDialogComponent, {
      width: '350px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const today = new Date();
        let status = 'Upcoming';
        if (result.endDate && new Date(result.endDate) < today) {
          status = 'Completed';
        } else if (result.startDate && new Date(result.startDate) <= today && (!result.endDate || new Date(result.endDate) >= today)) {
          status = 'Live';
        }
        this.events.push({
          name: result.name,
          date: result.startDate,
          status: status
        });
      }
    });
  }
}