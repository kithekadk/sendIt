import { Response } from "express";
import {isEmpty} from 'lodash'
import { customUser, User } from "../interfaces/userInterfaces";
import { LoginValidator } from "../helpers/user/loginValidator";
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import { ExtendedUser } from "../middleware/verifyToken";
import { userValidator } from "../helpers/user/userValidator";
import Connection from "../databaseHelpers/dbhelpers";
const db = new Connection

export const registerUser = async(req:customUser, res:Response)=>{
try {
    const {fullName, userName, email, phoneNumber, password}=req.body

    const {error, value}= userValidator.validate(req.body)
    if(error){
        return res.status(400).json({
            message:error.details[0].message
        })
    }
    const userNameTaken= (await db.query(`SELECT * FROM dbo.CLIENTS WHERE userName='${userName}'`)).recordset
    const emailTaken= (await db.query(`SELECT * FROM dbo.CLIENTS WHERE email='${email}'`)).recordset

    if(!isEmpty(userNameTaken)){
        return res.status(404).json({message: 'This username is taken'})
    }
    if(!isEmpty(emailTaken)){
        return  res.status(404).json({message: 'An account exists with that email'})
    }

    const hashedPwd = await bcrypt.hash(password,8)
    db.exec('createUser',{
        fullName, userName, email, phoneNumber, password:hashedPwd
    })

    return res.json({message: 'Account created successfully'})

} catch (error) {
        res.status(501).json({message: 'internal server error'})

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

        const user:User[]=(await db.exec('loginUser',{
            email
        })).recordset

        const validPassword = await bcrypt.compare(password, user[0].password)
        if (!validPassword){
            return res.status(400).json({
                message:"Invalid password"
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
        res.status(501).json({message: 'internal server error'})
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
        const users = (await db.exec('getClients')).recordset
        return res.status(200).json(
            users
        )
    } catch (error) {
 
            res.status(500).json({message: 'Internal server error'})

    }
}
/**]
 * Listening to users location
 */
export const setLocation= async(req:customUser, res:Response)=>{
    try {
        const {email, lat, lng}= req.body
        db.exec('setLocation',{
            email, lat, lng
        })

        return res.json({message:'location set successfully'})

        } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
}

export const updateUser = async(req:customUser, res:Response)=>{
    try {
        const clientID=req.params.clientID
        const {fullName, phoneNumber,password}= req.body
        const hashedPwd = await bcrypt.hash(password,8)
        db.exec('updateUser',{
            clientID,fullName, phoneNumber,password:hashedPwd
        })
        return res.status(200).json({message:'user updated successfully'})
    } catch (error) {
        res.status(501).json({message: 'internal server error'})
    }
}