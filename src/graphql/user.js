import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
    mutation($info: UserInputType){
        updateUser(info: $info){
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
            coachingCredentials
            coachAccount
            playerAccount
            dateStartedCoaching
            __typename
        }
    }
`;