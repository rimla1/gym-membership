import {Router} from 'express'
import { getAllExpiredUsers, getExpiredUsersInPastWeek, updateMembership } from './membership.controller';


export const membershipRouter = Router();

// GET all expired users
membershipRouter.get("/", getAllExpiredUsers)


// GET expited users in past 7 days
membershipRouter.get("/users", getExpiredUsersInPastWeek)

// PUT update a membership for a certain user
membershipRouter.put("/:userId", updateMembership)