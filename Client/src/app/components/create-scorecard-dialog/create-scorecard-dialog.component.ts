import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScoreBoardEntity } from 'mj_generatedentities';
import { Metadata, LogStatus, LogError } from '@memberjunction/core';

@Component({
  selector: 'app-create-scorecard-dialog',
  templateUrl: './create-scorecard-dialog.component.html',
  styleUrls: ['./create-scorecard-dialog.component.css'],
})
export class CreateScorecardDialogComponent implements OnInit {
  scorecardEntity!: ScoreBoardEntity;
  md = new Metadata();
  scorecardForm: FormGroup;
  isSubmitting: boolean = false;

  async ngOnInit() {
    this.scorecardEntity = await this.md.GetEntityObject<ScoreBoardEntity>('Score Boards');
    this.scorecardForm.patchValue({
      name: this.scorecardEntity.Name,
      description: this.scorecardEntity.Description
    });
  }

  constructor(
    public dialogRef: MatDialogRef<CreateScorecardDialogComponent>,
    private fb: FormBuilder
  ) {
    this.scorecardForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.scorecardForm.valid) {
      this.isSubmitting= true;
      // Update the scorecard entity with form values
      this.scorecardEntity.Name = this.scorecardForm.value.name;
      this.scorecardEntity.Description = this.scorecardForm.value.description;

      // Log the scorecard entity values
      console.log('Saving scorecard:', this.scorecardEntity);

      // Save the scorecard entity
      try {
        const saveResult: boolean = await this.scorecardEntity.Save();
        if (!saveResult) {
          LogError('Error saving scorecard entity:', undefined, this.scorecardEntity.LatestResult.Message);
          this.isSubmitting = false;
        } else {
          window.location.reload();
          this.dialogRef.close(this.scorecardForm.value);       
        }
      } catch (error) {
        LogStatus('Failed to save scorecard', error);
        this.isSubmitting= false;
      }
    } else {
      LogStatus('Form is invalid');
    }
  }
}