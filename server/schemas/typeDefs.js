// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`

type User {
    _id: ID
    username: String
    email: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    users: [User]
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    
}
`;

// export the typeDefs
module.exports = typeDefs;