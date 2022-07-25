import {config} from 'dotenv'
config()
import bcrypt from "bcrypt";
import { NotFoundError } from "../../shared/errors";
import { UserService } from "../User/user.service";
import { LoginRequest, LoginResponse } from "./auth.types";
import jwt from "jsonwebtoken";

interface IAuthService{
    login(loginInput: LoginRequest): Promise<LoginResponse>
}
let secretToken: string
if(process.env.ACCESS_TOKEN_SECRET){
    secretToken = process.env.ACCESS_TOKEN_SECRET
} else {
    throw new Error("Something went wrong!")
}
export class AuthService implements IAuthService{

    userService: UserService

    constructor(userService: UserService){
        this.userService = userService
       
    }



    async login(loginInput: LoginRequest): Promise<LoginResponse>{
        try {
            const user = await this.userService.getUserByEmail(loginInput.email)
            const match = await bcrypt.compare(loginInput.password, user.password)
            if(match){
                const token = jwt.sign(user, secretToken)
                return({
                    user,
                    token
                })
            }
            throw new NotFoundError("Your password is incorrect please try again!")
        } catch (error) {
            throw error
        }

    }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdGVyMjIiLCJhZ2UiOjIyLCJlbWFpbCI6InRlc3QyMkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQ5VjhNUlNNN2pCMkdFQm0uT24wN2VlNm9Id29McTNoNU9kcGsxNVhNRXcvV0JEd2NZa0YwZSIsImdlbmRlciI6Im1hbGUiLCJpZCI6IjYyZGQyZTRlOWU0M2M0MjEzMTA5MzcwOSIsImlhdCI6MTY1ODc0ODE1MX0.TfslQlyOUv4c5hk2dcW2uPY5J6uhmE2Q5ajD8Uj9kWY [test22]
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdGVyMjIiLCJhZ2UiOjIyLCJlbWFpbCI6InRlc3QyMkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQ5VjhNUlNNN2pCMkdFQm0uT24wN2VlNm9Id29McTNoNU9kcGsxNVhNRXcvV0JEd2NZa0YwZSIsImdlbmRlciI6Im1hbGUiLCJpZCI6IjYyZGQyZTRlOWU0M2M0MjEzMTA5MzcwOSIsImlhdCI6MTY1ODc0ODE4MX0.uV9oExmwTgnv-lC2OnjPU2qCSeArLp05B0lxQ1J_Ex4 [test22]
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdGVyMDA3IiwiYWdlIjoyMiwiZW1haWwiOiJ0ZXN0MDA3QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHZHOXVNQVJEYnZVYzdSM2xOWEZnY3VocXA2eUpoUWxKNm1taEguMk5ld0h5QzhKalNPSDlLIiwiZ2VuZGVyIjoibWFsZSIsImlkIjoiNjJkZTdkM2M2ZDBiOGUxZWE2YzQ2YzgxIiwiaWF0IjoxNjU4NzQ4MjM1fQ.cfXAq0xjjHIpG3yGmoJT0yet2hoIzFv-CYQ-tIgSZrI [test007]