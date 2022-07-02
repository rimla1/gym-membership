import { User } from "../User/user.types"

export type loginRequest = {
    email: string
    password: string
}

export type loginResponse = {
    user: User
    token: string
}