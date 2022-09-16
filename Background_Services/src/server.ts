import express from 'express'
import cron from 'node-cron'
import awaitingPickUp from './mailservices/awaitingPickup'
import delivered from './mailservices/delivered'
import orderCreated from './mailservices/orderCreated'
import welcomeClient from './mailservices/welcomeUser'



const app = express()

const run =() =>{
    cron.schedule('*/10 * * * * *', async()=>{
        console.log("cron is running");
        await awaitingPickUp()
        await delivered()
        await orderCreated()
        await welcomeClient()   
    })
}
run()

app.listen(4450,()=>{
    console.log("mail server started...");   
})