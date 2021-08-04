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

export const USER_TIER_INFO = gql`
    query{
        userTier{
            coachTier {
                tier
                lessonsPerMonth
                lessonsThisMonth
            }
            playerTier {
                tier
                swingsThisMonth
                swingUploadsPerMonth
            }
        }
    }
`