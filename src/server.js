import {
    GraphQLServer,
    PubSub
} from 'graphql-yoga'
import prisma from './prisma'
import {
    resolvers,
    fragmentReplacements
} from './resolvers/index'

const pubsub = new PubSub()
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    context(request) {
        return {
            pubsub,
            prisma,
            request
        }
    },
    resolvers,
    fragmentReplacements
})

export { server as default }