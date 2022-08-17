import { IMembership, membershipModel } from "./membership.model"
import { IUser, userModel } from "./../User/user.model"
import { NotFoundError, UnexpectedError } from "../../shared/errors"
import { MembershipResult } from "./membership.types"

export class MembershipRepository {
    

    async getUsersWithExpiredMembership(): Promise<MembershipResult[]>{
        try {
        const currentDate = new Date()
        const expiredMemberships = await membershipModel.find({ endsAt: { $lt: currentDate } })
        if(!expiredMemberships){
            throw new NotFoundError("Memberships Not Found")
        }
        
        const membershipResult: MembershipResult[] = [];

        expiredMemberships.forEach(membership => {
            const mappedMembership = this.mapDBMembershipToAppMembership(membership)
            membershipResult.push(mappedMembership)
        })

        return membershipResult
        } catch (error) {
            console.log(error)
            throw new UnexpectedError("Something went wrong with promenicu ovo posle")
        }
    }

    async getUsersWithExpiredMembershipInPastWeek():  Promise<MembershipResult[]>{
        try {
        const currentDate = new Date()
        const currentDateMinusSevenDays = new Date();
        currentDateMinusSevenDays.setDate(currentDateMinusSevenDays.getDate() - 7);
        const expiredMembershipsInPastWeek = await membershipModel.find({ endsAt : {   $gt: currentDateMinusSevenDays , $lt: currentDate }}).populate({path: 'userId', select: '_id, name'})
        if(!expiredMembershipsInPastWeek){
            throw new NotFoundError("Memberships Not Found")
        }

        const membershipResult: MembershipResult[] = [];

        expiredMembershipsInPastWeek.forEach(membership => {
            const mappedMembership = this.mapDBMembershipToAppMembership(membership)
            membershipResult.push(mappedMembership)
        })

        return membershipResult
        } catch (error) {
            throw new UnexpectedError("Something went wrong with promenicu ovo posle")
        }
    }

    // Rename to FINDMEMBERSHIP
    async findMembership(userId: string): Promise<MembershipResult>{
        try {
        console.log(" **3** Repository(Before going to database): No access to MembershipStatus")
        const DBmembership = await membershipModel.findOne({userId: userId}).populate({path: 'userId', select: '_id, name'})
        if(!DBmembership){
            throw new NotFoundError("Membership Not Found")
        }
        const appMembership = this.mapDBMembershipToAppMembership(DBmembership)
        console.log(" **4** Repository(After coming from database): Have access to MembershipStatus")
        // const appMembership = this.mapDBMembershipToAppMembership(membershipToUpdate)
        return appMembership
        } catch (error) {
            throw new UnexpectedError("Something went wrong with promenicu ovo posle")
        }
    }

    // Rename to UPDATEMEMBERSHIP
    async findAndUpdateMembership(userId: string, startsAt: Date, endsAt: Date): Promise<MembershipResult>{
        const updatedMembership = await membershipModel.findOneAndUpdate({userId: userId}, {startsAt: startsAt, endsAt: endsAt}, {new: true})
        if(!updatedMembership){
            throw new NotFoundError("Membership Not Found")
        }
        const appMembership = this.mapDBMembershipToAppMembership(updatedMembership)
        return appMembership
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

    private mapDBMembershipToAppMembership(membershipFromDB: IMembership): MembershipResult {
        const membership: MembershipResult = {
            startsAt: membershipFromDB.startsAt,
            endsAt: membershipFromDB.endsAt,
            userId: membershipFromDB.userId.toString(),
            id: membershipFromDB._id.toString()
        }
        return membership
    }

}