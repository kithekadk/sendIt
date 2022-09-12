import express, { json, NextFunction, Request, Response } from 'express'
import userRouter from './routes/userRoutes';
import cors from 'cors'
import parcelRouter from './routes/parcelRoutes';
import mssql from 'mssql';
import { sqlConfig } from './config/config';

const app = express()
app.use(cors())
app.use(json())
// app.use(async (req: Request, res: Response, next: NextFunction) => {
//     const pool = await mssql.connect(sqlConfig);
//     await pool.request();
//     req.context = Object.assign(req.context || {}, {
//         connection: pool
//     });
//     res.on('close', pool.close);
// })

app.use('/user', userRouter)
app.use('/parcel', parcelRouter)

app.use((err:Error, req:Request, res:Response, next:NextFunction)=>{
    res.json({message:err.message})
})

app.listen(4400 ,()=>{
    console.log('Server running on port 4400');
    
})