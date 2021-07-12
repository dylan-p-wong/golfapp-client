import { gql } from '@apollo/client';

export const ADD_SWING = gql`
    mutation ($video: Upload!, $date: String!, $title: String!, $note: String!, $playerId: String, $direction: videoDirectionEnumType){
        addSwing(date: $date, title: $title, note: $note, playerId: $playerId, video: $video, direction: $direction) {
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