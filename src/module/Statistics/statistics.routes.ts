import { Response, Request, NextFunction, Router } from "express"
import { MongoClient } from "mongodb"
import { adultsUsers, numberOfFemaleUsers, numberOfMaleUsers, retiredUsers, underageUsers, usersWithActiveMembership, usersWithExpiredMembership, getFiveUsersWithExpiredMemberships, createUser, findUserByEmail } from "./statistics.controller";

export const statisticsRouter =  Router()

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

const currentDate = new Date()
console.log(currentDate)

// Get number of Male Users [506]
statisticsRouter.get("/numberOfMaleUsers", numberOfMaleUsers)
// Get number of Female Users [494]
statisticsRouter.get("/numberOfFemaleUsers", numberOfFemaleUsers)
// Get number of users who has less than 18 [99]
statisticsRouter.get("/underageUsers", underageUsers)

// Get number of adults [18-65)[525]
statisticsRouter.get("/adultsUsers", adultsUsers)

// Get number of users who has more than 65 [376]
statisticsRouter.get("/retiredUsers", retiredUsers)

// Get Number of users with active memberships [212]
statisticsRouter.get("/usersWithActiveMembership", usersWithActiveMembership)

// Get Number of users with inactive memberships [788]
statisticsRouter.get("/usersWithExpiredMembership", usersWithExpiredMembership)

// Get 5 users with expired memberships
statisticsRouter.get("/getFiveUsersWithExpiredMemberships", getFiveUsersWithExpiredMemberships)

// Create one user
statisticsRouter.post("/createUser", createUser)

// Find user by email
statisticsRouter.get("/findUserByEmail", findUserByEmail)

// Get number of memberships for each month in a year