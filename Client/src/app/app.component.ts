import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, IdToken, User } from '@auth0/auth0-angular';
import { Metadata } from '@memberjunction/core';
import { GraphQLDataProvider, GraphQLProviderConfigData, setupGraphQLClient } from '@memberjunction/graphql-dataprovider';
import { AbstractEntity, LoadGeneratedEntities } from 'mj_generatedentities';
import { environment } from 'src/environments/environment';

LoadGeneratedEntities();
export type RefreshTokenFunction = () => Promise<string>;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  private currentPathName: string;

  constructor(private router: Router, public authService: AuthService) {
    this.currentPathName = window.location.pathname;
  }

  public async ngOnInit(): Promise<void> {
    this.AutoLogin();
  }

  public onOutletLoaded(event: any): void {
   
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

      const end = new Date();
      const elapsed = (end.getTime() - start.getTime()) / 1000;
      console.log(`GraphQL client setup in ${elapsed} seconds`);
      console.log("App setup complete");
      
      localStorage.setItem(environment.TOKEN_CACHE_KEY, token);

      this.submitAbstract();
      if(this.currentPathName === '/'){
        this.router.navigate(['/user-abstract-form']);
      }
      else{
        this.router.navigate([this.currentPathName]);
      }
    } 
    catch (err) {
      console.error("Error setting up app:");
      console.error(err);
      this.NavigateToLogin();
    }
  }

  private NavigateToLogin(): void {

    //this.router.navigate(['/']);
  }

   async submitAbstract() {
      const md = new Metadata();
      const abstractEntity = await md.GetEntityObject<AbstractEntity>('Abstracts');
      abstractEntity.SessionID = "58FCC61A-BF88-4E54-9F08-37F8EFD2BF58";
      abstractEntity.UserID = "58FCC61A-BF88-4E54-9F08-37F8EFD2BF58";
      console.log(abstractEntity)
      if(await abstractEntity.Save()){
        alert('Abstract form submitted!');
      }else{
        console.log("Error saving Abstarct ", abstractEntity.LatestResult)        
        alert('Abstract form Not Submitted! ');
      }
      
    }
}
