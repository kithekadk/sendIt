import { Router } from "express";
import { createParcel } from "../controller/parcelController";

const parcelRouter = Router()

parcelRouter.post('/create',createParcel)

export default parcelRouter;