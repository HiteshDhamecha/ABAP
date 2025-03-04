import { Component,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrl: './manage-event.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ManageEventComponent {
  public selectedTab: string = 'event-settings';
  public events = [
    { name: 'ET Anniversary', date: '2025-03-01', status: 'Completed' },
    { name: 'Quarter 1 Meeting', date: '2025-03-15', status: 'Live' },
    { name: 'AI Astra Global Launch', date: '2025-04-01', status: 'Upcoming' }
  ];
  
  public displayedColumns: string[] = ['name', 'date', 'status'];

  selectTab(tab: string) {
    if (tab === 'event-settings' || tab === 'agent-settings' || tab === 'publish-preview') {
      this.selectedTab = tab;
    }
  }

}