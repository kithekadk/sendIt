import { Response } from "express";
import { customParcel } from "../interfaces/parcelInterfaces";;
import Connection from "../databaseHelpers/dbhelpers";
import { RequestError } from "mssql";
const db= new Connection

export const createParcel = async(req:customParcel, res:Response)=>{
    try {
        const {sender,
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
            deliveryDate}= req.body

        db.exec('createParcel', {sender,
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
            deliveryDate})
            return res.json({message:'Parcel order created successfully'})

    } catch (error) {
        console.log(error);
        
        if(error instanceof RequestError){
            res.json({error:error})
        }else{
            res.json({message:error})
        }
        
    }
}

export const fetchParcels = async (req:customParcel, res:Response)=>{
    try {
        const {recordset} = await db.exec('fetchParcels')

        return res.json(recordset)
    } catch (error) {
        res.json({error:error}) 
    }
}

export const deleteParcels = async (req: customParcel, res: Response)=>{
    try{
        const parcelID = req.params.parcelID
        db.exec('deleteParcel',{parcelID})
        
        return res.json({message:'Parcel deleted successfully'})
    } catch(error){
        if(error instanceof RequestError){
            res.status(400).json({message:'No parcels with the given ID'})
        }else{
            res.status(501).json({message:'Internal server error'})
        }
    }
}

export const updateParcel = async(req: customParcel, res:Response)=>{
    try {
        const parcelID= req.params.parcelID
        const {
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
            deliveryDate}= req.body
        
        db.exec('updateParcel',{
            parcelID,
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
        })
        return res.json({message:'Parcel updated successfully'})
    } catch (error) {
        if(error instanceof RequestError){
            res.json({message: error})
        }
        else{
            res.json({message:error})
        }
        
    }
}

export const updateParcelStatus = async(req:customParcel, res:Response)=>{
    try {
        const parcelID= req.params.parcelID
        const {status}=req.body

        db.exec('updateStatus',{
            parcelID,
            status
        })
        return res.json({message:'Parcel updated successfully...'})
    } catch (error) {
        if(error instanceof RequestError){
            res.json({message: error.message})
        }
        else{
            res.json({message:error})
        }
    }
}