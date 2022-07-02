import { ErrorNotFound } from "../../shared/types";
import { LoginRequest, LoginResponse } from "./auth.types";

interface IAuthService{
    
}

class AuthService implements IAuthService{
    async login(loginInput: LoginRequest): Promise<LoginResponse | ErrorNotFound>{
        return {
            message: "User not found"
        }
    }
}