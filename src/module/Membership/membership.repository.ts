import { IMembership, membershipModel } from "./membership.model"
import { IUser, userModel } from "./../User/user.model"

export class MembershipRepository {
    

    async getAllExpiredUsers(){
        try {
        const currentDate = new Date() // 2022-08-04T14:43:19.553Z
        // const expiredMemberships = await membershipModel.find({userId: "62ebd2b862498b12687bba88"}) - Ovo hoce
        // const expiredMemberships = await membershipModel.find({endsAt: currentDate })
        // const expiredMemberships = await membershipModel.find({endsAt: undefined }) - ovo hoce
        // const expiredMemberships = await membershipModel.find({endsAt < currentDate }) - ovo nece!? zbog toga sto endsAt moze da bude undefined
        const expiredMemberships = await membershipModel.find().populate({path: 'userId', select: '_id, name', match: {name: "test2"}}); // - vraca sve ali ulazi u check i ostale vraca ali je id uklonjen
        // const expiredMemberships = await membershipModel.find({name: "test2"}).populate({path: 'userId', select: '_id, name'}); // Populate ne postoji u bazi zbog toga ne moze da nadje name?
        console.log(expiredMemberships)
        return expiredMemberships  
        } catch (error) {
            console.log(error)
        }
    }

    async getAllExpiredUsersInPastWeek(){
        try {
        const currentDate = new Date()
        const expiredMembershipsInPastWeek = await membershipModel.find().populate({path: 'userId', select: '_id, name', match: {name: "test2"}})
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