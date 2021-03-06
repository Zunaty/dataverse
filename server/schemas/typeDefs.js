// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
type Item {
  _id: ID
  itemName: String
  itemDescription: String
  itemQuantity: Int
  itemPrice: Float
  createdAt: String
}

type List {
  _id: ID
  username: String
  listName: String
  createdAt: String
  itemsCount: Int
  items: [Item]
}

type User {
  _id: ID
  username: String
  email: String
  listCount: Int
  lists: [List]
}

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user(username: String): [User]
    lists(username: String!): [List]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addList(listName: String!): List
    removeList(_id: ID!): User
    addItem(listId: ID!, itemName: String!, itemDescription: String, itemQuantity: Int!, itemPrice: Float): Item
    updateItem(itemId: ID!, itemName: String!, itemDescription: String, itemQuantity: Int!, itemPrice: Float): Item
    removeItem(listId: ID!, _id: ID!): List
  }
`;

// export the typeDefs
module.exports = typeDefs;