import { Router } from "express";
import { checkUserRole, getClients, loginUser, registerUser, setLocation } from "../controller/userController";
import { verifyToken } from "../middleware/verifyToken";

const userRouter = Router()

userRouter.post('/create',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/check',verifyToken, checkUserRole)
userRouter.get('/getUsers', getClients)
userRouter.post('/setLocation', setLocation)

export default userRouter