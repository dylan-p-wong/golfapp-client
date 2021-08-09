import { gql } from '@apollo/client';

export const ADD_SWING = gql`
    mutation ($frontVideo: Upload, $sideVideo: Upload, $note: String!, $playerId: String){
        addSwing(note: $note, playerId: $playerId, frontVideo: $frontVideo, sideVideo: $sideVideo) {
            _id
            title
            note
            frontVideo
            sideVideo
            player {
                _id
                email
                firstname
                phone
                lastname
                hand
                handicap
            }
            owner {
                _id
                email
                firstname
                lastname
                phone
            }
            createdAt
            updatedAt
            __typename
        }
    }
`;

export const USER_SWINGS = gql`
    query($playerId: String){
        userSwings(playerId: $playerId){
            _id
            createdAt
            updatedAt
            title
            note
            frontVideo
            sideVideo
            player {
                _id
                email
                firstname
                phone
                lastname
                hand
                handicap
            }
            owner {
                _id
                email
                firstname
                lastname
            }
            __typename
        }
    }
`;

export const GET_SWING = gql`
    query($_id: String!){
        getSwing(_id: $_id){
            _id
            createdAt
            updatedAt
            title
            note
            frontVideo
            sideVideo
            player {
                _id
                email
                firstname
                phone
                lastname
                hand
                handicap
            }
            owner {
                _id
                email
                firstname
                lastname
                phone
            }
            isPublic
        }
    }
`;

export const UPDATE_SWING = gql`
    mutation($swingId: String!, $info: SwingInputType){
        updateSwing(swingId: $swingId, info: $info){
            _id
            title
            isPublic
        }
    }
`;