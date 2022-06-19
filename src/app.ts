import express from 'express';
import { userRouter } from './module/User/user.routes';

const PORT = 3000;

const app = express();

app.use(express.json())

app.use("/api/v1/users", userRouter)


app.listen(PORT, () => {
    console.log(`Up and running on port ${PORT}`)
})