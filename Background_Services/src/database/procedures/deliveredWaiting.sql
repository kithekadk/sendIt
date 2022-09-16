CREATE PROCEDURE delivered
AS
BEGIN
	IF EXISTS (SELECT * FROM dbo.PARCELS WHERE isDelivered ='NO')
	BEGIN
		SELECT * FROM dbo.PARCELS WHERE isDelivered='NO' AND status='Delivered'
	END
	ELSE
	BEGIN
		RAISERROR('No undelivered parcel currently',11,1)
	END
END