import { IUser, userModel } from "./user.model"
import { CreateUserInput, EditUserInput, User } from "./user.types"

export class UserRepository {
    async createUser(createUserInput: CreateUserInput): Promise<User> {

        const existingUser = await userModel.findOne({email: createUserInput.email}) 
        if(existingUser){
            throw new Error(`User with email ${createUserInput.email} alreay exists`)
        }

        const userToSave = new userModel(createUserInput)
        const savedUser = await userToSave.save()

        const appUser = this.mapDBUserToAppUser(savedUser)

        return appUser
    }

    async getUsers(): Promise<User[]> {
        const users = await userModel.find();

        const mappedUsers:User[] = []
        users.forEach(user => {
            const appUser = this.mapDBUserToAppUser(user)

            mappedUsers.push(appUser)
        })
        return mappedUsers
    }

    async getUserByEmail(email: string): Promise<User> {
        const userByEmail = await userModel.findOne({email: email})
        if(!userByEmail) {
            throw new Error(`User with email ${email} doesn't exists`)
        }

        const appUser = this.mapDBUserToAppUser(userByEmail)

        return appUser
    }

    async getUserById(id: string): Promise<User> {
        const userById = await userModel.findById(id)
        if(!userById) {
                throw new Error(`User with id ${id} doesn't exists`)
        }

        const appUser = this.mapDBUserToAppUser(userById)

        return appUser
    }

 
    async editUser(userId: string, editUserInput: EditUserInput): Promise<User> {

       try {
        const successfullEditedUser = await userModel.findOneAndUpdate({_id: userId}, {...editUserInput}, {new: true})

        if (!successfullEditedUser) {
            throw new Error("User not found or update was not sucessfull")
        }

        const appUser = this.mapDBUserToAppUser(successfullEditedUser)

        return appUser
       } catch (error) {
            throw new Error("Something went wrong with database (editUser)")
       }
    }

    async deleteUser(userId: string): Promise<boolean> {
        try {
        await userModel.findByIdAndDelete(userId)
        return true
        } catch {
            throw new Error("Something wrong with the database");
        }
    }

    private mapDBUserToAppUser(userFromDB: IUser): User{
        const user: User = {
            name: userFromDB.name,
            age: userFromDB.age,
            email: userFromDB.email,
            password: userFromDB.password,
            gender: userFromDB.gender,
            id: userFromDB._id.toString()
        }

        return user
    }
}