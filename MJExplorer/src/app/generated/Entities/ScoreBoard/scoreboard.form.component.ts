import { Component } from '@angular/core';
import { ScoreBoardEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-base-forms';
import { LoadScoreBoardDetailsComponent } from "./sections/details.component"
import { UserViewGridComponent } from "@memberjunction/ng-user-view-grid"

@RegisterClass(BaseFormComponent, 'Score Boards') // Tell MemberJunction about this class
@Component({
    selector: 'gen-scoreboard-form',
    templateUrl: './scoreboard.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class ScoreBoardFormComponent extends BaseFormComponent {
    public record!: ScoreBoardEntity;
} 

export function LoadScoreBoardFormComponent() {
    LoadScoreBoardDetailsComponent();
}
