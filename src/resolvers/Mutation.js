import bcrypt from 'bcryptjs'

import getUserId from '../utils/getUserId'
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'

const Mutation = {
    async createUser(parent, args, {
        prisma
    }, info) {
        const emailExists = await prisma.exists.User({ email: args.data.email })
        // const emailExists = db.users.some((user) => user.email === args.data.email)
        if (emailExists) {
            throw new Error('Email is already taken.')
        }

        const password = await hashPassword(args.data.password)

        const user = await prisma.mutation.createUser(
            {
                data: {
                    ...args.data,
                    password
                }
            })
        
        const token = generateToken(user.id)
        return {
            user,
            token
        }
    },
    async login(parent, args, {
        prisma
    }, info) {
        const emailExists = await prisma.exists.User({
            email: args.data.email
        })
        if (!emailExists) {
            throw new Error('Email does not exist.')
        }

        const user = await prisma.query.user({
            where: {
                email: args.data.email
            }
        })
        const isPassword = await bcrypt.compare(args.data.password, user.password)
        if (!isPassword) {
            throw new Error('Invalid password.')
        }

        const token = generateToken(user.id)
        return {
            user,
            token
        }
    },
    async updateUser(parent, args, {
        request, prisma
    }, info) {
        // const userExists = await prisma.exists.User({ id: args.id })
        // if (!userExists) {
        //     throw new Error('User not found.')
        // }
        const userId = getUserId(request)

        if (args.data.password) {
            args.data.password = hashPassword(args.data.password)
        }

        return prisma.mutation.updateUser({
            where: {
                id: userId
            },
            data: args.data
        }, info)
    },
    async deleteUser(parent, args, {
        request, prisma
    }, info) {
        const userId = getUserId(request)
        return prisma.mutation.deleteUser({
            where: {
                id: userId
            }
        }, info)
    }
}

export {
    Mutation as
    default
}