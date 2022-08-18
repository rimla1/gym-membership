import {config} from 'dotenv'
config()
import bcrypt from "bcrypt";
import { NotFoundError } from "../../shared/errors";
import { UserService } from "../User/user.service";
import { LoginRequest, LoginResponse } from "./auth.types";
import jwt from "jsonwebtoken";

interface IAuthService{
    login(loginInput: LoginRequest): Promise<LoginResponse>
}
let secretToken: string
if(process.env.ACCESS_TOKEN_SECRET){
    secretToken = process.env.ACCESS_TOKEN_SECRET
} else {
    throw new Error("Something went wrong!")
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
                const token = jwt.sign(user.id.toString(), secretToken)
                return({
                    user_id: user.id.toString(),
                    token: token
                })
            }
            throw new NotFoundError("Your password is incorrect please try again!")
        } catch (error) {
            throw error
        }

    }

    

}

