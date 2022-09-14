CREATE PROCEDURE UserCreateLoginsetLocation (@fullName VARCHAR(200), 
@userName VARCHAR(200), @email VARCHAR(200) , @phoneNumber VARCHAR(200),
@location VARCHAR(200), @password VARCHAR(200) ,@lat INT, @lng INT, @StatementType NVARCHAR(20) = '')
AS
BEGIN
	
	IF @StatementType= 'createUser'
	BEGIN
	IF EXISTS ( SELECT * FROM dbo.CLIENTS WHERE email=@email)
		BEGIN
				RAISERROR('Email taken, use a different email', 11, 1);
				RETURN;
		END
	IF EXISTS ( SELECT * FROM dbo.CLIENTS WHERE userName=@userName)
		BEGIN
				RAISERROR('Username taken, use a different username', 11, 1);
				RETURN;
		END
	ELSE 
		BEGIN
				INSERT INTO dbo.CLIENTS (fullName, userName, email, phoneNumber, location, password)
				VALUES (@fullName, @userName, @email, @phoneNumber, @location, @password)
		END
	END

	IF @StatementType ='LoginUser'
	BEGIN
		IF EXISTS(SELECT * FROM dbo.CLIENTS WHERE email = @email)
		BEGIN
			SELECT * FROM dbo.CLIENTS WHERE email = @email 
			UPDATE dbo.CLIENTS SET lat=@lat, lng=@lng 
			WHERE email = @email;
		END
		ELSE
		BEGIN
			RAISERROR ('User account NOT found',11,1)
		END
	END

	IF @StatementType ='setLocation'
	BEGIN
		IF EXISTS(SELECT * FROM dbo.CLIENTS WHERE email = @email)
		BEGIN
			SELECT * FROM dbo.CLIENTS WHERE email = @email 
			UPDATE dbo.CLIENTS SET lat=@lat, lng=@lng 
			WHERE email = @email;
		END
		ELSE
		BEGIN
			RAISERROR ('User account NOT found',11,1)
		END
	END
END