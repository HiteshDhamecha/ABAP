import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Metadata,LogStatus, LogError, RunView, RunViewResult } from '@memberjunction/core';
import { SessionEntity } from 'mj_generatedentities';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-create-session-dialog',
  templateUrl: './create-session-dialog.component.html',
  styleUrls: ['./create-session-dialog.component.css']
})
export class CreateSessionDialogComponent {
  sessionEntity!: SessionEntity;
  md= new Metadata();
  sessionForm: FormGroup;
  eventId: string;
  scoreboards: any[] = [];
  isSubmitting: boolean = false;
  
  constructor(
    public dialogRef: MatDialogRef<CreateSessionDialogComponent>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.eventId = data.eventId;
    this.sessionForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      title: ['', Validators.required],
      abstractSubmissionStartDate: ['', Validators.required],
      abstractSubmissionEndDate: ['', Validators.required],
      scoreboardId: ['', Validators.required],
    });
  }
  async ngOnInit() {
    this.sessionEntity = await this.md.GetEntityObject<SessionEntity>('Sessions');
    await this.loadScoreboards();
    this.sessionForm.patchValue({
      name: this.sessionEntity.Name,
      startDate: this.sessionEntity.SessionStartDate,
      endDate: this.sessionEntity.SessionEndDate,
      title: this.sessionEntity.Title,
      abstractSubmissionStartDate: this.sessionEntity.AbstractSubmissionStartDate,
      abstractSubmissionEndDate: this.sessionEntity.AbstractSubmissionEndDate,
    });
  }
  async loadScoreboards() {
    try {
      const rv = new RunView();
      const result: RunViewResult<any> = await rv.RunView<any>({
        EntityName: 'Score Boards',
        Fields: ['ID', 'Name'], // Fetch ID and Name
      });
  
      if (result.Success) {
        this.scoreboards = result.Results;
      } else {
        console.error('Failed to fetch scoreboards:', result.ErrorMessage);
      }
    } catch (error) {
      console.error('Error loading scoreboards:', error);
    }
  }
  async linkSessionToScoreboard(sessionId: string, scoreboardId: string) {
    if (!sessionId || !scoreboardId) return;
  
    try {
      const sessionScoreboard = await this.md.GetEntityObject<any>('Session Score Boards');
      sessionScoreboard.SessionId = sessionId;
      sessionScoreboard.ScoreBoardId = scoreboardId;
  
      const saveResult = await sessionScoreboard.Save();
      if (!saveResult) {
        console.error('Error saving session-scoreboard link:', sessionScoreboard.LatestResult.Message);
      } else {
        console.log('Successfully linked session to scoreboard');
      }
    } catch (error) {
      console.error('Error linking session to scoreboard:', error);
    }
  }
  
  async onSubmit() {
    if (this.sessionForm.valid) {
      this.isSubmitting = true;
      // Update the session entity with form values
      this.sessionEntity.Name = this.sessionForm.value.name;
      this.sessionEntity.SessionStartDate = this.formatTime(this.sessionForm.value.startDate);
      this.sessionEntity.SessionEndDate = this.formatTime(this.sessionForm.value.endDate);
      this.sessionEntity.Title = this.sessionForm.value.title;
      this.sessionEntity.AbstractSubmissionStartDate = this.sessionForm.value.abstractSubmissionStartDate;
      this.sessionEntity.AbstractSubmissionEndDate = this.sessionForm.value.abstractSubmissionEndDate;
      this.sessionEntity.EventID = this.eventId; // Set the event ID
      // Log the session entity values
      console.log('Saving session:', this.sessionEntity);
  
      // Save the session entity
      try {
        const saveResult: boolean = await this.sessionEntity.Save();
        if (!saveResult) {
          LogError('Error saving session entity:', undefined, this.sessionEntity.LatestResult.Message);
          this.isSubmitting = false;
        } else {
          await this.linkSessionToScoreboard(this.sessionEntity.ID, this.sessionForm.value.scoreboardId);
          window.location.reload();
          this.dialogRef.close(this.sessionForm.value);
        }
      } catch (error) {
        LogStatus('Failed to save session', String(error));
        this.isSubmitting = false;
      }
    } else {
      LogStatus('Form is invalid');
    }
  }
  private formatTime(time: string): Date {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(0);
    date.setMilliseconds(0);
    // Adjust for timezone offset
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - timezoneOffset);
  }
}