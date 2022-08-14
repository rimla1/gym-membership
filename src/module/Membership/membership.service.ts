import { UserService } from "../User/user.service";
import { MembershipRepository } from "./membership.repository";
import { MembershipResult } from "./membership.types";


interface IMembership {
    // Promise<MembershipResult[]>
    getUsersWithExpiredMembership(): Promise<MembershipResult[]>
    // Promise<MembershipResult[]>
    getUsersWithExpiredMembershipInPastWeek(): Promise<MembershipResult[]>
    // Promise<MembershipResult>
    updateMembership(userId: string): any
}

export class MembershipService implements IMembership {

    membershipRepository: MembershipRepository

    constructor( membershipRepository: any){
        this.membershipRepository = membershipRepository
    }

    // GET all expired users
    async getUsersWithExpiredMembership(): Promise<MembershipResult[]>{
        try {
            const expiredUsers = await this.membershipRepository.getUsersWithExpiredMembership()
            return expiredUsers
        } catch (error) {
            console.log(error)
            throw 'abc promeni me';
        }

    }

    // GET expited users in past 7 days
    async getUsersWithExpiredMembershipInPastWeek(): Promise<MembershipResult[]>{
        try {
            const expiredUsersInPastWeek = await this.membershipRepository.getUsersWithExpiredMembershipInPastWeek()
            return expiredUsersInPastWeek
        } catch (error) {
            throw 'abc promeni me';
        }
    }
    
    // PUT update a membership for a certain user
    async updateMembership(userId: string){
        try {
            const currentDate = new Date()
            console.log(currentDate)
            console.log(" **2** Service(Before going to repository): No access to MembershipStatus")
            const membershipStatus = await this.membershipRepository.updateMembership(userId)
            // Need to receive startsAt and endsAt from database
                // if (statsAt === null || endMembership < currentDate){}
                // don't update startsAt, just update endMembership + 30
            console.log(" **5** Service(After coming from repository): Have access to MembershipStatus")
            return membershipStatus
        } catch (error) {
            throw 'abc promeni me';
        }

    }

    async createMembership(userId: string){
        console.log("Creating membership triggered")
        const membership = await this.membershipRepository.createMembership(userId)
        return membership
    }

}