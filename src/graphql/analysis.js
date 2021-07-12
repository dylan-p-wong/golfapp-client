import { gql } from '@apollo/client';

export const ADD_ANALYSIS = gql`
    mutation($date: String!, $title: String!, $note: String!, $playerId: String, $video: Upload!, $direction: videoDirectionEnumType){
        addAnalysis(date: $date, title: $title, note: $note, playerId: $playerId, video: $video, direction: $direction) {
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