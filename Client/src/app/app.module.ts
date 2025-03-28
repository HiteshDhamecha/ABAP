import 'hammerjs'

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from '@auth0/auth0-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';

import { LayoutModule } from '@progress/kendo-angular-layout';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { IconsModule } from '@progress/kendo-angular-icons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { WindowModule } from "@progress/kendo-angular-dialog";
import { environment } from 'src/environments/environment';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { PanelBarModule } from '@progress/kendo-angular-layout';
import { SplitterModule } from '@progress/kendo-angular-layout';

import { MenuModule } from '@progress/kendo-angular-menu';
import { PDFExportModule } from "@progress/kendo-angular-pdf-export";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { LoginComponent } from './modules/login/login.component';
import { MarkdownModule } from 'ngx-markdown';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AuthModule.forRoot({
      domain: environment.CLIENT_AUTHORITY,
      clientId: environment.CLIENT_ID,
      authorizationParams: {
        redirect_uri: window.location.origin
      },
      cacheLocation: 'localstorage', 
      useRefreshTokens: true
    }),
    BrowserAnimationsModule,
    DropDownsModule,
    GridModule,
    ChartsModule,
    IndicatorsModule,
    LayoutModule,
    ButtonsModule,
    NavigationModule,
    IconsModule,
    InputsModule,
    NotificationModule,
    WindowModule,
    ListViewModule,
    PanelBarModule,
    SplitterModule,
    MenuModule,
    PDFExportModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    CurrencyPipe, 
    DecimalPipe,
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { 
}
