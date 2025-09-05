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

async function getUserWithTodo() {
    let user = await client.user.findFirst({
        where: {
            id: 1
        },
        include: {
            todos:true
        }
    })
    console.log(user)
}

CreateUser();

getUserWithTodo();
