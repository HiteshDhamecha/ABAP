import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService, IdToken, User } from '@auth0/auth0-angular';
import { Metadata } from '@memberjunction/core';
import { GraphQLDataProvider, GraphQLProviderConfigData, setupGraphQLClient } from '@memberjunction/graphql-dataprovider';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './modules/login/login.component';

export type RefreshTokenFunction = () => Promise<string>;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private loginComponent: LoginComponent | null = null;
  public showSidebar: boolean = true;

  constructor(private router: Router, public authService: AuthService) { 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSidebar = event.url !== '/';
      }
    });
  }

  public async ngOnInit(): Promise<void> {
  }

  public onOutletLoaded(event: any): void {
    if(event instanceof LoginComponent){
      this.loginComponent = event;
      this.loginComponent.SetLoading(true);
      this.AutoLogin();
    }
  }

  private async AutoLogin(): Promise<void> {
    this.authService.user$.subscribe(async (user: User | null | undefined) => {
      if(!user){
        console.log("No user found");
        this.NavigateToLogin();
        return;
      }
      
      this.authService.getAccessTokenSilently({cacheMode: 'off'});
      this.authService.idTokenClaims$.subscribe(async (claims: IdToken | null | undefined) => {
        if(!claims){
          console.error("No claims found");
          this.NavigateToLogin();
          return;
        }

        const token: string = claims.__raw;
        await this.SetupApp(token, user);
      });
    });
  }

  private async SetupApp(token: string, user: User): Promise<void> {
    try {
      if (!token) {
        console.error("Unable to setup app: No token provided");
        this.NavigateToLogin();
        return;
      }
      
      const url: string = environment.GRAPHQL_URI;
      const wsurl: string = environment.GRAPHQL_WS_URI;
  
      const start = new Date();
  
      const refreshTokenFunction: RefreshTokenFunction = async () => { return 'NoToken'; };
      const config = new GraphQLProviderConfigData(token, url, wsurl, refreshTokenFunction);
  
      const provider: GraphQLDataProvider = await setupGraphQLClient(config);
  
      // Check to see if the user has access
      const md: Metadata = new Metadata();
      if (!md.CurrentUser){
        console.error("User is logged in but no user found in metadata");
        this.NavigateToLogin();
        return;
      }
  
      if(md.CurrentUser.Email !== user.email){
        console.log("User's email does not match metadata email, refreshing metadata");
        await provider.Refresh();
      }
      else{
        console.log("User's email matches metadata email");
      }
  
      const end = new Date();
      const elapsed = (end.getTime() - start.getTime()) / 1000;
      console.log(`GraphQL client setup in ${elapsed} seconds`);
      console.log("App setup complete");
      
      localStorage.setItem(environment.TOKEN_CACHE_KEY, token);
  
      this.loginComponent?.SetLoading(false);
      this.router.navigate(['/event-settings']);
    } 
    catch (err) {
      if (err.response && err.response.errors) {
        const unauthorizedError = err.response.errors.find((error: any) => error.extensions.code === 'UNAUTHORIZED');
        if (unauthorizedError) {
          console.error("Access denied! You don't have permission for this action!");
          this.NavigateToLogin();
          return;
        }
      }
      console.error("Error setting up app:");
      console.error(err);
      this.NavigateToLogin();
    }
  }

  private NavigateToLogin(): void {
    this.loginComponent?.SetLoading(false);
    //this.router.navigate(['/']);
  }
}
