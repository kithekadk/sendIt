import { Router } from "express";
import { createParcel, fetchParcels } from "../controller/parcelController";

const parcelRouter = Router()

parcelRouter.post('/create',createParcel)
parcelRouter.get('/allparcels',fetchParcels)

export default parcelRouter;