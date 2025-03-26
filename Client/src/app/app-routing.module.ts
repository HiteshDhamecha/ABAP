import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
// import { AuthGuard } from '@auth0/auth0-angular';
import { AuthGuard } from './guards/auth.guard';
import { Metadata } from '@memberjunction/core';
import { LoginComponent } from './modules/login/login.component';
import { ManageEventComponent } from './modules/manage-event/manage-event.component';
import { ManageAbstractComponent } from './modules/manage-abstract/manage-abstract.component';
import { ManageScorecardComponent } from './modules/manage-scorecard/manage-scorecard.component';
import { EventDetailsComponent } from './modules/manage-event/event-details/event-details.component';
import { ManageAbstractDetailsComponent } from './modules/manage-abstract-details/manage-abstract-details.component';
import { ViewEventComponent } from './modules/view-event/view-event.component'; // Add this import
import { ViewDetailsComponent } from './modules/view-event/view-details/view-details.component'; // Corrected import path
import { SessionDetailsComponent } from './modules/manage-event/session-details/session-details.component';
import { UserAbstractFormComponent } from './modules/user-abstract-form/user-abstract-form.component';
import { ScorecardDetailsComponent } from './modules/manage-scorecard/scorecard-details/scorecard-details.component';

const MJProviderSet: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot,) => {
  const metadata = new Metadata(); // Instantiate Metadata

  if (!Metadata.Provider) {
    console.log("MJProviderSet: Provider not set. Redirecting to login.");
    inject(Router).navigate(['/']);
    return false;
  }
  if (!metadata.CurrentUser) {
    console.log("MJProviderSet: CurrentUser not set. Redirecting to login.");
    inject(Router).navigate(['/']);
    return false;
  }

  const requiredRoles = route.data?.['roles'];
  const userRole = metadata.CurrentUser.Type.trim();

  console.log(`🔍 Checking access for role: "${userRole}"`); // Debugging
 

  if (requiredRoles && !requiredRoles.includes(userRole)) {
    console.log(`Access denied. User role '${userRole}' is not authorized for this route.`);
    inject(Router).navigate(['/view-event']); // Redirect users to a safe page
    return false;
  }

  return true;
};

const routes: Routes = [
  { path: '',
    component: LoginComponent
  },
  {
    path: 'event-settings',
    component: ManageEventComponent,
    canActivate: [AuthGuard, MJProviderSet],
    data: { roles: ['Owner'] }  // Only admins can access
  },
  {
    path: 'manage-abstract',
    component: ManageAbstractComponent,
    canActivate: [AuthGuard, MJProviderSet],
    data: { roles: ['Owner'] }  // Only admins can access
  },
  {
    path: 'manage-scorecard',
    component: ManageScorecardComponent,
    canActivate: [AuthGuard, MJProviderSet],
    data: { roles: ['Owner'] }  // Only admins can access
  },
  {
    path: 'scoreboard-details/:id',
    component: ScorecardDetailsComponent,
    canActivate: [AuthGuard, MJProviderSet],
    data: { roles: ['Owner'] }  // Only admins can access
    
  },
  {
    path: 'event-details/:id',
    component: EventDetailsComponent,
    canActivate: [AuthGuard, MJProviderSet], // Protect the route if needed
    data: { roles: ['Owner'] }  // Only admins can access
  },
  {
    path: 'session-details/:id',
    component: SessionDetailsComponent,
    canActivate: [AuthGuard, MJProviderSet],
    data: { roles: ['Owner'] }  // Only admins can access
  },
  {
    path: 'manage-abstract-details/:speaker',
    component: ManageAbstractDetailsComponent, // Direct reference
    canActivate: [AuthGuard, MJProviderSet],
    data: { roles: ['Owner'] }  // Only admins can access
  },
  {
    path: 'view-event',
    component: ViewEventComponent,
    canActivate: [AuthGuard, MJProviderSet],
    data: { roles: ['User'] }  // Only User can access
  },
  {
    path: 'view-details/:id',
    component: ViewDetailsComponent,
    canActivate: [AuthGuard, MJProviderSet], // Protect the route if needed
    data: { roles: ['User'] }  // Only User can access
  },
  {
    path: 'abstract-form/:session',
    component: UserAbstractFormComponent,
    canActivate: [AuthGuard, MJProviderSet],
    data: { roles: ['User'] }  // Only User can access
  },
  {
    path: '**',
    redirectTo: 'event-settings'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
