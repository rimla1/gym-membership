import {Router} from 'express'
import isAuth from '../../shared/is-auth';
import { getUsersWithExpiredMembership, getUsersWithExpiredMembershipInPastWeek, extendMembership } from './membership.controller';


export const membershipRouter = Router();

// GET all expired users
membershipRouter.get("/", isAuth , getUsersWithExpiredMembership)


// GET expited users in past 7 days
membershipRouter.get("/users", isAuth, getUsersWithExpiredMembershipInPastWeek)

// PUT update a membership for a certain user
membershipRouter.put("/:userId", isAuth, extendMembership)