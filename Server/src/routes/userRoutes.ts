import { Router } from "express";
import { checkUserRole, getClients, loginUser, registerUser } from "../controller/userController";
import { verifyToken } from "../middleware/verifyToken";

const userRouter = Router()

userRouter.post('/create',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/check',verifyToken, checkUserRole)
userRouter.get('/getUsers', getClients)

export default userRouter