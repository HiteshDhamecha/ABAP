import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EventEntity } from 'mj_generatedentities';
import { LogStatus, Metadata, RunView } from '@memberjunction/core';
import { CreateEventDialogComponent } from 'src/app/components/create-event-dialog/create-event-dialog.component';

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

  constructor(public dialog: MatDialog) {}

  async ngOnInit() {
    console.log('ManageEventComponent: ngOnInit');
    await this.loadEvent();
  }

  async loadEvent() {
    this.eventEntity = await this.getEventEntity();
    const today = new Date();
    this.events = this.eventEntity.map(event => {
      let status = 'Upcoming';
      if (event.EventEndDate && new Date(event.EventEndDate) < today) {
        status = 'Completed';
      } else if (event.EventStartDate && new Date(event.EventStartDate) <= today && (!event.EventEndDate || new Date(event.EventEndDate) >= today)) {
        status = 'Live';
      }
      return {
        name: event.Name,
        date: event.EventStartDate,
        status: status
      };
    });
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