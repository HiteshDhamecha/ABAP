import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
// import { AuthGuard } from '@auth0/auth0-angular';
import { AuthGuard } from '@auth0/auth0-angular';
import { Metadata } from '@memberjunction/core';
import { LoginComponent } from './modules/login/login.component';
import { UserAbstractFormComponent } from './modules/user-abstract-form/user-abstract-form.component';


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
 


  return true;
};

const routes: Routes = [
  { path: '',
    component: LoginComponent
  },
  {
    path: 'user-abstract-form',
    component: UserAbstractFormComponent,
    canActivate: [AuthGuard, MJProviderSet],
  },
  {
    path: '**',
    redirectTo: 'user-abstract-form'
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
