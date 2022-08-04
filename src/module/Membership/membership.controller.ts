import { NextFunction, Request, Response } from "express"
import { MembershipRepository } from "./membership.repository"
import { MembershipService } from "./membership.service"


const membershipRepository = new MembershipRepository()
const membershipService = new MembershipService(membershipRepository)

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
        console.log("Before going to Service, Here in membership.controller.ts getExpiredUsersInPastWeek")
        const expiredUsersInPastWeek = await membershipService.getExpiredUsersInPastWeek()
        console.log("After coming back from Service, Here in membership.controller.ts getExpiredUsersInPastWeek")
        console.log(expiredUsersInPastWeek)
        return res.json(expiredUsersInPastWeek)
    } catch (error) {
        console.log(error)
    }
}

export const updateMembership = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId} = req.params
        // const userToUpdate = userService.getUserById(userId)
        console.log(userId)
        console.log("Before going to Service, Here in membership.controller.ts updateMembership")
        const membershipStatus = await membershipService.updateMembership(userId) 
        console.log("After coming back from Service, Here in membership.controller.ts updateMembership")
        console.log(membershipStatus)
        return res.json(membershipStatus)
    } catch (error) {
        console.log(error)
    }
}

export const createMembership = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const currentDate = new Date()
        console.log(currentDate)
        const {userId} = req.params
        const startsAt = 0
        const endsAt = 0
        const membership = await membershipService.createMembership(userId, startsAt, endsAt)
        return membership
    } catch (error) {
        console.log(error)
    }
}



