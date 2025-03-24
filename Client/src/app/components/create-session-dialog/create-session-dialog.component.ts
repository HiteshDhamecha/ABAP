import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Metadata,LogStatus, LogError } from '@memberjunction/core';
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
    });
  }
  async ngOnInit() {
    this.sessionEntity = await this.md.GetEntityObject<SessionEntity>('Sessions');
    this.sessionForm.patchValue({
      name: this.sessionEntity.Name,
      startDate: this.sessionEntity.SessionStartDate,
      endDate: this.sessionEntity.SessionEndDate,
      title: this.sessionEntity.Title,
      abstractSubmissionStartDate: this.sessionEntity.AbstractSubmissionStartDate,
      abstractSubmissionEndDate: this.sessionEntity.AbstractSubmissionEndDate,
    });
  }
  async onSubmit() {
    if (this.sessionForm.valid) {
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
        } else {
          window.location.reload();
          this.dialogRef.close(this.sessionForm.value);
        }
      } catch (error) {
        LogStatus('Failed to save session', error);
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