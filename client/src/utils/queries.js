import gql from 'graphql-tag';

// returns basic ME info
export const QUERY_ME_BASIC = gql`
    {
        me {
            _id
            username
            email 
        }
    }
`;

// returns all ME info except items from lists
export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            listCount
            lists {
              _id
              listName
              createdAt
              itemsCount
            }
          }
    }
`;
export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
        }
    }
`;

// query for lists takes context.user.username as variable returns all of logged in users lists
export const QUERY_LIST = gql`
query Lists($username: String!) {
  lists(username: $username) {
    _id
    listName
    items {
      _id
      itemName
      itemDescription
      itemQuantity
      itemPrice
    }
  }
}
`;