
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
                // const result = await sendEmailNotification(this.ContextCurrentUser.Email);
                // if (!result) {    
                //     LogError('Error occurred while trying to send n email notification');                   
                // }   
            return true;
        }
        else 
            return false;
    }
}