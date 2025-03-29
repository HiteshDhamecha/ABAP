import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RunView, LogStatus } from '@memberjunction/core';
import { ScoreBoardEntity, ReviewCriteriaEntity } from 'mj_generatedentities';
import { CreateCriteriaDialogComponent } from 'src/app/components/create-criteria-dialog/create-criteria-dialog.component';

@Component({
  selector: 'app-scorecard-details',
  templateUrl: './scorecard-details.component.html',
  styleUrls: ['./scorecard-details.component.css']
})
export class ScorecardDetailsComponent implements OnInit {
  scorecardId: string | null = null;
  scorecard!: ScoreBoardEntity;
  criteria: ReviewCriteriaEntity[] = [];
  totalWeightage: number = 0;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}

  async ngOnInit() {
    this.scorecardId = this.route.snapshot.paramMap.get('id');
    if (this.scorecardId) {
      await this.loadScorecardDetails();
      await this.loadCriteriaDetails();
    }
  }

  async loadScorecardDetails() {
    try {
      const rv = new RunView();
      const result = await rv.RunView<ScoreBoardEntity>({
        EntityName: 'Score Boards',
        Fields: ['ID', 'Name', 'Description', 'CutOffScore'],
        ExtraFilter: `ID = '${this.scorecardId}'`,
        MaxRows: 1
      });
      if (result.Success && result.Results.length > 0) {
        this.scorecard = result.Results[0];
      } else {
        LogStatus('Scorecard not found');
      }
    } catch (error) {
      LogStatus('Error loading scorecard details:', String(error));
    }
  }

  async loadCriteriaDetails() {
    try {
      const rv = new RunView();
      const result = await rv.RunView<ReviewCriteriaEntity>({
        EntityName: 'Review Criterias',
        Fields: ['ID', 'Name', 'Weightage', 'ScoreBoardID'],
        ExtraFilter: `ScoreBoardID = '${this.scorecardId}'`
      });
      if (result.Success) {
        this.criteria = result.Results;
        this.totalWeightage = this.criteria.reduce((sum, crit) => sum + crit.Weightage, 0);
      } else {
        LogStatus('Criteria not found');
      }
    } catch (error) {
      LogStatus('Error loading criteria details:', String(error));
    }
  }

  openCreateCriteriaDialog(): void {
    const dialogRef = this.dialog.open(CreateCriteriaDialogComponent, {
      width: '350px',
      height: 'auto',
      data: { scorecardId: this.scorecardId, totalWeightage: this.totalWeightage}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.criteria.push(result);
        this.totalWeightage += result.weightage;
      }
    });
  }
}