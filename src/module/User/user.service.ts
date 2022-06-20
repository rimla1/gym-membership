import { userModel } from "./user.model"
import { UserRepository } from "./user.repository"
import { CreateUserInput, User } from "./user.types"

interface IUserService {
    createUser(userInput: CreateUserInput): Promise<User>
    getUsers(): Promise<User[]>
}

export class UserService implements IUserService {
    userRepo: UserRepository

    constructor(userRepo: UserRepository){
        this.userRepo = userRepo
    }

     async createUser(userInput: CreateUserInput): Promise<User> {

        const user = await this.userRepo.createUser(userInput)
        return user
    }

    async getUsers(): Promise<User[]> {
        const users = await this.userRepo.getUsers()
        return users
    }
}