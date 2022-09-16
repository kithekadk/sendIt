CREATE PROCEDURE parcelPicked
AS
BEGIN
	IF EXISTS (SELECT * FROM dbo.PARCELS WHERE isArrived='NO')
	BEGIN
		UPDATE dbo.PARCELS SET isArrived='YES' WHERE isArrived='NO' AND status ='Awaiting Pick-up'
	END
	ELSE
	BEGIN
		RAISERROR('No unpicked parcel currently',11,1)
	END
END