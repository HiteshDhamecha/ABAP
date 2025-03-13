-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Abstracts
-- Item: spDeleteAbstract
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- DELETE PROCEDURE FOR Abstract
------------------------------------------------------------
DROP PROCEDURE IF EXISTS [dbo].[spDeleteAbstract]
GO

CREATE PROCEDURE [dbo].[spDeleteAbstract]
    @ID uniqueidentifier
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM
        [dbo].[Abstract]
    WHERE
        [ID] = @ID


    SELECT @ID AS [ID] -- Return the primary key to indicate we successfully deleted the record
END
GO
GRANT EXECUTE ON [dbo].[spDeleteAbstract] TO [cdp_Integration]
    