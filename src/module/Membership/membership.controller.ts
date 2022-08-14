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

        const expiredUsersInPastWeek = await membershipService.getUsersWithExpiredMembershipInPastWeek()
        return res.json(expiredUsersInPastWeek)
    } catch (error) {
        console.log(error)
    }
}

export const updateMembership = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId} = req.params
        console.log(" **1** Controller(Before going to service): No access to MembershipStatus")
        const membershipStatus = await membershipService.updateMembership(userId)
        console.log(" **6** Controller(After coming from service): Have access to MembershipStatus")
        return res.json(membershipStatus)
    } catch (error) {
        console.log(error)
    }
}

export const createMembership = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId} = req.params
        const membership = await membershipService.createMembership(userId)
        return res.json(membership)
    } catch (error) {
        console.log(error)
    }
}



