import { Component } from '@angular/core';
import { Metadata } from '@memberjunction/core';

import { AbstractEntity } from 'mj_generatedentities';


@Component({
  selector: 'user-abstract-form',
  templateUrl: './user-abstract-form.component.html',
  styleUrls: ['./user-abstract-form.component.css']
})
export class UserAbstractFormComponent  {
  md = new Metadata();
  
  constructor() {
    this.md = new Metadata();
  }
  async submitAbstract() {
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
  
}
