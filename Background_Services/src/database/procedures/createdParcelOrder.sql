CREATE PROCEDURE ParcelOrderCreated
AS
BEGIN
	IF EXISTS (SELECT * FROM dbo.PARCELS WHERE isDispatched ='NO' AND status='In Transit')
	BEGIN
		SELECT * FROM dbo.PARCELS WHERE isDispatched='NO' AND status='In Transit'
	END
	ELSE
	BEGIN
		RAISERROR('No new parcel currently',11,1)
	END
END