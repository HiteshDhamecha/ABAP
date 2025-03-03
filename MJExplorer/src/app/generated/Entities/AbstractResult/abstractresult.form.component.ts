import { Component } from '@angular/core';
import { AbstractResultEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-base-forms';
import { LoadAbstractResultDetailsComponent } from "./sections/details.component"
import { UserViewGridComponent } from "@memberjunction/ng-user-view-grid"

@RegisterClass(BaseFormComponent, 'Abstract Results') // Tell MemberJunction about this class
@Component({
    selector: 'gen-abstractresult-form',
    templateUrl: './abstractresult.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class AbstractResultFormComponent extends BaseFormComponent {
    public record!: AbstractResultEntity;
} 

export function LoadAbstractResultFormComponent() {
    LoadAbstractResultDetailsComponent();
}
