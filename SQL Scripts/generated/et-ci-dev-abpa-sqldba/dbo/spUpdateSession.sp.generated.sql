-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Sessions
-- Item: spUpdateSession
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- UPDATE PROCEDURE FOR Session
------------------------------------------------------------
DROP PROCEDURE IF EXISTS [dbo].[spUpdateSession]
GO

CREATE PROCEDURE [dbo].[spUpdateSession]
    @ID uniqueidentifier,
    @EventID uniqueidentifier,
    @Name nvarchar(255),
    @SessionStartDate datetime,
    @SessionEndDate datetime,
    @WeightedScore decimal(10, 2),
    @Title nvarchar(200),
    @UserPrompt nvarchar(MAX),
    @AbstractSubmissionStartDate datetime,
    @AbstractSubmissionEndDate datetime,
    @UserPrompt1 nvarchar(MAX),
    @UserPrompt2 nvarchar(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE
        [dbo].[Session]
    SET
        [EventID] = @EventID,
        [Name] = @Name,
        [SessionStartDate] = @SessionStartDate,
        [SessionEndDate] = @SessionEndDate,
        [WeightedScore] = @WeightedScore,
        [Title] = @Title,
        [UserPrompt] = @UserPrompt,
        [AbstractSubmissionStartDate] = @AbstractSubmissionStartDate,
        [AbstractSubmissionEndDate] = @AbstractSubmissionEndDate,
        [UserPrompt1] = @UserPrompt1,
        [UserPrompt2] = @UserPrompt2
    WHERE
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT
                                        *
                                    FROM
                                        [dbo].[vwSessions]
                                    WHERE
                                        [ID] = @ID
                                    
END
GO

GRANT EXECUTE ON [dbo].[spUpdateSession] TO [cdp_Developer], [cdp_Integration]
GO

------------------------------------------------------------
----- TRIGGER FOR __mj_UpdatedAt field for the Session table
------------------------------------------------------------
DROP TRIGGER IF EXISTS [dbo].trgUpdateSession
GO
CREATE TRIGGER [dbo].trgUpdateSession
ON [dbo].[Session]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE
        [dbo].[Session]
    SET
        __mj_UpdatedAt = GETUTCDATE()
    FROM
        [dbo].[Session] AS _organicTable
    INNER JOIN
        INSERTED AS I ON
        _organicTable.[ID] = I.[ID];
END;
GO
        