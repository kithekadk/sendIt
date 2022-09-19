import ejs from 'ejs'
import mssql from 'mssql'
import { sqlConfig } from '../config/config'
import dotenv from 'dotenv'
import sendMail from '../helpers/emailHelpers'
import {parcel} from '../interfaces/parcel'
import Connection from '../databaseHelpers/dbhelpers'
const db =new Connection

dotenv.config()


const delivered = async()=>{
    const users:parcel[]=(await db.exec('delivered')).recordset
    console.log(users);

    for (let user of users){
        ejs.renderFile('templates/delivered.ejs',{parcel:user.parcelID}, async(error,data)=>{
            let mailOptions = {
                from: process.env.EMAIL as string ,
                to: user.receiverEmail, 
                subject: "Parcel Arrived to PickUp location",
                html:data,
                attachment:[
                    {
                    filename: 'task.txt',
                    content: `Thankyou for shipping with us. We value you and welcome back. Incase of any damages during the shipping please contact us to report claims.`
                }
            ]
            }
    try {
        await sendMail (mailOptions);
        db.exec('deliveryDone');
        console.log("order delivery mail sent to user");
    } catch (error) {
        console.log(error)
    }
        })
        
        
    }
    
}
   
    
export default delivered