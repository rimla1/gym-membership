import { CreateUserInput, User } from "./user.types"

interface IUserService {
    createUser(userInput: CreateUserInput): User
    // getUsers(): User[]
}

export class UserService implements IUserService {
     createUser(userInput: CreateUserInput): User {
        const user:User = {
            name: userInput.name,
            age: userInput.age,
            email: userInput.email,
            password: userInput.password,
            id: "sajdlsjadkljsa"
        }
        return user
    }
}