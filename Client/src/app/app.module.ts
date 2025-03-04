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
import { ChatModule } from '@memberjunction/ng-chat';
import { MarkdownModule } from 'ngx-markdown';
import { ManageEventComponent } from './modules/manage-event/manage-event.component';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { ManageAbstractComponent } from './modules/manage-abstract/manage-abstract.component';


@NgModule({
  declarations: [
    AppComponent,
    ManageEventComponent,
    SidebarComponent,
    ManageAbstractComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AuthModule.forRoot({
      domain: environment.AUTH0_DOMAIN,
      clientId: environment.AUTH0_CLIENTID,
      authorizationParams: {
        redirect_uri: window.location.origin
      },
      cacheLocation: 'localstorage', 
      useRefreshTokens: true
    }),
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
    ChatModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    CurrencyPipe, 
    DecimalPipe
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { 
}
