import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, Card, Dialog } from "@material-ui/core";
import { Box, Typography } from "@material-ui/core";
import { useState } from "react";
import { ADD_SWING_TO_LESSON, GET_LESSON_SWINGS } from "src/graphql/lesson";
import { USER_SWINGS } from "src/graphql/swing";
import VideoSelector from "../video/VideoSelector";
import AddSwing from "./AddSwing";
import VideoPlayer from "../video/VideoPlayer";
import ViewSwing from "./SwingPlayer";
import { toast } from "react-toastify";
import Spinner from "../spinner/Spinner";

const LessonSwingView= (props) => {
    const { lessonId, playerId, editView } = props;
    const [error, setError] = useState(null);
    const [addSwingToLesson] = useMutation(ADD_SWING_TO_LESSON, {
        refetchQueries: [{query: GET_LESSON_SWINGS, variables: { lessonId }}],
        onError: setError,
        onCompleted: () => toast("Swing added to lesson!")
    });
    const { loading : lessonSwingsLoading, error: lessonSwingsError, data: lessonSwingsData } = useQuery(GET_LESSON_SWINGS, { variables: { lessonId }});
    const { loading: userSwingsLoading, error: userSwingsError, data: userSwingsData } = useQuery(USER_SWINGS, { variables: { playerId }});
    const [viewingSwing, setViewingSwing ] = useState(null);

    if (lessonSwingsLoading || userSwingsLoading) return <Spinner />
    if (lessonSwingsError || userSwingsError) return <h1>Error</h1>

    if (error) {
        toast(error.message);
        setError(null);
    }
    
    const onAddSwing = (swing) => {
        if (!swing) {
            toast("Please select a swing");
            return;
        }

        addSwingToLesson({ variables: { lessonId, swingId: swing._id }});
    }

    const onViewSwing = (swing) => {
        if (!swing) {
            toast("Please select a swing");
            return;
        }
        setViewingSwing(swing);
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            {
                editView && <VideoSelector items={userSwingsData.userSwings} text={"Add Swing"} onAdd={onAddSwing}/>
            }
            <VideoSelector items={lessonSwingsData.getLessonSwings} text={"View Swing"} onAdd={onViewSwing}/>
            { viewingSwing && <ViewSwing video1={viewingSwing.frontVideo} video2={viewingSwing.sideVideo}/> }
        </Box>
    );
}

export default LessonSwingView;