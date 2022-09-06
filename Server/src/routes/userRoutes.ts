import { Router } from "express";
import { registerUser } from "../controller/userController";

const userRouter = Router()

userRouter.post('/create',registerUser)

export default userRouter