import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Metadata, LogStatus, LogError } from '@memberjunction/core';
import { ReviewCriteriaEntity } from 'mj_generatedentities';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-create-criteria-dialog',
  templateUrl: './create-criteria-dialog.component.html',
  styleUrls: ['./create-criteria-dialog.component.css'],
})
export class CreateCriteriaDialogComponent implements OnInit {
  criteriaEntity!: ReviewCriteriaEntity;
  md = new Metadata();
  criteriaForm: FormGroup;
  totalWeightage: number = 0;
  scorecardId: string;
  remainingWeightage: number = 0;
  isSubmitting: boolean = false;

  async ngOnInit() {
    this.criteriaEntity = await this.md.GetEntityObject<ReviewCriteriaEntity>('Review Criterias');
    this.criteriaForm.patchValue({
      name: this.criteriaEntity.Name,
      weightage: this.criteriaEntity.Weightage,
      description: this.criteriaEntity.Description
    });
    this.remainingWeightage = 100 - this.totalWeightage;
  }

  constructor(
    public dialogRef: MatDialogRef<CreateCriteriaDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {
    this.scorecardId = data.scorecardId;
    this.totalWeightage = data.totalWeightage;
    this.criteriaForm = this.fb.group({
      name: ['', Validators.required],
      weightage: ['', [Validators.required, Validators.max(100)]],
      description: ['', Validators.required]
    });
  }

  async onSubmit() {
    const newWeightage = this.totalWeightage + this.criteriaForm.value.weightage;

    if (this.criteriaForm.valid && newWeightage <= 100) {
      this.isSubmitting = true;
      this.criteriaEntity.Name = this.criteriaForm.value.name;
      this.criteriaEntity.Weightage = this.criteriaForm.value.weightage;
      this.criteriaEntity.Description = this.criteriaForm.value.description;
      this.criteriaEntity.ScoreBoardID = this.scorecardId; // Set the scorecard ID
      // Log the criteria entity values
      console.log('Saving criteria:', this.criteriaEntity);

      // Save the criteria entity
      try {
        const saveResult: boolean = await this.criteriaEntity.Save();
        if (!saveResult) {
          LogError('Error saving criteria entity:', undefined, this.criteriaEntity.LatestResult.Message);
          this.isSubmitting = false;
        } else {
          window.location.reload();
          this.dialogRef.close(this.criteriaForm.value);       
        }
      } catch (error) {
        LogStatus('Failed to save criteria', String(error));
        this.isSubmitting = false;
      }
    } else {
      LogStatus('Form is invalid or weightage exceeds 100');
      this.showErrorPopup('Form is invalid or total weightage exceeds 100');
    }
  }
  showErrorPopup(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: message }
    });
  }
}