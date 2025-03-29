import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RunView, LogStatus } from '@memberjunction/core';
import { ScoreBoardEntity } from 'mj_generatedentities';
import { CreateScorecardDialogComponent } from 'src/app/components/create-scorecard-dialog/create-scorecard-dialog.component';

@Component({
  selector: 'app-manage-scorecard',
  templateUrl: './manage-scorecard.component.html',
  styleUrls: ['./manage-scorecard.component.css']
})
export class ManageScorecardComponent implements OnInit {
  scorecards: ScoreBoardEntity[] = [];
  private scoreboardResults: any[] = [];
  public selectedScoreboard: any;

  public displayedColumns: string[] = ['name', 'description', 'cutoffScore'];
  public scores: any[] = [];

  constructor(private router: Router, public dialog: MatDialog) {}
  
  selectScoreboard(scoreboard: any) {
    this.selectedScoreboard = scoreboard;
  }
 
  viewScoreboardDetails(scoreboard: any) {
    this.router.navigate(['/scoreboard-details', scoreboard.id]);
  }
  async ngOnInit() {
    await this.loadScoreboardDetails();
  }

  async loadScoreboardDetails() {
    this.scorecards = await this.getScoreboardEntity();
    this.scores = this.scorecards.map(sc => ({
      id: sc.ID, 
      name: sc.Name,
      description: sc.Description,
      cutoffScore: sc.CutOffScore,
    }));
  }

  async getScoreboardEntity() {
    if (this.scoreboardResults.length > 0) {
      return this.scoreboardResults;
    }
    try {
      const rv = new RunView();
      const result = await rv.RunView({
        EntityName: 'Score Boards',
      });
      if (result.Success) {
        this.scoreboardResults = result.Results;
        return result.Results;
      }
    } 
    catch (error) {
      LogStatus('Error getting Score Board entity:', String(error));
    }
    return [];
  }
  openCreateScorecardDialog(): void {
    const dialogRef = this.dialog.open(CreateScorecardDialogComponent, {
      width: '350px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.scores.push({
          name: result.name,
          description: result.description,
          cutoffScore: result.cutoffScore
        });
      }
    });
  }
}