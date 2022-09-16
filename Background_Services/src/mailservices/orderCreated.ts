import ejs from 'ejs'
import mssql from 'mssql'
import { sqlConfig } from '../config/config'
import dotenv from 'dotenv'
import sendMail from '../helpers/emailHelpers'
import {parcel} from '../interfaces/parcel'

dotenv.config()


const orderCreated = async()=>{
    const pool = await mssql.connect(sqlConfig)
    const users:parcel[]=(await pool.request().execute('ParcelOrderCreated')).recordset
    console.log(users);

    for (let user of users){
        ejs.renderFile('templates/orderCreated.ejs',{parcel: user.parcelID}, async(error,data)=>{
            let mailOptions = {
                from: process.env.EMAIL as string ,
                to: user.sender, 
                subject: "Parcel Order Created",
                html:data,
                attachment:[
                    {
                    filename: 'task.txt',
                    content: `Your parcel order has been successfully created. your Parcel ID is ${user.parcelID}`
                }
            ]
            }
    try {
        await sendMail (mailOptions);
        await pool.request().execute('parcelOrderMailSent');
        console.log("order creation mail sent to user");
    } catch (error) {
        console.log(error)
    }
        })
        
        
    }
    
}
   
    
export default orderCreated