
import { BaseEntity, EntitySaveOptions } from '@memberjunction/core';
import { RegisterClass } from '@memberjunction/global';
import { AbstractEntity } from 'mj_generatedentities';
import { sendEmailNotification } from './utility/emailNotificationUtility';
import { processAbstract } from './abstarctReview';

@RegisterClass(BaseEntity, 'Abstracts')
export class AbstractEntityServer extends AbstractEntity {
    override async Save(options?: EntitySaveOptions): Promise<boolean> {
        if (await super.Save(options)) { 
            const abstarctText =this.AbstractText

            // Review abstract
             await processAbstract(abstarctText,this.SessionID,this.ContextCurrentUser,this.ID);  
            return true;
        }
        else 
            return false;
    }
}

export function LoadCustomAbstract() {
}