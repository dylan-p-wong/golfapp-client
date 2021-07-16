import { gql } from '@apollo/client';

export const ADD_SWING = gql`
    mutation ($frontVideo: Upload, $sideVideo: Upload, $date: String!, $title: String!, $note: String!, $playerId: String){
        addSwing(date: $date, title: $title, note: $note, playerId: $playerId, frontVideo: $frontVideo, sideVideo: $sideVideo) {
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

export const USER_SWINGS = gql`
    query($playerId: String){
        userSwings(playerId: $playerId){
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

export const GET_SWING = gql`
    query($_id: String!){
        getSwing(_id: $_id){
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