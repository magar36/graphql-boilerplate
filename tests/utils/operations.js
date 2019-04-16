import {
    gql
} from 'apollo-boost'

const createUser = gql `
        mutation($data:CreateUserInput!) {
            createUser (
                data: $data
            ){
                user {
                    id
                    name
                    email
                },    
                token
            }
        }
    `

const getUsers = gql `
        query {
            users {
                id
                name
                email
            }
        }
    `

const login = gql `
        mutation($data:LoginInput!) {
            login (
                data: $data
            ){
                token
            }
        }
    `

export {
    createUser,
    getUsers,
    login
}