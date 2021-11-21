import gql from 'graphql-tag';

export const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!, $email: String!) {
        addUser(username: $username password: $password email: $email) {
            token
            user{
                _id
                username
                email
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// addlist mutation requires listName
export const ADD_LIST = gql`
mutation AddList($listName: String!) {
    addList(listName: $listName) {
        _id
        listName
        createdAt
        itemsCount
      items {
            _id
        }
    }
}
`;

// removelist mutation require lists ID
export const REMOVE_LIST = gql`
mutation RemoveList($id: ID!) {
    removeList(_id: $id) {
        _id
        username
        email
        listCount
      lists {
            _id
        }
    }
}
`;

// additem mutaion takes listId, username, itemName, itemDescription, itemImg, itemQuantity, itemPrice
export const ADD_ITEM = gql`
mutation AddItem($listId: ID!, $itemName: String!, $itemQuantity: Int!, $username: String!, $itemDescription: String, $itemImg: String, $itemPrice: Float) {
    addItem(listId: $listId, itemName: $itemName, itemQuantity: $itemQuantity, username: $username, itemDescription: $itemDescription, itemImg: $itemImg, itemPrice: $itemPrice) {
        _id
        itemName
        itemDescription
        itemImg
        itemQuantity
        itemPrice
        createdAt
    }
}
`;

// remove item mutation takes listId and item id as variables
export const REMOVE_ITEM = gql`
mutation RemoveItem($listId: ID!, $id: ID!) {
    removeItem(listId: $listId, _id: $id) {
      _id
      listName
      createdAt
      itemsCount
      items {
        _id
        itemName
        itemDescription
        itemImg
        itemQuantity
        itemPrice
        createdAt
      }
    }
  }
`;