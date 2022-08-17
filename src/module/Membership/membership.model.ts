import { required } from 'joi'
import mongoose, {Schema, model} from 'mongoose'

export interface IMembership {
    startsAt: Date
    endsAt: Date
    userId: mongoose.ObjectId
    _id: mongoose.ObjectId
}

const defaultDateForStartsAt = new Date("2019-08-20")
const defaultDateForEndsAt = new Date("2022-08-20")

const membershipSchema = new Schema<IMembership>({
    startsAt: {
        type: Date,
        default: defaultDateForStartsAt,
        required: true
    },
    endsAt: {
        type: Date,
        default: defaultDateForEndsAt,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "user"
    }
})

export const membershipModel = model<IMembership>("membership", membershipSchema)