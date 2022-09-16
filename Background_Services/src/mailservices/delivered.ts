import ejs from 'ejs'
import mssql from 'mssql'
import { sqlConfig } from '../config/config'
import dotenv from 'dotenv'
import sendMail from '../helpers/emailHelpers'
import {parcel} from '../interfaces/parcel'

dotenv.config()


const delivered = async()=>{
    const pool = await mssql.connect(sqlConfig)
    const users:parcel[]=(await pool.request()
        .execute('delivered')).recordset
    console.log(users);

    for (let user of users){
        ejs.renderFile('templates/delivered.ejs',{name:'project.firstName'}, async(error,data)=>{
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
        await pool.request().execute('deliveryDone');
        console.log("order delivery mail sent to user");
    } catch (error) {
        console.log(error)
    }
        })
        
        
    }
    
}
   
    
export default delivered