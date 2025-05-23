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
import { EventDetailsComponent } from './modules/manage-event/event-details/event-details.component';

import { ManageAbstractDetailsComponent } from './modules/manage-abstract-details/manage-abstract-details.component';
import { ViewEventComponent } from './modules/view-event/view-event.component';
import { ViewDetailsComponent } from './modules/view-event/view-details/view-details.component';
import { SessionDetailsComponent } from './modules/manage-event/session-details/session-details.component';
import { CreateSessionDialogComponent } from './components/create-session-dialog/create-session-dialog.component';
import { UserAbstractFormComponent } from './modules/user-abstract-form/user-abstract-form.component';
import { ManageScorecardComponent } from './modules/manage-scorecard/manage-scorecard.component';
import { ScorecardDetailsComponent } from './modules/manage-scorecard/scorecard-details/scorecard-details.component';
import { CreateScorecardDialogComponent } from './components/create-scorecard-dialog/create-scorecard-dialog.component';
import { CreateCriteriaDialogComponent } from './components/create-criteria-dialog/create-criteria-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { FileStorageModule} from '@memberjunction/ng-file-storage'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ManageEventComponent,
    SidebarComponent,
    ManageAbstractComponent,
    CreateEventDialogComponent,
    EventDetailsComponent,
    ViewEventComponent,
    ManageAbstractDetailsComponent,
    ViewDetailsComponent,
    UserAbstractFormComponent,
    SessionDetailsComponent,
    CreateSessionDialogComponent,
    ManageScorecardComponent,
    ScorecardDetailsComponent,
    CreateScorecardDialogComponent,
    CreateCriteriaDialogComponent,
    ErrorDialogComponent
  ],
  imports: [
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
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
    FileStorageModule,
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
