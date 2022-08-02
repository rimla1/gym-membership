import { UserService } from "../User/user.service";

export class MembershipService {

    userService: UserService

    constructor(userService: UserService, membershipRepository: any){
        this.userService = userService
    }

    
    // PUT update a membership for a certain user

    // GET all expired users

    // GET expited users in past 7 days

}