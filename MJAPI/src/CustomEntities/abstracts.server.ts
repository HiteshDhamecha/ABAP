
import { BaseEntity, EntitySaveOptions } from '@memberjunction/core';
import { RegisterClass } from '@memberjunction/global';
import { AbstractEntity } from 'mj_generatedentities';
import { processAbstract } from './abstarctReview';
import { sendEmail } from './utility/sendEmail';
import * as path from "path";
import { extractTextFromBlob } from './utility/contentExtraxtUtility';

@RegisterClass(BaseEntity, 'Abstracts')
export class AbstractEntityServer extends AbstractEntity {
    override async Save(options?: EntitySaveOptions): Promise<boolean> {
        if (await super.Save(options)) { 
            const filePath = this.UploadUrl;    
            const fileName = path.basename(filePath);
            let abstarctText = "";
            abstarctText = await extractTextFromBlob(fileName);
          

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