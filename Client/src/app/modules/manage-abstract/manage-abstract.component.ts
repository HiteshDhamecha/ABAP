import { Component, ViewEncapsulation  } from '@angular/core';
import { Router } from '@angular/router';
import { Metadata, RunView, LogStatus, RunQuery } from '@memberjunction/core';

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
      const rv = new RunQuery();
      const result = await rv.RunQuery({
        QueryID: 'D1E2F3A4-B5C6-7890-1234-56789ABCDEF1',
        QueryName: 'Abstract Details Query'
      });

      if (result.Success) {
        this.abstracts = result.Results.map(item => ({
          speaker: item.FirstName + ' ' + item.LastName, 
          event: item.EventName,
          session: item.SessionName || '-',
          date: new Date(item.Created).toLocaleDateString(),
          status: item.AbstractStatus // Adjust based on real status property
        }));
      }
    } catch (error) {
      LogStatus('Error getting event entity:', error);
    }
  }
  getStatusClass(status: string | null | undefined): string {
    if (!status) {
      return 'pending'; // Default to Pending
    }
    switch (status.toLowerCase()) {
      case 'selected':
        return 'selected';
      case 'not selected':
        return 'rejected';
      default:
        return 'pending';
    }
  }
  
  viewDetails(speaker: string) {
    this.router.navigate(['/manage-abstract-details', speaker]);
  }
}
