// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email: String
    lists: [List]
  }

  type List {
    username: String
    _id: ID
    listName: String
    createdAt: String
    itemName: String
    itemDescription: String
    itemImg: String
    itemQuantity: Int
    itemPrice: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): [User]
    lists(username: String): [List]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

// export the typeDefs
module.exports = typeDefs;