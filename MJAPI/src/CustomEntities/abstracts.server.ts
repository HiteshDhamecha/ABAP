
import { BaseEntity, EntitySaveOptions } from '@memberjunction/core';
import { RegisterClass } from '@memberjunction/global';
import { AbstractEntity } from 'mj_generatedentities';
import { processAbstract } from './abstarctReview';
import { sendEmail } from './utility/sendEmail';

@RegisterClass(BaseEntity, 'Abstracts')
export class AbstractEntityServer extends AbstractEntity {
    override async Save(options?: EntitySaveOptions): Promise<boolean> {
        if (await super.Save(options)) { 
            const abstarctText =this.AbstractText

            // Review abstract
            sendEmail(this.ContextCurrentUser.Email, "Abstract Submitted", "Your abstract has been submitted successfully");
             await processAbstract(abstarctText,this.SessionID,this.ContextCurrentUser,this.ID);  
            return true;
        }
        else 
            return false;
    }
}

export function LoadCustomAbstract() {
}