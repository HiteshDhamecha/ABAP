import { Component } from '@angular/core';
import { AbstractDetailsStagingEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-base-forms';
import { LoadAbstractDetailsStagingDetailsComponent } from "./sections/details.component"

@RegisterClass(BaseFormComponent, 'Abstract Details Stagings') // Tell MemberJunction about this class
@Component({
    selector: 'gen-abstractdetailsstaging-form',
    templateUrl: './abstractdetailsstaging.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class AbstractDetailsStagingFormComponent extends BaseFormComponent {
    public record!: AbstractDetailsStagingEntity;
} 

export function LoadAbstractDetailsStagingFormComponent() {
    LoadAbstractDetailsStagingDetailsComponent();
}
