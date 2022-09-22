
# SendIT

This is a web application that helping in sending an tracking parcel status, it is built in angular for frontend, node for backend and mssql for database. The background services purpose is instant messaging sender or receiver of a parcel when the parcel status changes e.g from in transit to awaiting pick-up


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`GooglePlaceApiKey`

or 

`GoogleMapsApiKey`


## API Reference

#### Create new user

```http
  POST http://localhost:4400/user/create
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fullName` | `string` | **Required**. |
| `userName` | `string` | **Required**. |
| `email` | `string` | **Required**. |
| `phoneNumber` | `number` | **Required**. |
| `password` | `string` | **Required**. |


#### Login

```http
  POST http://localhost:4400/user/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | **Required**. |
| `password` | `string` | **Required**. |

#### getUsers
GET http://localhost:4400/user/getUsers

#### create parcel
POST http://localhost:4400/parcel/create
            sender,
            parcelWeight,
            price,
            lat,
            lng,
            senderLat,
            senderLng,
            parcelDescription,
            receiverLocation,
            receiverPhone,
            receiverEmail,
            deliveryDate

#### Get all parcels
GET http://localhost:4400/parcel/allparcels

### Delete parcel
DELETE http://localhost:4400/parcel/delete/1011

### Updating a parcel
PUT http://localhost:4400/parcel/update/7
            sender,
            parcelWeight,
            price,
            lat,
            lng,
            senderLat,
            senderLng,
            parcelDescription,
            receiverLocation,
            receiverPhone,
            receiverEmail,
            deliveryDate

### Updating parcel status
PUT http://localhost:4400/parcel/updateStatus/4023

### updating user information
PUT http://localhost:4400/user/updateUser
            clientID, 
            fullName, 
            phoneNumber,
            password,
            email,
            userName

### changing password
PUT http://localhost:4400/user/changePassword
            email,
            phoneNumber,
            password

