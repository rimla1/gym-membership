import { NextFunction, Request, Response } from "express"
import { MembershipRepository } from "./membership.repository"
import { MembershipService } from "./membership.service"


const membershipRepository = new MembershipRepository()
const membershipService = new MembershipService(membershipRepository)

export const getUsersWithExpiredMembership = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const expiredUsers = await membershipService.getUsersWithExpiredMembership()
        return res.json(expiredUsers)
    } catch (error) {
        console.log(error)
    }

}

export const getUsersWithExpiredMembershipInPastWeek = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Before going to Service, Here in membership.controller.ts getExpiredUsersInPastWeek")
        const expiredUsersInPastWeek = await membershipService.getUsersWithExpiredMembershipInPastWeek()
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
        const membershipStatus = await membershipService.updateMembership(userId) 
        return res.json(membershipStatus)
    } catch (error) {
        console.log(error)
    }
}

export const createMembership = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId} = req.params
        const membership = await membershipService.createMembership(userId)
        console.log(membership)
        return membership
    } catch (error) {
        console.log(error)
    }
}



