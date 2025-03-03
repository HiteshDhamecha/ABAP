import { Component } from '@angular/core';
import { SessionEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-base-forms';
import { LoadSessionDetailsComponent } from "./sections/details.component"
import { UserViewGridComponent } from "@memberjunction/ng-user-view-grid"

@RegisterClass(BaseFormComponent, 'Sessions') // Tell MemberJunction about this class
@Component({
    selector: 'gen-session-form',
    templateUrl: './session.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class SessionFormComponent extends BaseFormComponent {
    public record!: SessionEntity;
} 

export function LoadSessionFormComponent() {
    LoadSessionDetailsComponent();
}
