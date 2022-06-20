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

    async getUsers(): Promise<User[]> {
        const users = await userModel.find();

        const mappedUsers:User[] = []
        users.forEach(user => {
            mappedUsers.push({name: user.name, age: user.age, email: user.email, password: user.password, id: user._id.toString()})
        })
        return mappedUsers

    }
}