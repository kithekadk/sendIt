CREATE PROCEDURE parcelOrderMailSent
AS
BEGIN
	IF EXISTS (SELECT * FROM dbo.PARCELS WHERE isDispatched ='NO')
	BEGIN
		UPDATE dbo.PARCELS SET isDispatched='YES' WHERE isDispatched='NO' AND status='In Transit'
	END
	ELSE
	BEGIN
		RAISERROR('No new user currently',11,1)
	END
END