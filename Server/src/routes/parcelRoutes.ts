import { Router } from "express";
import { createParcel, deleteParcels, fetchParcels, updateParcel } from "../controller/parcelController";

const parcelRouter = Router()

parcelRouter.post('/create',createParcel)
parcelRouter.get('/allparcels',fetchParcels)
parcelRouter.get('/delete/:parcelID',deleteParcels)
parcelRouter.put('/update/:parcelID',updateParcel)

export default parcelRouter;