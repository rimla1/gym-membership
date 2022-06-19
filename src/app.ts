import {config} from 'dotenv'
config()

import express from 'express';
import mongoose from 'mongoose';
import { userRouter } from './module/User/user.routes';

const PORT = 3000;

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.ekxmb.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`;

const app = express();

app.use(express.json())

app.use("/api/v1/users", userRouter)

mongoose.connect(MONGODB_URI).then(() => {
    console.log("Connected to the db")
    app.listen(PORT, () => {
        console.log(`Up and running on port ${PORT}`)
    })
})

