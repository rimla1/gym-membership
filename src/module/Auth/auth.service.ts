import { CustomError, ErrorNotFound } from "../../shared/types";
import { UserService } from "../User/user.service";
import { LoginInput, LoginResponse } from "./auth.types";

interface IAuthService {
    login(loginInput: LoginInput): Promise<LoginResponse | ErrorNotFound | CustomError>
}

export class AuthService implements IAuthService{
    userService: UserService

    constructor(userService: UserService){
        this.userService = userService
    }


    async login(loginInput: LoginInput): Promise<LoginResponse | ErrorNotFound | CustomError> {
        const user = await this.userService.getUserByEmail(loginInput.email)
        const errorNotFound: ErrorNotFound = {
            message: "User doest not exist with that email"
        }

        // TODO 1. Ima li user
        // TODO 2. Ako nema, vrati poruku "Email or password not correct"
        if(!user){
            return errorNotFound
        }
        // TODO 3. AKo ima user, uporedi sifre
        // TODO  const isValidPassword = bycrpt.compare(loginInput.password, user.password)
        // TODO 4. Ako je sifra netacna, vrati poruku "Email or password not correct"
        // TODO 5. Ako je sifra tacna, vrati token i usera
        return {
            token: "21jk32j1k3lj21k321",
            user
        }
    }
}