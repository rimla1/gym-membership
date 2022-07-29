import {Router} from 'express'
import { getUsers, createUser, editUser, deleteUser, getUser } from './user.controller';
import isAuth from "../../shared/is-auth";

export const userRouter = Router();

userRouter.get("/:userId", isAuth, getUser)
userRouter.get("/", isAuth,  getUsers)
userRouter.post("/", isAuth, createUser)
userRouter.put("/:userId", isAuth, editUser)
userRouter.delete("/:userId", isAuth, deleteUser)
