import { User } from "../User/user.types"

export type MembershipResult = {
    startsAt: Date,
    endsAt: Date
    userId: string
    id: string
}

// export type MembershipResultWithUser = MembershipResult & {user: User}