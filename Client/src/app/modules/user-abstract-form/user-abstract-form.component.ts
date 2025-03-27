import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Metadata, RunView, RunViewResult } from '@memberjunction/core';
import { Session } from 'inspector/promises';
import { AbstractEntity, SessionEntity, UserPersonalDetailsEntity } from 'mj_generatedentities';
import { AzureBlobService } from 'src/app/service/azure-blob.service';
import { UserService } from 'src/app/service/user.service';

interface AbstractDetails {
  firstName: string;
  lastName: string;
  email: string;
  affiliation: string;
  jobTitle: string;
  phoneNumber: string;
  socialLinks: string;
  speakingExperiences: string;
  topic: string;
  summary: string;
  uploadUrl: string;
}

@Component({
  selector: 'user-abstract-form',
  templateUrl: './user-abstract-form.component.html',
  styleUrls: ['./user-abstract-form.component.css']
})
export class UserAbstractFormComponent implements OnInit {
  sessionDetails: any;
  abstractDetails: AbstractDetails = {
    firstName: '',
    lastName: '',
    email: '',
    affiliation: '',
    jobTitle: '',
    phoneNumber: '',
    socialLinks: '',
    speakingExperiences: '',
    topic: '',
    summary: '',
    uploadUrl: '',
  };
  uploadedFile: File = null;
  currentUser: any;
  md = new Metadata();
  submittingForm: boolean = false;
  eventID: string;

  constructor(private router: Router, private route: ActivatedRoute, private user: UserService, private azureBlob: AzureBlobService,private cd:ChangeDetectorRef) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      let event = params.get('event');
      let session = params.get('session');
      console.log("🔹 Session from URL:", session);

      if (session) {
        // Decode and remove duplicates
        let decodedSessionID = decodeURIComponent(session).trim();
        let cleanedSessionID = [...new Set(decodedSessionID.split(' '))].join(' ');

        console.log("🔹 Decoded Session ID (Cleaned):", cleanedSessionID);

        await this.loadSessionDetails(cleanedSessionID);
        this.cd.detectChanges();
      }
      if (event) {
        // Decode and remove duplicates
        let decodedEventID = decodeURIComponent(event).trim();
        let cleanedEventID = [...new Set(decodedEventID.split(' '))].join(' ');

        console.log("🔹 Decoded Event ID (Cleaned):", cleanedEventID);

        this.eventID = cleanedEventID;
      }
    });
    this.currentUser = this.user.getUserInfo();
    this.abstractDetails = {
      ...this.abstractDetails,
      firstName: this.currentUser.FirstName,
      lastName: this.currentUser.LastName,
      email: this.currentUser.Email
    };
  };

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedFile = input.files[0];
      console.log("🔹 File Selected:", this.uploadedFile);
    }
  };

  removeFile(): void {
    this.uploadedFile = null;
  };

  async loadSessionDetails(sessionID: string) {
    try {
      console.log("Fetching Session Details...");
      const rv = new RunView();
      const result: RunViewResult<SessionEntity> = await rv.RunView<SessionEntity>({
        EntityName: 'Sessions',
        ExtraFilter:`ID='${sessionID}'`,
        MaxRows: 1,
      });

      console.log("API Response:", result.Results[0]);

      if (result.Success) {
        this.sessionDetails = result.Results[0];
        this.abstractDetails.topic = this.sessionDetails.Title;
      } else {
        console.log("⚠️ API Call Failed.", result.ErrorMessage);
      }
    } catch (error) {
      console.error("❌ Error fetching abstract details:", error);
    }
  }

  async submitAbstract() {
    //proceed to submit the form
    this.submittingForm = true;
    console.log('Submit Clicked', this.abstractDetails);
    const abstractEntity = await this.md.GetEntityObject<AbstractEntity>('Abstracts');
    const userPersonalDetailsEntity = await this.md.GetEntityObject<UserPersonalDetailsEntity>('User Personal Details');
    abstractEntity.SessionID = this.sessionDetails.ID;
    abstractEntity.UserID = this.currentUser.ID;
    abstractEntity.AbstractText = this.abstractDetails.summary;
    abstractEntity.FileName = this.uploadedFile?.name;
    userPersonalDetailsEntity.Affiliation = this.abstractDetails.affiliation;
    userPersonalDetailsEntity.JobTitle = this.abstractDetails.jobTitle;
    userPersonalDetailsEntity.PhoneNumber = this.abstractDetails.phoneNumber;
    userPersonalDetailsEntity.SocialMediaLinks = this.abstractDetails.socialLinks;
    userPersonalDetailsEntity.PreviousSpeakingExperiences = this.abstractDetails.speakingExperiences;
    await userPersonalDetailsEntity.Save();
    this.abstractDetails.uploadUrl = await this.azureBlob.uploadFile(this.uploadedFile);
    if (this.abstractDetails.uploadUrl !== '') {
      abstractEntity.UploadUrl = this.abstractDetails.uploadUrl;
      console.log('Abstract Entity: ', abstractEntity);
      console.log('Abstract Entity Url: ', this.abstractDetails.uploadUrl);
      if(await abstractEntity.Save()){
        alert('Abstract form submitted!');
        this.submittingForm = false;
        this.router.navigate(['view-details', this.eventID]);
      }else{
        alert('Abstract form Not Submitted!');
      }
    };

  };

  formatSessionTime(startDate: Date, endDate: Date): string {
    if (!startDate) return 'TBD';

    const start = new Date(startDate);
    let timeStr = start.toLocaleDateString() + ' ' +
      start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (endDate) {
      const end = new Date(endDate);
      timeStr += ' - ' + end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    return timeStr;
  }
}
