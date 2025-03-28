import { Component } from '@angular/core';
import { ReviewCriteriaEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-base-forms';
import { LoadReviewCriteriaDetailsComponent } from "./sections/details.component"

@RegisterClass(BaseFormComponent, 'Review Criterias') // Tell MemberJunction about this class
@Component({
    selector: 'gen-reviewcriteria-form',
    templateUrl: './reviewcriteria.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class ReviewCriteriaFormComponent extends BaseFormComponent {
    public record!: ReviewCriteriaEntity;
} 

export function LoadReviewCriteriaFormComponent() {
    LoadReviewCriteriaDetailsComponent();
}
