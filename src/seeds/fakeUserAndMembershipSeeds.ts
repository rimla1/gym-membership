import { faker } from '@faker-js/faker';
import {MongoClient} from "mongodb"

console.log("Radi seeds")

const seedDB = async () => {

    const uri = "mongodb://localhost:27017/";

    const client = new MongoClient(uri);

    try {

        await client.connect();
        console.log("Connected correctly to database");

        const usersCollection = client.db("test").collection("users");
        usersCollection.drop()
        // let users: any = []
        // for (let i = 0; i < 1000; i++) {
        //     const user = {
        //         name: faker.name.firstName(),
        //         email: faker.internet.email(),
        //         password: faker.internet.password(),
        //         age: faker.random.numeric(2),
        //         gender: faker.name.gender(true)
        //     }
        //     users.push(user)
        // }
        // usersCollection.insertMany(users)
        // console.log(users)
    } catch (error) {
        console.log(error)
    }

}

seedDB()