import { Response, Request, NextFunction, Router } from "express"
import { MongoClient } from "mongodb"
import { adultsUsers, numberOfFemaleUsers, numberOfMaleUsers, retiredUsers, underageUsers, usersWithActiveMembership } from "./statistics.controller";

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

// Number of users with active memberships [212]
statisticsRouter.get("/usersWithActiveMembership", usersWithActiveMembership)

// Number of users with inactive memberships [788]
statisticsRouter.get("/usersWithExpiredMembership", async (req: Request, res: Response, next: NextFunction) => {
    await client.connect();
    const usersWithExpiredMembership = await client.db("test").collection("memberships").countDocuments({endsAt: {$lt:currentDate}})
    return res.json(usersWithExpiredMembership)
})

// Get number of memberships for each month in a year

