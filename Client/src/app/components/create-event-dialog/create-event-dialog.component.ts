import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEntity } from 'mj_generatedentities';
import { Metadata, LogStatus, LogError } from '@memberjunction/core';

@Component({
  selector: 'app-create-event-dialog',
  templateUrl: './create-event-dialog.component.html',
  styleUrls: ['./create-event-dialog.component.css'],
})
export class CreateEventDialogComponent implements OnInit {
  eventEntity!: EventEntity;
  md = new Metadata();
  eventForm: FormGroup;

  async ngOnInit() {
    this.eventEntity = await this.md.GetEntityObject<EventEntity>('Events');
    this.eventForm.patchValue({
      name: this.eventEntity.Name,
      startDate: this.eventEntity.EventStartDate,
      endDate: this.eventEntity.EventEndDate,
      description: this.eventEntity.Description
    });
  }

  constructor(
    public dialogRef: MatDialogRef<CreateEventDialogComponent>,
    private fb: FormBuilder
  ) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.eventForm.valid) {
      // Update the event entity with form values
      this.eventEntity.Name = this.eventForm.value.name;
      this.eventEntity.EventStartDate = this.eventForm.value.startDate;
      this.eventEntity.EventEndDate = this.eventForm.value.endDate;
      this.eventEntity.Description = this.eventForm.value.description;

      // Log the event entity values
      console.log('Saving event:', this.eventEntity);

      // Save the event entity
      try {
        const saveResult: boolean = await this.eventEntity.Save();
        if (!saveResult) {
          LogError('Error saving event entity:', undefined, this.eventEntity.LatestResult.Message);
          alert(`Failed to save event: ${this.eventEntity.LatestResult.Message}`);
        } else {
          alert("Event Added");
          //refresh the page
          window.location.reload();
          this.dialogRef.close(this.eventForm.value);
        
        }
      } catch (error) {
        LogError('Error saving event:', error);
        LogStatus('Failed to save event');
        alert("Failed to save event");
      }
    } else {
      alert("Form is invalid");
    }
  }
}