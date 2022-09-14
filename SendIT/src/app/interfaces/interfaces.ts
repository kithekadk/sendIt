export interface user{
    clientID: number
    fullName: string
    userName: string
    email: string
    phoneNumber: number
    location: string
    password:string
    welcome:string
    lat:number,
    lng:number,
}

export interface userReg{
    fullName: string
    userName: string
    email: string
    phoneNumber: number
    location: string
    password:string
}
export interface user1{
    clientID: number
    fullName: string
    email: string
    phoneNumber: number
}

export interface loginMessage{
    message: string
    token:string
}

export interface UserInfo{
    role:string
    email:string
    userName:string
}