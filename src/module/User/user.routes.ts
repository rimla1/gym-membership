import {Router} from 'express'
import { createUser, getUsers } from './user.controller';

export const userRouter = Router();

userRouter.get("/", getUsers)
userRouter.post("/", createUser)
