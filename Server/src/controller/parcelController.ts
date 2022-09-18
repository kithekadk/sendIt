import { Response } from "express";
import { RequestError } from "mssql";
import {isEmpty} from 'lodash'
import { customParcel } from "../interfaces/parcelInterfaces";;
import Connection from "../databaseHelpers/dbhelpers";

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
        
        db.exec('createUpdateParcel', {sender,
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
            return res.status(200).json({message:'Parcel order created successfully'})

    } catch (error) {
        
        if(error instanceof RequestError){
            res.status(401).json({error:error})
        }else{
            res.status(501).json({message:error})
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
        const parcelExists = (await db.query(`SELECT * FROM dbo.PARCELS WHERE parcelID=${parcelID} AND isDeleted=0`)).recordset
        console.log(parcelExists);
         
        if(isEmpty(parcelExists)){
            return res.status(404).json({message:'ParcelID not found'})
        }

        return res.status(200).json({message:'Parcel deleted successfully'})

    } catch(error){
            res.status(500).json({message:'Internal server error'})    
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

        db.exec('createUpdateParcel',{
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