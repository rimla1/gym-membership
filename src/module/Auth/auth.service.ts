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
        const user = await this.userService.getUserByEmail(loginInput.email)
        console.log("This is from auth.service.ts", user)
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
    }
}