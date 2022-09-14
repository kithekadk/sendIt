import { Request, Response } from "express";
import { customParcel } from "../interfaces/parcelInterfaces";
import mssql, { RequestError } from 'mssql'
import { sqlConfig } from "../config/config";


export const createParcel = async(req:customParcel, res:Response)=>{
    try {
        const {sender,
            parcelWeight,
            price,
            lat,
            lng,
            parcelDescription,
            receiverLocation,
            receiverPhone,
            receiverEmail,
            deliveryDate}= req.body
        
            const pool = await mssql.connect(sqlConfig)
            await pool.request()
            .input('sender', mssql.VarChar, sender)
            .input('parcelWeight', mssql.Numeric, parcelWeight)
            .input('price', mssql.Numeric, price)
            .input('lat', mssql.Numeric, lat)
            .input('lng', mssql.Numeric, lng)
            .input('parcelDescription', mssql.VarChar, parcelDescription)
            .input('receiverLocation', mssql.VarChar, receiverLocation)
            .input('receiverPhone', mssql.Numeric, receiverPhone)
            .input('receiverEmail', mssql.VarChar, receiverEmail)
            .input('deliveryDate', mssql.VarChar, deliveryDate)
            .execute('createParcel')

            return res.json({message:'Parcel order created successfully'})

    } catch (error) {
        if(error instanceof RequestError){
            res.json({error:error})
        }
        
    }
}

export const fetchParcels = async (req:customParcel, res:Response)=>{
    try {
        const pool = await mssql.connect(sqlConfig)
        const parcels =(await pool.request()
        .execute('fetchParcels')).recordset

        return res.json(parcels)
    } catch (error) {
        res.json({error:error}) 
    }
}

export const deleteParcels = async (req: customParcel, res: Response)=>{
    try{
        const parcelID = req.params.parcelID

        const pool = await mssql.connect(sqlConfig)
        await pool.request()
        .input('parcelID', mssql.Numeric, parcelID)
        .execute('deleteParcel')

        return res.json({message:'Parcel deleted successfully'})
    } catch(error){
        if(error instanceof RequestError){
            res.json({message: error})
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
            parcelDescription,
            receiverLocation,
            receiverPhone,
            receiverEmail,
            deliveryDate}= req.body
        
            const pool = await mssql.connect(sqlConfig)
            await pool.request()
            .input('parcelID', mssql.Numeric, parcelID)
            .input('sender', mssql.VarChar, sender)
            .input('parcelWeight', mssql.Numeric, parcelWeight)
            .input('price', mssql.Numeric, price)
            .input('lat', mssql.Numeric, lat)
            .input('lng', mssql.Numeric, lng)
            .input('parcelDescription', mssql.VarChar, parcelDescription)
            .input('receiverLocation', mssql.VarChar, receiverLocation)
            .input('receiverPhone', mssql.Numeric, receiverPhone)
            .input('receiverEmail', mssql.VarChar, receiverEmail)
            .input('deliveryDate', mssql.VarChar, deliveryDate)
            .execute('updateParcel')

            return res.json({message:'Parcel updated successfully'})
    } catch (error) {
        if(error instanceof RequestError){
            res.json({message: error})
        }
        console.log(error);
        
    }
}