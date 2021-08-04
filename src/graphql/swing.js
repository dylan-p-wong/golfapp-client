import { gql } from '@apollo/client';

export const ADD_SWING = gql`
    mutation ($frontVideo: Upload, $sideVideo: Upload, $note: String!, $playerId: String){
        addSwing(note: $note, playerId: $playerId, frontVideo: $frontVideo, sideVideo: $sideVideo) {
            _id
            title
            note
            frontVideo
            sideVideo
            player
            owner
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
            player
            owner
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
            player
            owner
        }
    }
`;