import { UserService } from "../User/user.service";
import { MembershipRepository } from "./membership.repository";
import { MembershipResult } from "./membership.types";


interface IMembership {
    // Promise<MembershipResult[]>
    getUsersWithExpiredMembership(): Promise<MembershipResult[]>
    // Promise<MembershipResult[]>
    getUsersWithExpiredMembershipInPastWeek(): Promise<MembershipResult[]>
    // Promise<MembershipResult>
    updateMembership(userId: string): Promise<MembershipResult>
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
    // TODO - 1. Extend membership mozda noov ime
    async updateMembership(userId: string): Promise<MembershipResult>{
        try {
            let startsAt: Date;
            let endsAt: Date;
            let updatedMembership: Promise<MembershipResult>;
            const currentDate = new Date()
            const membership = await this.membershipRepository.findMembership(userId)
            const isMembershipExpired = membership.startsAt === null || membership.endsAt < currentDate
            if(isMembershipExpired){
                startsAt = currentDate
                endsAt = new Date();
                endsAt.setMonth(endsAt.getMonth() + 1);
                updatedMembership = this.membershipRepository.findAndUpdateMembership(userId, startsAt, endsAt)
                return updatedMembership
            }
             startsAt = membership.startsAt
             endsAt = new Date(membership.endsAt)
             endsAt.setMonth(endsAt.getMonth() + 1);
             updatedMembership = this.membershipRepository.findAndUpdateMembership(userId, startsAt, endsAt)
            return updatedMembership
        } catch (error) {
            throw 'abc promeni me';
        }
    }

    // private async extendUnexpiredMembership(membership: MembershipResult, userId: string) {
    //     const startsAt = membership.startsAt
    //     const endsAt = new Date(membership.endsAt)
    //     endsAt.setMonth(endsAt.getMonth() + 1);
    //     const updatedMembership = this.membershipRepository.findAndUpdateMembership(userId, startsAt, endsAt)
    //     return updatedMembership
    // }


    async createMembership(userId: string){
        console.log("Creating membership triggered")
        const membership = await this.membershipRepository.createMembership(userId)
        return membership
    }

}