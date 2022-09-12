import { Request } from "express"

export interface customParcel extends  Request{
    body:{
        sender:string
        senderLocation:string
        parcelWeight:string
        price:string
        lat:number
        lng:number
        parcelDescription:string
        receiverLocation:string
        receiverPhone:number
        receiverEmail:string
        deliveryDate:string
}
}