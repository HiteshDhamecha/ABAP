import { Component, Inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService, IdToken, User } from '@auth0/auth0-angular';
import { Metadata } from '@memberjunction/core';
import { GraphQLDataProvider, GraphQLProviderConfigData, setupGraphQLClient } from '@memberjunction/graphql-dataprovider';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './modules/login/login.component';
import { UserService } from './service/user.service';
import { LoadGeneratedEntities } from 'mj_generatedentities';
LoadGeneratedEntities();
import { AbstractEntity } from 'mj_generatedentities';

export type RefreshTokenFunction = () => Promise<string>;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private loginComponent: LoginComponent | null = null;
  public showSidebar: boolean = true;

  constructor(private router: Router, @Inject(AuthService) public authService: AuthService, private userService: UserService) { 
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
        
        const md: Metadata = new Metadata();

        if (!md.CurrentUser) {
            console.error("User is logged in but no user found in metadata");
            this.NavigateToLogin();
            return;
        }else{
          // console.log(md.CurrentUser);
          this.userService.setUserInfo(md.CurrentUser);
        }

        console.log("User Info:", md.CurrentUser);
        
        // Store user type in local storage or service
        localStorage.setItem('userType', md.CurrentUser.Type.trim());
        this.userService.setUserType(md.CurrentUser.Type.trim()); 


        if (md.CurrentUser.Email !== user.email) {
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

        this.submitAbstract();

        this.loginComponent?.SetLoading(false);
        if(md.CurrentUser.Type.trim()=='Owner'){
          this.router.navigate(['/event-settings']);
        }else{
          this.router.navigate(['/view-event'])
        }
         

    }    catch (err) {
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

async submitAbstract() {
  const md = new Metadata();
  const abstractEntity = await md.GetEntityObject<AbstractEntity>('Abstracts');
  abstractEntity.SessionID = "3AEE2703-25DF-4512-8AD0-2B82D62A4474";
abstractEntity.UserID = "3AEE2703-25DF-4512-8AD0-2B82D62A4474";
console.log('Abstract Entity: ', abstractEntity);
if(await abstractEntity.Save()){
  alert('Abstract form submitted!');
}else{
  console.log(abstractEntity.LatestResult);
  alert('Abstract form Not Submitted!');
}
}
  private NavigateToLogin(): void {
    this.loginComponent?.SetLoading(false);
    //this.router.navigate(['/']);
  }
}
