import mongoose, {Schema, model} from 'mongoose'

export interface IMembership {
    startsAt: Date
    endsAt: Date
    userId: mongoose.ObjectId
    _id: mongoose.ObjectId
}

const membershipSchema = new Schema<IMembership>({
    startsAt: {
        type: Date,
        default: null
    },
    endsAt: {
        type: Date,
        default: null
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "user"
    }
})

export const membershipModel = model<IMembership>("membership", membershipSchema)