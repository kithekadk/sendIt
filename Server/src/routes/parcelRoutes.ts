import { Router } from "express";
import { createParcel, deleteParcels, fetchParcels, updateParcel, updateParcelStatus } from "../controller/parcelController";
import { verifyToken } from "../middleware/verifyToken";

const parcelRouter = Router()

parcelRouter.post('/create',verifyToken, createParcel)
parcelRouter.get('/allparcels',verifyToken, fetchParcels)
parcelRouter.delete('/delete/:parcelID',verifyToken, deleteParcels)
parcelRouter.put('/update/:parcelID',verifyToken, updateParcel)
parcelRouter.put('/updateStatus/:parcelID',verifyToken, updateParcelStatus)

export default parcelRouter;