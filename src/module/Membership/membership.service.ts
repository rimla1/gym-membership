import { MembershipRepository } from "./membership.repository";
import { MembershipResult } from "./membership.types";


interface IMembership {
    getUsersWithExpiredMembership(): Promise<MembershipResult[]>
    getUsersWithExpiredMembershipInPastWeek(): Promise<MembershipResult[]>
    extendMembership(userId: string): Promise<MembershipResult>
}

export class MembershipService implements IMembership {

    membershipRepository: MembershipRepository

    constructor( membershipRepository: any){
        this.membershipRepository = membershipRepository
    }

    async getUsersWithExpiredMembership(): Promise<MembershipResult[]>{
        try {
            const expiredUsers = await this.membershipRepository.getUsersWithExpiredMembership()
            return expiredUsers
        } catch (error) {
            throw error;
        }

    }

    async getUsersWithExpiredMembershipInPastWeek(): Promise<MembershipResult[]>{
        try {
            const expiredUsersInPastWeek = await this.membershipRepository.getUsersWithExpiredMembershipInPastWeek()
            return expiredUsersInPastWeek
        } catch (error) {
            throw error;
        }
    }
    

    async extendMembership(userId: string): Promise<MembershipResult>{
        try {
            let updatedMembership: Promise<MembershipResult>;
            const currentDate = new Date()
            const membership = await this.membershipRepository.findMembership(userId)
            const isMembershipExpired = membership.startsAt === null || membership.endsAt < currentDate
            if(isMembershipExpired){
                updatedMembership = this.renewExpiredMembership(userId)
                return updatedMembership
            }
             updatedMembership = this.extendUnexpiredMembership(membership, userId)
            return updatedMembership
        } catch (error) {
            throw error;
        }
    }

    private async extendUnexpiredMembership(membership: MembershipResult, userId: string) {
        const startsAt = membership.startsAt
        const endsAt = new Date(membership.endsAt)
        endsAt.setMonth(endsAt.getMonth() + 1);
        const updatedMembership = this.membershipRepository.findAndUpdateMembership(userId, startsAt, endsAt)
        return updatedMembership
    }

    private async renewExpiredMembership(userId: string){
        const currentDate = new Date()
        const startsAt = currentDate
        const endsAt = new Date();
        endsAt.setMonth(endsAt.getMonth() + 1);
        const updatedMembership = this.membershipRepository.findAndUpdateMembership(userId, startsAt, endsAt)
        return updatedMembership
    }

    

    async createMembership(userId: string){
        try {
            const membership = await this.membershipRepository.createMembership(userId)
            return membership
        } catch (error) {
            throw error
        }
    }
}