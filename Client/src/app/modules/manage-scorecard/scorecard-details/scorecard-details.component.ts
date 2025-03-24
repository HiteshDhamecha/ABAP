import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RunView, LogStatus } from '@memberjunction/core';
import { ScoreBoardEntity } from 'mj_generatedentities';

@Component({
  selector: 'app-scorecard-details',
  templateUrl: './scorecard-details.component.html',
  styleUrls: ['./scorecard-details.component.css']
})
export class ScorecardDetailsComponent implements OnInit {
  scorecardId: string | null = null;
  scorecard!: ScoreBoardEntity;

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    this.scorecardId = this.route.snapshot.paramMap.get('id');
    if (this.scorecardId) {
      await this.loadScorecardDetails();
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
      LogStatus('Error loading scorecard details:', error);
    }
  }
}