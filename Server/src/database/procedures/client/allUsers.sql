CREATE PROCEDURE getClients
AS
BEGIN
	IF EXISTS( SELECT * FROM dbo.CLIENTS WHERE role='user')
		BEGIN
			SELECT clientID, fullName, email, phoneNumber FROM dbo.CLIENTS WHERE role='user';
		END
	ELSE
		BEGIN
			RAISERROR('No users Currently',11,1)
		END
END