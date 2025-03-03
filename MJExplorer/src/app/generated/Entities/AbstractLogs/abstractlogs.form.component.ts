import { Component } from '@angular/core';
import { AbstractLogsEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-base-forms';
import { LoadAbstractLogsDetailsComponent } from "./sections/details.component"

@RegisterClass(BaseFormComponent, 'Abstract Logs') // Tell MemberJunction about this class
@Component({
    selector: 'gen-abstractlogs-form',
    templateUrl: './abstractlogs.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class AbstractLogsFormComponent extends BaseFormComponent {
    public record!: AbstractLogsEntity;
} 

export function LoadAbstractLogsFormComponent() {
    LoadAbstractLogsDetailsComponent();
}
