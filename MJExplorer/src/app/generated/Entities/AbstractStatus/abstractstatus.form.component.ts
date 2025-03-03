import { Component } from '@angular/core';
import { AbstractStatusEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-base-forms';
import { LoadAbstractStatusDetailsComponent } from "./sections/details.component"
import { UserViewGridComponent } from "@memberjunction/ng-user-view-grid"

@RegisterClass(BaseFormComponent, 'Abstract Status') // Tell MemberJunction about this class
@Component({
    selector: 'gen-abstractstatus-form',
    templateUrl: './abstractstatus.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class AbstractStatusFormComponent extends BaseFormComponent {
    public record!: AbstractStatusEntity;
} 

export function LoadAbstractStatusFormComponent() {
    LoadAbstractStatusDetailsComponent();
}
