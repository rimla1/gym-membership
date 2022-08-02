import mongoose, {Schema, model} from 'mongoose'

export interface IUser {
    name: string;
    email: string;
    password: string;
    age: number;
    gender: string;
    _id: mongoose.ObjectId
  }

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
})

export const userModel = model<IUser>("user", userSchema)