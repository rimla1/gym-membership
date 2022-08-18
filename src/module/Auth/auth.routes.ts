import { Router } from "express";
import isAuth from "../../shared/is-auth";
import { loginUser } from "./auth.controller";


export const authRouter = Router()

authRouter.post("/login",  loginUser)
