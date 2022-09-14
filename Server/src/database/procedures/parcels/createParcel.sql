CREATE PROCEDURE createParcel (	@sender VARCHAR(200),
								@parcelWeight INT,
								@price INT,
								@lat INT,
								@lng INT,
								@parcelDescription VARCHAR(200),
								@receiverLocation VARCHAR(200),
								@receiverPhone INT,
								@receiverEmail VARCHAR(200),
								@deliveryDate VARCHAR(200))
	AS
	BEGIN
		INSERT INTO dbo.PARCELS (sender,
								parcelWeight,
								price,
								lat,
								lng,
								parcelDescription,
								receiverLocation,
								receiverPhone,
								receiverEmail,
								deliveryDate
								)
									
					VALUES(	@sender,
							@parcelWeight,
							@price,
							@lat,
							@lng,
							@parcelDescription,
							@receiverLocation,
							@receiverPhone,
							@receiverEmail,
							@deliveryDate
							)
END