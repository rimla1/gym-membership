import { UserRepository } from "./user.repository"
import { CreateUserInput, EditUserInput, User } from "./user.types"
import bcrypt from "bcrypt";
import { AlreadyExistsError } from "../../shared/errors";

interface IUserService {
    createUser(createUserInput: CreateUserInput): Promise<User>
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
            const user = await this.userRepo.getUserByEmail(email)
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

     async createUser(createUserInput: CreateUserInput): Promise<User> {
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
            
            const hashedPassword = await this.hashPassword(editUserInput.password)
            const editedUser = await this.userRepo.editUser(userId, {...editUserInput, password: hashedPassword})
            console.log(hashedPassword)
            console.log(editUserInput.password)
            const match = await bcrypt.compare(editUserInput.password, editedUser.password)
            if(match){
                throw new AlreadyExistsError("Password already exist! Please try different password!")
            }
            return editedUser  
        } catch (error) {
            throw error
        }
        // $2b$10$DHq4H7OSTG1U00xB.wpOfe9Y/fSxydx9Iifth07JqozE5ybh..xXq // Current password [random]
        // $2b$10$cmpiQceepFTGlVrVaJOjw.5G4t4ICW/B5vSXPjaz1gimDqaNOVg9i //New different password from previous [almir1234]
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