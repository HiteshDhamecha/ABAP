import { BaseEntity, EntitySaveOptions, CompositeKey } from "@memberjunction/core";
import { RegisterClass } from "@memberjunction/global";
import { z } from "zod";

export const loadModule = () => {
  // no-op, only used to ensure this file is a valid module and to allow easy loading
}

     
 
/**
 * zod schema definition for the entity Abstract Details Stagings
 */
export const AbstractDetailsStagingSchema = z.object({
    ID: z.string().describe(`
        * * Field Name: ID
        * * Display Name: ID
        * * SQL Data Type: uniqueidentifier
        * * Default Value: newid()`),
    AbstractID: z.string().describe(`
        * * Field Name: AbstractID
        * * Display Name: Abstract ID
        * * SQL Data Type: uniqueidentifier
        * * Related Entity/Foreign Key: Abstracts (vwAbstracts.ID)`),
    SessionID: z.string().describe(`
        * * Field Name: SessionID
        * * Display Name: Session ID
        * * SQL Data Type: uniqueidentifier
        * * Related Entity/Foreign Key: Sessions (vwSessions.ID)`),
    UserID: z.string().describe(`
        * * Field Name: UserID
        * * Display Name: User ID
        * * SQL Data Type: uniqueidentifier
        * * Related Entity/Foreign Key: Users (vwUsers.ID)`),
    YearOfExp: z.number().nullish().describe(`
        * * Field Name: YearOfExp
        * * Display Name: Year Of Exp
        * * SQL Data Type: int`),
    AbstractText: z.string().nullish().describe(`
        * * Field Name: AbstractText
        * * Display Name: Abstract Text
        * * SQL Data Type: nvarchar(MAX)`),
    UploadUrl: z.string().nullish().describe(`
        * * Field Name: UploadUrl
        * * Display Name: Upload Url
        * * SQL Data Type: nvarchar(255)`),
    AbstractCreatedAt: z.date().nullish().describe(`
        * * Field Name: AbstractCreatedAt
        * * Display Name: Abstract Created At
        * * SQL Data Type: datetime`),
    EventID: z.string().describe(`
        * * Field Name: EventID
        * * Display Name: Event ID
        * * SQL Data Type: uniqueidentifier
        * * Related Entity/Foreign Key: Events (vwEvents.ID)`),
    SessionName: z.string().nullish().describe(`
        * * Field Name: SessionName
        * * Display Name: Session Name
        * * SQL Data Type: nvarchar(255)`),
    EventName: z.string().nullish().describe(`
        * * Field Name: EventName
        * * Display Name: Event Name
        * * SQL Data Type: nvarchar(255)`),
    FirstName: z.string().nullish().describe(`
        * * Field Name: FirstName
        * * Display Name: First Name
        * * SQL Data Type: nvarchar(100)`),
    LastName: z.string().nullish().describe(`
        * * Field Name: LastName
        * * Display Name: Last Name
        * * SQL Data Type: nvarchar(100)`),
    UserTitle: z.string().nullish().describe(`
        * * Field Name: UserTitle
        * * Display Name: User Title
        * * SQL Data Type: nvarchar(100)`),
    UserEmail: z.string().nullish().describe(`
        * * Field Name: UserEmail
        * * Display Name: User Email
        * * SQL Data Type: nvarchar(255)`),
    UserType: z.string().nullish().describe(`
        * * Field Name: UserType
        * * Display Name: User Type
        * * SQL Data Type: nvarchar(100)`),
    IsActive: z.boolean().nullish().describe(`
        * * Field Name: IsActive
        * * Display Name: Is Active
        * * SQL Data Type: bit`),
    PhoneNumber: z.string().nullish().describe(`
        * * Field Name: PhoneNumber
        * * Display Name: Phone Number
        * * SQL Data Type: nvarchar(20)`),
    AbstractResultID: z.string().describe(`
        * * Field Name: AbstractResultID
        * * Display Name: Abstract Result ID
        * * SQL Data Type: uniqueidentifier
        * * Related Entity/Foreign Key: Abstract Results (vwAbstractResults.ID)`),
    AbstractStatusId: z.string().describe(`
        * * Field Name: AbstractStatusId
        * * Display Name: Abstract Status Id
        * * SQL Data Type: uniqueidentifier
        * * Related Entity/Foreign Key: Abstract Status (vwAbstractStatus.ID)`),
    AbstractStatusName: z.string().nullish().describe(`
        * * Field Name: AbstractStatusName
        * * Display Name: Abstract Status Name
        * * SQL Data Type: nvarchar(255)`),
    __mj_CreatedAt: z.date().describe(`
        * * Field Name: __mj_CreatedAt
        * * Display Name: Created At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    __mj_UpdatedAt: z.date().describe(`
        * * Field Name: __mj_UpdatedAt
        * * Display Name: Updated At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    Session: z.string().describe(`
        * * Field Name: Session
        * * Display Name: Session
        * * SQL Data Type: nvarchar(255)`),
    User: z.string().describe(`
        * * Field Name: User
        * * Display Name: User
        * * SQL Data Type: nvarchar(100)`),
    Event: z.string().describe(`
        * * Field Name: Event
        * * Display Name: Event
        * * SQL Data Type: nvarchar(255)`),
    AbstractStatusId_Virtual: z.string().describe(`
        * * Field Name: AbstractStatusId_Virtual
        * * Display Name: Abstract Status Id _ Virtual
        * * SQL Data Type: nvarchar(255)`),
});

export type AbstractDetailsStagingEntityType = z.infer<typeof AbstractDetailsStagingSchema>;

/**
 * zod schema definition for the entity Abstract Logs
 */
export const AbstractLogsSchema = z.object({
    ID: z.string().describe(`
        * * Field Name: ID
        * * Display Name: ID
        * * SQL Data Type: uniqueidentifier
        * * Default Value: newid()`),
    AbstractResultId: z.string().describe(`
        * * Field Name: AbstractResultId
        * * Display Name: Abstract Result Id
        * * SQL Data Type: uniqueidentifier
        * * Related Entity/Foreign Key: Abstract Results (vwAbstractResults.ID)`),
    AIAgentId: z.string().describe(`
        * * Field Name: AIAgentId
        * * Display Name: AI Agent Id
        * * SQL Data Type: uniqueidentifier
        * * Related Entity/Foreign Key: AI Agents (vwAIAgents.ID)`),
    ActionDescription: z.string().nullish().describe(`
        * * Field Name: ActionDescription
        * * Display Name: Action Description
        * * SQL Data Type: nvarchar(MAX)`),
    UpdatedOn: z.date().nullish().describe(`
        * * Field Name: UpdatedOn
        * * Display Name: Updated On
        * * SQL Data Type: datetime
        * * Default Value: getdate()`),
    __mj_CreatedAt: z.date().describe(`
        * * Field Name: __mj_CreatedAt
        * * Display Name: Created At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    __mj_UpdatedAt: z.date().describe(`
        * * Field Name: __mj_UpdatedAt
        * * Display Name: Updated At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    AIAgentId_Virtual: z.string().nullish().describe(`
        * * Field Name: AIAgentId_Virtual
        * * Display Name: AI Agent Id _ Virtual
        * * SQL Data Type: nvarchar(255)`),
});

export type AbstractLogsEntityType = z.infer<typeof AbstractLogsSchema>;

/**
 * zod schema definition for the entity Abstract Results
 */
export const AbstractResultSchema = z.object({
    ID: z.string().describe(`
        * * Field Name: ID
        * * Display Name: ID
        * * SQL Data Type: uniqueidentifier
        * * Default Value: newid()`),
    AbstractID: z.string().describe(`
        * * Field Name: AbstractID
        * * Display Name: Abstract ID
        * * SQL Data Type: uniqueidentifier`),
    Score: z.number().nullish().describe(`
        * * Field Name: Score
        * * Display Name: Score
        * * SQL Data Type: float(53)`),
    AbstractStatusId: z.string().describe(`
        * * Field Name: AbstractStatusId
        * * Display Name: Abstract Status Id
        * * SQL Data Type: uniqueidentifier
        * * Related Entity/Foreign Key: Abstract Status (vwAbstractStatus.ID)`),
    ReviewComments: z.string().nullish().describe(`
        * * Field Name: ReviewComments
        * * Display Name: Review Comments
        * * SQL Data Type: nvarchar(MAX)`),
    __mj_CreatedAt: z.date().describe(`
        * * Field Name: __mj_CreatedAt
        * * Display Name: Created At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    __mj_UpdatedAt: z.date().describe(`
        * * Field Name: __mj_UpdatedAt
        * * Display Name: Updated At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    AbstractStatusId_Virtual: z.string().describe(`
        * * Field Name: AbstractStatusId_Virtual
        * * Display Name: Abstract Status Id _ Virtual
        * * SQL Data Type: nvarchar(255)`),
});

export type AbstractResultEntityType = z.infer<typeof AbstractResultSchema>;

/**
 * zod schema definition for the entity Abstract Status
 */
export const AbstractStatusSchema = z.object({
    ID: z.string().describe(`
        * * Field Name: ID
        * * Display Name: ID
        * * SQL Data Type: uniqueidentifier
        * * Default Value: newid()`),
    Name: z.string().describe(`
        * * Field Name: Name
        * * Display Name: Name
        * * SQL Data Type: nvarchar(255)`),
    __mj_CreatedAt: z.date().describe(`
        * * Field Name: __mj_CreatedAt
        * * Display Name: Created At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    __mj_UpdatedAt: z.date().describe(`
        * * Field Name: __mj_UpdatedAt
        * * Display Name: Updated At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
});

export type AbstractStatusEntityType = z.infer<typeof AbstractStatusSchema>;

/**
 * zod schema definition for the entity Abstracts
 */
export const AbstractSchema = z.object({
    ID: z.string().describe(`
        * * Field Name: ID
        * * Display Name: ID
        * * SQL Data Type: uniqueidentifier
        * * Default Value: newid()`),
    SessionID: z.string().describe(`
        * * Field Name: SessionID
        * * Display Name: Session ID
        * * SQL Data Type: uniqueidentifier`),
    UserID: z.string().describe(`
        * * Field Name: UserID
        * * Display Name: User ID
        * * SQL Data Type: uniqueidentifier`),
    YearOfExp: z.number().nullish().describe(`
        * * Field Name: YearOfExp
        * * Display Name: Year Of Exp
        * * SQL Data Type: int`),
    AbstractText: z.string().nullish().describe(`
        * * Field Name: AbstractText
        * * Display Name: Abstract Text
        * * SQL Data Type: nvarchar(4000)`),
    UploadUrl: z.string().nullish().describe(`
        * * Field Name: UploadUrl
        * * Display Name: Upload Url
        * * SQL Data Type: nvarchar(500)`),
    FileName: z.string().nullish().describe(`
        * * Field Name: FileName
        * * Display Name: File Name
        * * SQL Data Type: nvarchar(200)`),
    __mj_CreatedAt: z.date().describe(`
        * * Field Name: __mj_CreatedAt
        * * Display Name: Created At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    __mj_UpdatedAt: z.date().describe(`
        * * Field Name: __mj_UpdatedAt
        * * Display Name: Updated At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
});

export type AbstractEntityType = z.infer<typeof AbstractSchema>;

/**
 * zod schema definition for the entity Email Templates
 */
export const EmailTemplateSchema = z.object({
    ID: z.string().describe(`
        * * Field Name: ID
        * * Display Name: ID
        * * SQL Data Type: uniqueidentifier
        * * Default Value: newid()`),
    Subject: z.string().describe(`
        * * Field Name: Subject
        * * Display Name: Subject
        * * SQL Data Type: nvarchar(255)`),
    Body: z.string().describe(`
        * * Field Name: Body
        * * Display Name: Body
        * * SQL Data Type: nvarchar(MAX)`),
    CreatedAt: z.date().nullish().describe(`
        * * Field Name: CreatedAt
        * * Display Name: Created At
        * * SQL Data Type: datetime
        * * Default Value: getdate()`),
    __mj_CreatedAt: z.date().describe(`
        * * Field Name: __mj_CreatedAt
        * * Display Name: Created At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    __mj_UpdatedAt: z.date().describe(`
        * * Field Name: __mj_UpdatedAt
        * * Display Name: Updated At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
});

export type EmailTemplateEntityType = z.infer<typeof EmailTemplateSchema>;

/**
 * zod schema definition for the entity Events
 */
export const EventSchema = z.object({
    ID: z.string().describe(`
        * * Field Name: ID
        * * Display Name: ID
        * * SQL Data Type: uniqueidentifier
        * * Default Value: newid()`),
    Name: z.string().describe(`
        * * Field Name: Name
        * * Display Name: Name
        * * SQL Data Type: nvarchar(255)`),
    EventStartDate: z.date().nullish().describe(`
        * * Field Name: EventStartDate
        * * Display Name: Event Start Date
        * * SQL Data Type: datetime`),
    EventEndDate: z.date().nullish().describe(`
        * * Field Name: EventEndDate
        * * Display Name: Event End Date
        * * SQL Data Type: datetime`),
    Description: z.string().nullish().describe(`
        * * Field Name: Description
        * * Display Name: Description
        * * SQL Data Type: nvarchar(255)`),
    __mj_CreatedAt: z.date().describe(`
        * * Field Name: __mj_CreatedAt
        * * Display Name: Created At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    __mj_UpdatedAt: z.date().describe(`
        * * Field Name: __mj_UpdatedAt
        * * Display Name: Updated At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
});

export type EventEntityType = z.infer<typeof EventSchema>;

/**
 * zod schema definition for the entity Review Criterias
 */
export const ReviewCriteriaSchema = z.object({
    ID: z.string().describe(`
        * * Field Name: ID
        * * Display Name: ID
        * * SQL Data Type: uniqueidentifier
        * * Default Value: newid()`),
    Name: z.string().nullish().describe(`
        * * Field Name: Name
        * * Display Name: Name
        * * SQL Data Type: nvarchar(255)`),
    Description: z.string().nullish().describe(`
        * * Field Name: Description
        * * Display Name: Description
        * * SQL Data Type: nvarchar(MAX)`),
    Weightage: z.number().describe(`
        * * Field Name: Weightage
        * * Display Name: Weightage
        * * SQL Data Type: int`),
    ScoreBoardID: z.string().describe(`
        * * Field Name: ScoreBoardID
        * * Display Name: Score Board ID
        * * SQL Data Type: uniqueidentifier
        * * Related Entity/Foreign Key: Score Boards (vwScoreBoards.ID)`),
    __mj_CreatedAt: z.date().describe(`
        * * Field Name: __mj_CreatedAt
        * * Display Name: Created At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    __mj_UpdatedAt: z.date().describe(`
        * * Field Name: __mj_UpdatedAt
        * * Display Name: Updated At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    ScoreBoard: z.string().nullish().describe(`
        * * Field Name: ScoreBoard
        * * Display Name: Score Board
        * * SQL Data Type: nvarchar(255)`),
});

export type ReviewCriteriaEntityType = z.infer<typeof ReviewCriteriaSchema>;

/**
 * zod schema definition for the entity Score Boards
 */
export const ScoreBoardSchema = z.object({
    ID: z.string().describe(`
        * * Field Name: ID
        * * Display Name: ID
        * * SQL Data Type: uniqueidentifier
        * * Default Value: newid()`),
    Name: z.string().nullish().describe(`
        * * Field Name: Name
        * * Display Name: Name
        * * SQL Data Type: nvarchar(255)`),
    Description: z.string().nullish().describe(`
        * * Field Name: Description
        * * Display Name: Description
        * * SQL Data Type: nvarchar(MAX)`),
    CutOffScore: z.number().describe(`
        * * Field Name: CutOffScore
        * * Display Name: Cut Off Score
        * * SQL Data Type: int`),
    __mj_CreatedAt: z.date().describe(`
        * * Field Name: __mj_CreatedAt
        * * Display Name: Created At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    __mj_UpdatedAt: z.date().describe(`
        * * Field Name: __mj_UpdatedAt
        * * Display Name: Updated At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
});

export type ScoreBoardEntityType = z.infer<typeof ScoreBoardSchema>;

/**
 * zod schema definition for the entity Session Score Boards
 */
export const SessionScoreBoardSchema = z.object({
    ID: z.string().describe(`
        * * Field Name: ID
        * * Display Name: ID
        * * SQL Data Type: uniqueidentifier
        * * Default Value: newid()`),
    SessionId: z.string().describe(`
        * * Field Name: SessionId
        * * Display Name: Session Id
        * * SQL Data Type: uniqueidentifier
        * * Related Entity/Foreign Key: Sessions (vwSessions.ID)`),
    ScoreBoardId: z.string().describe(`
        * * Field Name: ScoreBoardId
        * * Display Name: Score Board Id
        * * SQL Data Type: uniqueidentifier
        * * Related Entity/Foreign Key: Score Boards (vwScoreBoards.ID)`),
    __mj_CreatedAt: z.date().describe(`
        * * Field Name: __mj_CreatedAt
        * * Display Name: Created At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    __mj_UpdatedAt: z.date().describe(`
        * * Field Name: __mj_UpdatedAt
        * * Display Name: Updated At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    SessionId_Virtual: z.string().describe(`
        * * Field Name: SessionId_Virtual
        * * Display Name: Session Id _ Virtual
        * * SQL Data Type: nvarchar(255)`),
});

export type SessionScoreBoardEntityType = z.infer<typeof SessionScoreBoardSchema>;

/**
 * zod schema definition for the entity Sessions
 */
export const SessionSchema = z.object({
    ID: z.string().describe(`
        * * Field Name: ID
        * * Display Name: ID
        * * SQL Data Type: uniqueidentifier
        * * Default Value: newid()`),
    EventID: z.string().describe(`
        * * Field Name: EventID
        * * Display Name: Event ID
        * * SQL Data Type: uniqueidentifier
        * * Related Entity/Foreign Key: Events (vwEvents.ID)`),
    Name: z.string().describe(`
        * * Field Name: Name
        * * Display Name: Name
        * * SQL Data Type: nvarchar(255)`),
    SessionStartDate: z.date().nullish().describe(`
        * * Field Name: SessionStartDate
        * * Display Name: Session Start Date
        * * SQL Data Type: datetime`),
    SessionEndDate: z.date().nullish().describe(`
        * * Field Name: SessionEndDate
        * * Display Name: Session End Date
        * * SQL Data Type: datetime`),
    WeightedScore: z.number().nullish().describe(`
        * * Field Name: WeightedScore
        * * Display Name: Weighted Score
        * * SQL Data Type: decimal(10, 2)`),
    Title: z.string().nullish().describe(`
        * * Field Name: Title
        * * Display Name: Title
        * * SQL Data Type: nvarchar(200)`),
    UserPrompt: z.string().nullish().describe(`
        * * Field Name: UserPrompt
        * * Display Name: User Prompt
        * * SQL Data Type: nvarchar(MAX)`),
    AbstractSubmissionStartDate: z.date().nullish().describe(`
        * * Field Name: AbstractSubmissionStartDate
        * * Display Name: Abstract Submission Start Date
        * * SQL Data Type: datetime`),
    AbstractSubmissionEndDate: z.date().nullish().describe(`
        * * Field Name: AbstractSubmissionEndDate
        * * Display Name: Abstract Submission End Date
        * * SQL Data Type: datetime`),
    __mj_CreatedAt: z.date().describe(`
        * * Field Name: __mj_CreatedAt
        * * Display Name: Created At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    __mj_UpdatedAt: z.date().describe(`
        * * Field Name: __mj_UpdatedAt
        * * Display Name: Updated At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    UserPrompt1: z.string().nullish().describe(`
        * * Field Name: UserPrompt1
        * * Display Name: User Prompt 1
        * * SQL Data Type: nvarchar(MAX)`),
    UserPrompt2: z.string().nullish().describe(`
        * * Field Name: UserPrompt2
        * * Display Name: User Prompt 2
        * * SQL Data Type: nvarchar(MAX)`),
    Event: z.string().describe(`
        * * Field Name: Event
        * * Display Name: Event
        * * SQL Data Type: nvarchar(255)`),
});

export type SessionEntityType = z.infer<typeof SessionSchema>;

/**
 * zod schema definition for the entity User Personal Details
 */
export const UserPersonalDetailsSchema = z.object({
    ID: z.string().describe(`
        * * Field Name: ID
        * * Display Name: ID
        * * SQL Data Type: uniqueidentifier
        * * Default Value: newid()`),
    JobTitle: z.string().nullish().describe(`
        * * Field Name: JobTitle
        * * Display Name: Job Title
        * * SQL Data Type: nvarchar(50)`),
    PhoneNumber: z.string().nullish().describe(`
        * * Field Name: PhoneNumber
        * * Display Name: Phone Number
        * * SQL Data Type: nvarchar(20)`),
    Affiliation: z.string().nullish().describe(`
        * * Field Name: Affiliation
        * * Display Name: Affiliation
        * * SQL Data Type: nvarchar(50)`),
    SocialMediaLinks: z.string().nullish().describe(`
        * * Field Name: SocialMediaLinks
        * * Display Name: Social Media Links
        * * SQL Data Type: nvarchar(MAX)`),
    PreviousSpeakingExperiences: z.string().nullish().describe(`
        * * Field Name: PreviousSpeakingExperiences
        * * Display Name: Previous Speaking Experiences
        * * SQL Data Type: nvarchar(MAX)`),
    UserID: z.string().describe(`
        * * Field Name: UserID
        * * Display Name: User ID
        * * SQL Data Type: uniqueidentifier
        * * Related Entity/Foreign Key: Users (vwUsers.ID)`),
    __mj_CreatedAt: z.date().describe(`
        * * Field Name: __mj_CreatedAt
        * * Display Name: Created At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    __mj_UpdatedAt: z.date().describe(`
        * * Field Name: __mj_UpdatedAt
        * * Display Name: Updated At
        * * SQL Data Type: datetimeoffset
        * * Default Value: getutcdate()`),
    User: z.string().describe(`
        * * Field Name: User
        * * Display Name: User
        * * SQL Data Type: nvarchar(100)`),
});

export type UserPersonalDetailsEntityType = z.infer<typeof UserPersonalDetailsSchema>;
 
 

/**
 * Abstract Details Stagings - strongly typed entity sub-class
 * * Schema: dbo
 * * Base Table: AbstractDetailsStaging
 * * Base View: vwAbstractDetailsStagings
 * * Primary Key: ID
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Abstract Details Stagings')
export class AbstractDetailsStagingEntity extends BaseEntity<AbstractDetailsStagingEntityType> {
    /**
    * Loads the Abstract Details Stagings record from the database
    * @param ID: string - primary key value to load the Abstract Details Stagings record.
    * @param EntityRelationshipsToLoad - (optional) the relationships to load
    * @returns {Promise<boolean>} - true if successful, false otherwise
    * @public
    * @async
    * @memberof AbstractDetailsStagingEntity
    * @method
    * @override
    */
    public async Load(ID: string, EntityRelationshipsToLoad?: string[]) : Promise<boolean> {
        const compositeKey: CompositeKey = new CompositeKey();
        compositeKey.KeyValuePairs.push({ FieldName: 'ID', Value: ID });
        return await super.InnerLoad(compositeKey, EntityRelationshipsToLoad);
    }

    /**
    * * Field Name: ID
    * * Display Name: ID
    * * SQL Data Type: uniqueidentifier
    * * Default Value: newid()
    */
    get ID(): string {
        return this.Get('ID');
    }

    /**
    * * Field Name: AbstractID
    * * Display Name: Abstract ID
    * * SQL Data Type: uniqueidentifier
    * * Related Entity/Foreign Key: Abstracts (vwAbstracts.ID)
    */
    get AbstractID(): string {
        return this.Get('AbstractID');
    }
    set AbstractID(value: string) {
        this.Set('AbstractID', value);
    }

    /**
    * * Field Name: SessionID
    * * Display Name: Session ID
    * * SQL Data Type: uniqueidentifier
    * * Related Entity/Foreign Key: Sessions (vwSessions.ID)
    */
    get SessionID(): string {
        return this.Get('SessionID');
    }
    set SessionID(value: string) {
        this.Set('SessionID', value);
    }

    /**
    * * Field Name: UserID
    * * Display Name: User ID
    * * SQL Data Type: uniqueidentifier
    * * Related Entity/Foreign Key: Users (vwUsers.ID)
    */
    get UserID(): string {
        return this.Get('UserID');
    }
    set UserID(value: string) {
        this.Set('UserID', value);
    }

    /**
    * * Field Name: YearOfExp
    * * Display Name: Year Of Exp
    * * SQL Data Type: int
    */
    get YearOfExp(): number | null {
        return this.Get('YearOfExp');
    }
    set YearOfExp(value: number | null) {
        this.Set('YearOfExp', value);
    }

    /**
    * * Field Name: AbstractText
    * * Display Name: Abstract Text
    * * SQL Data Type: nvarchar(MAX)
    */
    get AbstractText(): string | null {
        return this.Get('AbstractText');
    }
    set AbstractText(value: string | null) {
        this.Set('AbstractText', value);
    }

    /**
    * * Field Name: UploadUrl
    * * Display Name: Upload Url
    * * SQL Data Type: nvarchar(255)
    */
    get UploadUrl(): string | null {
        return this.Get('UploadUrl');
    }
    set UploadUrl(value: string | null) {
        this.Set('UploadUrl', value);
    }

    /**
    * * Field Name: AbstractCreatedAt
    * * Display Name: Abstract Created At
    * * SQL Data Type: datetime
    */
    get AbstractCreatedAt(): Date | null {
        return this.Get('AbstractCreatedAt');
    }
    set AbstractCreatedAt(value: Date | null) {
        this.Set('AbstractCreatedAt', value);
    }

    /**
    * * Field Name: EventID
    * * Display Name: Event ID
    * * SQL Data Type: uniqueidentifier
    * * Related Entity/Foreign Key: Events (vwEvents.ID)
    */
    get EventID(): string {
        return this.Get('EventID');
    }
    set EventID(value: string) {
        this.Set('EventID', value);
    }

    /**
    * * Field Name: SessionName
    * * Display Name: Session Name
    * * SQL Data Type: nvarchar(255)
    */
    get SessionName(): string | null {
        return this.Get('SessionName');
    }
    set SessionName(value: string | null) {
        this.Set('SessionName', value);
    }

    /**
    * * Field Name: EventName
    * * Display Name: Event Name
    * * SQL Data Type: nvarchar(255)
    */
    get EventName(): string | null {
        return this.Get('EventName');
    }
    set EventName(value: string | null) {
        this.Set('EventName', value);
    }

    /**
    * * Field Name: FirstName
    * * Display Name: First Name
    * * SQL Data Type: nvarchar(100)
    */
    get FirstName(): string | null {
        return this.Get('FirstName');
    }
    set FirstName(value: string | null) {
        this.Set('FirstName', value);
    }

    /**
    * * Field Name: LastName
    * * Display Name: Last Name
    * * SQL Data Type: nvarchar(100)
    */
    get LastName(): string | null {
        return this.Get('LastName');
    }
    set LastName(value: string | null) {
        this.Set('LastName', value);
    }

    /**
    * * Field Name: UserTitle
    * * Display Name: User Title
    * * SQL Data Type: nvarchar(100)
    */
    get UserTitle(): string | null {
        return this.Get('UserTitle');
    }
    set UserTitle(value: string | null) {
        this.Set('UserTitle', value);
    }

    /**
    * * Field Name: UserEmail
    * * Display Name: User Email
    * * SQL Data Type: nvarchar(255)
    */
    get UserEmail(): string | null {
        return this.Get('UserEmail');
    }
    set UserEmail(value: string | null) {
        this.Set('UserEmail', value);
    }

    /**
    * * Field Name: UserType
    * * Display Name: User Type
    * * SQL Data Type: nvarchar(100)
    */
    get UserType(): string | null {
        return this.Get('UserType');
    }
    set UserType(value: string | null) {
        this.Set('UserType', value);
    }

    /**
    * * Field Name: IsActive
    * * Display Name: Is Active
    * * SQL Data Type: bit
    */
    get IsActive(): boolean | null {
        return this.Get('IsActive');
    }
    set IsActive(value: boolean | null) {
        this.Set('IsActive', value);
    }

    /**
    * * Field Name: PhoneNumber
    * * Display Name: Phone Number
    * * SQL Data Type: nvarchar(20)
    */
    get PhoneNumber(): string | null {
        return this.Get('PhoneNumber');
    }
    set PhoneNumber(value: string | null) {
        this.Set('PhoneNumber', value);
    }

    /**
    * * Field Name: AbstractResultID
    * * Display Name: Abstract Result ID
    * * SQL Data Type: uniqueidentifier
    * * Related Entity/Foreign Key: Abstract Results (vwAbstractResults.ID)
    */
    get AbstractResultID(): string {
        return this.Get('AbstractResultID');
    }
    set AbstractResultID(value: string) {
        this.Set('AbstractResultID', value);
    }

    /**
    * * Field Name: AbstractStatusId
    * * Display Name: Abstract Status Id
    * * SQL Data Type: uniqueidentifier
    * * Related Entity/Foreign Key: Abstract Status (vwAbstractStatus.ID)
    */
    get AbstractStatusId(): string {
        return this.Get('AbstractStatusId');
    }
    set AbstractStatusId(value: string) {
        this.Set('AbstractStatusId', value);
    }

    /**
    * * Field Name: AbstractStatusName
    * * Display Name: Abstract Status Name
    * * SQL Data Type: nvarchar(255)
    */
    get AbstractStatusName(): string | null {
        return this.Get('AbstractStatusName');
    }
    set AbstractStatusName(value: string | null) {
        this.Set('AbstractStatusName', value);
    }

    /**
    * * Field Name: __mj_CreatedAt
    * * Display Name: Created At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_CreatedAt(): Date {
        return this.Get('__mj_CreatedAt');
    }

    /**
    * * Field Name: __mj_UpdatedAt
    * * Display Name: Updated At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_UpdatedAt(): Date {
        return this.Get('__mj_UpdatedAt');
    }

    /**
    * * Field Name: Session
    * * Display Name: Session
    * * SQL Data Type: nvarchar(255)
    */
    get Session(): string {
        return this.Get('Session');
    }

    /**
    * * Field Name: User
    * * Display Name: User
    * * SQL Data Type: nvarchar(100)
    */
    get User(): string {
        return this.Get('User');
    }

    /**
    * * Field Name: Event
    * * Display Name: Event
    * * SQL Data Type: nvarchar(255)
    */
    get Event(): string {
        return this.Get('Event');
    }

    /**
    * * Field Name: AbstractStatusId_Virtual
    * * Display Name: Abstract Status Id _ Virtual
    * * SQL Data Type: nvarchar(255)
    */
    get AbstractStatusId_Virtual(): string {
        return this.Get('AbstractStatusId_Virtual');
    }
}


/**
 * Abstract Logs - strongly typed entity sub-class
 * * Schema: dbo
 * * Base Table: AbstractLogs
 * * Base View: vwAbstractLogs
 * * Primary Key: ID
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Abstract Logs')
export class AbstractLogsEntity extends BaseEntity<AbstractLogsEntityType> {
    /**
    * Loads the Abstract Logs record from the database
    * @param ID: string - primary key value to load the Abstract Logs record.
    * @param EntityRelationshipsToLoad - (optional) the relationships to load
    * @returns {Promise<boolean>} - true if successful, false otherwise
    * @public
    * @async
    * @memberof AbstractLogsEntity
    * @method
    * @override
    */
    public async Load(ID: string, EntityRelationshipsToLoad?: string[]) : Promise<boolean> {
        const compositeKey: CompositeKey = new CompositeKey();
        compositeKey.KeyValuePairs.push({ FieldName: 'ID', Value: ID });
        return await super.InnerLoad(compositeKey, EntityRelationshipsToLoad);
    }

    /**
    * * Field Name: ID
    * * Display Name: ID
    * * SQL Data Type: uniqueidentifier
    * * Default Value: newid()
    */
    get ID(): string {
        return this.Get('ID');
    }

    /**
    * * Field Name: AbstractResultId
    * * Display Name: Abstract Result Id
    * * SQL Data Type: uniqueidentifier
    * * Related Entity/Foreign Key: Abstract Results (vwAbstractResults.ID)
    */
    get AbstractResultId(): string {
        return this.Get('AbstractResultId');
    }
    set AbstractResultId(value: string) {
        this.Set('AbstractResultId', value);
    }

    /**
    * * Field Name: AIAgentId
    * * Display Name: AI Agent Id
    * * SQL Data Type: uniqueidentifier
    * * Related Entity/Foreign Key: AI Agents (vwAIAgents.ID)
    */
    get AIAgentId(): string {
        return this.Get('AIAgentId');
    }
    set AIAgentId(value: string) {
        this.Set('AIAgentId', value);
    }

    /**
    * * Field Name: ActionDescription
    * * Display Name: Action Description
    * * SQL Data Type: nvarchar(MAX)
    */
    get ActionDescription(): string | null {
        return this.Get('ActionDescription');
    }
    set ActionDescription(value: string | null) {
        this.Set('ActionDescription', value);
    }

    /**
    * * Field Name: UpdatedOn
    * * Display Name: Updated On
    * * SQL Data Type: datetime
    * * Default Value: getdate()
    */
    get UpdatedOn(): Date | null {
        return this.Get('UpdatedOn');
    }
    set UpdatedOn(value: Date | null) {
        this.Set('UpdatedOn', value);
    }

    /**
    * * Field Name: __mj_CreatedAt
    * * Display Name: Created At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_CreatedAt(): Date {
        return this.Get('__mj_CreatedAt');
    }

    /**
    * * Field Name: __mj_UpdatedAt
    * * Display Name: Updated At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_UpdatedAt(): Date {
        return this.Get('__mj_UpdatedAt');
    }

    /**
    * * Field Name: AIAgentId_Virtual
    * * Display Name: AI Agent Id _ Virtual
    * * SQL Data Type: nvarchar(255)
    */
    get AIAgentId_Virtual(): string | null {
        return this.Get('AIAgentId_Virtual');
    }
}


/**
 * Abstract Results - strongly typed entity sub-class
 * * Schema: dbo
 * * Base Table: AbstractResult
 * * Base View: vwAbstractResults
 * * Primary Key: ID
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Abstract Results')
export class AbstractResultEntity extends BaseEntity<AbstractResultEntityType> {
    /**
    * Loads the Abstract Results record from the database
    * @param ID: string - primary key value to load the Abstract Results record.
    * @param EntityRelationshipsToLoad - (optional) the relationships to load
    * @returns {Promise<boolean>} - true if successful, false otherwise
    * @public
    * @async
    * @memberof AbstractResultEntity
    * @method
    * @override
    */
    public async Load(ID: string, EntityRelationshipsToLoad?: string[]) : Promise<boolean> {
        const compositeKey: CompositeKey = new CompositeKey();
        compositeKey.KeyValuePairs.push({ FieldName: 'ID', Value: ID });
        return await super.InnerLoad(compositeKey, EntityRelationshipsToLoad);
    }

    /**
    * * Field Name: ID
    * * Display Name: ID
    * * SQL Data Type: uniqueidentifier
    * * Default Value: newid()
    */
    get ID(): string {
        return this.Get('ID');
    }

    /**
    * * Field Name: AbstractID
    * * Display Name: Abstract ID
    * * SQL Data Type: uniqueidentifier
    */
    get AbstractID(): string {
        return this.Get('AbstractID');
    }
    set AbstractID(value: string) {
        this.Set('AbstractID', value);
    }

    /**
    * * Field Name: Score
    * * Display Name: Score
    * * SQL Data Type: float(53)
    */
    get Score(): number | null {
        return this.Get('Score');
    }
    set Score(value: number | null) {
        this.Set('Score', value);
    }

    /**
    * * Field Name: AbstractStatusId
    * * Display Name: Abstract Status Id
    * * SQL Data Type: uniqueidentifier
    * * Related Entity/Foreign Key: Abstract Status (vwAbstractStatus.ID)
    */
    get AbstractStatusId(): string {
        return this.Get('AbstractStatusId');
    }
    set AbstractStatusId(value: string) {
        this.Set('AbstractStatusId', value);
    }

    /**
    * * Field Name: ReviewComments
    * * Display Name: Review Comments
    * * SQL Data Type: nvarchar(MAX)
    */
    get ReviewComments(): string | null {
        return this.Get('ReviewComments');
    }
    set ReviewComments(value: string | null) {
        this.Set('ReviewComments', value);
    }

    /**
    * * Field Name: __mj_CreatedAt
    * * Display Name: Created At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_CreatedAt(): Date {
        return this.Get('__mj_CreatedAt');
    }

    /**
    * * Field Name: __mj_UpdatedAt
    * * Display Name: Updated At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_UpdatedAt(): Date {
        return this.Get('__mj_UpdatedAt');
    }

    /**
    * * Field Name: AbstractStatusId_Virtual
    * * Display Name: Abstract Status Id _ Virtual
    * * SQL Data Type: nvarchar(255)
    */
    get AbstractStatusId_Virtual(): string {
        return this.Get('AbstractStatusId_Virtual');
    }
}


/**
 * Abstract Status - strongly typed entity sub-class
 * * Schema: dbo
 * * Base Table: AbstractStatus
 * * Base View: vwAbstractStatus
 * * Primary Key: ID
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Abstract Status')
export class AbstractStatusEntity extends BaseEntity<AbstractStatusEntityType> {
    /**
    * Loads the Abstract Status record from the database
    * @param ID: string - primary key value to load the Abstract Status record.
    * @param EntityRelationshipsToLoad - (optional) the relationships to load
    * @returns {Promise<boolean>} - true if successful, false otherwise
    * @public
    * @async
    * @memberof AbstractStatusEntity
    * @method
    * @override
    */
    public async Load(ID: string, EntityRelationshipsToLoad?: string[]) : Promise<boolean> {
        const compositeKey: CompositeKey = new CompositeKey();
        compositeKey.KeyValuePairs.push({ FieldName: 'ID', Value: ID });
        return await super.InnerLoad(compositeKey, EntityRelationshipsToLoad);
    }

    /**
    * * Field Name: ID
    * * Display Name: ID
    * * SQL Data Type: uniqueidentifier
    * * Default Value: newid()
    */
    get ID(): string {
        return this.Get('ID');
    }

    /**
    * * Field Name: Name
    * * Display Name: Name
    * * SQL Data Type: nvarchar(255)
    */
    get Name(): string {
        return this.Get('Name');
    }
    set Name(value: string) {
        this.Set('Name', value);
    }

    /**
    * * Field Name: __mj_CreatedAt
    * * Display Name: Created At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_CreatedAt(): Date {
        return this.Get('__mj_CreatedAt');
    }

    /**
    * * Field Name: __mj_UpdatedAt
    * * Display Name: Updated At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_UpdatedAt(): Date {
        return this.Get('__mj_UpdatedAt');
    }
}


/**
 * Abstracts - strongly typed entity sub-class
 * * Schema: dbo
 * * Base Table: Abstract
 * * Base View: vwAbstracts
 * * Primary Key: ID
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Abstracts')
export class AbstractEntity extends BaseEntity<AbstractEntityType> {
    /**
    * Loads the Abstracts record from the database
    * @param ID: string - primary key value to load the Abstracts record.
    * @param EntityRelationshipsToLoad - (optional) the relationships to load
    * @returns {Promise<boolean>} - true if successful, false otherwise
    * @public
    * @async
    * @memberof AbstractEntity
    * @method
    * @override
    */
    public async Load(ID: string, EntityRelationshipsToLoad?: string[]) : Promise<boolean> {
        const compositeKey: CompositeKey = new CompositeKey();
        compositeKey.KeyValuePairs.push({ FieldName: 'ID', Value: ID });
        return await super.InnerLoad(compositeKey, EntityRelationshipsToLoad);
    }

    /**
    * * Field Name: ID
    * * Display Name: ID
    * * SQL Data Type: uniqueidentifier
    * * Default Value: newid()
    */
    get ID(): string {
        return this.Get('ID');
    }

    /**
    * * Field Name: SessionID
    * * Display Name: Session ID
    * * SQL Data Type: uniqueidentifier
    */
    get SessionID(): string {
        return this.Get('SessionID');
    }
    set SessionID(value: string) {
        this.Set('SessionID', value);
    }

    /**
    * * Field Name: UserID
    * * Display Name: User ID
    * * SQL Data Type: uniqueidentifier
    */
    get UserID(): string {
        return this.Get('UserID');
    }
    set UserID(value: string) {
        this.Set('UserID', value);
    }

    /**
    * * Field Name: YearOfExp
    * * Display Name: Year Of Exp
    * * SQL Data Type: int
    */
    get YearOfExp(): number | null {
        return this.Get('YearOfExp');
    }
    set YearOfExp(value: number | null) {
        this.Set('YearOfExp', value);
    }

    /**
    * * Field Name: AbstractText
    * * Display Name: Abstract Text
    * * SQL Data Type: nvarchar(4000)
    */
    get AbstractText(): string | null {
        return this.Get('AbstractText');
    }
    set AbstractText(value: string | null) {
        this.Set('AbstractText', value);
    }

    /**
    * * Field Name: UploadUrl
    * * Display Name: Upload Url
    * * SQL Data Type: nvarchar(500)
    */
    get UploadUrl(): string | null {
        return this.Get('UploadUrl');
    }
    set UploadUrl(value: string | null) {
        this.Set('UploadUrl', value);
    }

    /**
    * * Field Name: FileName
    * * Display Name: File Name
    * * SQL Data Type: nvarchar(200)
    */
    get FileName(): string | null {
        return this.Get('FileName');
    }
    set FileName(value: string | null) {
        this.Set('FileName', value);
    }

    /**
    * * Field Name: __mj_CreatedAt
    * * Display Name: Created At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_CreatedAt(): Date {
        return this.Get('__mj_CreatedAt');
    }

    /**
    * * Field Name: __mj_UpdatedAt
    * * Display Name: Updated At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_UpdatedAt(): Date {
        return this.Get('__mj_UpdatedAt');
    }
}


/**
 * Email Templates - strongly typed entity sub-class
 * * Schema: dbo
 * * Base Table: EmailTemplate
 * * Base View: vwEmailTemplates
 * * Primary Key: ID
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Email Templates')
export class EmailTemplateEntity extends BaseEntity<EmailTemplateEntityType> {
    /**
    * Loads the Email Templates record from the database
    * @param ID: string - primary key value to load the Email Templates record.
    * @param EntityRelationshipsToLoad - (optional) the relationships to load
    * @returns {Promise<boolean>} - true if successful, false otherwise
    * @public
    * @async
    * @memberof EmailTemplateEntity
    * @method
    * @override
    */
    public async Load(ID: string, EntityRelationshipsToLoad?: string[]) : Promise<boolean> {
        const compositeKey: CompositeKey = new CompositeKey();
        compositeKey.KeyValuePairs.push({ FieldName: 'ID', Value: ID });
        return await super.InnerLoad(compositeKey, EntityRelationshipsToLoad);
    }

    /**
    * * Field Name: ID
    * * Display Name: ID
    * * SQL Data Type: uniqueidentifier
    * * Default Value: newid()
    */
    get ID(): string {
        return this.Get('ID');
    }

    /**
    * * Field Name: Subject
    * * Display Name: Subject
    * * SQL Data Type: nvarchar(255)
    */
    get Subject(): string {
        return this.Get('Subject');
    }
    set Subject(value: string) {
        this.Set('Subject', value);
    }

    /**
    * * Field Name: Body
    * * Display Name: Body
    * * SQL Data Type: nvarchar(MAX)
    */
    get Body(): string {
        return this.Get('Body');
    }
    set Body(value: string) {
        this.Set('Body', value);
    }

    /**
    * * Field Name: CreatedAt
    * * Display Name: Created At
    * * SQL Data Type: datetime
    * * Default Value: getdate()
    */
    get CreatedAt(): Date | null {
        return this.Get('CreatedAt');
    }
    set CreatedAt(value: Date | null) {
        this.Set('CreatedAt', value);
    }

    /**
    * * Field Name: __mj_CreatedAt
    * * Display Name: Created At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_CreatedAt(): Date {
        return this.Get('__mj_CreatedAt');
    }

    /**
    * * Field Name: __mj_UpdatedAt
    * * Display Name: Updated At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_UpdatedAt(): Date {
        return this.Get('__mj_UpdatedAt');
    }
}


/**
 * Events - strongly typed entity sub-class
 * * Schema: dbo
 * * Base Table: Event
 * * Base View: vwEvents
 * * Primary Key: ID
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Events')
export class EventEntity extends BaseEntity<EventEntityType> {
    /**
    * Loads the Events record from the database
    * @param ID: string - primary key value to load the Events record.
    * @param EntityRelationshipsToLoad - (optional) the relationships to load
    * @returns {Promise<boolean>} - true if successful, false otherwise
    * @public
    * @async
    * @memberof EventEntity
    * @method
    * @override
    */
    public async Load(ID: string, EntityRelationshipsToLoad?: string[]) : Promise<boolean> {
        const compositeKey: CompositeKey = new CompositeKey();
        compositeKey.KeyValuePairs.push({ FieldName: 'ID', Value: ID });
        return await super.InnerLoad(compositeKey, EntityRelationshipsToLoad);
    }

    /**
    * * Field Name: ID
    * * Display Name: ID
    * * SQL Data Type: uniqueidentifier
    * * Default Value: newid()
    */
    get ID(): string {
        return this.Get('ID');
    }

    /**
    * * Field Name: Name
    * * Display Name: Name
    * * SQL Data Type: nvarchar(255)
    */
    get Name(): string {
        return this.Get('Name');
    }
    set Name(value: string) {
        this.Set('Name', value);
    }

    /**
    * * Field Name: EventStartDate
    * * Display Name: Event Start Date
    * * SQL Data Type: datetime
    */
    get EventStartDate(): Date | null {
        return this.Get('EventStartDate');
    }
    set EventStartDate(value: Date | null) {
        this.Set('EventStartDate', value);
    }

    /**
    * * Field Name: EventEndDate
    * * Display Name: Event End Date
    * * SQL Data Type: datetime
    */
    get EventEndDate(): Date | null {
        return this.Get('EventEndDate');
    }
    set EventEndDate(value: Date | null) {
        this.Set('EventEndDate', value);
    }

    /**
    * * Field Name: Description
    * * Display Name: Description
    * * SQL Data Type: nvarchar(255)
    */
    get Description(): string | null {
        return this.Get('Description');
    }
    set Description(value: string | null) {
        this.Set('Description', value);
    }

    /**
    * * Field Name: __mj_CreatedAt
    * * Display Name: Created At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_CreatedAt(): Date {
        return this.Get('__mj_CreatedAt');
    }

    /**
    * * Field Name: __mj_UpdatedAt
    * * Display Name: Updated At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_UpdatedAt(): Date {
        return this.Get('__mj_UpdatedAt');
    }
}


/**
 * Review Criterias - strongly typed entity sub-class
 * * Schema: dbo
 * * Base Table: ReviewCriteria
 * * Base View: vwReviewCriterias
 * * Primary Key: ID
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Review Criterias')
export class ReviewCriteriaEntity extends BaseEntity<ReviewCriteriaEntityType> {
    /**
    * Loads the Review Criterias record from the database
    * @param ID: string - primary key value to load the Review Criterias record.
    * @param EntityRelationshipsToLoad - (optional) the relationships to load
    * @returns {Promise<boolean>} - true if successful, false otherwise
    * @public
    * @async
    * @memberof ReviewCriteriaEntity
    * @method
    * @override
    */
    public async Load(ID: string, EntityRelationshipsToLoad?: string[]) : Promise<boolean> {
        const compositeKey: CompositeKey = new CompositeKey();
        compositeKey.KeyValuePairs.push({ FieldName: 'ID', Value: ID });
        return await super.InnerLoad(compositeKey, EntityRelationshipsToLoad);
    }

    /**
    * * Field Name: ID
    * * Display Name: ID
    * * SQL Data Type: uniqueidentifier
    * * Default Value: newid()
    */
    get ID(): string {
        return this.Get('ID');
    }

    /**
    * * Field Name: Name
    * * Display Name: Name
    * * SQL Data Type: nvarchar(255)
    */
    get Name(): string | null {
        return this.Get('Name');
    }
    set Name(value: string | null) {
        this.Set('Name', value);
    }

    /**
    * * Field Name: Description
    * * Display Name: Description
    * * SQL Data Type: nvarchar(MAX)
    */
    get Description(): string | null {
        return this.Get('Description');
    }
    set Description(value: string | null) {
        this.Set('Description', value);
    }

    /**
    * * Field Name: Weightage
    * * Display Name: Weightage
    * * SQL Data Type: int
    */
    get Weightage(): number {
        return this.Get('Weightage');
    }
    set Weightage(value: number) {
        this.Set('Weightage', value);
    }

    /**
    * * Field Name: ScoreBoardID
    * * Display Name: Score Board ID
    * * SQL Data Type: uniqueidentifier
    * * Related Entity/Foreign Key: Score Boards (vwScoreBoards.ID)
    */
    get ScoreBoardID(): string {
        return this.Get('ScoreBoardID');
    }
    set ScoreBoardID(value: string) {
        this.Set('ScoreBoardID', value);
    }

    /**
    * * Field Name: __mj_CreatedAt
    * * Display Name: Created At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_CreatedAt(): Date {
        return this.Get('__mj_CreatedAt');
    }

    /**
    * * Field Name: __mj_UpdatedAt
    * * Display Name: Updated At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_UpdatedAt(): Date {
        return this.Get('__mj_UpdatedAt');
    }

    /**
    * * Field Name: ScoreBoard
    * * Display Name: Score Board
    * * SQL Data Type: nvarchar(255)
    */
    get ScoreBoard(): string | null {
        return this.Get('ScoreBoard');
    }
}


/**
 * Score Boards - strongly typed entity sub-class
 * * Schema: dbo
 * * Base Table: ScoreBoard
 * * Base View: vwScoreBoards
 * * Primary Key: ID
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Score Boards')
export class ScoreBoardEntity extends BaseEntity<ScoreBoardEntityType> {
    /**
    * Loads the Score Boards record from the database
    * @param ID: string - primary key value to load the Score Boards record.
    * @param EntityRelationshipsToLoad - (optional) the relationships to load
    * @returns {Promise<boolean>} - true if successful, false otherwise
    * @public
    * @async
    * @memberof ScoreBoardEntity
    * @method
    * @override
    */
    public async Load(ID: string, EntityRelationshipsToLoad?: string[]) : Promise<boolean> {
        const compositeKey: CompositeKey = new CompositeKey();
        compositeKey.KeyValuePairs.push({ FieldName: 'ID', Value: ID });
        return await super.InnerLoad(compositeKey, EntityRelationshipsToLoad);
    }

    /**
    * * Field Name: ID
    * * Display Name: ID
    * * SQL Data Type: uniqueidentifier
    * * Default Value: newid()
    */
    get ID(): string {
        return this.Get('ID');
    }

    /**
    * * Field Name: Name
    * * Display Name: Name
    * * SQL Data Type: nvarchar(255)
    */
    get Name(): string | null {
        return this.Get('Name');
    }
    set Name(value: string | null) {
        this.Set('Name', value);
    }

    /**
    * * Field Name: Description
    * * Display Name: Description
    * * SQL Data Type: nvarchar(MAX)
    */
    get Description(): string | null {
        return this.Get('Description');
    }
    set Description(value: string | null) {
        this.Set('Description', value);
    }

    /**
    * * Field Name: CutOffScore
    * * Display Name: Cut Off Score
    * * SQL Data Type: int
    */
    get CutOffScore(): number {
        return this.Get('CutOffScore');
    }
    set CutOffScore(value: number) {
        this.Set('CutOffScore', value);
    }

    /**
    * * Field Name: __mj_CreatedAt
    * * Display Name: Created At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_CreatedAt(): Date {
        return this.Get('__mj_CreatedAt');
    }

    /**
    * * Field Name: __mj_UpdatedAt
    * * Display Name: Updated At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_UpdatedAt(): Date {
        return this.Get('__mj_UpdatedAt');
    }
}


/**
 * Session Score Boards - strongly typed entity sub-class
 * * Schema: dbo
 * * Base Table: SessionScoreBoard
 * * Base View: vwSessionScoreBoards
 * * Primary Key: ID
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Session Score Boards')
export class SessionScoreBoardEntity extends BaseEntity<SessionScoreBoardEntityType> {
    /**
    * Loads the Session Score Boards record from the database
    * @param ID: string - primary key value to load the Session Score Boards record.
    * @param EntityRelationshipsToLoad - (optional) the relationships to load
    * @returns {Promise<boolean>} - true if successful, false otherwise
    * @public
    * @async
    * @memberof SessionScoreBoardEntity
    * @method
    * @override
    */
    public async Load(ID: string, EntityRelationshipsToLoad?: string[]) : Promise<boolean> {
        const compositeKey: CompositeKey = new CompositeKey();
        compositeKey.KeyValuePairs.push({ FieldName: 'ID', Value: ID });
        return await super.InnerLoad(compositeKey, EntityRelationshipsToLoad);
    }

    /**
    * * Field Name: ID
    * * Display Name: ID
    * * SQL Data Type: uniqueidentifier
    * * Default Value: newid()
    */
    get ID(): string {
        return this.Get('ID');
    }

    /**
    * * Field Name: SessionId
    * * Display Name: Session Id
    * * SQL Data Type: uniqueidentifier
    * * Related Entity/Foreign Key: Sessions (vwSessions.ID)
    */
    get SessionId(): string {
        return this.Get('SessionId');
    }
    set SessionId(value: string) {
        this.Set('SessionId', value);
    }

    /**
    * * Field Name: ScoreBoardId
    * * Display Name: Score Board Id
    * * SQL Data Type: uniqueidentifier
    * * Related Entity/Foreign Key: Score Boards (vwScoreBoards.ID)
    */
    get ScoreBoardId(): string {
        return this.Get('ScoreBoardId');
    }
    set ScoreBoardId(value: string) {
        this.Set('ScoreBoardId', value);
    }

    /**
    * * Field Name: __mj_CreatedAt
    * * Display Name: Created At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_CreatedAt(): Date {
        return this.Get('__mj_CreatedAt');
    }

    /**
    * * Field Name: __mj_UpdatedAt
    * * Display Name: Updated At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_UpdatedAt(): Date {
        return this.Get('__mj_UpdatedAt');
    }

    /**
    * * Field Name: SessionId_Virtual
    * * Display Name: Session Id _ Virtual
    * * SQL Data Type: nvarchar(255)
    */
    get SessionId_Virtual(): string {
        return this.Get('SessionId_Virtual');
    }
}


/**
 * Sessions - strongly typed entity sub-class
 * * Schema: dbo
 * * Base Table: Session
 * * Base View: vwSessions
 * * Primary Key: ID
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'Sessions')
export class SessionEntity extends BaseEntity<SessionEntityType> {
    /**
    * Loads the Sessions record from the database
    * @param ID: string - primary key value to load the Sessions record.
    * @param EntityRelationshipsToLoad - (optional) the relationships to load
    * @returns {Promise<boolean>} - true if successful, false otherwise
    * @public
    * @async
    * @memberof SessionEntity
    * @method
    * @override
    */
    public async Load(ID: string, EntityRelationshipsToLoad?: string[]) : Promise<boolean> {
        const compositeKey: CompositeKey = new CompositeKey();
        compositeKey.KeyValuePairs.push({ FieldName: 'ID', Value: ID });
        return await super.InnerLoad(compositeKey, EntityRelationshipsToLoad);
    }

    /**
    * * Field Name: ID
    * * Display Name: ID
    * * SQL Data Type: uniqueidentifier
    * * Default Value: newid()
    */
    get ID(): string {
        return this.Get('ID');
    }

    /**
    * * Field Name: EventID
    * * Display Name: Event ID
    * * SQL Data Type: uniqueidentifier
    * * Related Entity/Foreign Key: Events (vwEvents.ID)
    */
    get EventID(): string {
        return this.Get('EventID');
    }
    set EventID(value: string) {
        this.Set('EventID', value);
    }

    /**
    * * Field Name: Name
    * * Display Name: Name
    * * SQL Data Type: nvarchar(255)
    */
    get Name(): string {
        return this.Get('Name');
    }
    set Name(value: string) {
        this.Set('Name', value);
    }

    /**
    * * Field Name: SessionStartDate
    * * Display Name: Session Start Date
    * * SQL Data Type: datetime
    */
    get SessionStartDate(): Date | null {
        return this.Get('SessionStartDate');
    }
    set SessionStartDate(value: Date | null) {
        this.Set('SessionStartDate', value);
    }

    /**
    * * Field Name: SessionEndDate
    * * Display Name: Session End Date
    * * SQL Data Type: datetime
    */
    get SessionEndDate(): Date | null {
        return this.Get('SessionEndDate');
    }
    set SessionEndDate(value: Date | null) {
        this.Set('SessionEndDate', value);
    }

    /**
    * * Field Name: WeightedScore
    * * Display Name: Weighted Score
    * * SQL Data Type: decimal(10, 2)
    */
    get WeightedScore(): number | null {
        return this.Get('WeightedScore');
    }
    set WeightedScore(value: number | null) {
        this.Set('WeightedScore', value);
    }

    /**
    * * Field Name: Title
    * * Display Name: Title
    * * SQL Data Type: nvarchar(200)
    */
    get Title(): string | null {
        return this.Get('Title');
    }
    set Title(value: string | null) {
        this.Set('Title', value);
    }

    /**
    * * Field Name: UserPrompt
    * * Display Name: User Prompt
    * * SQL Data Type: nvarchar(MAX)
    */
    get UserPrompt(): string | null {
        return this.Get('UserPrompt');
    }
    set UserPrompt(value: string | null) {
        this.Set('UserPrompt', value);
    }

    /**
    * * Field Name: AbstractSubmissionStartDate
    * * Display Name: Abstract Submission Start Date
    * * SQL Data Type: datetime
    */
    get AbstractSubmissionStartDate(): Date | null {
        return this.Get('AbstractSubmissionStartDate');
    }
    set AbstractSubmissionStartDate(value: Date | null) {
        this.Set('AbstractSubmissionStartDate', value);
    }

    /**
    * * Field Name: AbstractSubmissionEndDate
    * * Display Name: Abstract Submission End Date
    * * SQL Data Type: datetime
    */
    get AbstractSubmissionEndDate(): Date | null {
        return this.Get('AbstractSubmissionEndDate');
    }
    set AbstractSubmissionEndDate(value: Date | null) {
        this.Set('AbstractSubmissionEndDate', value);
    }

    /**
    * * Field Name: __mj_CreatedAt
    * * Display Name: Created At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_CreatedAt(): Date {
        return this.Get('__mj_CreatedAt');
    }

    /**
    * * Field Name: __mj_UpdatedAt
    * * Display Name: Updated At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_UpdatedAt(): Date {
        return this.Get('__mj_UpdatedAt');
    }

    /**
    * * Field Name: UserPrompt1
    * * Display Name: User Prompt 1
    * * SQL Data Type: nvarchar(MAX)
    */
    get UserPrompt1(): string | null {
        return this.Get('UserPrompt1');
    }
    set UserPrompt1(value: string | null) {
        this.Set('UserPrompt1', value);
    }

    /**
    * * Field Name: UserPrompt2
    * * Display Name: User Prompt 2
    * * SQL Data Type: nvarchar(MAX)
    */
    get UserPrompt2(): string | null {
        return this.Get('UserPrompt2');
    }
    set UserPrompt2(value: string | null) {
        this.Set('UserPrompt2', value);
    }

    /**
    * * Field Name: Event
    * * Display Name: Event
    * * SQL Data Type: nvarchar(255)
    */
    get Event(): string {
        return this.Get('Event');
    }
}


/**
 * User Personal Details - strongly typed entity sub-class
 * * Schema: dbo
 * * Base Table: UserPersonalDetails
 * * Base View: vwUserPersonalDetails
 * * Primary Key: ID
 * @extends {BaseEntity}
 * @class
 * @public
 */
@RegisterClass(BaseEntity, 'User Personal Details')
export class UserPersonalDetailsEntity extends BaseEntity<UserPersonalDetailsEntityType> {
    /**
    * Loads the User Personal Details record from the database
    * @param ID: string - primary key value to load the User Personal Details record.
    * @param EntityRelationshipsToLoad - (optional) the relationships to load
    * @returns {Promise<boolean>} - true if successful, false otherwise
    * @public
    * @async
    * @memberof UserPersonalDetailsEntity
    * @method
    * @override
    */
    public async Load(ID: string, EntityRelationshipsToLoad?: string[]) : Promise<boolean> {
        const compositeKey: CompositeKey = new CompositeKey();
        compositeKey.KeyValuePairs.push({ FieldName: 'ID', Value: ID });
        return await super.InnerLoad(compositeKey, EntityRelationshipsToLoad);
    }

    /**
    * * Field Name: ID
    * * Display Name: ID
    * * SQL Data Type: uniqueidentifier
    * * Default Value: newid()
    */
    get ID(): string {
        return this.Get('ID');
    }

    /**
    * * Field Name: JobTitle
    * * Display Name: Job Title
    * * SQL Data Type: nvarchar(50)
    */
    get JobTitle(): string | null {
        return this.Get('JobTitle');
    }
    set JobTitle(value: string | null) {
        this.Set('JobTitle', value);
    }

    /**
    * * Field Name: PhoneNumber
    * * Display Name: Phone Number
    * * SQL Data Type: nvarchar(20)
    */
    get PhoneNumber(): string | null {
        return this.Get('PhoneNumber');
    }
    set PhoneNumber(value: string | null) {
        this.Set('PhoneNumber', value);
    }

    /**
    * * Field Name: Affiliation
    * * Display Name: Affiliation
    * * SQL Data Type: nvarchar(50)
    */
    get Affiliation(): string | null {
        return this.Get('Affiliation');
    }
    set Affiliation(value: string | null) {
        this.Set('Affiliation', value);
    }

    /**
    * * Field Name: SocialMediaLinks
    * * Display Name: Social Media Links
    * * SQL Data Type: nvarchar(MAX)
    */
    get SocialMediaLinks(): string | null {
        return this.Get('SocialMediaLinks');
    }
    set SocialMediaLinks(value: string | null) {
        this.Set('SocialMediaLinks', value);
    }

    /**
    * * Field Name: PreviousSpeakingExperiences
    * * Display Name: Previous Speaking Experiences
    * * SQL Data Type: nvarchar(MAX)
    */
    get PreviousSpeakingExperiences(): string | null {
        return this.Get('PreviousSpeakingExperiences');
    }
    set PreviousSpeakingExperiences(value: string | null) {
        this.Set('PreviousSpeakingExperiences', value);
    }

    /**
    * * Field Name: UserID
    * * Display Name: User ID
    * * SQL Data Type: uniqueidentifier
    * * Related Entity/Foreign Key: Users (vwUsers.ID)
    */
    get UserID(): string {
        return this.Get('UserID');
    }
    set UserID(value: string) {
        this.Set('UserID', value);
    }

    /**
    * * Field Name: __mj_CreatedAt
    * * Display Name: Created At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_CreatedAt(): Date {
        return this.Get('__mj_CreatedAt');
    }

    /**
    * * Field Name: __mj_UpdatedAt
    * * Display Name: Updated At
    * * SQL Data Type: datetimeoffset
    * * Default Value: getutcdate()
    */
    get __mj_UpdatedAt(): Date {
        return this.Get('__mj_UpdatedAt');
    }

    /**
    * * Field Name: User
    * * Display Name: User
    * * SQL Data Type: nvarchar(100)
    */
    get User(): string {
        return this.Get('User');
    }
}
