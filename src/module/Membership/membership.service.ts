import { UserService } from "../User/user.service";
import { MembershipRepository } from "./membership.repository";

interface IMembership {
    // Promise<Users[]>
    getAllExpiredUsers(): any
    // Promise<Users[]>
    getExpiredUsersInPastWeek(): any
    // Promise<User>
    updateMembership(userId: string): any
}

export class MembershipService implements IMembership {

    membershipRepository: MembershipRepository

    constructor( membershipRepository: any){
        this.membershipRepository = membershipRepository
    }

    // GET all expired users
    async getAllExpiredUsers(){
        try {
            console.log("Before going to Repository, Here in membership.service.ts getAllExpiredUsers")
            const expiredUsers = await this.membershipRepository.getAllExpiredUsers()
            console.log("After coming back from Repository, Here in membership.service.ts getAllExpiredUsers")
            console.log(expiredUsers)
            return expiredUsers
        } catch (error) {
            
        }

    }

    // GET expited users in past 7 days
    async getExpiredUsersInPastWeek(){
        try {
            console.log("Before going to Repository, Here in membership.service.ts getExpiredUsersInPastWeek")
            const expiredUsersInPastWeek = await this.membershipRepository.getAllExpiredUsersInPastWeek()
            console.log("After coming back from Repository, Here in membership.service.ts getExpiredUsersInPastWeek")
            console.log(expiredUsersInPastWeek)
            return 
        } catch (error) {
            
        }
    }
    
    // PUT update a membership for a certain user
    async updateMembership(userId: string){
        console.log(userId)
        console.log("Before going to Repository, Here in membership.service.ts updateMembership")
        const membershipStatus = await this.membershipRepository.updateMembership()
        console.log("After coming back from Repository, Here in membership.service.ts updateMembership")
        console.log(membershipStatus)
        return membershipStatus
    }

    async createMembership(userId: string, startsAt: number, endsAt: number){
        console.log("Creating membership triggered")
        const membership = await this.membershipRepository.createMembership(userId, startsAt, endsAt)
        console.log(userId, startsAt, endsAt)
        return membership
    }

}