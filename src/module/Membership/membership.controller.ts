import { NextFunction, Request, Response } from "express"
import { UserRepository } from "../User/user.repository"
import { UserService } from "../User/user.service"
import { MembershipRepository } from "./membership.repository"
import { MembershipService } from "./membership.service"

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const membershipRepo = new MembershipRepository()
const membershipService = new MembershipService(userService, membershipRepo)

export const updateMembership = (req: Request, res: Response, next: NextFunction) => {
    console.log("Get users that membership expired in past 7 days!")
    res.json({message: "Almir Muminovic 19 [54321], updateMembership"})
}

export const getExpiredUsersInPastWeek = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Get users that membership expired in past 7 days!")
    res.json({message: "Almir Muminovic 19 [54321], getExpiredUsersInP"})
}

export const getAllExpiredUsers = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Get users that membership expired in past 7 days!")
    res.json({message: "Almir Muminovic 19 [54321, getAllExpiredUsers]"})
    
    
    // try {
    //     const expitedUsers = await userService.getUsers()
    // } catch (error) {
        
    // }

}