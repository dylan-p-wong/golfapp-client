import { Box } from "@material-ui/core";
import AnalysisPlayer from "../video/AnalysisPlayer";
import VideoSelector from "../video/VideoSelector";
import { useQuery } from "@apollo/client";
import { GET_LESSON_ANALYSES, GET_LESSON_SWINGS } from "src/graphql/lesson";
import { useState } from "react";
import ViewSwing from "../swing/ViewSwing";

const AddAnalysis = (props) => {
    const { lessonId, playerId } = props;
    const { loading : lessonSwingsLoading, error: lessonSwingsError, data: lessonSwingsData } = useQuery(GET_LESSON_SWINGS, { variables: { lessonId }});
    const { loading : lessonAnalysesLoading, error: lessonAnalysesError, data: lessonAnalysesData } = useQuery(GET_LESSON_ANALYSES, { variables: { lessonId }});
    const [swingToAnalyze, setSwingToAnalyze] = useState(null);
    const [viewingSwing, setViewingSwing ] = useState(null);

    if (lessonSwingsLoading || lessonAnalysesLoading) return <h1>Loading...</h1>
    if (lessonSwingsError || lessonAnalysesError) return <h1>Error</h1>

    const onAddSwing = (swing) => {
        setSwingToAnalyze(swing);
    }

    const onViewSwing = (swing) => {
        setViewingSwing(swing);
    }

    return (
        <Box>
            <VideoSelector items={lessonSwingsData.getLessonSwings} text={"Add Swing to Analyze"} onAdd={onAddSwing}/>
            <VideoSelector items={lessonAnalysesData.getLessonAnalyses} text={"View Analysis"} onAdd={onViewSwing}/>
            { swingToAnalyze && <AnalysisPlayer playerId={playerId} videoURL={swingToAnalyze.frontVideo} lessonId={lessonId} onCancel={() => setSwingToAnalyze(null)}/>}
            { viewingSwing && <ViewSwing videoURL={viewingSwing.frontVideo}/> }
        </Box>
    )
}

export default AddAnalysis;