import { required } from 'joi'
import mongoose, {Schema, model} from 'mongoose'

export interface IMembership {
    startsAt: number
    endsAt: number
    userId: mongoose.ObjectId
    _id: mongoose.ObjectId
}

const membershipSchema = new Schema<IMembership>({
    startsAt: {
        type: Number,
        required: true,
        default: 0
    },
    endsAt: {
        type: Number,
        required: true,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }
})

export const membershipModel = model<IMembership>("membership", membershipSchema)