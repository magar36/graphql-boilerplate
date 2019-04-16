import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import seed, {
    userOne,
    userTwo
} from './utils/seed'
import getClient from './utils/getClient'
import {
    createUser,
    getUsers,
    login
} from './utils/operations'

const client = getClient()

beforeEach(seed)

test('Should create a new user', async () => {
    const variables = {
        data: {
            name: "Test user1",
            email: "apollo-jest1@test.com",
            password: "test1234"
        }
    }

    const resp = await client.mutate({
        mutation: createUser,
        variables
    })

    const userExists = await prisma.exists.User({
            id: resp.data.createUser.user.id
    })

    expect(userExists).toBe(true)
})

test('Should expose public author profiles', async () => {
    
    const resp = await client.query({ query: getUsers })

    expect(resp.data.users.length).toBe(2)
    expect(resp.data.users[0].email).toBe(null)
})

test('Should not login with bad credentials', async () => {
    const variables = {
        data: {
            email: "mohit@test.com",
            password: "testpwd12"
        }
    }
    await expect(client.mutate({ mutation: login, variables })).rejects.toThrow()
})

test('Should not signup with bad credentials', async () => {

    const variables = {
        data: {
            name: "shik",
            email: "shik@test.com",
            password: "test123"
        }
    }

    await expect(client.mutate({
        mutation: createUser,
        variables
    })).rejects.toThrow()
})
