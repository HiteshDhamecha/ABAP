import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


import { EventEntity } from 'mj_generatedentities';
import { LogStatus, Metadata, RunView } from '@memberjunction/core';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css'],
})
export class ViewEventComponent implements OnInit {
  eventEntity: EventEntity[] = [];
  md = new Metadata();

  public selectedTab: string = 'event-settings';
  public displayedColumns: string[] = ['name', 'date', 'status'];
  public events: any[] = [];

  constructor(public dialog: MatDialog,private router: Router) {}

  async ngOnInit() {
    console.log('ViewEventComponent: ngOnInit');
    await this.loadEvent();
  }

  async loadEvent() {
    this.eventEntity = await this.getEventEntity();
    this.events = this.eventEntity.map(event => ({
      id: event.ID,
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
    this.router.navigate(['/view-details', event.id]);
  }

  async getEventEntity() {
    try {
        const rv = new RunView()
        const result=  await rv.RunView<EventEntity>({
          EntityName: 'Events',

        } );

    //   const rv = new RunView();

      if (result.Success) {
        console.log('Result' ,result) ;
        return result.Results;
      }
    } catch (error) {
      LogStatus('Error getting event entity:', error);
    }
    return [];
  }
}