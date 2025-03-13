-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: Sessions
-- Item: Index for Foreign Keys
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------
-- Index for foreign key EventID in table Session
IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE name = 'IDX_AUTO_MJ_FKEY_Session_EventID' 
    AND object_id = OBJECT_ID('[dbo].[Session]')
)
CREATE INDEX IDX_AUTO_MJ_FKEY_Session_EventID ON [dbo].[Session] ([EventID]);