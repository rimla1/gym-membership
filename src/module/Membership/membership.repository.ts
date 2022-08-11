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
        // db.collection.find({ endsAt : { $gt:currentDate - '1m', $lt:currentDate}})
        const expiredMembershipsInPastWeek = await membershipModel.find({ endsAt : {   $gt:("2022-07-31")}}).populate({path: 'userId', select: '_id, name'})
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