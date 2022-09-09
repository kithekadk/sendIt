CREATE TABLE CLIENTS(
clientID INT NOT NULL PRIMARY KEY IDENTITY (1,1), 
fullName VARCHAR(200) NOT NULL, 
userName VARCHAR(200) NOT NULL UNIQUE, 
email VARCHAR(200) NOT NULL UNIQUE,
phoneNumber INT, 
location VARCHAR(200) NOT NULL,
lat INT DEFAULT -0.4,
lng INT DEFAULT 36.78,
password VARCHAR(200) NOT NULL,
welcome VARCHAR(200) DEFAULT 'NO',
role VARCHAR(200) DEFAULT 'user')