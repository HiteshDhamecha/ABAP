import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  public adminTabs = [
    { name: 'Manage Event', route: '/event-settings', selected: true },
    { name: 'Manage Abstract', route: '/manage-abstract', selected: false },
    { name: 'Manage Scorecard', route: '/manage-scorecard', selected: false },
   { name: 'View Event', route: '/view-event', selected: false }
  ];

  public userTabs =[
    { name: 'View Event', route: '/view-event', selected: false }
  ];
 //TODO:update this logic after roles have been added
 public tabs = this.userTabs.some((tab:any) => tab.route === window.location.pathname) ? this.userTabs : this.adminTabs;

  constructor(private router: Router) {}

  navigateTo(tab: any) {
    this.tabs.forEach(t => t.selected = false);
    tab.selected = true;
    this.router.navigate([tab.route]);
  }
}