CREATE PROCEDURE getClients
AS
BEGIN
	IF EXISTS( SELECT * FROM dbo.CLIENTS WHERE role='user')
		BEGIN
			SELECT clientID, fullName, email, phoneNumber FROM dbo.CLIENTS WHERE role='user' ORDER BY clientID
			OFFSET 0 ROWS
			FETCH NEXT 5 ROWS ONLY;
		END
	ELSE
		BEGIN
			RAISERROR('No users Currently',11,1)
		END
END