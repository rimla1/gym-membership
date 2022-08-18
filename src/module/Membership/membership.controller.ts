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
        return next(error)
    }
}

export const getUsersWithExpiredMembershipInPastWeek = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const expiredUsersInPastWeek = await membershipService.getUsersWithExpiredMembershipInPastWeek()
        return res.json(expiredUsersInPastWeek)
    } catch (error) {
        return next(error)
    }
}

export const extendMembership = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId} = req.params
        const membershipStatus = await membershipService.extendMembership(userId)
        return res.json(membershipStatus)
    } catch (error) {
        return next(error)
    }
}

export const createMembership = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId} = req.params
        const membership = await membershipService.createMembership(userId)
        return res.json(membership)
    } catch (error) {
        return next(error)
    }
}



