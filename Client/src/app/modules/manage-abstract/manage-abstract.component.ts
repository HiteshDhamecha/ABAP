import { Component, ViewEncapsulation  } from '@angular/core';

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
}
