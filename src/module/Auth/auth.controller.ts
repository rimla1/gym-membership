import {Request, Response} from "express";
import { UserRepository } from "../User/user.repository";
import { UserService } from "../User/user.service";
import { AuthService } from "./auth.service";
import { LoginRequest, SignupRequest } from "./auth.types";

const userRepostiory = new UserRepository()
const userService = new UserService(userRepostiory)
const authService = new AuthService(userService)

export const loginUser = (req: Request, res: Response) => {
    const {email, password} = req.body

    const loginInput: LoginRequest = {
        email,
        password
    }

    const loginResult = authService.login(loginInput)

    return res.json(loginResult)
}

export const signupUser = (req: Request, res: Response) => {
    const {email, password, confirmPassword} = req.body

    const signupInput: SignupRequest = {
        email,
        password,
        confirmPassword
    }

    const signupResult = authService

    return res.json(signupResult)
}