import express, { json, NextFunction, Request, Response } from 'express'
import userRouter from './routes/userRoutes';

const app = express()

app.use(json())

app.use('/user', userRouter)

app.use((err:Error, req:Request, res:Response, next:NextFunction)=>{
    res.json({message:err.message})
})

app.listen(4400 ,()=>{
    console.log('Server running on port 4400');
    
})