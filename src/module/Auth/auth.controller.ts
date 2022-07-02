import {Request, Response} from "express";
import { LoginRequest } from "./auth.types";

export const loginUser = (req: Request, res: Response) => {
    const {email, password} = req.body

    const loginInput: LoginRequest = {
        email,
        password
    }

    return res.json(loginInput)
}