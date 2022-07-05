import { userModel } from "./user.model"
import { CreateUserInput, EditUserInput, User } from "./user.types"

export class UserRepository {
    async createUser(createUserInput: CreateUserInput): Promise<User> {
        // const checkUser = await this.getUserByEmail(createUserInput.email)
        // if(checkUser){}
        const doesUserExist = await userModel.findOne({email: createUserInput.email}) 
        const userToSave = new userModel(createUserInput)
        const savedUser = await userToSave.save()

        const user:User = {
            name: savedUser.name,
            age: savedUser.age,
            email: savedUser.email,
            password: savedUser.password,
            gender: savedUser.gender,
            id: savedUser._id.toString()
        }

        return user
    }

    async getUsers(): Promise<User[]> {
        const users = await userModel.find();

        const mappedUsers:User[] = []
        users.forEach(user => {
            mappedUsers.push({name: user.name, age: user.age, email: user.email, gender: user.gender , password: user.password, id: user._id.toString()})
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
            gender: userByEmail.gender,
            id: userByEmail._id.toString()
        }

        console.log("This is from user.repository.ts", user) 

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
            gender: editedUser.gender,
            id: editedUser._id.toString()
        }

        return user
    }

    async deleteUser(userId: string): Promise<boolean> {
        const userToDelete = await userModel.findByIdAndDelete(userId)
        if(!userToDelete){
            return false
        }
        return true
    }

}