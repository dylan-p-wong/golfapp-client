import { gql } from '@apollo/client';

export const ADD_ANALYSIS = gql`
    mutation($date: String!, $title: String!, $playerId: String, $video1: Upload, $video2: Upload){
        addAnalysis(date: $date, title: $title, playerId: $playerId, video1: $video1, video2: $video2) {
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