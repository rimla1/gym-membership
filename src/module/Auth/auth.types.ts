import { User } from "../User/user.types"

export type LoginRequest = {
    email: string
    password: string
}

export type LoginResponse = {
    user_id: string
    token: string
}

