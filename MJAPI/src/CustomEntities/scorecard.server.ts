import { BaseEntity, EntitySaveOptions, UserInfo } from '@memberjunction/core';
import { RegisterClass } from '@memberjunction/global';
import { ScoreBoardEntity } from 'mj_generatedentities';
import { getCutOffScore, getCritearea, getSessionDetails } from './abstarctReview';

@RegisterClass(BaseEntity, 'Score Boards')
export class ScoreBoardEntityServer extends ScoreBoardEntity {
    override async Save(options?: EntitySaveOptions): Promise<boolean> {
        if (await super.Save(options)) { 
            const user: UserInfo = this.ContextCurrentUser;
            const criteria = await getCritearea(this.ID, user);
            if (!criteria) {
                console.error("Failed to retrieve criteria");
                return false;
            }

            const sessionDetails = await getSessionDetails(user,this.ID);
            if (!sessionDetails) {
                console.error("Failed to retrieve session details");
                return false;
            }

            // Create cut-off score
            const cutOffScore = await getCutOffScore(user, sessionDetails.ID, sessionDetails.title, criteria);
            if (!cutOffScore) {
                console.error("Failed to retrieve cut-off score");
                return false;
            }

            this.CutOffScore = cutOffScore.cutOffScore;
            console.log("###############################################################");
            console.log('Cut-off Score : ',cutOffScore.cutOffScore)
            console.log('Reasoning for Cut-off score : ', cutOffScore.reasoning);
            console.log("###############################################################");

            return await super.Save(options);
        } else {
            return false;
        }
    }
}

export function LoadCustomScoreBoard() {
}