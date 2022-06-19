import { Request, Response } from "express"
import { UserRepository } from "./user.repository"
import { UserService } from "./user.service"
import { CreateUserInput } from "./user.types"

const userRepo = new UserRepository()
const userService = new UserService(userRepo)

export const createUser = async (req: Request, res: Response) => {

      // TODO - 1. Accept Request and pass it to service

    const {name, age, password, email} = req.body

    const userInput: CreateUserInput = {
        name,
        age,
        password,
        email
    }

    const createdUser = await userService.createUser(userInput)


    // TODO - 2. Return response
    return res.json(createdUser)
}