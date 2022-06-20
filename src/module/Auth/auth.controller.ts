import {Request, Response} from 'express';
import { UserRepository } from '../User/user.repository';
import { UserService } from '../User/user.service';
import { AuthService } from './auth.service';
import { LoginInput } from './auth.types';

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const authService = new AuthService(userService)

export const loginUser = (req: Request, res: Response) => {
    const {email, password} = req.body
    const loginInput: LoginInput = {
        email, 
        password
    }

    const loginResult = authService.login(loginInput)

    return res.json(loginResult)
}