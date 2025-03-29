import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Metadata } from '@memberjunction/core';
import { UserService } from 'src/app/service/user.service';

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
  ];

  public userTabs =[
    { name: 'Manage Event', route: '/view-event', selected: false }
  ];
 //TODO:update this logic after roles have been added
 public tabs: any[] = [];

 constructor(private router: Router, private user: UserService) {
   this.setUserTabs();
 }

 setUserTabs() {
 const userInfo= this.user.getUserInfo()
  if (!userInfo) {  // Handle undefined CurrentUser
    console.warn("Metadata CurrentUser is not available yet.");
    return;
  }

  const userType = userInfo?.Type?.trim(); // Trim extra spaces

  console.log("User Type:", userType); // Debugging

  if (userType === 'Owner') {
    this.tabs = this.adminTabs;
  } else if(userType == 'User') {
    this.tabs = this.userTabs;
  }

   // Mark the current route as selected
   this.markActiveTab();
 }

 markActiveTab() {
   const currentRoute = window.location.pathname;
   this.tabs.forEach(tab => tab.selected = (tab.route === currentRoute));
 }

 navigateTo(tab: any) {
  this.tabs.forEach(t => t.selected = false);
  tab.selected = true;
  this.router.navigate([tab.route]);
}
}