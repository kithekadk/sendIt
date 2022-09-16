CREATE PROCEDURE deliveryDone
AS
BEGIN
	IF EXISTS (SELECT * FROM dbo.PARCELS WHERE isDelivered='NO')
	BEGIN
		UPDATE dbo.PARCELS SET isDelivered='YES' WHERE isDelivered='NO' AND status='Delivered'
	END
	ELSE
	BEGIN
		RAISERROR('No unpicked parcel currently',11,1)
	END
END