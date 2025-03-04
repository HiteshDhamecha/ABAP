import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  public tabs = [
    { name: 'Manage Events', route: '/event-settings', selected: true },
    { name: 'Manage Abstracts', route: '/manage-abstract', selected: false }
  ];

  constructor(private router: Router) {}

  navigateTo(tab: any) {
    this.tabs.forEach(t => t.selected = false);
    tab.selected = true;
    this.router.navigate([tab.route]);
  }
}