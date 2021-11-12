import gql from 'graphql-tag';

export const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!, $email: String!) {
        addUser(username: $username password: $password email: $email) {
            user{
                _id
                username
                email
            }
        }
    }
`;