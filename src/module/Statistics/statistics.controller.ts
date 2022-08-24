import { Request, Response, NextFunction } from "express"
import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

const currentDate = new Date()
console.log(currentDate)

export const numberOfMaleUsers = async (req: Request, res: Response, next: NextFunction) => {
    await client.connect();
    const numberOfMaleUsers = await client.db("test").collection("users").countDocuments({gender: "Male"})
    return res.json(numberOfMaleUsers)
}

export const numberOfFemaleUsers = async (req: Request, res: Response, next: NextFunction) => {
    await client.connect();
    const numberOfFemaleUsers = await client.db("test").collection("users").countDocuments({gender: "Female"})
    return res.json(numberOfFemaleUsers)
}

export const underageUsers = async (req: Request, res: Response, next: NextFunction) => {
    await client.connect();
    const underageUsers = await client.db("test").collection("users").countDocuments({age: {$lt:"18"}})
    return res.json(underageUsers)
}

export const adultsUsers = async (req: Request, res: Response, next: NextFunction) => {
    await client.connect();
    const adultsUsers = await client.db("test").collection("users").countDocuments({age: {$gte:"18", $lt:"65"}})
    return res.json(adultsUsers)
}

export const retiredUsers = async (req: Request, res: Response, next: NextFunction) => {
    await client.connect();
    const retiredUsers = await client.db("test").collection("users").countDocuments({age: {$gte:"65"}})
    return res.json(retiredUsers)
}

export const usersWithActiveMembership = async (req: Request, res: Response, next: NextFunction) => {
    await client.connect();
    const usersWithActiveMembership = await client.db("test").collection("memberships").countDocuments({endsAt: {$gte:currentDate}})
    return res.json(usersWithActiveMembership)
}

export const x = async (req: Request, res: Response, next: NextFunction) => {

}