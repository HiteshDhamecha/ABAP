-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Email Templates
-- Item: vwEmailTemplates
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- BASE VIEW FOR ENTITY:      Email Templates
-----               SCHEMA:      dbo
-----               BASE TABLE:  EmailTemplate
-----               PRIMARY KEY: ID
------------------------------------------------------------
DROP VIEW IF EXISTS [dbo].[vwEmailTemplates]
GO

CREATE VIEW [dbo].[vwEmailTemplates]
AS
SELECT
    e.*
FROM
    [dbo].[EmailTemplate] AS e
GO
GRANT SELECT ON [dbo].[vwEmailTemplates] TO [cdp_UI], [cdp_Developer], [cdp_Integration]
    