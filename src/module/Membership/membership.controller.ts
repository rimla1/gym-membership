import { NextFunction, Request, Response } from "express"
import { UserRepository } from "../User/user.repository"
import { UserService } from "../User/user.service"
import { MembershipRepository } from "./membership.repository"
import { MembershipService } from "./membership.service"

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const membershipRepo = new MembershipRepository()
const membershipService = new MembershipService(userService, membershipRepo)



export const getAllExpiredUsers = async () => {
    // PUT update a membership for a certain user

    // GET all expired users
    try {
        const expitedUsers = await userService.getUsers()
    } catch (error) {
        
    }
    // GET expited users in past 7 days

}