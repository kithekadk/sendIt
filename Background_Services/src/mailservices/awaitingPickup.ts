import ejs from 'ejs'
import mssql from 'mssql'
import { sqlConfig } from '../config/config'
import dotenv from 'dotenv'
import sendMail from '../helpers/emailHelpers'
import {parcel} from '../interfaces/parcel'

dotenv.config()


const awaitingPickUp = async()=>{
    const pool = await mssql.connect(sqlConfig)
    const parcels:parcel[]=(await pool.request()
        .execute('parcelArrived')).recordset

    console.log(parcels);

    for (let parcel of parcels){
        ejs.renderFile('templates/orderArrived.ejs',{parcel:parcel.parcelID}, async(error,data)=>{
            let mailOptions = {
                from: process.env.EMAIL as string ,
                to: parcel.receiverEmail,
                subject: "Parcel Arrived to PickUp location",
                html:data,
                attachment:[
                    {
                    filename: 'task.txt',
                    content: `Your parcel order has arrived the pickUp location. please Show up at the location to pick it up. You will need your parcel ID to pick it up`
                }
            ]
            }
    try {
        await sendMail (mailOptions);
        await pool.request().execute('parcelPicked');
        console.log("order arrive mail sent to user");
    } catch (error) {
        console.log(error)
    }
        })
        
        
    }
    
}
   
    
export default awaitingPickUp