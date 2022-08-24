import { Response, Request, NextFunction, Router } from "express"
import { MongoClient } from "mongodb"

export const statisticsRouter =  Router()

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);



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
    // const underageUsersDB = await client.db("test").collection("users").find({age: "18"}).toArray()
    console.log(underageUsers)
    return res.json(underageUsers)
})

// Get number of users above 18

// Get number of users who has more than 65

// Get number of memberships for each month in a year

