import { Request, Response ,NextFunction } from "express";
import {config} from 'dotenv'
config()
import jwt from "jsonwebtoken"


console.log("zastooooo")

export = (req: Request, res: Response, next: NextFunction) => {
    let secretToken: string
    if(process.env.ACCESS_TOKEN_SECRET){
    secretToken = process.env.ACCESS_TOKEN_SECRET
    }    else {
    throw new Error("Something went wrong!")
}
    const token = req.get("Authorization")?.split(" ")[1]
    // const token = "eyJhbGciOiJIUzI1NiJ9.NjJkZDJlNGU5ZTQzYzQyMTMxMDkzNzA5.1kTRpK5ziU8Kpb75hDzzTydyrDjRZyNyuszEGSJLRaQ"
    console.log("Ovo je token : ", token)
    let verifiedToken;
    try {
        console.log("Pre verifikacije")
        verifiedToken = jwt.verify(token as string, secretToken)
        console.log("Verifikovao je token")
    } catch (error) {
        throw error
    }
    if(!verifiedToken){
        console.log("Ovo nije taj pravi token ipak iako je verifikovan kao validan")
        throw new Error("Not Authenticated!")
    }
    next()
}