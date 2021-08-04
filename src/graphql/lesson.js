import { gql } from '@apollo/client';

export const CREATE_LESSON = gql`
    mutation($playerId: String!, $title: String){
        createLesson(playerId: $playerId, title: $title){
            _id
            createdAt
            updatedAt
            title
            notes
            player {
                _id
            }
            coach {
                _id
            }
        }
    }
`;

export const GET_USER_LESSONS_PLAYER = gql`
    query{
        getUserPlayerLessons{
            _id
            createdAt
            updatedAt
            title
            analyses {
                _id
                createdAt
                updatedAt
                title
                note
                frontVideo
                sideVideo
                player
                owner
            }
            drills
            notes
            player{
                _id
                email
                firstname
                lastname
                hand
                handicap
            }
            coach{
                _id
                email
                firstname
                lastname
                hand
                handicap
            }
        }
    }
`;

export const GET_USER_LESSONS_COACH = gql`
    query{
        getUserCoachLessons{
            _id
            createdAt
            updatedAt
            title
            analyses {
                _id
                createdAt
                updatedAt
                title
                note
                frontVideo
                sideVideo
                player
                owner
            }
            drills
            notes
            player{
                _id
                email
                firstname
                lastname
                hand
                handicap
            }
            coach{
                _id
                email
                firstname
                lastname
                hand
                handicap
            }
        }
    }
`;

export const ADD_SWING_TO_LESSON = gql`
    mutation($lessonId: String!, $swingId: String!){
        addSwingToLesson(lessonId: $lessonId, swingId: $swingId){
            _id
            createdAt
            updatedAt
            title
            note
            frontVideo
            sideVideo
        }
    }
`;

export const GET_LESSON_SWINGS = gql`
    query($lessonId: String!){
        getLessonSwings(lessonId: $lessonId){
            _id
            createdAt
            updatedAt
            title
            note
            frontVideo
            sideVideo
            createdAt
        }
    }
`;

export const GET_LESSON_ANALYSES = gql`
    query($lessonId: String!){
        getLessonAnalyses(lessonId: $lessonId){
            _id
            createdAt
            updatedAt
            title
            note
            frontVideo
            sideVideo
            voice
        }
    }
`;

export const GET_LESSON = gql`
    query($lessonId: String!){
        getLesson(lessonId: $lessonId){
            _id
            createdAt
            updatedAt
            title
            notes
            player{
                _id
                email
                firstname
                lastname
                hand
                handicap
            }
            coach{
                _id
                email
                firstname
                lastname
                hand
                handicap
            }
        }
    }
`;

export const ADD_ANALYSIS_TO_LESSON = gql`
    mutation($lessonId: String!, $analysisId: String!){
        addAnalysisToLesson(lessonId: $lessonId, analysisId: $analysisId){
            _id
            createdAt
            updatedAt
            title
            note
            frontVideo
            sideVideo
            voice
            player
            owner
        }
    }
`;

export const GET_LESSON_NOTES = gql`
    query($lessonId: String!){
        getLessonNotes(lessonId: $lessonId){
            _id
            title
            description
            createdAt
            updatedAt
            user {
                firstname
                lastname
            }
        }
    }
`;

export const ADD_NOTE_TO_LESSON = gql`
    mutation($lessonId: String!, $title: String!, $description: String!){
        addNoteToLesson(lessonId: $lessonId, title: $title, description: $description){
            _id
            title
            description
            createdAt
            updatedAt
            user {
                firstname
                lastname
            }
        }
    }
`;

export const GET_USER_LESSON_REQUESTS_PLAYER = gql`
    query{
        getUserPlayerLessonRequests{
            _id
            note
            player {
                _id
                email
                firstname
                lastname
                hand
                handicap
            }
            coach {
                _id
                email
                firstname
                lastname
                hand
                handicap
            }
            updatedAt
            createdAt
            lesson {
                _id
                createdAt
                updatedAt
                title
            }
            isCancelled
            __typename
        }
    }
`;

export const GET_USER_LESSON_REQUESTS_COACH = gql`
    query{
        getUserCoachLessonRequests{
            _id
            note
            player {
                _id
                email
                firstname
                lastname
                hand
                handicap
            }
            coach {
                _id
                email
                firstname
                lastname
                hand
                handicap
            }
            updatedAt
            createdAt
            lesson {
                _id
                createdAt
                updatedAt
                title
            }
            isCancelled
            __typename
        }
    }
`;

export const CREATE_LESSON_REQUEST = gql`
    mutation($note: String, $coachId: String){
        createLessonRequest(note: $note, coachId: $coachId){
            _id
            note
            player {
                _id
                email
                firstname
                lastname
                hand
                handicap
            }
            coach {
                _id
                email
                firstname
                lastname
                hand
                handicap
            }
            updatedAt
            createdAt
            lesson {
                _id
                createdAt
                updatedAt
                title
            }
            isCancelled
            __typename
        }
    }
`;

export const ADD_LESSON_TO_LESSON_REQUEST = gql`
    mutation($lessonId: String!, $lessonRequestId: String!){
        addLessonToLessonRequest(lessonId: $lessonId, lessonRequestId: $lessonRequestId){
            _id
            note
            player {
                _id
                email
                firstname
                lastname
                hand
                handicap
            }
            coach {
                _id
                email
                firstname
                lastname
                hand
                handicap
            }
            updatedAt
            createdAt
            lesson {
                _id
                createdAt
                updatedAt
                title
            }
            isCancelled
            __typename
        }
    }
`;

export const CANCEL_LESSON_REQUEST = gql`
    mutation($lessonRequestId: String!){
        cancelLessonRequest(lessonRequestId: $lessonRequestId){
            _id
            note
            player {
                _id
                email
                firstname
                lastname
                hand
                handicap
            }
            coach {
                _id
                email
                firstname
                lastname
                hand
                handicap
            }
            updatedAt
            createdAt
            lesson {
                _id
                createdAt
                updatedAt
                title
            }
            isCancelled
            __typename
        }
    }
`;