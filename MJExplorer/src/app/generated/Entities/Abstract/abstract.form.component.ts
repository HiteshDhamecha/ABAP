import { Component } from '@angular/core';
import { AbstractEntity } from 'mj_generatedentities';
import { RegisterClass } from '@memberjunction/global';
import { BaseFormComponent } from '@memberjunction/ng-base-forms';
import { LoadAbstractDetailsComponent } from "./sections/details.component"
import { UserViewGridComponent } from "@memberjunction/ng-user-view-grid"
import { Metadata } from '@memberjunction/core';

@RegisterClass(BaseFormComponent, 'Abstracts') // Tell MemberJunction about this class
@Component({
    selector: 'gen-abstract-form',
    templateUrl: './abstract.form.component.html',
    styleUrls: ['../../../../shared/form-styles.css']
})
export class AbstractFormComponent extends BaseFormComponent {
     md = new Metadata();
  
  

async submittest() {
    this.md = new Metadata();
    const abstractEntity = await this.md.GetEntityObject<AbstractEntity>('Abstracts');
    abstractEntity.SessionID = "58FCC61A-BF88-4E54-9F08-37F8EFD2BF58";
    abstractEntity.UserID = "58FCC61A-BF88-4E54-9F08-37F8EFD2BF58";
    if(await abstractEntity.Save()){
      alert('Abstract form submitted!');
    }else{
      console.log("Error saving Abstarct ", abstractEntity.LatestResult)        
      alert('Abstract form Not Submitted! ');
    }
}
    public record!: AbstractEntity;

    
} 

export function LoadAbstractFormComponent() {
    LoadAbstractDetailsComponent();
}
