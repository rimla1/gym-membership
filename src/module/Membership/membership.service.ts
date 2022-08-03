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

    userService: UserService
    membershipRepository: MembershipRepository

    constructor(userService: UserService, membershipRepository: any){
        this.userService = userService
        this.membershipRepository = membershipRepository
    }

    // GET all expired users
    async getAllExpiredUsers(){
        try {
            console.log("Before going to Repository, Here in membership.service.ts getAllExpiredUsers")
            const expiredUsers = this.membershipRepository.getAllExpiredUsers()
            console.log("After coming back from Repository, Here in membership.service.ts getAllExpiredUsers")
            console.log(expiredUsers)
            return expiredUsers
        } catch (error) {
            
        }

    }

    // GET expited users in past 7 days
    async getExpiredUsersInPastWeek(){
        console.log("Here in membership.service.ts getExpiredUsersInPastWeek")
        return "Hello world!"
    }
    
    // PUT update a membership for a certain user
    async updateMembership(userId: string){
        console.log("Ulazim ovde!")
        // const user = this.userService.getUserById(userId)
        console.log(userId)
        return userId
        console.log("Ne stizem ovde")
    }

}