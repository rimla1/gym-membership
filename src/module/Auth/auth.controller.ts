import {Request, Response} from "express";
import { AuthService } from "./auth.service";
import { LoginRequest } from "./auth.types";

const authService = new AuthService

export const loginUser = (req: Request, res: Response) => {
    const {email, password} = req.body

    const loginInput: LoginRequest = {
        email,
        password
    }

    const loginResult = authService.login(loginInput)

    return res.json(loginResult)
}