import { UserService } from "../User/user.service";
import { MembershipRepository } from "./membership.repository";

interface IMembership {
    // Promise<Users[]>
    getUsersWithExpiredMembership(): any
    // Promise<Users[]>
    getUsersWithExpiredMembershipInPastWeek(): any
    // Promise<User>
    updateMembership(userId: string): any
}

export class MembershipService implements IMembership {

    membershipRepository: MembershipRepository

    constructor( membershipRepository: any){
        this.membershipRepository = membershipRepository
    }

    // GET all expired users
    async getUsersWithExpiredMembership(){
        try {
            const expiredUsers = await this.membershipRepository.getUsersWithExpiredMembership()
            return expiredUsers
        } catch (error) {
            console.log(error)
        }

    }

    // GET expited users in past 7 days
    async getUsersWithExpiredMembershipInPastWeek(){
        try {
            console.log("Before going to Repository, Here in membership.service.ts getExpiredUsersInPastWeek")
            const expiredUsersInPastWeek = await this.membershipRepository.getUsersWithExpiredMembershipInPastWeek()
            console.log("After coming back from Repository, Here in membership.service.ts getExpiredUsersInPastWeek")
            console.log(expiredUsersInPastWeek)
            return expiredUsersInPastWeek
        } catch (error) {
            
        }
    }
    
    // PUT update a membership for a certain user
    async updateMembership(userId: string){
        console.log(userId, "membership service")
        const membershipStatus = await this.membershipRepository.updateMembership(userId)
        return membershipStatus
    }

    async createMembership(userId: string){
        console.log("Creating membership triggered")
        const membership = await this.membershipRepository.createMembership(userId)
        return membership
    }

}