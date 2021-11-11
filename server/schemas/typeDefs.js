// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
}
type Query {
  users: [User]
}
`;

// export the typeDefs
module.exports = typeDefs;