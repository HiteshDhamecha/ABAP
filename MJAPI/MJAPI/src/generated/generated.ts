/********************************************************************************
* ALL ENTITIES - TypeGraphQL Type Class Definition - AUTO GENERATED FILE
* Generated Entities and Resolvers for Server
*
*   >>> DO NOT MODIFY THIS FILE!!!!!!!!!!!!
*   >>> YOUR CHANGES WILL BE OVERWRITTEN
*   >>> THE NEXT TIME THIS FILE IS GENERATED
*
**********************************************************************************/
import { Arg, Ctx, Int, Query, Resolver, Field, Float, ObjectType, FieldResolver, Root, InputType, Mutation,
            PubSub, PubSubEngine, ResolverBase, RunViewByIDInput, RunViewByNameInput, RunDynamicViewInput,
            AppContext, KeyValuePairInput, DeleteOptionsInput, GraphQLTimestamp as Timestamp,
            GetReadOnlyDataSource, GetReadWriteDataSource } from '@memberjunction/server';
import { Metadata, EntityPermissionType, CompositeKey } from '@memberjunction/core'

import { MaxLength } from 'class-validator';
import { DataSource } from 'typeorm';
import * as mj_core_schema_server_object_types from '@memberjunction/server'


import { AbstractStatusEntity, EmailTemplateEntity, AbstractResultEntity, ScoreBoardEntity, EventEntity, SessionScoreBoardEntity, SessionEntity, AbstractStagingEntity, AbstractLogsEntity, AbstractEntity } from 'mj_generatedentities';
    

//****************************************************************************
// ENTITY CLASS for Abstract Status
//****************************************************************************
@ObjectType()
export class AbstractStatus_ {
    @Field() 
    @MaxLength(16)
    ID: string;
        
    @Field() 
    @MaxLength(510)
    Name: string;
        
    @Field() 
    @MaxLength(10)
    _mj__CreatedAt: Date;
        
    @Field() 
    @MaxLength(10)
    _mj__UpdatedAt: Date;
        
    @Field(() => [AbstractResult_])
    AbstractResults_AbstractStatusIdArray: AbstractResult_[]; // Link to AbstractResults
    
}

//****************************************************************************
// INPUT TYPE for Abstract Status
//****************************************************************************
@InputType()
export class CreateAbstractStatusInput {
    @Field({ nullable: true })
    Name?: string;
}
    

//****************************************************************************
// INPUT TYPE for Abstract Status
//****************************************************************************
@InputType()
export class UpdateAbstractStatusInput {
    @Field()
    ID: string;

    @Field({ nullable: true })
    Name?: string;

    @Field(() => [KeyValuePairInput], { nullable: true })
    OldValues___?: KeyValuePairInput[];
}
    
//****************************************************************************
// RESOLVER for Abstract Status
//****************************************************************************
@ObjectType()
export class RunAbstractStatusViewResult {
    @Field(() => [AbstractStatus_])
    Results: AbstractStatus_[];

    @Field(() => String, {nullable: true})
    UserViewRunID?: string;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(AbstractStatus_)
export class AbstractStatusResolver extends ResolverBase {
    @Query(() => RunAbstractStatusViewResult)
    async RunAbstractStatusViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAbstractStatusViewResult)
    async RunAbstractStatusViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAbstractStatusViewResult)
    async RunAbstractStatusDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        input.EntityName = 'Abstract Status';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }
    @Query(() => AbstractStatus_, { nullable: true })
    async AbstractStatus(@Arg('ID', () => String) ID: string, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<AbstractStatus_ | null> {
        this.CheckUserReadPermissions('Abstract Status', userPayload);
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        const sSQL = `SELECT * FROM [dbo].[vwAbstractStatus] WHERE [ID]='${ID}' ` + this.getRowLevelSecurityWhereClause('Abstract Status', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.MapFieldNamesToCodeNames('Abstract Status', await dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {}))
        return result;
    }
    
    @FieldResolver(() => [AbstractResult_])
    async AbstractResults_AbstractStatusIdArray(@Root() abstractstatus_: AbstractStatus_, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Abstract Results', userPayload);
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        const sSQL = `SELECT * FROM [dbo].[vwAbstractResults] WHERE [AbstractStatusId]='${abstractstatus_.ID}' ` + this.getRowLevelSecurityWhereClause('Abstract Results', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.ArrayMapFieldNamesToCodeNames('Abstract Results', await dataSource.query(sSQL));
        return result;
    }
        
    @Mutation(() => AbstractStatus_)
    async CreateAbstractStatus(
        @Arg('input', () => CreateAbstractStatusInput) input: CreateAbstractStatusInput,
        @Ctx() { dataSources, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        const dataSource = GetReadWriteDataSource(dataSources);
        return this.CreateRecord('Abstract Status', input, dataSource, userPayload, pubSub)
    }
        
    @Mutation(() => AbstractStatus_)
    async UpdateAbstractStatus(
        @Arg('input', () => UpdateAbstractStatusInput) input: UpdateAbstractStatusInput,
        @Ctx() { dataSources, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        const dataSource = GetReadWriteDataSource(dataSources);
        return this.UpdateRecord('Abstract Status', input, dataSource, userPayload, pubSub);
    }
    
    @Mutation(() => AbstractStatus_)
    async DeleteAbstractStatus(@Arg('ID', () => String) ID: string, @Arg('options___', () => DeleteOptionsInput) options: DeleteOptionsInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadWriteDataSource(dataSources);
        const key = new CompositeKey([{FieldName: 'ID', Value: ID}]);
        return this.DeleteRecord('Abstract Status', key, options, dataSource, userPayload, pubSub);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Email Templates
//****************************************************************************
@ObjectType()
export class EmailTemplate_ {
    @Field() 
    @MaxLength(16)
    ID: string;
        
    @Field() 
    @MaxLength(510)
    Subject: string;
        
    @Field() 
    Body: string;
        
    @Field({nullable: true}) 
    @MaxLength(8)
    CreatedAt?: Date;
        
    @Field() 
    @MaxLength(10)
    _mj__CreatedAt: Date;
        
    @Field() 
    @MaxLength(10)
    _mj__UpdatedAt: Date;
        
}

//****************************************************************************
// INPUT TYPE for Email Templates
//****************************************************************************
@InputType()
export class CreateEmailTemplateInput {
    @Field({ nullable: true })
    Subject?: string;

    @Field({ nullable: true })
    Body?: string;

    @Field({ nullable: true })
    CreatedAt?: Date | null;
}
    

//****************************************************************************
// INPUT TYPE for Email Templates
//****************************************************************************
@InputType()
export class UpdateEmailTemplateInput {
    @Field()
    ID: string;

    @Field({ nullable: true })
    Subject?: string;

    @Field({ nullable: true })
    Body?: string;

    @Field({ nullable: true })
    CreatedAt?: Date | null;

    @Field(() => [KeyValuePairInput], { nullable: true })
    OldValues___?: KeyValuePairInput[];
}
    
//****************************************************************************
// RESOLVER for Email Templates
//****************************************************************************
@ObjectType()
export class RunEmailTemplateViewResult {
    @Field(() => [EmailTemplate_])
    Results: EmailTemplate_[];

    @Field(() => String, {nullable: true})
    UserViewRunID?: string;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(EmailTemplate_)
export class EmailTemplateResolver extends ResolverBase {
    @Query(() => RunEmailTemplateViewResult)
    async RunEmailTemplateViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunEmailTemplateViewResult)
    async RunEmailTemplateViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunEmailTemplateViewResult)
    async RunEmailTemplateDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        input.EntityName = 'Email Templates';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }
    @Query(() => EmailTemplate_, { nullable: true })
    async EmailTemplate(@Arg('ID', () => String) ID: string, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<EmailTemplate_ | null> {
        this.CheckUserReadPermissions('Email Templates', userPayload);
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        const sSQL = `SELECT * FROM [dbo].[vwEmailTemplates] WHERE [ID]='${ID}' ` + this.getRowLevelSecurityWhereClause('Email Templates', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.MapFieldNamesToCodeNames('Email Templates', await dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {}))
        return result;
    }
    
    @Mutation(() => EmailTemplate_)
    async CreateEmailTemplate(
        @Arg('input', () => CreateEmailTemplateInput) input: CreateEmailTemplateInput,
        @Ctx() { dataSources, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        const dataSource = GetReadWriteDataSource(dataSources);
        return this.CreateRecord('Email Templates', input, dataSource, userPayload, pubSub)
    }
        
    @Mutation(() => EmailTemplate_)
    async UpdateEmailTemplate(
        @Arg('input', () => UpdateEmailTemplateInput) input: UpdateEmailTemplateInput,
        @Ctx() { dataSources, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        const dataSource = GetReadWriteDataSource(dataSources);
        return this.UpdateRecord('Email Templates', input, dataSource, userPayload, pubSub);
    }
    
    @Mutation(() => EmailTemplate_)
    async DeleteEmailTemplate(@Arg('ID', () => String) ID: string, @Arg('options___', () => DeleteOptionsInput) options: DeleteOptionsInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadWriteDataSource(dataSources);
        const key = new CompositeKey([{FieldName: 'ID', Value: ID}]);
        return this.DeleteRecord('Email Templates', key, options, dataSource, userPayload, pubSub);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Abstract Results
//****************************************************************************
@ObjectType()
export class AbstractResult_ {
    @Field() 
    @MaxLength(16)
    ID: string;
        
    @Field() 
    @MaxLength(16)
    AbstractID: string;
        
    @Field(() => Float, {nullable: true}) 
    Score?: number;
        
    @Field() 
    @MaxLength(16)
    AbstractStatusId: string;
        
    @Field() 
    @MaxLength(10)
    _mj__CreatedAt: Date;
        
    @Field() 
    @MaxLength(10)
    _mj__UpdatedAt: Date;
        
    @Field({nullable: true}) 
    ReviewComments?: string;
        
    @Field() 
    @MaxLength(510)
    AbstractStatusId_Virtual: string;
        
    @Field(() => [AbstractLogs_])
    AbstractLogs_AbstractResultIdArray: AbstractLogs_[]; // Link to AbstractLogs
    
}

//****************************************************************************
// INPUT TYPE for Abstract Results
//****************************************************************************
@InputType()
export class CreateAbstractResultInput {
    @Field({ nullable: true })
    AbstractID?: string;

    @Field(() => Float, { nullable: true })
    Score: number | null;

    @Field({ nullable: true })
    AbstractStatusId?: string;

    @Field({ nullable: true })
    ReviewComments: string | null;
}
    

//****************************************************************************
// INPUT TYPE for Abstract Results
//****************************************************************************
@InputType()
export class UpdateAbstractResultInput {
    @Field()
    ID: string;

    @Field({ nullable: true })
    AbstractID?: string;

    @Field(() => Float, { nullable: true })
    Score?: number | null;

    @Field({ nullable: true })
    AbstractStatusId?: string;

    @Field({ nullable: true })
    ReviewComments?: string | null;

    @Field(() => [KeyValuePairInput], { nullable: true })
    OldValues___?: KeyValuePairInput[];
}
    
//****************************************************************************
// RESOLVER for Abstract Results
//****************************************************************************
@ObjectType()
export class RunAbstractResultViewResult {
    @Field(() => [AbstractResult_])
    Results: AbstractResult_[];

    @Field(() => String, {nullable: true})
    UserViewRunID?: string;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(AbstractResult_)
export class AbstractResultResolver extends ResolverBase {
    @Query(() => RunAbstractResultViewResult)
    async RunAbstractResultViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAbstractResultViewResult)
    async RunAbstractResultViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAbstractResultViewResult)
    async RunAbstractResultDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        input.EntityName = 'Abstract Results';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }
    @Query(() => AbstractResult_, { nullable: true })
    async AbstractResult(@Arg('ID', () => String) ID: string, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<AbstractResult_ | null> {
        this.CheckUserReadPermissions('Abstract Results', userPayload);
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        const sSQL = `SELECT * FROM [dbo].[vwAbstractResults] WHERE [ID]='${ID}' ` + this.getRowLevelSecurityWhereClause('Abstract Results', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.MapFieldNamesToCodeNames('Abstract Results', await dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {}))
        return result;
    }
    
    @FieldResolver(() => [AbstractLogs_])
    async AbstractLogs_AbstractResultIdArray(@Root() abstractresult_: AbstractResult_, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Abstract Logs', userPayload);
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        const sSQL = `SELECT * FROM [dbo].[vwAbstractLogs] WHERE [AbstractResultId]='${abstractresult_.ID}' ` + this.getRowLevelSecurityWhereClause('Abstract Logs', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.ArrayMapFieldNamesToCodeNames('Abstract Logs', await dataSource.query(sSQL));
        return result;
    }
        
    @Mutation(() => AbstractResult_)
    async CreateAbstractResult(
        @Arg('input', () => CreateAbstractResultInput) input: CreateAbstractResultInput,
        @Ctx() { dataSources, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        const dataSource = GetReadWriteDataSource(dataSources);
        return this.CreateRecord('Abstract Results', input, dataSource, userPayload, pubSub)
    }
        
    @Mutation(() => AbstractResult_)
    async UpdateAbstractResult(
        @Arg('input', () => UpdateAbstractResultInput) input: UpdateAbstractResultInput,
        @Ctx() { dataSources, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        const dataSource = GetReadWriteDataSource(dataSources);
        return this.UpdateRecord('Abstract Results', input, dataSource, userPayload, pubSub);
    }
    
    @Mutation(() => AbstractResult_)
    async DeleteAbstractResult(@Arg('ID', () => String) ID: string, @Arg('options___', () => DeleteOptionsInput) options: DeleteOptionsInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadWriteDataSource(dataSources);
        const key = new CompositeKey([{FieldName: 'ID', Value: ID}]);
        return this.DeleteRecord('Abstract Results', key, options, dataSource, userPayload, pubSub);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Score Boards
//****************************************************************************
@ObjectType()
export class ScoreBoard_ {
    @Field() 
    @MaxLength(16)
    ID: string;
        
    @Field({nullable: true}) 
    @MaxLength(510)
    Name?: string;
        
    @Field({nullable: true}) 
    Description?: string;
        
    @Field({nullable: true}) 
    Criteria?: string;
        
    @Field(() => Float, {nullable: true}) 
    Weightage?: number;
        
    @Field() 
    @MaxLength(10)
    _mj__CreatedAt: Date;
        
    @Field() 
    @MaxLength(10)
    _mj__UpdatedAt: Date;
        
    @Field({nullable: true}) 
    @MaxLength(16)
    SessionID?: string;
        
    @Field({nullable: true}) 
    @MaxLength(510)
    Session?: string;
        
    @Field(() => [SessionScoreBoard_])
    SessionScoreBoards_ScoreBoardIdArray: SessionScoreBoard_[]; // Link to SessionScoreBoards
    
}

//****************************************************************************
// INPUT TYPE for Score Boards
//****************************************************************************
@InputType()
export class CreateScoreBoardInput {
    @Field({ nullable: true })
    Name: string | null;

    @Field({ nullable: true })
    Description: string | null;

    @Field({ nullable: true })
    Criteria: string | null;

    @Field(() => Float, { nullable: true })
    Weightage: number | null;

    @Field({ nullable: true })
    SessionID: string | null;
}
    

//****************************************************************************
// INPUT TYPE for Score Boards
//****************************************************************************
@InputType()
export class UpdateScoreBoardInput {
    @Field()
    ID: string;

    @Field({ nullable: true })
    Name?: string | null;

    @Field({ nullable: true })
    Description?: string | null;

    @Field({ nullable: true })
    Criteria?: string | null;

    @Field(() => Float, { nullable: true })
    Weightage?: number | null;

    @Field({ nullable: true })
    SessionID?: string | null;

    @Field(() => [KeyValuePairInput], { nullable: true })
    OldValues___?: KeyValuePairInput[];
}
    
//****************************************************************************
// RESOLVER for Score Boards
//****************************************************************************
@ObjectType()
export class RunScoreBoardViewResult {
    @Field(() => [ScoreBoard_])
    Results: ScoreBoard_[];

    @Field(() => String, {nullable: true})
    UserViewRunID?: string;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(ScoreBoard_)
export class ScoreBoardResolver extends ResolverBase {
    @Query(() => RunScoreBoardViewResult)
    async RunScoreBoardViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunScoreBoardViewResult)
    async RunScoreBoardViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunScoreBoardViewResult)
    async RunScoreBoardDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        input.EntityName = 'Score Boards';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }
    @Query(() => ScoreBoard_, { nullable: true })
    async ScoreBoard(@Arg('ID', () => String) ID: string, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<ScoreBoard_ | null> {
        this.CheckUserReadPermissions('Score Boards', userPayload);
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        const sSQL = `SELECT * FROM [dbo].[vwScoreBoards] WHERE [ID]='${ID}' ` + this.getRowLevelSecurityWhereClause('Score Boards', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.MapFieldNamesToCodeNames('Score Boards', await dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {}))
        return result;
    }
    
    @FieldResolver(() => [SessionScoreBoard_])
    async SessionScoreBoards_ScoreBoardIdArray(@Root() scoreboard_: ScoreBoard_, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Session Score Boards', userPayload);
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        const sSQL = `SELECT * FROM [dbo].[vwSessionScoreBoards] WHERE [ScoreBoardId]='${scoreboard_.ID}' ` + this.getRowLevelSecurityWhereClause('Session Score Boards', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.ArrayMapFieldNamesToCodeNames('Session Score Boards', await dataSource.query(sSQL));
        return result;
    }
        
    @Mutation(() => ScoreBoard_)
    async CreateScoreBoard(
        @Arg('input', () => CreateScoreBoardInput) input: CreateScoreBoardInput,
        @Ctx() { dataSources, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        const dataSource = GetReadWriteDataSource(dataSources);
        return this.CreateRecord('Score Boards', input, dataSource, userPayload, pubSub)
    }
        
    @Mutation(() => ScoreBoard_)
    async UpdateScoreBoard(
        @Arg('input', () => UpdateScoreBoardInput) input: UpdateScoreBoardInput,
        @Ctx() { dataSources, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        const dataSource = GetReadWriteDataSource(dataSources);
        return this.UpdateRecord('Score Boards', input, dataSource, userPayload, pubSub);
    }
    
    @Mutation(() => ScoreBoard_)
    async DeleteScoreBoard(@Arg('ID', () => String) ID: string, @Arg('options___', () => DeleteOptionsInput) options: DeleteOptionsInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadWriteDataSource(dataSources);
        const key = new CompositeKey([{FieldName: 'ID', Value: ID}]);
        return this.DeleteRecord('Score Boards', key, options, dataSource, userPayload, pubSub);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Events
//****************************************************************************
@ObjectType()
export class Event_ {
    @Field() 
    @MaxLength(16)
    ID: string;
        
    @Field() 
    @MaxLength(510)
    Name: string;
        
    @Field({nullable: true}) 
    @MaxLength(8)
    EventStartDate?: Date;
        
    @Field({nullable: true}) 
    @MaxLength(8)
    EventEndDate?: Date;
        
    @Field({nullable: true}) 
    @MaxLength(510)
    Description?: string;
        
    @Field() 
    @MaxLength(10)
    _mj__CreatedAt: Date;
        
    @Field() 
    @MaxLength(10)
    _mj__UpdatedAt: Date;
        
    @Field(() => [Session_])
    Sessions_EventIDArray: Session_[]; // Link to Sessions
    
}

//****************************************************************************
// INPUT TYPE for Events
//****************************************************************************
@InputType()
export class CreateEventInput {
    @Field({ nullable: true })
    Name?: string;

    @Field({ nullable: true })
    EventStartDate: Date | null;

    @Field({ nullable: true })
    EventEndDate: Date | null;

    @Field({ nullable: true })
    Description: string | null;
}
    

//****************************************************************************
// INPUT TYPE for Events
//****************************************************************************
@InputType()
export class UpdateEventInput {
    @Field()
    ID: string;

    @Field({ nullable: true })
    Name?: string;

    @Field({ nullable: true })
    EventStartDate?: Date | null;

    @Field({ nullable: true })
    EventEndDate?: Date | null;

    @Field({ nullable: true })
    Description?: string | null;

    @Field(() => [KeyValuePairInput], { nullable: true })
    OldValues___?: KeyValuePairInput[];
}
    
//****************************************************************************
// RESOLVER for Events
//****************************************************************************
@ObjectType()
export class RunEventViewResult {
    @Field(() => [Event_])
    Results: Event_[];

    @Field(() => String, {nullable: true})
    UserViewRunID?: string;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Event_)
export class EventResolver extends ResolverBase {
    @Query(() => RunEventViewResult)
    async RunEventViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunEventViewResult)
    async RunEventViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunEventViewResult)
    async RunEventDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        input.EntityName = 'Events';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }
    @Query(() => Event_, { nullable: true })
    async Event(@Arg('ID', () => String) ID: string, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Event_ | null> {
        this.CheckUserReadPermissions('Events', userPayload);
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        const sSQL = `SELECT * FROM [dbo].[vwEvents] WHERE [ID]='${ID}' ` + this.getRowLevelSecurityWhereClause('Events', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.MapFieldNamesToCodeNames('Events', await dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {}))
        return result;
    }
    
    @FieldResolver(() => [Session_])
    async Sessions_EventIDArray(@Root() event_: Event_, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Sessions', userPayload);
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        const sSQL = `SELECT * FROM [dbo].[vwSessions] WHERE [EventID]='${event_.ID}' ` + this.getRowLevelSecurityWhereClause('Sessions', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.ArrayMapFieldNamesToCodeNames('Sessions', await dataSource.query(sSQL));
        return result;
    }
        
    @Mutation(() => Event_)
    async CreateEvent(
        @Arg('input', () => CreateEventInput) input: CreateEventInput,
        @Ctx() { dataSources, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        const dataSource = GetReadWriteDataSource(dataSources);
        return this.CreateRecord('Events', input, dataSource, userPayload, pubSub)
    }
        
    @Mutation(() => Event_)
    async UpdateEvent(
        @Arg('input', () => UpdateEventInput) input: UpdateEventInput,
        @Ctx() { dataSources, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        const dataSource = GetReadWriteDataSource(dataSources);
        return this.UpdateRecord('Events', input, dataSource, userPayload, pubSub);
    }
    
    @Mutation(() => Event_)
    async DeleteEvent(@Arg('ID', () => String) ID: string, @Arg('options___', () => DeleteOptionsInput) options: DeleteOptionsInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadWriteDataSource(dataSources);
        const key = new CompositeKey([{FieldName: 'ID', Value: ID}]);
        return this.DeleteRecord('Events', key, options, dataSource, userPayload, pubSub);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Session Score Boards
//****************************************************************************
@ObjectType()
export class SessionScoreBoard_ {
    @Field() 
    @MaxLength(16)
    ID: string;
        
    @Field() 
    @MaxLength(16)
    SessionId: string;
        
    @Field() 
    @MaxLength(16)
    ScoreBoardId: string;
        
    @Field(() => Float, {nullable: true}) 
    WeightedScore?: number;
        
    @Field() 
    @MaxLength(10)
    _mj__CreatedAt: Date;
        
    @Field() 
    @MaxLength(10)
    _mj__UpdatedAt: Date;
        
    @Field() 
    @MaxLength(510)
    SessionId_Virtual: string;
        
    @Field({nullable: true}) 
    @MaxLength(510)
    ScoreBoardId_Virtual?: string;
        
}

//****************************************************************************
// INPUT TYPE for Session Score Boards
//****************************************************************************
@InputType()
export class CreateSessionScoreBoardInput {
    @Field({ nullable: true })
    SessionId?: string;

    @Field({ nullable: true })
    ScoreBoardId?: string;

    @Field(() => Float, { nullable: true })
    WeightedScore: number | null;
}
    

//****************************************************************************
// INPUT TYPE for Session Score Boards
//****************************************************************************
@InputType()
export class UpdateSessionScoreBoardInput {
    @Field()
    ID: string;

    @Field({ nullable: true })
    SessionId?: string;

    @Field({ nullable: true })
    ScoreBoardId?: string;

    @Field(() => Float, { nullable: true })
    WeightedScore?: number | null;

    @Field(() => [KeyValuePairInput], { nullable: true })
    OldValues___?: KeyValuePairInput[];
}
    
//****************************************************************************
// RESOLVER for Session Score Boards
//****************************************************************************
@ObjectType()
export class RunSessionScoreBoardViewResult {
    @Field(() => [SessionScoreBoard_])
    Results: SessionScoreBoard_[];

    @Field(() => String, {nullable: true})
    UserViewRunID?: string;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(SessionScoreBoard_)
export class SessionScoreBoardResolver extends ResolverBase {
    @Query(() => RunSessionScoreBoardViewResult)
    async RunSessionScoreBoardViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunSessionScoreBoardViewResult)
    async RunSessionScoreBoardViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunSessionScoreBoardViewResult)
    async RunSessionScoreBoardDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        input.EntityName = 'Session Score Boards';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }
    @Query(() => SessionScoreBoard_, { nullable: true })
    async SessionScoreBoard(@Arg('ID', () => String) ID: string, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<SessionScoreBoard_ | null> {
        this.CheckUserReadPermissions('Session Score Boards', userPayload);
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        const sSQL = `SELECT * FROM [dbo].[vwSessionScoreBoards] WHERE [ID]='${ID}' ` + this.getRowLevelSecurityWhereClause('Session Score Boards', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.MapFieldNamesToCodeNames('Session Score Boards', await dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {}))
        return result;
    }
    
    @Mutation(() => SessionScoreBoard_)
    async CreateSessionScoreBoard(
        @Arg('input', () => CreateSessionScoreBoardInput) input: CreateSessionScoreBoardInput,
        @Ctx() { dataSources, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        const dataSource = GetReadWriteDataSource(dataSources);
        return this.CreateRecord('Session Score Boards', input, dataSource, userPayload, pubSub)
    }
        
    @Mutation(() => SessionScoreBoard_)
    async UpdateSessionScoreBoard(
        @Arg('input', () => UpdateSessionScoreBoardInput) input: UpdateSessionScoreBoardInput,
        @Ctx() { dataSources, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        const dataSource = GetReadWriteDataSource(dataSources);
        return this.UpdateRecord('Session Score Boards', input, dataSource, userPayload, pubSub);
    }
    
    @Mutation(() => SessionScoreBoard_)
    async DeleteSessionScoreBoard(@Arg('ID', () => String) ID: string, @Arg('options___', () => DeleteOptionsInput) options: DeleteOptionsInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadWriteDataSource(dataSources);
        const key = new CompositeKey([{FieldName: 'ID', Value: ID}]);
        return this.DeleteRecord('Session Score Boards', key, options, dataSource, userPayload, pubSub);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Sessions
//****************************************************************************
@ObjectType()
export class Session_ {
    @Field() 
    @MaxLength(16)
    ID: string;
        
    @Field() 
    @MaxLength(16)
    EventID: string;
        
    @Field() 
    @MaxLength(510)
    Name: string;
        
    @Field({nullable: true}) 
    @MaxLength(8)
    SessionStartDate?: Date;
        
    @Field({nullable: true}) 
    @MaxLength(8)
    SessionEndDate?: Date;
        
    @Field() 
    @MaxLength(10)
    _mj__CreatedAt: Date;
        
    @Field() 
    @MaxLength(10)
    _mj__UpdatedAt: Date;
        
    @Field(() => Float, {nullable: true}) 
    WeightedScore?: number;
        
    @Field({nullable: true}) 
    @MaxLength(400)
    Title?: string;
        
    @Field() 
    @MaxLength(510)
    Event: string;
        
    @Field(() => [ScoreBoard_])
    ScoreBoards_SessionIDArray: ScoreBoard_[]; // Link to ScoreBoards
    
    @Field(() => [Abstract_])
    Abstracts_SessionIDArray: Abstract_[]; // Link to Abstracts
    
    @Field(() => [SessionScoreBoard_])
    SessionScoreBoards_SessionIdArray: SessionScoreBoard_[]; // Link to SessionScoreBoards
    
}

//****************************************************************************
// INPUT TYPE for Sessions
//****************************************************************************
@InputType()
export class CreateSessionInput {
    @Field({ nullable: true })
    EventID?: string;

    @Field({ nullable: true })
    Name?: string;

    @Field({ nullable: true })
    SessionStartDate: Date | null;

    @Field({ nullable: true })
    SessionEndDate: Date | null;

    @Field(() => Float, { nullable: true })
    WeightedScore: number | null;

    @Field({ nullable: true })
    Title: string | null;
}
    

//****************************************************************************
// INPUT TYPE for Sessions
//****************************************************************************
@InputType()
export class UpdateSessionInput {
    @Field()
    ID: string;

    @Field({ nullable: true })
    EventID?: string;

    @Field({ nullable: true })
    Name?: string;

    @Field({ nullable: true })
    SessionStartDate?: Date | null;

    @Field({ nullable: true })
    SessionEndDate?: Date | null;

    @Field(() => Float, { nullable: true })
    WeightedScore?: number | null;

    @Field({ nullable: true })
    Title?: string | null;

    @Field(() => [KeyValuePairInput], { nullable: true })
    OldValues___?: KeyValuePairInput[];
}
    
//****************************************************************************
// RESOLVER for Sessions
//****************************************************************************
@ObjectType()
export class RunSessionViewResult {
    @Field(() => [Session_])
    Results: Session_[];

    @Field(() => String, {nullable: true})
    UserViewRunID?: string;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Session_)
export class SessionResolver extends ResolverBase {
    @Query(() => RunSessionViewResult)
    async RunSessionViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunSessionViewResult)
    async RunSessionViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunSessionViewResult)
    async RunSessionDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        input.EntityName = 'Sessions';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }
    @Query(() => Session_, { nullable: true })
    async Session(@Arg('ID', () => String) ID: string, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Session_ | null> {
        this.CheckUserReadPermissions('Sessions', userPayload);
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        const sSQL = `SELECT * FROM [dbo].[vwSessions] WHERE [ID]='${ID}' ` + this.getRowLevelSecurityWhereClause('Sessions', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.MapFieldNamesToCodeNames('Sessions', await dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {}))
        return result;
    }
    
    @FieldResolver(() => [ScoreBoard_])
    async ScoreBoards_SessionIDArray(@Root() session_: Session_, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Score Boards', userPayload);
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        const sSQL = `SELECT * FROM [dbo].[vwScoreBoards] WHERE [SessionID]='${session_.ID}' ` + this.getRowLevelSecurityWhereClause('Score Boards', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.ArrayMapFieldNamesToCodeNames('Score Boards', await dataSource.query(sSQL));
        return result;
    }
        
    @FieldResolver(() => [Abstract_])
    async Abstracts_SessionIDArray(@Root() session_: Session_, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Abstracts', userPayload);
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        const sSQL = `SELECT * FROM [dbo].[vwAbstracts] WHERE [SessionID]='${session_.ID}' ` + this.getRowLevelSecurityWhereClause('Abstracts', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.ArrayMapFieldNamesToCodeNames('Abstracts', await dataSource.query(sSQL));
        return result;
    }
        
    @FieldResolver(() => [SessionScoreBoard_])
    async SessionScoreBoards_SessionIdArray(@Root() session_: Session_, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Session Score Boards', userPayload);
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        const sSQL = `SELECT * FROM [dbo].[vwSessionScoreBoards] WHERE [SessionId]='${session_.ID}' ` + this.getRowLevelSecurityWhereClause('Session Score Boards', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.ArrayMapFieldNamesToCodeNames('Session Score Boards', await dataSource.query(sSQL));
        return result;
    }
        
    @Mutation(() => Session_)
    async CreateSession(
        @Arg('input', () => CreateSessionInput) input: CreateSessionInput,
        @Ctx() { dataSources, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        const dataSource = GetReadWriteDataSource(dataSources);
        return this.CreateRecord('Sessions', input, dataSource, userPayload, pubSub)
    }
        
    @Mutation(() => Session_)
    async UpdateSession(
        @Arg('input', () => UpdateSessionInput) input: UpdateSessionInput,
        @Ctx() { dataSources, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        const dataSource = GetReadWriteDataSource(dataSources);
        return this.UpdateRecord('Sessions', input, dataSource, userPayload, pubSub);
    }
    
    @Mutation(() => Session_)
    async DeleteSession(@Arg('ID', () => String) ID: string, @Arg('options___', () => DeleteOptionsInput) options: DeleteOptionsInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadWriteDataSource(dataSources);
        const key = new CompositeKey([{FieldName: 'ID', Value: ID}]);
        return this.DeleteRecord('Sessions', key, options, dataSource, userPayload, pubSub);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Abstract Stagings
//****************************************************************************
@ObjectType()
export class AbstractStaging_ {
    @Field() 
    @MaxLength(16)
    ID: string;
        
    @Field() 
    @MaxLength(16)
    SessionID: string;
        
    @Field() 
    @MaxLength(16)
    UserID: string;
        
    @Field(() => Int, {nullable: true}) 
    YearOfExp?: number;
        
    @Field({nullable: true}) 
    AbstractText?: string;
        
    @Field({nullable: true}) 
    @MaxLength(1000)
    UploadUrl?: string;
        
    @Field() 
    @MaxLength(10)
    _mj__CreatedAt: Date;
        
    @Field() 
    @MaxLength(10)
    _mj__UpdatedAt: Date;
        
    @Field() 
    @MaxLength(510)
    Session: string;
        
    @Field() 
    @MaxLength(510)
    User: string;
        
    @Field({nullable: true}) 
    @MaxLength(510)
    FirstName?: string;
        
    @Field({nullable: true}) 
    @MaxLength(510)
    LastName?: string;
        
    @Field() 
    @MaxLength(16)
    EventID: string;
        
    @Field() 
    @MaxLength(510)
    EventName: string;
        
    @Field({nullable: true}) 
    @MaxLength(8)
    EventStartDate?: Date;
        
    @Field({nullable: true}) 
    @MaxLength(8)
    EventEndDate?: Date;
        
    @Field({nullable: true}) 
    Description?: string;
        
    @Field({nullable: true}) 
    @MaxLength(8)
    EventCreatedAt?: Date;
        
    @Field({nullable: true}) 
    @MaxLength(8)
    EventUpdatedAt?: Date;
        
}

//****************************************************************************
// INPUT TYPE for Abstract Stagings
//****************************************************************************
@InputType()
export class CreateAbstractStagingInput {
    @Field({ nullable: true })
    SessionID?: string;

    @Field({ nullable: true })
    UserID?: string;

    @Field(() => Int, { nullable: true })
    YearOfExp: number | null;

    @Field({ nullable: true })
    AbstractText: string | null;

    @Field({ nullable: true })
    UploadUrl: string | null;

    @Field({ nullable: true })
    Session?: string;

    @Field({ nullable: true })
    User?: string;

    @Field({ nullable: true })
    FirstName: string | null;

    @Field({ nullable: true })
    LastName: string | null;

    @Field({ nullable: true })
    EventID?: string;

    @Field({ nullable: true })
    EventName?: string;

    @Field({ nullable: true })
    EventStartDate: Date | null;

    @Field({ nullable: true })
    EventEndDate: Date | null;

    @Field({ nullable: true })
    Description: string | null;

    @Field({ nullable: true })
    EventCreatedAt?: Date | null;

    @Field({ nullable: true })
    EventUpdatedAt?: Date | null;
}
    

//****************************************************************************
// INPUT TYPE for Abstract Stagings
//****************************************************************************
@InputType()
export class UpdateAbstractStagingInput {
    @Field()
    ID: string;

    @Field({ nullable: true })
    SessionID?: string;

    @Field({ nullable: true })
    UserID?: string;

    @Field(() => Int, { nullable: true })
    YearOfExp?: number | null;

    @Field({ nullable: true })
    AbstractText?: string | null;

    @Field({ nullable: true })
    UploadUrl?: string | null;

    @Field({ nullable: true })
    Session?: string;

    @Field({ nullable: true })
    User?: string;

    @Field({ nullable: true })
    FirstName?: string | null;

    @Field({ nullable: true })
    LastName?: string | null;

    @Field({ nullable: true })
    EventID?: string;

    @Field({ nullable: true })
    EventName?: string;

    @Field({ nullable: true })
    EventStartDate?: Date | null;

    @Field({ nullable: true })
    EventEndDate?: Date | null;

    @Field({ nullable: true })
    Description?: string | null;

    @Field({ nullable: true })
    EventCreatedAt?: Date | null;

    @Field({ nullable: true })
    EventUpdatedAt?: Date | null;

    @Field(() => [KeyValuePairInput], { nullable: true })
    OldValues___?: KeyValuePairInput[];
}
    
//****************************************************************************
// RESOLVER for Abstract Stagings
//****************************************************************************
@ObjectType()
export class RunAbstractStagingViewResult {
    @Field(() => [AbstractStaging_])
    Results: AbstractStaging_[];

    @Field(() => String, {nullable: true})
    UserViewRunID?: string;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(AbstractStaging_)
export class AbstractStagingResolver extends ResolverBase {
    @Query(() => RunAbstractStagingViewResult)
    async RunAbstractStagingViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAbstractStagingViewResult)
    async RunAbstractStagingViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAbstractStagingViewResult)
    async RunAbstractStagingDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        input.EntityName = 'Abstract Stagings';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }
    @Query(() => AbstractStaging_, { nullable: true })
    async AbstractStaging(@Arg('ID', () => String) ID: string, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<AbstractStaging_ | null> {
        this.CheckUserReadPermissions('Abstract Stagings', userPayload);
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        const sSQL = `SELECT * FROM [dbo].[vwAbstractStagings] WHERE [ID]='${ID}' ` + this.getRowLevelSecurityWhereClause('Abstract Stagings', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.MapFieldNamesToCodeNames('Abstract Stagings', await dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {}))
        return result;
    }
    
    @Mutation(() => AbstractStaging_)
    async CreateAbstractStaging(
        @Arg('input', () => CreateAbstractStagingInput) input: CreateAbstractStagingInput,
        @Ctx() { dataSources, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        const dataSource = GetReadWriteDataSource(dataSources);
        return this.CreateRecord('Abstract Stagings', input, dataSource, userPayload, pubSub)
    }
        
    @Mutation(() => AbstractStaging_)
    async UpdateAbstractStaging(
        @Arg('input', () => UpdateAbstractStagingInput) input: UpdateAbstractStagingInput,
        @Ctx() { dataSources, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        const dataSource = GetReadWriteDataSource(dataSources);
        return this.UpdateRecord('Abstract Stagings', input, dataSource, userPayload, pubSub);
    }
    
    @Mutation(() => AbstractStaging_)
    async DeleteAbstractStaging(@Arg('ID', () => String) ID: string, @Arg('options___', () => DeleteOptionsInput) options: DeleteOptionsInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadWriteDataSource(dataSources);
        const key = new CompositeKey([{FieldName: 'ID', Value: ID}]);
        return this.DeleteRecord('Abstract Stagings', key, options, dataSource, userPayload, pubSub);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Abstract Logs
//****************************************************************************
@ObjectType()
export class AbstractLogs_ {
    @Field() 
    @MaxLength(16)
    ID: string;
        
    @Field() 
    @MaxLength(16)
    AbstractResultId: string;
        
    @Field() 
    @MaxLength(16)
    AIAgentId: string;
        
    @Field({nullable: true}) 
    ActionDescription?: string;
        
    @Field({nullable: true}) 
    @MaxLength(8)
    UpdatedOn?: Date;
        
    @Field() 
    @MaxLength(10)
    _mj__CreatedAt: Date;
        
    @Field() 
    @MaxLength(10)
    _mj__UpdatedAt: Date;
        
    @Field({nullable: true}) 
    @MaxLength(510)
    AIAgentId_Virtual?: string;
        
}

//****************************************************************************
// INPUT TYPE for Abstract Logs
//****************************************************************************
@InputType()
export class CreateAbstractLogsInput {
    @Field({ nullable: true })
    AbstractResultId?: string;

    @Field({ nullable: true })
    AIAgentId?: string;

    @Field({ nullable: true })
    ActionDescription: string | null;

    @Field({ nullable: true })
    UpdatedOn?: Date | null;
}
    

//****************************************************************************
// INPUT TYPE for Abstract Logs
//****************************************************************************
@InputType()
export class UpdateAbstractLogsInput {
    @Field()
    ID: string;

    @Field({ nullable: true })
    AbstractResultId?: string;

    @Field({ nullable: true })
    AIAgentId?: string;

    @Field({ nullable: true })
    ActionDescription?: string | null;

    @Field({ nullable: true })
    UpdatedOn?: Date | null;

    @Field(() => [KeyValuePairInput], { nullable: true })
    OldValues___?: KeyValuePairInput[];
}
    
//****************************************************************************
// RESOLVER for Abstract Logs
//****************************************************************************
@ObjectType()
export class RunAbstractLogsViewResult {
    @Field(() => [AbstractLogs_])
    Results: AbstractLogs_[];

    @Field(() => String, {nullable: true})
    UserViewRunID?: string;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(AbstractLogs_)
export class AbstractLogsResolver extends ResolverBase {
    @Query(() => RunAbstractLogsViewResult)
    async RunAbstractLogsViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAbstractLogsViewResult)
    async RunAbstractLogsViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAbstractLogsViewResult)
    async RunAbstractLogsDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        input.EntityName = 'Abstract Logs';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }
    @Query(() => AbstractLogs_, { nullable: true })
    async AbstractLogs(@Arg('ID', () => String) ID: string, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<AbstractLogs_ | null> {
        this.CheckUserReadPermissions('Abstract Logs', userPayload);
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        const sSQL = `SELECT * FROM [dbo].[vwAbstractLogs] WHERE [ID]='${ID}' ` + this.getRowLevelSecurityWhereClause('Abstract Logs', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.MapFieldNamesToCodeNames('Abstract Logs', await dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {}))
        return result;
    }
    
    @Mutation(() => AbstractLogs_)
    async CreateAbstractLogs(
        @Arg('input', () => CreateAbstractLogsInput) input: CreateAbstractLogsInput,
        @Ctx() { dataSources, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        const dataSource = GetReadWriteDataSource(dataSources);
        return this.CreateRecord('Abstract Logs', input, dataSource, userPayload, pubSub)
    }
        
    @Mutation(() => AbstractLogs_)
    async UpdateAbstractLogs(
        @Arg('input', () => UpdateAbstractLogsInput) input: UpdateAbstractLogsInput,
        @Ctx() { dataSources, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        const dataSource = GetReadWriteDataSource(dataSources);
        return this.UpdateRecord('Abstract Logs', input, dataSource, userPayload, pubSub);
    }
    
    @Mutation(() => AbstractLogs_)
    async DeleteAbstractLogs(@Arg('ID', () => String) ID: string, @Arg('options___', () => DeleteOptionsInput) options: DeleteOptionsInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadWriteDataSource(dataSources);
        const key = new CompositeKey([{FieldName: 'ID', Value: ID}]);
        return this.DeleteRecord('Abstract Logs', key, options, dataSource, userPayload, pubSub);
    }
    
}

//****************************************************************************
// ENTITY CLASS for Abstracts
//****************************************************************************
@ObjectType()
export class Abstract_ {
    @Field() 
    @MaxLength(16)
    ID: string;
        
    @Field() 
    @MaxLength(16)
    SessionID: string;
        
    @Field() 
    @MaxLength(16)
    UserID: string;
        
    @Field(() => Int, {nullable: true}) 
    YearOfExp?: number;
        
    @Field({nullable: true}) 
    AbstractText?: string;
        
    @Field({nullable: true}) 
    @MaxLength(1000)
    UploadUrl?: string;
        
    @Field() 
    @MaxLength(10)
    _mj__CreatedAt: Date;
        
    @Field() 
    @MaxLength(10)
    _mj__UpdatedAt: Date;
        
    @Field(() => [AbstractResult_])
    AbstractResults_AbstractIDArray: AbstractResult_[]; // Link to AbstractResults
    
}

//****************************************************************************
// INPUT TYPE for Abstracts
//****************************************************************************
@InputType()
export class CreateAbstractInput {
    @Field({ nullable: true })
    SessionID?: string;

    @Field({ nullable: true })
    UserID?: string;

    @Field(() => Int, { nullable: true })
    YearOfExp: number | null;

    @Field({ nullable: true })
    AbstractText: string | null;

    @Field({ nullable: true })
    UploadUrl: string | null;
}
    

//****************************************************************************
// INPUT TYPE for Abstracts
//****************************************************************************
@InputType()
export class UpdateAbstractInput {
    @Field()
    ID: string;

    @Field({ nullable: true })
    SessionID?: string;

    @Field({ nullable: true })
    UserID?: string;

    @Field(() => Int, { nullable: true })
    YearOfExp?: number | null;

    @Field({ nullable: true })
    AbstractText?: string | null;

    @Field({ nullable: true })
    UploadUrl?: string | null;

    @Field(() => [KeyValuePairInput], { nullable: true })
    OldValues___?: KeyValuePairInput[];
}
    
//****************************************************************************
// RESOLVER for Abstracts
//****************************************************************************
@ObjectType()
export class RunAbstractViewResult {
    @Field(() => [Abstract_])
    Results: Abstract_[];

    @Field(() => String, {nullable: true})
    UserViewRunID?: string;

    @Field(() => Int, {nullable: true})
    RowCount: number;

    @Field(() => Int, {nullable: true})
    TotalRowCount: number;

    @Field(() => Int, {nullable: true})
    ExecutionTime: number;

    @Field({nullable: true})
    ErrorMessage?: string;

    @Field(() => Boolean, {nullable: false})
    Success: boolean;
}

@Resolver(Abstract_)
export class AbstractResolver extends ResolverBase {
    @Query(() => RunAbstractViewResult)
    async RunAbstractViewByID(@Arg('input', () => RunViewByIDInput) input: RunViewByIDInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        return super.RunViewByIDGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAbstractViewResult)
    async RunAbstractViewByName(@Arg('input', () => RunViewByNameInput) input: RunViewByNameInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        return super.RunViewByNameGeneric(input, dataSource, userPayload, pubSub);
    }

    @Query(() => RunAbstractViewResult)
    async RunAbstractDynamicView(@Arg('input', () => RunDynamicViewInput) input: RunDynamicViewInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        input.EntityName = 'Abstracts';
        return super.RunDynamicViewGeneric(input, dataSource, userPayload, pubSub);
    }
    @Query(() => Abstract_, { nullable: true })
    async Abstract(@Arg('ID', () => String) ID: string, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine): Promise<Abstract_ | null> {
        this.CheckUserReadPermissions('Abstracts', userPayload);
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        const sSQL = `SELECT * FROM [dbo].[vwAbstracts] WHERE [ID]='${ID}' ` + this.getRowLevelSecurityWhereClause('Abstracts', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.MapFieldNamesToCodeNames('Abstracts', await dataSource.query(sSQL).then((r) => r && r.length > 0 ? r[0] : {}))
        return result;
    }
    
    @FieldResolver(() => [AbstractResult_])
    async AbstractResults_AbstractIDArray(@Root() abstract_: Abstract_, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        this.CheckUserReadPermissions('Abstract Results', userPayload);
        const dataSource = GetReadOnlyDataSource(dataSources, { allowFallbackToReadWrite: true });
        const sSQL = `SELECT * FROM [dbo].[vwAbstractResults] WHERE [AbstractID]='${abstract_.ID}' ` + this.getRowLevelSecurityWhereClause('Abstract Results', userPayload, EntityPermissionType.Read, 'AND');
        const result = this.ArrayMapFieldNamesToCodeNames('Abstract Results', await dataSource.query(sSQL));
        return result;
    }
        
    @Mutation(() => Abstract_)
    async CreateAbstract(
        @Arg('input', () => CreateAbstractInput) input: CreateAbstractInput,
        @Ctx() { dataSources, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        const dataSource = GetReadWriteDataSource(dataSources);
        return this.CreateRecord('Abstracts', input, dataSource, userPayload, pubSub)
    }
        
    @Mutation(() => Abstract_)
    async UpdateAbstract(
        @Arg('input', () => UpdateAbstractInput) input: UpdateAbstractInput,
        @Ctx() { dataSources, userPayload }: AppContext,
        @PubSub() pubSub: PubSubEngine
    ) {
        const dataSource = GetReadWriteDataSource(dataSources);
        return this.UpdateRecord('Abstracts', input, dataSource, userPayload, pubSub);
    }
    
    @Mutation(() => Abstract_)
    async DeleteAbstract(@Arg('ID', () => String) ID: string, @Arg('options___', () => DeleteOptionsInput) options: DeleteOptionsInput, @Ctx() { dataSources, userPayload }: AppContext, @PubSub() pubSub: PubSubEngine) {
        const dataSource = GetReadWriteDataSource(dataSources);
        const key = new CompositeKey([{FieldName: 'ID', Value: ID}]);
        return this.DeleteRecord('Abstracts', key, options, dataSource, userPayload, pubSub);
    }
    
}