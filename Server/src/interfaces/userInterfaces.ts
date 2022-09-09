export interface customUser{
    body:{
        clientID:string
        fullName:string
        userName:string
        email:string
        phoneNumber:number
        location:string
        lat:number
        lng:number
        password:string
    }
}

export interface User{
    fullName:string
    userName:string
    email:string
    phoneNumber:number
    location:string
    password:string
    role:string,
    iat:number,
    exp:number
}