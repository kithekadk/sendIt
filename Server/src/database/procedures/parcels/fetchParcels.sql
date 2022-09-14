CREATE PROCEDURE fetchParcels 
AS
BEGIN
	IF EXISTS(SELECT * FROM dbo.PARCELS)
	BEGIN
		SELECT * FROM dbo.PARCELS WHERE isDeleted = 0
	END
	ELSE
	BEGIN
		RAISERROR('No Parcels at the moment, come back Later',11,1);
		RETURN
	END
END