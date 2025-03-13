import { Component } from '@angular/core';
import { EmailTemplateEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-base-forms';
import { LoadEmailTemplateDetailsComponent } from "./sections/details.component"

@RegisterClass(BaseFormComponent, 'Email Templates') // Tell MemberJunction about this class
@Component({
    selector: 'gen-emailtemplate-form',
    templateUrl: './emailtemplate.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class EmailTemplateFormComponent extends BaseFormComponent {
    public record!: EmailTemplateEntity;
} 

export function LoadEmailTemplateFormComponent() {
    LoadEmailTemplateDetailsComponent();
}
