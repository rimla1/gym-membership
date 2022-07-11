import { userModel } from "./user.model"
import { CreateUserInput, EditUserInput, User } from "./user.types"
import bycrypt from "bcrypt"

export class UserRepository {

    async hashPassword(passwordToHash: string){
            const hashedPassword = await bycrypt.hash(passwordToHash, 10)
            return hashedPassword;
    }

    async createUser(createUserInput: CreateUserInput): Promise<User> {

        const existingUser = await userModel.findOne({email: createUserInput.email}) 
        if(existingUser){
            throw new Error(`User with email ${createUserInput.email} alreay exists`)
        }

        const hashedPassword = await this.hashPassword(createUserInput.password)

        const userToSave = new userModel(createUserInput)
        const savedUser = await userToSave.save()

        const user:User = {
            name: savedUser.name,
            age: savedUser.age,
            email: savedUser.email,
            password: hashedPassword,
            gender: savedUser.gender,
            id: savedUser._id.toString()
        }

        console.log("This is from user.repository.ts", user)
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

 
    async editUser(userId: string, editUserInput: EditUserInput): Promise<User> {
        try {
            const userToEdit = await userModel.findById(userId)
            if(!userToEdit) {
                 throw new Error(`User with id: ${userId} does not exist`)
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
        } catch {
            throw new Error("Something went wrong in database")
        }

    }

    async deleteUser(userId: string): Promise<boolean> {
        try {
        const userToDelete = await userModel.findByIdAndDelete(userId)
        if(!userToDelete) {
            throw new Error(`User with id: ${userId} does not exist`)
        }
        return true
        } catch {
            throw new Error("Something wrong with the database");
        }
    }

}