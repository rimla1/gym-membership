import {Router} from 'express'
import { getUsers, createUser, editUser } from './user.controller';

export const userRouter = Router();

userRouter.get("/", getUsers)
userRouter.post("/", createUser)
userRouter.put("/:userId", editUser)

