import { gql } from '@apollo/client';

export const CREATE_LESSON = gql`
    mutation($playerId: String!){
        createLesson(playerId: $playerId){
            _id
            date
            title
            swings {
                _id
                date
                title
                note
                frontVideo
                sideVideo
                player
                owner
            }
            analyses
            drills
            notes
            player
            coach
        }
    }
`;

export const GET_USER_LESSONS_PLAYER = gql`
    query{
        getUserPlayerLessons{
            _id
            date
            title
            analyses
            drills
            notes
            player{
                _id
                email
                firstname
                lastname
                swingDirection
                handicap
            }
            coach{
                _id
                email
                firstname
                lastname
                swingDirection
                handicap
            }
        }
    }
`;

export const GET_USER_LESSONS_COACH = gql`
    query{
        getUserCoachLessons{
            _id
            date
            title
            analyses
            drills
            notes
            player{
                _id
                email
                firstname
                lastname
                swingDirection
                handicap
            }
            coach{
                _id
                email
                firstname
                lastname
                swingDirection
                handicap
            }
        }
    }
`;

export const ADD_SWING_TO_LESSON = gql`
    mutation($lessonId: String!, $swingId: String!){
        addSwingToLesson(lessonId: $lessonId, swingId: $swingId){
            _id
            date
            title
            note
            frontVideo
            sideVideo
            player
            owner
        }
    }
`;

export const GET_LESSON_SWINGS = gql`
    query($lessonId: String!){
        getLessonSwings(lessonId: $lessonId){
            _id
            date
            title
            note
            frontVideo
            sideVideo
            player
            owner
        }
    }
`;

export const GET_LESSON_ANALYSES = gql`
    query($lessonId: String!){
        getLessonAnalyses(lessonId: $lessonId){
            _id
            date
            title
            note
            frontVideo
            sideVideo
            player
            owner
        }
    }
`;

export const GET_LESSON = gql`
    query($lessonId: String!){
        getLesson(lessonId: $lessonId){
            _id
            date
            title
            notes
            player{
                _id
                email
                firstname
                lastname
                swingDirection
                handicap
            }
            coach{
                _id
                email
                firstname
                lastname
                swingDirection
                handicap
            }
        }
    }
`;

export const GET_LESSON_FULL = gql`
    query($lessonId: String!){
        getLesson(lessonId: $lessonId){
            _id
            date
            title
            notes
            player{
                _id
                email
                firstname
                lastname
                swingDirection
                handicap
            }
            coach{
                _id
                email
                firstname
                lastname
                swingDirection
                handicap
            }
            swings {
                _id
                date
                title
                note
                frontVideo
                sideVideo
                player
                owner
            }
            analyses {
                _id
                date
                title
                note
                frontVideo
                sideVideo
                player
                owner
            }
        }
    }
`;

export const ADD_ANALYSIS_TO_LESSON = gql`
    mutation($lessonId: String!, $analysisId: String!){
        addAnalysisToLesson(lessonId: $lessonId, analysisId: $analysisId){
            _id
            date
            title
            note
            frontVideo
            sideVideo
            player
            owner
        }
    }
`