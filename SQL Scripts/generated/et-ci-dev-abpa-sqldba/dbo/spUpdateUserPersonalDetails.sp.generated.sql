-----------------------------------------------------------------
-- SQL Code Generation
-- Entity: User Personal Details
-- Item: spUpdateUserPersonalDetails
--
-- This was generated by the MemberJunction CodeGen tool.
-- This file should NOT be edited by hand.
-----------------------------------------------------------------

------------------------------------------------------------
----- UPDATE PROCEDURE FOR UserPersonalDetails
------------------------------------------------------------
DROP PROCEDURE IF EXISTS [dbo].[spUpdateUserPersonalDetails]
GO

CREATE PROCEDURE [dbo].[spUpdateUserPersonalDetails]
    @ID uniqueidentifier,
    @JobTitle nvarchar(50),
    @PhoneNumber nvarchar(20),
    @Affiliation nvarchar(50),
    @SocialMediaLinks nvarchar(MAX),
    @PreviousSpeakingExperiences nvarchar(MAX),
    @UserID uniqueidentifier
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE
        [dbo].[UserPersonalDetails]
    SET
        [JobTitle] = @JobTitle,
        [PhoneNumber] = @PhoneNumber,
        [Affiliation] = @Affiliation,
        [SocialMediaLinks] = @SocialMediaLinks,
        [PreviousSpeakingExperiences] = @PreviousSpeakingExperiences,
        [UserID] = @UserID
    WHERE
        [ID] = @ID

    -- return the updated record so the caller can see the updated values and any calculated fields
    SELECT
                                        *
                                    FROM
                                        [dbo].[vwUserPersonalDetails]
                                    WHERE
                                        [ID] = @ID
                                    
END
GO

GRANT EXECUTE ON [dbo].[spUpdateUserPersonalDetails] TO [cdp_Developer], [cdp_Integration]
GO

------------------------------------------------------------
----- TRIGGER FOR __mj_UpdatedAt field for the UserPersonalDetails table
------------------------------------------------------------
DROP TRIGGER IF EXISTS [dbo].trgUpdateUserPersonalDetails
GO
CREATE TRIGGER [dbo].trgUpdateUserPersonalDetails
ON [dbo].[UserPersonalDetails]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE
        [dbo].[UserPersonalDetails]
    SET
        __mj_UpdatedAt = GETUTCDATE()
    FROM
        [dbo].[UserPersonalDetails] AS _organicTable
    INNER JOIN
        INSERTED AS I ON
        _organicTable.[ID] = I.[ID];
END;
GO
        