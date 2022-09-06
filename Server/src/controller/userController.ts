import { Request, Response } from "express";
import { customUser } from "../interfaces/userInterfaces";
import mssql, { RequestError } from 'mssql'
import { sqlConfig } from "../config/config";

export const registerUser = async(req:customUser, res:Response)=>{
try {
    const {fullName, userName, email, phoneNumber, location, password}=req.body

    const pool = await mssql.connect(sqlConfig)
    await pool.request()
    .input('fullName', mssql.VarChar, fullName)
    .input('userName', mssql.VarChar, userName)
    .input('email', mssql.VarChar, email)
    .input('phoneNumber', mssql.VarChar, phoneNumber)
    .input('location', mssql.VarChar, location)
    .input('password', mssql.VarChar, password)
    .execute('createUser')

    return res.json({message: 'Account created successfully'})

} catch (error) {
    if(error instanceof RequestError){
        res.json({message:error.message})
    }
    else{
        console.log(error);
        
        // res.status(501).json({message: 'internal server error'})
    }
    
}

}