
import { BaseEntity, EntitySaveOptions,UserInfo } from '@memberjunction/core';
import { RegisterClass } from '@memberjunction/global';
import { EventEntity } from 'mj_generatedentities';

@RegisterClass(BaseEntity, 'Events')
export class EventEntityServer extends EventEntity {
    override async Save(options?: EntitySaveOptions): Promise<boolean> {
        const result = await super.Save(options);
        if (result) { 
           console.log('EventEntityServer Save');
        }
        return result;
    }
}