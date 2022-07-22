import { UserRepository } from "./user.repository"
import { CreateUserInput, EditUserInput, User } from "./user.types"
import bcrypt from "bcrypt";

interface IUserService {
    createUser(createUserInput: CreateUserInput): Promise<User | null>
    getUsers(): Promise<User[]>
    getUserById(id: string): Promise<User>
    editUser(userId: string, editUserInput: EditUserInput): Promise<User>
    deleteUser(userId: string): Promise<boolean>
    getUserByEmail(email: string): Promise<User>
}

export class UserService implements IUserService {
    private userRepo: UserRepository

    constructor(userRepo: UserRepository){
        this.userRepo = userRepo
    }

     async getUserByEmail(email: string): Promise<User> {
        try {
            console.log("Im sending this e-mail to user repository", email)
            const user = await this.userRepo.getUserByEmail(email)
            console.log("I received the user and expected value is null", user)
            return user  
        } catch (error) {
            throw error
        }

    }

    async getUsers(): Promise<User[]> {
        try {
            const users = await this.userRepo.getUsers()
            return users 
        } catch (error) {
             throw error
        }
    }

    async getUserById(id: string): Promise<User> {
        try {
            const user = await this.userRepo.getUserById(id)
            return user 
        } catch (error) {
            throw error
        }

    }

     async createUser(createUserInput: CreateUserInput): Promise<User | null> {
        try {
            const hashedPassword = await this.hashPassword(createUserInput.password)
            const user = await this.userRepo.createUser({...createUserInput, password: hashedPassword})
            return user
        } catch (error) {
            throw error
        }

    }

    async deleteUser(userId: string): Promise<boolean> {
        try {
            const userToDelete = await this.getUserById(userId)
            if(userToDelete){
                const isUserDeleted = await this.userRepo.deleteUser(userId)
                return isUserDeleted
            }
            return false   
        } catch (error) {
            throw error
        }

    }

    async editUser(userId: string, editUserInput: EditUserInput): Promise<User> {
        try {
            const editedUser = await this.userRepo.editUser(userId, editUserInput)
            return editedUser  
        } catch (error) {
            throw error
        }

    }

    private async hashPassword(passwordToHash: string){
        try {
            const hashedPassword = await bcrypt.hash(passwordToHash, 10)
            return hashedPassword;
        } catch (error) {
            throw error
        }
}
}