export interface parcel{
    find(arg0: (parcel: any) => void): unknown
    sender:string
    // senderLocation:string
    parcelWeight:string
    price:string
    lat:number
    lng:number
    senderLat:number
    senderLng:number
    parcelDescription:string
    receiverLocation:string
    receiverPhone:number
    receiverEmail:string
    deliveryDate:string
    parcelID:number
    status:string
}


export interface place{
    email:string|null
    lat:number
    lng:number
}
export interface MapPlace {
    candidate: candidates[]
}

export interface candidates {
    geometry: object
    name:string
}