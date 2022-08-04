import { NextFunction, Request, Response } from "express"
import { ValidationError } from "../../shared/errors"
import { MembershipRepository } from "../Membership/membership.repository"
import { MembershipService } from "../Membership/membership.service"
import { UserRepository } from "./user.repository"
import { UserService } from "./user.service"
import { CreateUserInput, EditUserInput } from "./user.types"
import { createUserInputValidationSchema, editUserValidationInput } from "./user.validation"

const membershipRepository = new MembershipRepository()
const membershipService = new MembershipService(membershipRepository)

const userRepo = new UserRepository()
const userService = new UserService(userRepo, membershipService)



export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getUsers()
        if(users.length === 0){
            return res.json({message: "No users created yet!"})
        }
        return res.json(users)
    } catch (error) {
        return next(error)
    }

}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = req.params;
    try {
        const user = await userService.getUserById(userId)
        return res.status(200).json(user)
    } catch (error) {
       return next(error) 
    }
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
    try {
    const createUserInputValidated = createUserInputValidationSchema.validate(createUserInput, {abortEarly: false})
    if(createUserInputValidated.error) {
        throw new ValidationError(createUserInputValidated.error?.details)
    }
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

    try {
    const editUserInputValidated = editUserValidationInput.validate(editUserInput, {abortEarly: false})

    if(editUserInputValidated.error){
        throw new ValidationError(editUserInputValidated.error?.details)
    }
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

