import { UserRepository } from "./user.repository"
import { CreateUserInput, EditUserInput, User } from "./user.types"

interface IUserService {
    createUser(createUserInput: CreateUserInput): Promise<User | null>
    getUsers(): Promise<User[]>
    getUserById(id: string): Promise<User>
    editUser(userId: string, editUserInput: EditUserInput): Promise<User>
    deleteUser(userId: string): Promise<boolean>
    getUserByEmail(email: string): Promise<User | null>
}

export class UserService implements IUserService {
    private userRepo: UserRepository

    constructor(userRepo: UserRepository){
        this.userRepo = userRepo
    }

     async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.userRepo.getUserByEmail(email)
        console.log("This is from user.service.ts", user)
        return user
    }

    async getUsers(): Promise<User[]> {
        const users = await this.userRepo.getUsers()
        return users
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.userRepo.getUserById(id)
        return user
    }

     async createUser(createUserInput: CreateUserInput): Promise<User | null> {
        const user = await this.userRepo.createUser(createUserInput)
        return user
    }

    async deleteUser(userId: string): Promise<boolean> {
        const userToDelete = await this.getUserById(userId)
        if(userToDelete){
            const isUserDeleted = await this.userRepo.deleteUser(userId)
            return isUserDeleted
        }
        return false
    }

    async editUser(userId: string, editUserInput: EditUserInput): Promise<User> {
        const editedUser = await this.userRepo.editUser(userId, editUserInput)
        return editedUser
    }

}