import 'hammerjs'

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  

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

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { CreateEventDialogComponent } from './components/create-event-dialog/create-event-dialog.component';
import { ManageAbstractDetailsComponent } from './modules/manage-abstract-details/manage-abstract-details.component';


@NgModule({
  declarations: [
    AppComponent,
    ManageEventComponent,
    SidebarComponent,
    ManageAbstractComponent,
    CreateEventDialogComponent,
    ManageAbstractDetailsComponent
  ],
  imports: [
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    BrowserModule,
    BrowserAnimationsModule,
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
