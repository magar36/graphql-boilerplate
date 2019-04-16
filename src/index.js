import '@babel/polyfill/noConflict'
import server from './server'

const port = process.env.PORT || 4001

server.start({ port }, () => {
    console.log(`Server is running on port ${port}`)
})