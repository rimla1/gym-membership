import { NextFunction, Request, Response } from "express"
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

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
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

    try {
        const user = await userService.createUser(createUserInput)
        return res.status(200).json(user)
    } catch (error) {
        return next(error)
    }

}

export const editUser = async(req: Request, res: Response, next: NextFunction) => {
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

    try {
        const editedUser = await userService.editUser(userId, editUserInput)
        return res.json(editedUser)
    } catch (error) {
       return next(error)
    }

}

export const deleteUser = async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId
    
    try {
        const isUserDeleted = await userService.deleteUser(userId)
        return res.json(isUserDeleted)
    } catch (error) {
        return next(error)
    }
    
}