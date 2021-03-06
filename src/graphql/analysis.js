import { gql } from '@apollo/client';

export const ADD_ANALYSIS = gql`
    mutation($title: String!, $playerId: String, $video1: Upload, $video2: Upload, $voice: Upload){
        addAnalysis(title: $title, playerId: $playerId, video1: $video1, video2: $video2, voice: $voice) {
            _id
            title
            note
            frontVideo
            sideVideo
            voice
            player
            owner
            createdAt
            updatedAt
        }
    }
`;