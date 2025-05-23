-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Abstract Logs
-- Item: spCreateAbstractLogs
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- CREATE PROCEDURE FOR AbstractLogs
------------------------------------------------------------
DROP PROCEDURE IF EXISTS [dbo].[spCreateAbstractLogs]
GO

CREATE PROCEDURE [dbo].[spCreateAbstractLogs]
    @AbstractResultId uniqueidentifier,
    @AIAgentId uniqueidentifier,
    @ActionDescription nvarchar(MAX),
    @UpdatedOn datetime
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @InsertedRow TABLE ([ID] UNIQUEIDENTIFIER)
    INSERT INTO
    [dbo].[AbstractLogs]
        (
            [AbstractResultId],
            [AIAgentId],
            [ActionDescription],
            [UpdatedOn]
        )
    OUTPUT INSERTED.[ID] INTO @InsertedRow
    VALUES
        (
            @AbstractResultId,
            @AIAgentId,
            @ActionDescription,
            @UpdatedOn
        )
    -- return the new record from the base view, which might have some calculated fields
    SELECT * FROM [dbo].[vwAbstractLogs] WHERE [ID] = (SELECT [ID] FROM @InsertedRow)
END
GO
GRANT EXECUTE ON [dbo].[spCreateAbstractLogs] TO [cdp_Developer], [cdp_Integration]
    