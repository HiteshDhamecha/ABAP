-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Score Boards
-- Item: spDeleteScoreBoard
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- DELETE PROCEDURE FOR ScoreBoard
------------------------------------------------------------
DROP PROCEDURE IF EXISTS [dbo].[spDeleteScoreBoard]
GO

CREATE PROCEDURE [dbo].[spDeleteScoreBoard]
    @ID uniqueidentifier
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM
        [dbo].[ScoreBoard]
    WHERE
        [ID] = @ID


    SELECT @ID AS [ID] -- Return the primary key to indicate we successfully deleted the record
END
GO
GRANT EXECUTE ON [dbo].[spDeleteScoreBoard] TO [cdp_Integration]
    