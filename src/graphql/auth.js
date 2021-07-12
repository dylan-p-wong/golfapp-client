import { gql } from '@apollo/client';

export const LOGOUT = gql`
    mutation {
        logout
    }
`;

export const LOGIN = gql`
    mutation($email: String, $password: String) {
        login(email: $email, password: $password)
    }
`;

export const SIGNUP = gql`
    mutation($email: String, $password: String, $firstname: String, $lastname: String){
        signup(email: $email, password: $password, firstname: $firstname, lastname: $lastname)
    }
`;

export const ME = gql`
    query{
        userInfo{
        email
        firstname
        lastname
        swingDirection
        handicap
        }
    }
`;

export const GET_USERS = gql`
    query{
        getUsers{
            _id
            email
            firstname
            lastname
            swingDirection
            handicap
        }
    }
`;