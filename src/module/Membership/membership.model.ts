import { required } from 'joi'
import mongoose, {Schema, model} from 'mongoose'

export interface IMembership {
    startMembership: Date
    endMembership: Date
    userId: mongoose.ObjectId
    _id: mongoose.ObjectId
}

const membershipSchema = new Schema<IMembership>({
    startMembership: {
        type: Date,
        required: true,
        default: 0
    },
    endMembership: {
        type: Date,
        required: true,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }
})

export const membershipModel = model<IMembership>("membership", membershipSchema)