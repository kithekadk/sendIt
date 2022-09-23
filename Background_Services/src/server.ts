import express from 'express'
import cron from 'node-cron'
import awaitingPickUp from './mailservices/awaitingPickup'
import delivered from './mailservices/delivered'
import orderCreated from './mailservices/orderCreated'
import welcomeClient from './mailservices/welcomeUser'



const app = express()

const run =() =>{
    cron.schedule('*/1 * * * * *', async()=>{
        console.log("checking new user");
        await welcomeClient()
    })
    cron.schedule('*/5 * * * * *', async()=>{
        console.log("checking new order");
        await orderCreated()
    })
    cron.schedule('*/5 * * * * *', async()=>{
        console.log("checking arrived orders");
        await awaitingPickUp()
    })
    cron.schedule('*/5 * * * * *', async()=>{
        console.log("checking delivered");
        await delivered()
    })
}
run()

app.listen(4450,()=>{
    console.log("mail server started...");   
})