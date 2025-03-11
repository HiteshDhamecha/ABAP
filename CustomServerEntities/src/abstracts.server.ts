
import { BaseEntity, EntitySaveOptions, LogError, Metadata, RunView } from '@memberjunction/core';
import { RegisterClass } from '@memberjunction/global';
import { AbstractEntity } from 'mj_generatedentities';


@RegisterClass(BaseEntity, 'Abstracts')
export class AbstractEntityServer extends AbstractEntity {
    override async Save(options?: EntitySaveOptions): Promise<boolean> {
        if (await super.Save(options)) { 

            // Get User details by using Runview
            const rv = new RunView();
            const user = await rv.RunView({
                EntityName: 'Users'
            }, this.ContextCurrentUser);


                const userEmail = user.Results[0].Email;
                if (!userEmail) {
                    LogError('User email is null');
                    return false;
                }

                  
                return await super.Save(options);
        }
        else 
            return false;
    }
}