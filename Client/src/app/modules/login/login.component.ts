import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'mj-aba-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public ShowLoading: boolean;

  constructor(private authService: AuthService) { 
    this.ShowLoading = false;
  }

  public ngOnInit(): void {
  }

  public Login(): void {
    this.authService.loginWithRedirect();
  }

  public SignUp() {
    this.authService.loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  }

  public SetLoading(loading: boolean): void {
    this.ShowLoading = loading;
  }
}
