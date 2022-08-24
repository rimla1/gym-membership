import { Response, Request, NextFunction, Router } from "express"
import { MongoClient } from "mongodb"

export const statisticsRouter =  Router()

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

const currentDate = new Date()
console.log(currentDate)

// Get number of Male Users [506]
statisticsRouter.get("/numberOfMaleUsers", async (req: Request, res: Response, next: NextFunction) => {
    await client.connect();
    const numberOfMaleUsers = await client.db("test").collection("users").countDocuments({gender: "Male"})
    return res.json(numberOfMaleUsers)
})
// Get number of Female Users [494]
statisticsRouter.get("/numberOfFemaleUsers", async (req: Request, res: Response, next: NextFunction) => {
    await client.connect();
    const numberOfMaleUsers = await client.db("test").collection("users").countDocuments({gender: "Female"})
    return res.json(numberOfMaleUsers)
})
// Get number of users who has less than 18 [99]
statisticsRouter.get("/underageUsers", async (req: Request, res: Response, next: NextFunction) => {
    await client.connect();
    const underageUsers = await client.db("test").collection("users").countDocuments({age: {$lt:"18"}})
    return res.json(underageUsers)
})

// Get number of adults [18-65)[525]
statisticsRouter.get("/adultsUsers", async (req: Request, res: Response, next: NextFunction) => {
    await client.connect();
    const adultsUsers = await client.db("test").collection("users").countDocuments({age: {$gte:"18", $lt:"65"}})
    // db.myCollection.find({field1: {$gt:25, $lt:32}})
    return res.json(adultsUsers)
})

// Get number of users who has more than 65 [376]
statisticsRouter.get("/retiredUsers", async (req: Request, res: Response, next: NextFunction) => {
    await client.connect();
    const retiredUsers = await client.db("test").collection("users").countDocuments({age: {$gte:"65"}})
    return res.json(retiredUsers)
})

// Number of users with active memberships [212]
statisticsRouter.get("/usersWithActiveMembership", async (req: Request, res: Response, next: NextFunction) => {
    await client.connect();
    const usersWithActiveMembership = await client.db("test").collection("memberships").countDocuments({endsAt: {$gte:currentDate}})
    return res.json(usersWithActiveMembership)
})

// Number of users with inactive memberships [788]
statisticsRouter.get("/usersWithExpiredMembership", async (req: Request, res: Response, next: NextFunction) => {
    await client.connect();
    const usersWithExpiredMembership = await client.db("test").collection("memberships").countDocuments({endsAt: {$lt:currentDate}})
    return res.json(usersWithExpiredMembership)
})

// Get number of memberships for each month in a year

