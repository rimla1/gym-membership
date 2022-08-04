import { IMembership, membershipModel } from "./membership.model"
import { IUser, userModel } from "./../User/user.model"

export class MembershipRepository {
    
    async getAllExpiredUsers(){
        try {
        const currentDate = new Date()
        const expiredMemberships = await userModel.find().populate({path: "memberships", match: {startsAt: {$lte: currentDate}}});
        console.log(expiredMemberships)
        return "Hello from MembershipRepository getAllExpiredUsers"    
        } catch (error) {
            console.log(error)
        }
    }

    async getAllExpiredUsersInPastWeek(){
        try {
        return "Hello from MembershipRepository getAllExpiredUsersInPastWeek"
        } catch (error) {
            console.log(error)
        }
    }

    async updateMembership(){
        try {
        return "Hello from MembershipRepository updateMembership"    
        } catch (error) {
            console.log(error)
        }
    }

    async createMembership(userId: string, startsAt: number, endsAt: number){
        try {
            const membershipToSave = new membershipModel({userId, undefined})
            const savedMembership = await membershipToSave.save()
            return savedMembership
        } catch (error) {
            console.log(error)
        }
    }
}