-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Abstract Status
-- Item: spDeleteAbstractStatus
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- DELETE PROCEDURE FOR AbstractStatus
------------------------------------------------------------
DROP PROCEDURE IF EXISTS [dbo].[spDeleteAbstractStatus]
GO

CREATE PROCEDURE [dbo].[spDeleteAbstractStatus]
    @ID uniqueidentifier
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM
        [dbo].[AbstractStatus]
    WHERE
        [ID] = @ID


    SELECT @ID AS [ID] -- Return the primary key to indicate we successfully deleted the record
END
GO
GRANT EXECUTE ON [dbo].[spDeleteAbstractStatus] TO [cdp_Integration]
    