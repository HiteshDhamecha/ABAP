import { Component } from '@angular/core';
import { AbstractStagingEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-base-forms';
import { LoadAbstractStagingDetailsComponent } from "./sections/details.component"

@RegisterClass(BaseFormComponent, 'Abstract Stagings') // Tell MemberJunction about this class
@Component({
    selector: 'gen-abstractstaging-form',
    templateUrl: './abstractstaging.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class AbstractStagingFormComponent extends BaseFormComponent {
    public record!: AbstractStagingEntity;
} 

export function LoadAbstractStagingFormComponent() {
    LoadAbstractStagingDetailsComponent();
}
