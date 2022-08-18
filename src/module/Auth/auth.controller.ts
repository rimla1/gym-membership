import {NextFunction, Request, Response} from "express";
import { ValidationError } from "../../shared/errors";
import { UserRepository } from "../User/user.repository";
import { UserService } from "../User/user.service";
import { AuthService } from "./auth.service";
import { LoginRequest } from "./auth.types";
import { loginUserInputValidation } from "./auth.validation";
import { MembershipRepository } from "../Membership/membership.repository"
import { MembershipService } from "../Membership/membership.service"

const membershipRepository = new MembershipRepository()
const membershipService = new MembershipService(membershipRepository)
const userRepostiory = new UserRepository()
const userService = new UserService(userRepostiory, membershipService)
const authService = new AuthService(userService)

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body

    const loginInput: LoginRequest = {
        email,
        password
    }

    try {
        const loginUserValidated = loginUserInputValidation.validate(loginInput, {abortEarly: false})
        if(loginUserValidated.error){
            throw new ValidationError(loginUserValidated.error?.details)
        }
        const loginResult = await authService.login(loginInput)
        return res.json(loginResult)
    } catch (error) {
        return next(error)
    }
}

