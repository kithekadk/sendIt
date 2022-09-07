import { Request, Response } from "express";
import { customUser, User } from "../interfaces/userInterfaces";
import mssql, { RequestError } from 'mssql'
import { sqlConfig } from "../config/config";
import { LoginValidator } from "../helpers/user/loginValidator";
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import { ExtendedUser } from "../middleware/verifyToken";
import { userValidator } from "../helpers/user/userValidator";


export const registerUser = async(req:customUser, res:Response)=>{
try {
    const {fullName, userName, email, phoneNumber, location, password}=req.body

    const {error, value}= userValidator.validate(req.body)
    const hashedPwd = await bcrypt.hash(password,8)
    if(error){
        return res.status(400).json({
            message:error.details[0].message
        })
    }

    const pool = await mssql.connect(sqlConfig)
    await pool.request()
    .input('fullName', mssql.VarChar, fullName)
    .input('userName', mssql.VarChar, userName)
    .input('email', mssql.VarChar, email)
    .input('phoneNumber', mssql.Numeric, phoneNumber)
    .input('location', mssql.VarChar, location)
    .input('password', mssql.VarChar, hashedPwd)
    .execute('createUser')

    return res.json({message: 'Account created successfully'})

} catch (error) {
    if(error instanceof RequestError){
        res.json({message:error.message})
    }
    else{
        res.status(501).json({message: 'internal server error'})
    }
    
}

}

export const loginUser = async (req:customUser, res:Response)=>{
    try {
        const {email, password}= req.body;

        const {error, value}= LoginValidator.validate(req.body);
        if(error){
            return res.status(404).json({
                message: error.details[0].message
            })
        }

        const pool = await mssql.connect(sqlConfig);

        const user:User[] = ( await pool.request()
        .input('email', mssql.VarChar, email)
        .execute('loginUser')).recordset

        const validPassword = await bcrypt.compare(password, user[0].password)
        if (!validPassword){
            return res.status(400).json({
                message:"invalid password"
            })
        }
        const logins = user.map(item =>{
            const{password,...rest}=item;
            return rest;
        })
        const token = jwt.sign (logins[0], process.env.KEY as string, {expiresIn:'300s'})
        return res.status(200).json({
            message: "Logged in successfully", token
        })

    } catch (error) {
        if(error instanceof RequestError){
            res.json({message: error.message})
        }
        else{
            console.log(error);
            
        }
    }
}
//Checking user role
export const checkUserRole = async(req:ExtendedUser, res:Response)=>{
    if (req.info){
        res.json({email: req.info.email , role: req.info.role, userName: req.info.userName})
    }
}

//Fetching all clients
export const getClients = async (req: customUser, res:Response)=>{
    try {


        const pool = await mssql.connect(sqlConfig)
        const users=(await pool.request()

        .execute('getClients')).recordset

        return res.status(201).json(
            users
        )
    } catch (error) {
        if(error instanceof RequestError){
            res.json({message: error.message})
        }
    }
}