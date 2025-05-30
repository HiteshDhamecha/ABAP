-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Session Score Boards
-- Item: spCreateSessionScoreBoard
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- CREATE PROCEDURE FOR SessionScoreBoard
------------------------------------------------------------
DROP PROCEDURE IF EXISTS [dbo].[spCreateSessionScoreBoard]
GO

CREATE PROCEDURE [dbo].[spCreateSessionScoreBoard]
    @SessionId uniqueidentifier,
    @ScoreBoardId uniqueidentifier
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @InsertedRow TABLE ([ID] UNIQUEIDENTIFIER)
    INSERT INTO
    [dbo].[SessionScoreBoard]
        (
            [SessionId],
            [ScoreBoardId]
        )
    OUTPUT INSERTED.[ID] INTO @InsertedRow
    VALUES
        (
            @SessionId,
            @ScoreBoardId
        )
    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM [dbo].[vwSessionScoreBoards] WHERE [ID] = (SELECT [ID] FROM @InsertedRow)
END
GO
GRANT EXECUTE ON [dbo].[spCreateSessionScoreBoard] TO [cdp_Developer], [cdp_Integration]
    