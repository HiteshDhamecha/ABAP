import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogStatus, Metadata, RunView, RunViewResult } from '@memberjunction/core';
import { SessionEntity, SessionEntityType } from 'mj_generatedentities';

@Component({
  selector: 'app-session-details',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.css']
})
export class SessionDetailsComponent implements OnInit {
  sessionId: string | null = null;
  session!: SessionEntity;
  sessionForm: FormGroup;
  md = new Metadata();

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.sessionForm = this.fb.group({
      name: ['', Validators.required],
      sessionTime: ['', Validators.required],
      title: ['', Validators.required],
      abstractSubmissionStartDate: ['', Validators.required],
      abstractSubmissionEndDate: ['', Validators.required]
    });
  }

  async ngOnInit() {
    this.sessionId = this.route.snapshot.paramMap.get('id');
    console.log('Session ID:', this.sessionId); // Log the session ID

    if (this.sessionId) {
      await this.loadSessionDetails();
    }
  }

  async getSessionEntity(eventId: string): Promise<SessionEntity | null> {
    try {
      const rv = new RunView();
      const result: RunViewResult<SessionEntity> = await rv.RunView<SessionEntity>({
        EntityName: 'Sessions',
        Fields: ['ID', 'EventID', 'Name', 'SessionStartDate', 'SessionEndDate', 'Title', 'AbstractSubmissionStartDate', 'AbstractSubmissionEndDate','UserPrompt','UserPrompt1'],
        ExtraFilter: `ID = '${this.sessionId}'`,
        MaxRows: 1
      });
      console.log('RunView result:', result); // Log the result of RunView
      return result.Success && result.Results.length > 0 ? result.Results[0] : null;
    } catch (error) {
      LogStatus(error);
      return null;
    }
  }
  
  async loadSessionDetails() {
    console.log('Loading session details...'); // Log the start of the method
    const sessionEntities = this.sessionId ? await this.getSessionEntity(this.sessionId) : null;
    if (sessionEntities) {
      this.session = sessionEntities;
      this.sessionForm.patchValue({
        name: this.session.Name,
        sessionTime: this.session.SessionStartDate,
        title: this.session.Title,
        abstractSubmissionStartDate: this.session.AbstractSubmissionStartDate,
        abstractSubmissionEndDate: this.session.AbstractSubmissionEndDate
      });
      console.log('Loaded session:', this.session); // Log the loaded session
    } else {
      console.error('Session not found');
    }

  }
}