import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const userType = (localStorage.getItem('userType') || '').trim(); // Trim userType before checking
    if (!userType) {
      console.log("No user type found. Redirecting to login.");
      this.router.navigate(['/']);
      return of(false);
    }

    // Check the required role from the route data
    const allowedRoles = next.data['roles'] as string[];
    
    if (allowedRoles && !allowedRoles.includes(userType)) {
      console.log(`Access Denied: UserType '${userType}' not allowed for this route.`);
      this.router.navigate(['/']); // Redirect unauthorized users
      return of(false);
    }

    return of(true);
  }
}
