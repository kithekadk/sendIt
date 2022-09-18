CREATE PROCEDURE updateUser (@clientID INT,@fullName VARCHAR(200), 
@userName VARCHAR(200), @email VARCHAR(200) , @phoneNumber VARCHAR(200), @password VARCHAR(200))
AS
BEGIN

	IF EXISTS ( SELECT * FROM dbo.CLIENTS WHERE clientID=@clientID)
		BEGIN
				UPDATE dbo.CLIENTS SET fullName=@fullName,
										userName=@userName,
										email=@email,
										phoneNumber=@phoneNumber,
										password=@password
		END
	ELSE 
		BEGIN
			RAISERROR('No user currently',11,1)
		END
END
