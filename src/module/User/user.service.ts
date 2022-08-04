import { UserRepository } from "./user.repository"
import { CreateUserInput, EditUserInput, User } from "./user.types"
import bcrypt from "bcrypt";
import { AlreadyExistsError } from "../../shared/errors";
import { MembershipService } from "../Membership/membership.service";

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
    private membershipService: MembershipService

    constructor(userRepo: UserRepository, membershipService: MembershipService){
        this.userRepo = userRepo
        this.membershipService = membershipService
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
            await this.membershipService.createMembership(user.id, 0, 0)
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
            const userFromDB = await this.getUserById(userId)
            if(editUserInput.password){
                const match = await bcrypt.compare(editUserInput.password, userFromDB.password)
            if(match){
                throw new AlreadyExistsError("Password already exist! Please try different password!")
            }
            const hashedPassword = await this.hashPassword(editUserInput.password)
            editUserInput.password = hashedPassword 
            }
            const editedUser = await this.userRepo.editUser(userId, editUserInput)
            return editedUser  
        } catch (error) {
            throw error
        }
        // $2b$10$cmpiQceepFTGlVrVaJOjw.5G4t4ICW/B5vSXPjaz1gimDqaNOVg9i // Current password [almir1234]
        // $2b$10$tWXEbPSS0Xd.A8jVXnpMz.3N44LXGViSKL3f37Csonz8xVpLcdnpa // Updated different password from current password [rimla5]
        // Password is the same (message from postman) // try with same password [rimla5]
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