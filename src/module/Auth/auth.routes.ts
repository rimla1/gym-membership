import { Router } from "express";
import { loginUser, signupUser } from "./auth.controller";

const authRouter = Router()

authRouter.post("/login", loginUser)
authRouter.post("/signup", signupUser)