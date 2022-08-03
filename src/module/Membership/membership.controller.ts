import { NextFunction, Request, Response } from "express"
import { UserRepository } from "../User/user.repository"
import { UserService } from "../User/user.service"
import { MembershipRepository } from "./membership.repository"
import { MembershipService } from "./membership.service"

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const membershipRepository = new MembershipRepository()
const membershipService = new MembershipService(userService, membershipRepository)

export const getAllExpiredUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Before going to Service, Here in membership.controller.ts getAllExpiredUsers")
        const expiredUsers = await membershipService.getAllExpiredUsers()
        console.log("After coming back from Service, Here in membership.controller.ts getAllExpiredUsers")
        console.log(expiredUsers)
        return res.json(expiredUsers)
    } catch (error) {
        console.log(error)
    }

}

export const getExpiredUsersInPastWeek = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const expiredUsersInPastWeek = membershipService.getExpiredUsersInPastWeek()
        return res.json(expiredUsersInPastWeek)
    } catch (error) {
        console.log(error)
    }
}

export const updateMembership = (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId} = req.params
        // const userToUpdate = userService.getUserById(userId)
        const membershipStatus = membershipService.updateMembership(userId) 
        return res.json(membershipStatus)
    } catch (error) {
        console.log(error)
    }
}



