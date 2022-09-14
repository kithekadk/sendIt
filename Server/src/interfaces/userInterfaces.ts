import { Request } from "express"

export interface customUser extends Request{
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
        StatementType:string
    }
}

export interface User{
    fullName:string
    userName:string
    email:string
    phoneNumber:number
    location:string
    password:string
    StatementType:string
    lat:number
    lng:number
    role:string,
    iat:number,
    exp:number
}