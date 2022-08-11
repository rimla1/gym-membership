import {Router} from 'express'
import { getUsersWithExpiredMembership, getUsersWithExpiredMembershipInPastWeek, updateMembership } from './membership.controller';


export const membershipRouter = Router();

// GET all expired users
membershipRouter.get("/", getUsersWithExpiredMembership)


// GET expited users in past 7 days
membershipRouter.get("/users", getUsersWithExpiredMembershipInPastWeek)

// PUT update a membership for a certain user
membershipRouter.put("/:userId", updateMembership)