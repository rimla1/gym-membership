import { Request, Response } from "express"
import { UserRepository } from "./user.repository"
import { UserService } from "./user.service"
import { CreateUserInput, EditUserInput } from "./user.types"
import { createUserInputValidationSchema, editUserValidationInput } from "./user.validation"

const userRepo = new UserRepository()
const userService = new UserService(userRepo)




export const getUsers = async (req: Request, res: Response) => {
    const listOfAllUsers = await userService.getUsers()
    if(listOfAllUsers.length === 0){
        return res.json({message: "No users created yet!"})
    }
    console.log(listOfAllUsers.length)
    return res.json(listOfAllUsers)
}

export const createUser = async (req: Request, res: Response) => {

      // TODO - 1. Accept Request and pass it to service

    const {name, age, password, email, gender} = req.body

    const createUserInput: CreateUserInput = {
        name,
        age,
        password,
        email,
        gender
    }

    const createUserInputValidated = createUserInputValidationSchema.validate(createUserInput, {abortEarly: false})
    
    if(createUserInputValidated.error) {
        return res.status(401).json({errors: createUserInputValidated.error?.details})
    }

    const user = await userService.createUser(createUserInput)


    // TODO - 2. Return response
    console.log("This is from user.controller.ts", user)
    if(user){
        return res.json(user)
    }
    return res.json({message: "User with that e-mail already exist"})

}

export const editUser = async(req: Request, res: Response) => {
    const {name, age, password,  gender} = req.body

    const editUserInput: EditUserInput = {
        name,
        age,
        password,
        gender
    }

    const userId = req.params.userId

    const editUserInputValidated = editUserValidationInput.validate(editUserInput, {abortEarly: false})

    if(editUserInputValidated.error){
        return res.status(401).json({errors: editUserInputValidated.error?.details})
    }

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