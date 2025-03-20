import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Metadata, RunView } from '@memberjunction/core';
import { AbstractEntity } from 'mj_generatedentities';
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

  constructor(private route: ActivatedRoute, private user: UserService) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      let session = params.get('session');
      console.log("🔹 Session from URL:", session);

      if (session) {
        // Decode and remove duplicates
        let decodedSessionID = decodeURIComponent(session).trim();
        let cleanedSessionID = [...new Set(decodedSessionID.split(' '))].join(' ');

        console.log("🔹 Decoded Speaker Name (Cleaned):", cleanedSessionID);

        await this.loadSessionDetails(cleanedSessionID);
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
      console.log("🔹 Fetching Session Details...");
      const rv = new RunView();
      const result = await rv.RunView({
        EntityName: 'Sessions',
        MaxRows: 1,
      });

      console.log("🔹 API Response:", result.Results[0]);

      if (result.Success) {
        this.sessionDetails = result.Results[0];
        this.abstractDetails.topic = this.sessionDetails.Title;
      } else {
        console.log("⚠️ API Call Failed.");
      }
    } catch (error) {
      console.error("❌ Error fetching abstract details:", error);
    }
  }

  async submitAbstract() {
    console.log('Submit Clicked', this.abstractDetails);
    const abstractEntity = await this.md.GetEntityObject<AbstractEntity>('Abstracts');
    abstractEntity.SessionID = this.sessionDetails.ID;
    abstractEntity.UserID = this.currentUser.ID;
    abstractEntity.AbstractText = this.abstractDetails.summary;
    await abstractEntity.Save();
    alert(`Abstract Submitted with the following details: ${JSON.stringify({...this.abstractDetails, uploadedFile: this.uploadedFile})}`);
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
