import bcrypt from "bcrypt";
import { NotFoundError } from "../../shared/errors";
import { UserService } from "../User/user.service";
import { LoginRequest, LoginResponse } from "./auth.types";

interface IAuthService{
    login(loginInput: LoginRequest): Promise<LoginResponse>
}

export class AuthService implements IAuthService{

    userService: UserService

    constructor(userService: UserService){
        this.userService = userService
    }

    async login(loginInput: LoginRequest): Promise<LoginResponse>{
        try {
            const user = await this.userService.getUserByEmail(loginInput.email)
            const match = await bcrypt.compare(loginInput.password, user.password)
            if(match){
                return {
                    token: "dkfoadksfo4fko4",
                    user
                }
            }
            throw new NotFoundError("Your password is incorrect please try again!")
        } catch (error) {
            throw error
        }

    }
}