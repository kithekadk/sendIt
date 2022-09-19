
ALTER PROCEDURE updateUser (@clientID INT,@fullName VARCHAR(200), @phoneNumber INT, @password VARCHAR(200))
AS
BEGIN

	IF EXISTS ( SELECT * FROM dbo.CLIENTS WHERE clientID=@clientID)
		BEGIN
				UPDATE dbo.CLIENTS SET fullName=@fullName,
										phoneNumber=@phoneNumber,
										password=@password
										WHERE clientID=@clientID
		END
	ELSE 
		BEGIN
			RAISERROR('No user currently',11,1)
		END
END