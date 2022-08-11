import { IMembership, membershipModel } from "./membership.model"
import { IUser, userModel } from "./../User/user.model"

export class MembershipRepository {
    

    async getUsersWithExpiredMembership(){
        try {
        const currentDate = new Date()
        const expiredMemberships = await membershipModel.find({ endsAt: { $lt: currentDate } })
        console.log(expiredMemberships)
        return expiredMemberships  
        } catch (error) {
            console.log(error)
        }
    }

    async getUsersWithExpiredMembershipInPastWeek(){
        try {
        const currentDate = new Date()
        const currentDateMinusSevenDays = new Date();
        currentDateMinusSevenDays.setDate(currentDateMinusSevenDays.getDate() - 7);

        // db.collection.find({ DateAdded : { $gt:ISODate('2020-09-18T21:07:42.313+00:00'), $lt:ISODate('2020-09-19T21:08:42.313+00:00')}})
        const expiredMembershipsInPastWeek = await membershipModel.find({ endsAt : {   $gt: currentDateMinusSevenDays , $lt: currentDate }}).populate({path: 'userId', select: '_id, name'})
        return expiredMembershipsInPastWeek
        } catch (error) {
            console.log(error)
        }
    }

    async updateMembership(userId: string){
        try {
        const membershipToUpdate = await membershipModel.find({userId: userId}).populate({path: 'userId', select: '_id, name'})
        return membershipToUpdate 
        } catch (error) {
            console.log(error)
        }
    }

    async createMembership(userId: string){
        try {
            const membershipToSave = new membershipModel({userId})
            const savedMembership = await membershipToSave.save()
            return savedMembership
        } catch (error) {
            console.log(error)
        }
    }
}