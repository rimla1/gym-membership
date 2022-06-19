import { Request, Response } from "express"
import { UserService } from "./user.service"
import { CreateUserInput } from "./user.types"

const userService = new UserService()

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