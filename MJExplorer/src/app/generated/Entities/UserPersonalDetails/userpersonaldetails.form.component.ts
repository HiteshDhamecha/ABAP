import { Component } from '@angular/core';
import { UserPersonalDetailsEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-base-forms';
import { LoadUserPersonalDetailsDetailsComponent } from "./sections/details.component"

@RegisterClass(BaseFormComponent, 'User Personal Details') // Tell MemberJunction about this class
@Component({
    selector: 'gen-userpersonaldetails-form',
    templateUrl: './userpersonaldetails.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class UserPersonalDetailsFormComponent extends BaseFormComponent {
    public record!: UserPersonalDetailsEntity;
} 

export function LoadUserPersonalDetailsFormComponent() {
    LoadUserPersonalDetailsDetailsComponent();
}
