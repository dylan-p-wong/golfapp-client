import { useMutation, useQuery } from "@apollo/client";
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

const LessonSwingView= (props) => {
    const { lessonId, playerId, editView } = props;
    const [addSwingToLesson, { loading, error, data }] = useMutation(ADD_SWING_TO_LESSON);
    const { loading : lessonSwingsLoading, error: lessonSwingsError, data: lessonSwingsData } = useQuery(GET_LESSON_SWINGS, { variables: { lessonId }});
    const { loading: userSwingsLoading, error: userSwingsError, data: userSwingsData } = useQuery(USER_SWINGS, { variables: { playerId }});
    const [viewingSwing, setViewingSwing ] = useState(null);

    if (lessonSwingsLoading || userSwingsLoading) return <h1>Loading...</h1>;
    if (lessonSwingsError || userSwingsError) return <h1>Error</h1>

    const onAddSwing = (swing) => {
        addSwingToLesson({ variables: { lessonId, swingId: swing._id }});
        toast("Swing added to lesson!");
    }

    const onViewSwing = (swing) => {
        setViewingSwing(swing);
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            {
                editView && <VideoSelector items={userSwingsData.userSwings} text={"Add Swing"} onAdd={onAddSwing}/>
            }
            <VideoSelector items={lessonSwingsData.getLessonSwings} text={"View Swing"} onAdd={onViewSwing}/>
            { viewingSwing && <ViewSwing frontVideoURL={viewingSwing.frontVideo} sideVideoURL={viewingSwing.sideVideo}/> }
        </Box>
    );
}

export default LessonSwingView;