import { ErrorNotFound } from "../../shared/types";
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
        return {
            message: "User not found"
        }
    }
}