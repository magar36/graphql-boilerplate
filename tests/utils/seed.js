import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'

const userOne = {
    input: {
        name: 'Mohit',
        email: 'mohit@test.com',
        password: bcrypt.hashSync('testpwd123')
    },
    output: undefined,
    jwt: undefined
}

const userTwo = {
    input: {
        name: 'Shik',
        email: 'shik@test.com',
        password: bcrypt.hashSync('shikpwd123')
    },
    output: undefined,
    jwt: undefined
}

const seed = async () => {
    // Delete test data
    await prisma.mutation.deleteManyUsers()

    // Create user one
    userOne.output = await prisma.mutation.createUser({
        data: userOne.input
    })

    // Create json web token for user one
    userOne.jwt = jwt.sign({ userId: userOne.output.id }, process.env.JWT_SECRET)

    // Create user two
    userTwo.output = await prisma.mutation.createUser({
        data: userTwo.input
    })

    // Create json web token for user two
    userTwo.jwt = jwt.sign({
        userId: userTwo.output.id
    }, process.env.JWT_SECRET)
}

export {
    seed as
    default, userOne, userTwo
}