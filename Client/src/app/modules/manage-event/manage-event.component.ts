import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEventDialogComponent } from '../../components/create-event-dialog/create-event-dialog.component';

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.css'],
})
export class ManageEventComponent {
  public selectedTab: string = 'event-settings';
  public events = [
    { name: 'ET Anniversary', date: '2025-03-01', status: 'Completed' },
    { name: 'Quarter 1 Meeting', date: '2025-03-15', status: 'Live' },
    { name: 'AI Astra Global Launch', date: '2025-04-01', status: 'Upcoming' }
  ];

  constructor(public dialog: MatDialog) {}

  public displayedColumns: string[] = ['name', 'date', 'status'];

  selectTab(tab: string) {
    if (tab === 'event-settings' || tab === 'agent-settings' || tab === 'publish-preview') {
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
        this.events.push({
          name: result.name,
          date: result.startDate,
          status: 'Upcoming'
        });
      }
    });
  }
}