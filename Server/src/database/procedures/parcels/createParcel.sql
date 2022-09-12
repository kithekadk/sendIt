
	CREATE PROCEDURE createParcel (	@sender VARCHAR(200),
									@lat INT,
									@lng INT,
									@parcelWeight INT,
									@price INT,
									@parcelDescription VARCHAR(200),
									@receiverLocation VARCHAR(200),
									@receiverPhone INT,
									@receiverEmail VARCHAR(200),
									@deliveryDate VARCHAR(200))
	AS
	BEGIN
		INSERT INTO dbo.PARCELS (sender,
								lat,
								lng,
								parcelWeight,
								price,
								parcelDescription,
								receiverLocation,
								receiverPhone,
								receiverEmail,
								deliveryDate
								)
									
					VALUES(	@sender,
							@lat INT,
							@lng INT,
							@parcelWeight,
							@price,
							@parcelDescription,
							@receiverLocation,
							@receiverPhone,
							@receiverEmail,
							@deliveryDate
							)
END