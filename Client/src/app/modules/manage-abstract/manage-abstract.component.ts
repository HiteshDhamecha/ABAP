import { Component, ViewEncapsulation  } from '@angular/core';
import { Router } from '@angular/router';
import { Metadata, RunView, LogStatus } from '@memberjunction/core';
import { AbstractEntity } from 'mj_generatedentities';

@Component({
  selector: 'app-manage-abstract',
  templateUrl: './manage-abstract.component.html',
  styleUrls: ['./manage-abstract.component.css']
})
export class ManageAbstractComponent {
  abstracts = [
    { speaker: 'Tyler Durden', event: 'ET Anniversary', session: 'R&R', date: '18/02/2025', status: 'Selected' },
    { speaker: 'Chandler Bing', event: '', session: '', date: '10/02/2025', status: 'Rejected' },
    { speaker: 'Sheldon Cooper', event: '', session: '', date: '10/02/2025', status: 'Rejected' },
    { speaker: 'George Constanza', event: '', session: '', date: '02/02/2025', status: 'Rejected' },
    { speaker: 'Joey Tribbiani', event: '', session: '', date: '10/02/2025', status: 'Rejected' }
  ];
  abstractEntity: AbstractEntity[] = [];
  md = new Metadata();
  constructor(private router: Router) {}

  async ngOnInit(){
    console.log('ManageAbstractComponent: ngOnInit');
    await this.loadEvent();
  }

  async loadEvent(){
    this.abstractEntity = await this.getAbstractEntity();
  }

  async getAbstractEntity(){
    try{
      const rv = new RunView();
      const result = await rv.RunView({
        // EntityName: 'Abstracts'
        EntityName: 'vwAbstracts'  // Calling the view instead of the entity
      })
      if(result.Success){
        return result.Results;
      }
    } catch (error){
      LogStatus('Error getting event entity:', error)
    }
    return [];
  }

  viewDetails(speaker: string) {
    this.router.navigate(['/manage-abstract-details', speaker]);
  }
}
