import { Request, Response } from "express";
import { customParcel } from "../interfaces/parcelInterfaces";
import mssql from 'mssql'
import { sqlConfig } from "../config/config";


export const createParcel = async(req:customParcel, res:Response)=>{
    try {
        const {sender,
            senderLocation, 
            parcelWeight,
            price,
            parcelDescription,
            receiverLocation,
            receiverPhone,
            receiverEmail,
            deliveryDate}= req.body
        
            const pool = await mssql.connect(sqlConfig)
            await pool.request()
            .input('sender', mssql.VarChar, sender)
            .input('senderLocation', mssql.VarChar, senderLocation)
            .input('parcelWeight', mssql.Numeric, parcelWeight)
            .input('price', mssql.Numeric, price)
            .input('parcelDescription', mssql.VarChar, parcelDescription)
            .input('receiverLocation', mssql.VarChar, receiverLocation)
            .input('receiverPhone', mssql.Numeric, receiverPhone)
            .input('receiverEmail', mssql.VarChar, receiverEmail)
            .input('deliveryDate', mssql.VarChar, deliveryDate)
            .execute('createParcel')

            return res.json({message:'Parcel order created successfully'})

    } catch (error) {
        res.json({error:error})
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