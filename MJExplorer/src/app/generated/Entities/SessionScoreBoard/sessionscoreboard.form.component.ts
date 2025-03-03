import { Component } from '@angular/core';
import { SessionScoreBoardEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-base-forms';
import { LoadSessionScoreBoardDetailsComponent } from "./sections/details.component"

@RegisterClass(BaseFormComponent, 'Session Score Boards') // Tell MemberJunction about this class
@Component({
    selector: 'gen-sessionscoreboard-form',
    templateUrl: './sessionscoreboard.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class SessionScoreBoardFormComponent extends BaseFormComponent {
    public record!: SessionScoreBoardEntity;
} 

export function LoadSessionScoreBoardFormComponent() {
    LoadSessionScoreBoardDetailsComponent();
}
