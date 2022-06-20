import {Router} from 'express'
import { getUsers, createUser, editUser, deleteUser } from './user.controller';

export const userRouter = Router();

userRouter.get("/", getUsers)
userRouter.post("/", createUser)
userRouter.put("/:userId", editUser)
userRouter.delete("/:userId", deleteUser)
