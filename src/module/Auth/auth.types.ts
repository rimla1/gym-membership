import { User } from "../User/user.types"

export type LoginRequest = {
    email: string
    password: string
}

export type LoginResponse = {
    user: User
    token: string
}