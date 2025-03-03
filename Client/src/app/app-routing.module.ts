import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { LoginComponent } from './screens/login/login.component';
import { Metadata } from '@memberjunction/core';
import { ManageAbstractComponent } from './component/manage-abstract/manage-abstract.component';


//The user may be logged in, but the GraphQL client may not be setup yet.
const MJProviderSet: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot,) => { 
  if(!Metadata.Provider || !Metadata.prototype.CurrentUser){
    console.log("MJProviderSet: Provider not set. Redirecting to login.");
    inject(Router).navigate(['/']);
    return false;
  }
  return true;

};

const routes: Routes = [
  { path: '', 
    component: LoginComponent
  },
  {
    path: 'home',
    component: ManageAbstractComponent,
  },
  {
    path: '**',
    redirectTo: ''
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
