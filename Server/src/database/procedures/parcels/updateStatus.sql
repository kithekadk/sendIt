CREATE PROCEDURE updateStatus (@parcelID INT, @status VARCHAR(200))
AS
BEGIN
	IF EXISTS(SELECT * FROM dbo.PARCELS WHERE status='In Transit')
	BEGIN
		SELECT * FROM dbo.PARCELS WHERE status='In Transit' AND parcelID=@parcelID
		UPDATE dbo.PARCELS SET status= @status
	END
	ELSE
	BEGIN
		RAISERROR ('No Parcels in Transit currently',11,1)
		RETURN
	END
END