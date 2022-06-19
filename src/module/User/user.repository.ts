import { userModel } from "./user.model"
import { CreateUserInput, User } from "./user.types"

export class UserRepository {
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