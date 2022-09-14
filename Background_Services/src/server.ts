import express from 'express'
import cron from 'node-cron'

import welcomeCLient from './mailservices/welcomeService';

const app = express()

const run =() =>{
    cron.schedule('*/5 * * * * *', async()=>{
        console.log("cron is running");
        await welcomeCLient()
        
    })
}
run()

app.listen(4450,()=>{
    console.log("mail server started...");
    
})