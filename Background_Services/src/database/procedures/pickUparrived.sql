CREATE PROCEDURE parcelArrived
AS
BEGIN
	IF EXISTS (SELECT * FROM dbo.PARCELS WHERE isArrived ='NO')
	BEGIN
		SELECT * FROM dbo.PARCELS WHERE isArrived='NO' AND status='Awaiting Pick-up'
	END
	ELSE
	BEGIN
		RAISERROR('No unpicked parcel currently',11,1)
	END
END