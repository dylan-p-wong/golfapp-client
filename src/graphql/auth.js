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
    mutation($email: String, $password: String, $firstname: String, $lastname: String, $playerAccount: Boolean, $coachAccount: Boolean){
        signup(email: $email, password: $password, firstname: $firstname, lastname: $lastname, playerAccount: $playerAccount, coachAccount: $coachAccount)
    }
`;

export const ME = gql`
    query{
        userInfo{
        _id
        email
        phone
        firstname
        lastname
        hand
        handicap
        homeCourse
        homeCourseCity
        homeCourseCountry
        homeCourseProvince
        coachAccount
        playerAccount
        coachingCredentials
        dateStartedCoaching
        __typename
        }
    }
`;

export const GET_USERS = gql`
    query{
        getUsers{
            _id
            email
            phone
            firstname
            lastname
            hand
            handicap
            homeCourse
            homeCourseCity
            homeCourseCountry
            homeCourseProvince
            coachAccount
            playerAccount
            coachingCredentials
            dateStartedCoaching
            __typename
        }
    }
`;

export const GET_COACHES = gql`
    query{
        getCoaches{
            _id
            email
            phone
            firstname
            lastname
            hand
            handicap
            homeCourse
            homeCourseCity
            homeCourseCountry
            homeCourseProvince
            coachAccount
            playerAccount
            coachingCredentials
            dateStartedCoaching
            __typename
        }
    }
`;