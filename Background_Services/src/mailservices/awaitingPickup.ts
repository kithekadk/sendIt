import ejs from 'ejs'
import mssql from 'mssql'
import { sqlConfig } from '../config/config'
import dotenv from 'dotenv'
import sendMail from '../helpers/emailHelpers'
import {parcel} from '../interfaces/parcel'
import Connection from '../databaseHelpers/dbhelpers'
const db = new Connection
dotenv.config()


const awaitingPickUp = async()=>{
    const parcels:parcel[]=(await db.exec('parcelArrived')).recordset

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
        db.exec('parcelPicked');
        console.log("order arrive mail sent to user");
    } catch (error) {
        console.log(error)
    }
        })
        
        
    }
    
}
   
    
export default awaitingPickUp