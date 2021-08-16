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
`;

export const USER_NOTIFICATIONS = gql`
    query($count: Int){
        userNotifications(count: $count){
            title
            createdAt
        }
    }
`;

export const USER_TOTALS = gql`
    query{
        userTotals{
            totalSwings
            swingsThisMonth
            totalLessons
            lessonsThisMonth
            totalLessonsRecieved
            lessonsRecievedThisMonth
            totalStudents
        }
    }
`;

export const USER_STUDENTS = gql`
    query{
        userStudents{
            _id
            email
            firstname
            lastname
            phone
            hand
            handicap
            homeCourse
            homeCourseCity
            homeCourseProvince
            homeCourseCountry
            coachAccount
            playerAccount
            coachingCredentials
            dateStartedCoaching
            playerInfoCompleted
            coachInfoCompleted
            createdAt
            updatedAt
        }
    } 
`;

export const USER_COACHES = gql`
    query{
        userCoaches{
            _id
            email
            firstname
            lastname
            phone
            hand
            handicap
            homeCourse
            homeCourseCity
            homeCourseProvince
            homeCourseCountry
            coachAccount
            playerAccount
            coachingCredentials
            dateStartedCoaching
            playerInfoCompleted
            coachInfoCompleted
            createdAt
            updatedAt
        }
    } 
`;

export const ADD_STUDENT = gql`
    mutation($playerId: String!){
        addPlayerCoachConnection(playerId: $playerId)
    }
`;

export const ADD_COACH = gql`
    mutation($playerId: String!){
        addPlayerCoachConnection(coachId: $coachId)
    }
`;