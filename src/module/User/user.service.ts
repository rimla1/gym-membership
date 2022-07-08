import { UserRepository } from "./user.repository"
import { CreateUserInput, EditUserInput, User } from "./user.types"

interface IUserService {
    createUser(createUserInput: CreateUserInput): Promise<User | null>
    getUsers(): Promise<User[]>
    editUser(userId: string, editUserInput: EditUserInput): Promise<User | null>
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

    

    async deleteUser(userId: string): Promise<boolean> {
        const isUserDeleted = await this.userRepo.deleteUser(userId)
        return isUserDeleted
    }

    async getUsers(): Promise<User[]> {
        const users = await this.userRepo.getUsers()
        return users
    }

     async createUser(createUserInput: CreateUserInput): Promise<User | null> {
        const user = await this.userRepo.createUser(createUserInput)
        return user
    }

    async editUser(userId: string, editUserInput: EditUserInput): Promise<User | null> {

        // return editedUser
        
        // TODO 1 ova funkcija primi argumente iz kontrolera koje treba da prosledi dalje repo
        const editedUser = await this.userRepo.editUser(userId, editUserInput)

        // TODO 2 Nakon sto servis zavrsi, repoistory prima nazad editovanog usera ili null i salje ga controleru
        return editedUser
    }
}