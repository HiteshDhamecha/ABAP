import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfo } from '@memberjunction/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userInfo!: UserInfo;
  private userType: string | null = null;  // Added userType property

  constructor() {}

  public userInfoSource = new BehaviorSubject<Boolean>(false);
  getUserComplete$ = this.userInfoSource.asObservable();

  setUserInfo(user: UserInfo): void {
    this.userInfo = user;
    this.userInfoSource.next(true);
    this.setUserType(user.Type);  
  }

  getUserInfo(): UserInfo {
    return this.userInfo;
  }

  // New methods to store and retrieve user type
  setUserType(type: string): void {
    this.userType = type;
  }

  getUserType(): string | null {
    return this.userType;
  }
}
