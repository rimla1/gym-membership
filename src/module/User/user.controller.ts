import { Request, Response } from "express"
import { UserRepository } from "./user.repository"
import { UserService } from "./user.service"
import { CreateUserInput, EditUserInput } from "./user.types"

const userRepo = new UserRepository()
const userService = new UserService(userRepo)


export const getUsers = async (req: Request, res: Response) => {
    const listOfAllUsers = await userService.getUsers()
    return res.json(listOfAllUsers)
}

export const createUser = async (req: Request, res: Response) => {

      // TODO - 1. Accept Request and pass it to service

    const {name, age, password, email} = req.body

    const createUserInput: CreateUserInput = {
        name,
        age,
        password,
        email
    }

    const createdUser = await userService.createUser(createUserInput)


    // TODO - 2. Return response
    return res.json(createdUser)
}

export const editUser = async(req: Request, res: Response) => {
    const {name, age, password, email} = req.body

    const editUserInput: EditUserInput = {
        name,
        age,
        password,
    }

    const userId = req.params.userId
    const editedUser = await userService.editUser(userId, editUserInput)
    if(!editedUser) {
        return res.json({message: "User with this ID does not exist"})
    }
    return res.json(editedUser)
}

export const deleteUser = async(req: Request, res: Response) => {
    const userId = req.params.userId
    const isUserDeleted = await userService.deleteUser(userId)
    if (!isUserDeleted) {
        return res.json({message: "User does not exist!"})
    }
    return res.json(isUserDeleted)
}