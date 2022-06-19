import { userModel } from "./user.model"
import { CreateUserInput, User } from "./user.types"

interface IUserService {
    createUser(userInput: CreateUserInput): Promise<User>
    // getUsers(): Promise<User[]>
}

export class UserService implements IUserService {
     async createUser(userInput: CreateUserInput): Promise<User> {

        const userToSave = new userModel(userInput)
        const savedUser = await userToSave.save()

        const user:User = {
            name: savedUser.name,
            age: savedUser.age,
            email: savedUser.email,
            password: savedUser.password,
            id: savedUser._id.toString()
        }

        return user
    }
}