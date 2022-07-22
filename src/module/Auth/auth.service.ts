import { hash } from "bcrypt";
import { CustomError, ErrorNotFound } from "../../shared/types";
import { UserService } from "../User/user.service";
import { LoginRequest, LoginResponse } from "./auth.types";

interface IAuthService{
    login(loginInput: LoginRequest): Promise<LoginResponse | ErrorNotFound>
}

export class AuthService implements IAuthService{

    userService: UserService

    constructor(userService: UserService){
        this.userService = userService
    }

    async login(loginInput: LoginRequest): Promise<LoginResponse | ErrorNotFound>{
        try {
            const user = await this.userService.getUserByEmail(loginInput.email)

            // if(hash(loginInput.password) === user?.password) {
            //    jwt.sign()
            // }


        const errorNotFound: ErrorNotFound = {
            message: "User with this email not found"
        }

        if(!user){
            return errorNotFound
        }
        return {
            token: "dkfoadksfo4fko4",
            user
        }
        } catch (error) {
            throw error
        }

    }
}