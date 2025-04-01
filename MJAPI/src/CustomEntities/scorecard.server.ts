import { BaseEntity, EntitySaveOptions, UserInfo } from '@memberjunction/core';
import { RegisterClass } from '@memberjunction/global';
import { ScoreBoardEntity } from 'mj_generatedentities';

@RegisterClass(BaseEntity, 'Score Boards')
export class ScoreBoardEntityServer extends ScoreBoardEntity {
    override async Save(options?: EntitySaveOptions): Promise<boolean> {
        if (await super.Save(options)) { 
         

            return await super.Save(options);
        } else {
            return false;
        }
    }
}

export function LoadCustomScoreBoard() {
}
