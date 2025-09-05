import { PrismaClient } from '@prisma/client'


const client = new PrismaClient();


async function CreateUser() {
    await client.user.create({
    data: {
        username: "krisn sarone",
        password: "123123",
        age:21,
        city:"Chh. Sambhajinagar"
    }
})
}

CreateUser();
