/**********************************************************************************
* GENERATED FILE - This file is automatically managed by the MJ CodeGen tool, 
* 
* DO NOT MODIFY THIS FILE - any changes you make will be wiped out the next time the file is
* generated
* 
**********************************************************************************/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// MemberJunction Imports
import { BaseFormsModule } from '@memberjunction/ng-base-forms';
import { FormToolbarModule } from '@memberjunction/ng-form-toolbar';
import { UserViewGridModule } from '@memberjunction/ng-user-view-grid';
import { LinkDirectivesModule } from '@memberjunction/ng-link-directives';
import { MJTabStripModule } from "@memberjunction/ng-tabstrip";
import { ContainerDirectivesModule } from "@memberjunction/ng-container-directives";

// Kendo Imports
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ComboBoxModule } from '@progress/kendo-angular-dropdowns';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';

// Import Generated Components
import { AbstractLogsFormComponent, LoadAbstractLogsFormComponent } from "./Entities/AbstractLogs/abstractlogs.form.component";
import { AbstractResultFormComponent, LoadAbstractResultFormComponent } from "./Entities/AbstractResult/abstractresult.form.component";
import { AbstractStatusFormComponent, LoadAbstractStatusFormComponent } from "./Entities/AbstractStatus/abstractstatus.form.component";
import { AbstractFormComponent, LoadAbstractFormComponent } from "./Entities/Abstract/abstract.form.component";
import { EmailTemplateFormComponent, LoadEmailTemplateFormComponent } from "./Entities/EmailTemplate/emailtemplate.form.component";
import { EventFormComponent, LoadEventFormComponent } from "./Entities/Event/event.form.component";
import { ReviewCriteriaFormComponent, LoadReviewCriteriaFormComponent } from "./Entities/ReviewCriteria/reviewcriteria.form.component";
import { ScoreBoardFormComponent, LoadScoreBoardFormComponent } from "./Entities/ScoreBoard/scoreboard.form.component";
import { SessionScoreBoardFormComponent, LoadSessionScoreBoardFormComponent } from "./Entities/SessionScoreBoard/sessionscoreboard.form.component";
import { SessionFormComponent, LoadSessionFormComponent } from "./Entities/Session/session.form.component";
import { AbstractLogsDetailsComponent, LoadAbstractLogsDetailsComponent } from "./Entities/AbstractLogs/sections/details.component"
import { AbstractResultDetailsComponent, LoadAbstractResultDetailsComponent } from "./Entities/AbstractResult/sections/details.component"
import { AbstractStatusDetailsComponent, LoadAbstractStatusDetailsComponent } from "./Entities/AbstractStatus/sections/details.component"
import { AbstractDetailsComponent, LoadAbstractDetailsComponent } from "./Entities/Abstract/sections/details.component"
import { EmailTemplateDetailsComponent, LoadEmailTemplateDetailsComponent } from "./Entities/EmailTemplate/sections/details.component"
import { EventDetailsComponent, LoadEventDetailsComponent } from "./Entities/Event/sections/details.component"
import { ReviewCriteriaDetailsComponent, LoadReviewCriteriaDetailsComponent } from "./Entities/ReviewCriteria/sections/details.component"
import { ScoreBoardDetailsComponent, LoadScoreBoardDetailsComponent } from "./Entities/ScoreBoard/sections/details.component"
import { SessionScoreBoardDetailsComponent, LoadSessionScoreBoardDetailsComponent } from "./Entities/SessionScoreBoard/sections/details.component"
import { SessionDetailsComponent, LoadSessionDetailsComponent } from "./Entities/Session/sections/details.component"
   

@NgModule({
declarations: [
    AbstractLogsFormComponent,
    AbstractResultFormComponent,
    AbstractStatusFormComponent,
    AbstractFormComponent,
    EmailTemplateFormComponent,
    EventFormComponent,
    ReviewCriteriaFormComponent,
    ScoreBoardFormComponent,
    SessionScoreBoardFormComponent,
    SessionFormComponent,
    AbstractLogsDetailsComponent,
    AbstractResultDetailsComponent,
    AbstractStatusDetailsComponent,
    AbstractDetailsComponent,
    EmailTemplateDetailsComponent,
    EventDetailsComponent,
    ReviewCriteriaDetailsComponent,
    ScoreBoardDetailsComponent,
    SessionScoreBoardDetailsComponent,
    SessionDetailsComponent],
imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    InputsModule,
    ButtonsModule,
    DateInputsModule,
    UserViewGridModule,
    LinkDirectivesModule,
    BaseFormsModule,
    FormToolbarModule,
    MJTabStripModule,
    ContainerDirectivesModule,
    DropDownListModule,
    ComboBoxModule,
    UserViewGridModule
],
exports: [
]
})
export class GeneratedForms_SubModule_0 { }
    


@NgModule({
declarations: [
],
imports: [
    GeneratedForms_SubModule_0
]
})
export class GeneratedFormsModule { }
    
export function LoadGeneratedForms() {
    // This function doesn't do much, but it calls each generated form's loader function
    // which in turn calls the sections for that generated form. Ultimately, those bits of 
    // code do NOTHING - the point is to prevent the code from being eliminated during tree shaking
    // since it is dynamically instantiated on demand, and the Angular compiler has no way to know that,
    // in production builds tree shaking will eliminate the code unless we do this
    LoadAbstractLogsFormComponent();
    LoadAbstractResultFormComponent();
    LoadAbstractStatusFormComponent();
    LoadAbstractFormComponent();
    LoadEmailTemplateFormComponent();
    LoadEventFormComponent();
    LoadReviewCriteriaFormComponent();
    LoadScoreBoardFormComponent();
    LoadSessionScoreBoardFormComponent();
    LoadSessionFormComponent();
    LoadAbstractLogsDetailsComponent();
    LoadAbstractResultDetailsComponent();
    LoadAbstractStatusDetailsComponent();
    LoadAbstractDetailsComponent();
    LoadEmailTemplateDetailsComponent();
    LoadEventDetailsComponent();
    LoadReviewCriteriaDetailsComponent();
    LoadScoreBoardDetailsComponent();
    LoadSessionScoreBoardDetailsComponent();
    LoadSessionDetailsComponent();
}
    