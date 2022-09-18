import { Router } from "express";
import { checkUserRole, getClients, loginUser, registerUser, setLocation, updateUser } from "../controller/userController";
import { verifyToken } from "../middleware/verifyToken";

const userRouter = Router()

userRouter.post('/create',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/check',verifyToken, checkUserRole)
userRouter.get('/getUsers', getClients)
userRouter.post('/setLocation', setLocation)
userRouter.put('/update/:clientID', updateUser)

export default userRouter