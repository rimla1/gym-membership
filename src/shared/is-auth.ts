import { Request, Response ,NextFunction } from "express";
import {config} from 'dotenv'
config()
import jwt from "jsonwebtoken"
import { NotAuthenticated, NotFoundError } from "./errors";


export = (req: Request, res: Response, next: NextFunction) => {
    
    let secretToken: string
    if(process.env.ACCESS_TOKEN_SECRET){
    secretToken = process.env.ACCESS_TOKEN_SECRET
    }    else {
    throw new Error("Something went wrong!")
}

    const token = req.get("Authorization")?.split(" ")[1]
    if(!token){
        throw new NotFoundError("No Token provided!")
    }

    let verifiedToken;
    try {
        verifiedToken = jwt.verify(token as string, secretToken)
    } catch (error) {
        throw new NotAuthenticated("Not Authenticated!")
    }

    next()
}

// [Valid token]: eyJhbGciOiJIUzI1NiJ9.NjJmZTI5ZTEzZjg0ZmE4NDJkMzFmNzA4.HDw5O5_y9UhwAJDqOQmLK_TRceJq5zbCQcq0spdx-28