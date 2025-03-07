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
  abstracts: any[] = []; // Replacing hardcoded values with dynamic data
  md = new Metadata();

  constructor(private router: Router) {}

  async ngOnInit() {
    console.log('ManageAbstractComponent: ngOnInit');
    await this.loadEvent();
  }

  async loadEvent() {
    try {
      const rv = new RunView();
      const result = await rv.RunView({
        EntityName: 'Abstracts' 
      });

      if (result.Success) {
        this.abstracts = result.Results.map(item => ({
          speaker: item.FirstName + ' ' + item.LastName, 
          event: item.EventName,
          session: item.Session || '-',
          date: new Date(item.EventStartDate).toLocaleDateString(),
          status: 'Selected' // Adjust based on real status property
        }));
      }
    } catch (error) {
      LogStatus('Error getting event entity:', error);
    }
  }

  viewDetails(speaker: string) {
    this.router.navigate(['/manage-abstract-details', speaker]);
  }
}
