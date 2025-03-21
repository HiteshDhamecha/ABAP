import { Component, ViewEncapsulation  } from '@angular/core';
import { Router } from '@angular/router';
import { Metadata, RunView, LogStatus, RunQuery } from '@memberjunction/core';
// import { AbstractEntity } from 'mj_generatedentities';

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

  // async loadEvent() {
  //   try {
  //     const rv = new RunView();
  
  //     // Step 1: Fetch Abstract Data
  //     const abstractResult = await rv.RunView({
  //       EntityName: 'Abstracts',
  //       Fields: ['ID', 'SessionID', 'UserID', 'YearOfExp', 'AbstractText', 'UploadUrl', '__mj_CreatedAt']
  //     });
  
  //     if (abstractResult.Success) {
  //       const abstracts = abstractResult.Results;
  
  //       // Fetch additional details concurrently
  //       const enrichedAbstracts = await Promise.all(
  //         abstracts.map(async (abstract) => {
  //           const sessionInfo = await this.getSessionInfo(abstract.SessionID);
  //           const eventInfo = sessionInfo ? await this.getEventInfo(sessionInfo.EventID) : null;
  //           const userInfo = await this.getUserInfo(abstract.UserID);
  //           const abstractResults = await this.getAbstractResults(abstract.ID);
  //           const abstractStatus = await this.getAbstractStatus(abstractResults.map(ar => ar.SessionID));
  
  //           return {
  //             ...abstract,
  //             sessionInfo,
  //             eventInfo,
  //             userInfo,
  //             abstractResults,
  //             abstractStatus
  //           };
  //         })
  //       );
  
  //       this.abstracts = enrichedAbstracts;
  //       console.log('Final Data:', this.abstracts);
  //     }
  //   } catch (error) {
  //     LogStatus('Error getting abstract data:', error);
  //   }
  // }

  // async getSessionInfo(sessionID: string) {
  //   if (!sessionID) return null;
  //   const rv = new RunView();
  //   const result = await rv.RunView({
  //     EntityName: 'Sessions',
  //     Fields: ['ID', 'EventID', 'Name'],
  //     ExtraFilter: `ID = '${sessionID}'`
  //   });
  
  //   return result.Success && result.Results.length > 0 ? result.Results[0] : null;
  // }

  // async getEventInfo(eventID: string) {
  //   if (!eventID) return null;
  //   const rv = new RunView();
  //   const result = await rv.RunView({
  //     EntityName: 'Events',
  //     Fields: ['Name'],
  //     ExtraFilter: `ID = '${eventID}'`
  //   });
  
  //   return result.Success && result.Results.length > 0 ? result.Results[0] : null;
  // }

  // async getUserInfo(userID: string) {
  //   if (!userID) return null;
  //   const rv = new RunView();
  //   const result = await rv.RunView({
  //     EntityName: 'Users',
  //     Fields: ['ID', 'FirstName', 'LastName', 'Email'],
  //     ExtraFilter: `ID = '${userID}'`
  //   });
  
  //   return result.Success && result.Results.length > 0 ? result.Results[0] : null;
  // }

  // async getAbstractResults(abstractID: string) {
  //   if (!abstractID) return [];
  //   const rv = new RunView();
  //   const result = await rv.RunView({
  //     EntityName: 'Abstract Results',
  //     Fields: ['AbstractStatusId'],
  //     ExtraFilter: `AbstractID = '${abstractID}'`
  //   });
  
  //   return result.Success ? result.Results : [];
  // }

  // async getAbstractStatus(sessionIDs: string[]) {
  //   if (!sessionIDs.length) return [];
  //   const rv = new RunView();
  //   const result = await rv.RunView({
  //     EntityName: 'Abstract Status',
  //     Fields: ['ID', 'Name'],
  //     ExtraFilter: `SessionID IN (${sessionIDs.map(id => `'${id}'`).join(', ')})`
  //   });
  
  //   return result.Success ? result.Results : [];
  // }


  viewDetails(speaker: string) {
    this.router.navigate(['/manage-abstract-details', speaker]);
  }
}
