import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfo } from '@memberjunction/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userInfo!: UserInfo;

  constructor() {}

  public userInfoSource = new BehaviorSubject<Boolean>(false);
  getUserComplete$ = this.userInfoSource.asObservable();

  setUserInfo(user: UserInfo): void {
    this.userInfo = user;
    this.userInfoSource.next(true);
  }

  getUserInfo(): UserInfo {
    return this.userInfo;
  }
}