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
        const membershipsCollection = client.db("test").collection("memberships");
        // await usersCollection.drop() // Drop Users collection
        // await membershipsCollection.drop() // Drop Memberships collection
        // TODO 1 [Create Users and Memberships] - IDEA 1 (The problem is that I defined a string as userId in Model, but this works perfectly for testing, problematic if I want to add additional users and memberships)
        // let users: any = []
        // let memberships: any = []
        // for (let i = 1; i < 1000; i++) {
        //     const user = {
        //         _id: i.toString(), // Mozda ovo hmmm?
        //         name: faker.name.firstName(),
        //         email: faker.internet.email(),
        //         password: faker.internet.password(),
        //         age: faker.random.numeric(2),
        //         gender: faker.name.gender(true)
        //     }
        //     const membership = {
        //         startsAt: faker.date.between("2010-10-11", "2022-05-20"),
        //         endsAt: faker.date.between("2010-06-20", "2025-08-20"),
        //         userId: i.toString(), // user._id
        //     }
        //     users.push(user)
        //     memberships.push(membership)
        // }


        // TODO 2 - [Create users and Memberships] - IDEA 2 ()
        let users: any = []
        for (let i=0; i < 1000; i++){
            const user = {
                name: faker.name.firstName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                age: faker.random.numeric(2),
                gender: faker.name.gender(true)
            }
            users.push(user)
        }


        await usersCollection.insertMany(users)

        const usersFromDB = await client.db("test").collection("users").find().toArray()
        // console.log(usersFromDB)
        console.log(usersFromDB.length)

        let memberships: any = []
        usersFromDB.forEach(user => {
            for(let i =0; i < 1; i++){
                const membership = {
                startsAt: faker.date.between("2010-10-11", "2022-05-20"),
                endsAt: faker.date.between("2010-06-20", "2025-08-20"),
                userId: user._id
                }
                memberships.push(membership)
            }
        });




        await membershipsCollection.insertMany(memberships)


        // TODO 4 - Queries
        const userFromDB = await client.db("test").collection("users").findOne()
        // console.log(userFromDB) // - Ovo vraca jednog user-a iz baze (verovatno sa id-om 1)


    } catch (error) {
        console.log(error)
    }

}

seedDB()