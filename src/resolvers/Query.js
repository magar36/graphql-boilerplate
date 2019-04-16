const Query = {
    users(parent, args, { prisma, request }, info) {
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        }
        
        if (args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }]
            }
        }
        
        return prisma.query.users(opArgs, info)
    }
}

export { Query as default }