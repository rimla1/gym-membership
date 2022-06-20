import { userModel } from "./user.model"
import { CreateUserInput, EditUserInput, User } from "./user.types"

export class UserRepository {
    async createUser(createUserInput: CreateUserInput): Promise<User> {
        const userToSave = new userModel(createUserInput)
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

    async getUserByEmail(email: string): Promise<User | null> {
        const userByEmail = await userModel.findOne({email: email})

        if(!userByEmail) {
            return null
        }

        const user: User = {
            name: userByEmail.name,
            age: userByEmail.age,
            email: userByEmail.email,
            password: userByEmail.password,
            id: userByEmail._id.toString()
        }

        return user
    }

 
    async editUser(userId: string, editUserInput: EditUserInput): Promise<User | null> {
        const userToEdit = await userModel.findById(userId)

        if(!userToEdit) {
            return null
        }

        userToEdit.set(editUserInput)

        const editedUser = await userToEdit.save()

        const user: User = {
            name: editedUser.name,
            age: editedUser.age,
            email: editedUser.email,
            password: editedUser.password,
            id: editedUser._id.toString()
        }

        return user
    }

}