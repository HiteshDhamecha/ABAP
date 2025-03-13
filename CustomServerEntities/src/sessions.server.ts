
import { BaseEntity, EntitySaveOptions,UserInfo } from '@memberjunction/core';
import { RegisterClass } from '@memberjunction/global';
import { SessionEntity } from 'mj_generatedentities';
import { getCutOffScore, getCritearea } from './abstarctReview';

@RegisterClass(BaseEntity, 'Abstracts')
export class AbstractEntityServer extends SessionEntity {
    override async Save(options?: EntitySaveOptions): Promise<boolean> {
        if (await super.Save(options)) { 
           const user:UserInfo = this.ContextCurrentUser;
            const criteria = await getCritearea(this.ID, user);
            if (!criteria) {
              console.error("Failed to retrieve criteria");
              return;
            }

            // Create cut-off score
            const cutOffScore = await getCutOffScore(user, this.Title,criteria);
            if (!cutOffScore) {
              console.error("Failed to retrieve cut-off score");
              return;
            }
            //console.log(cutOffScore.cutOffScore);
            //console.log(cutOffScore.reasoning);
            this.WeightedScore = cutOffScore.cutOffScore;

            return await super.Save(options);
        }
        else 
            return false;
    }
}