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
            throw error
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
            throw error
        }
    }

    // Rename to FINDMEMBERSHIP
    async findMembership(userId: string): Promise<MembershipResult>{
        try {
        const DBmembership = await membershipModel.findOne({userId: userId}).populate({path: 'userId', select: '_id, name'})
        if(!DBmembership){
            throw new NotFoundError("Membership Not Found")
        }
        const appMembership = this.mapDBMembershipToAppMembership(DBmembership)
        return appMembership
        } catch (error) {
            throw error
        }
    }

    async findAndUpdateMembership(userId: string, startsAt: Date, endsAt: Date): Promise<MembershipResult>{
        try {
            const updatedMembership = await membershipModel.findOneAndUpdate({userId: userId}, {startsAt: startsAt, endsAt: endsAt}, {new: true})
            if(!updatedMembership){
                throw new NotFoundError("Membership Not Found")
            }
            const appMembership = this.mapDBMembershipToAppMembership(updatedMembership)
            return appMembership
        } catch (error) {
            throw error
        }
    }

    async createMembership(userId: string){
        try {
            const membershipToSave = new membershipModel({userId})
            const savedMembership = await membershipToSave.save()
            return savedMembership
        } catch (error) {
            throw error
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