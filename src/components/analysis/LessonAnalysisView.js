import { Box, Button, Dialog, DialogTitle, DialogContent } from "@material-ui/core";
//import AnalysisPlayer from "../video/AnalysisPlayer";
import AnalysisPlayer from './AnalysisPlayer';
import VideoSelector from "../video/VideoSelector";
import { useQuery } from "@apollo/client";
import { GET_LESSON_ANALYSES, GET_LESSON_SWINGS } from "src/graphql/lesson";
import { useState } from "react";
import ViewSwing from "../swing/SwingPlayer";
import AnalysisVideoPlayer from "../video/AnalysisVideoPlayer";
import Spinner from "../spinner/Spinner";
import { toast } from "react-toastify";

const AddAnalysis = (props) => {
    const { lessonId, playerId, editView } = props;
    const { loading : lessonSwingsLoading, error: lessonSwingsError, data: lessonSwingsData } = useQuery(GET_LESSON_SWINGS, { variables: { lessonId }});
    const { loading : lessonAnalysesLoading, error: lessonAnalysesError, data: lessonAnalysesData } = useQuery(GET_LESSON_ANALYSES, { variables: { lessonId }});
    const [pendingSwingToAnalyze, setPendingSwingToAnalyze] = useState(null);
    const [viewingSwing, setViewingSwing ] = useState(null);

    const [analysisURLs, setAnalysisURLs] = useState([]);
    const [open, setOpen] = useState(false);

    if (lessonSwingsLoading || lessonAnalysesLoading) return <Spinner />
    if (lessonSwingsError || lessonAnalysesError) return <h1>Error</h1>

    const onAddSwing = (swing) => {
        if (analysisURLs.length >= 2) {
            toast("You can only analyze 2 swings at once.");
            return;
        }
        setViewingSwing(null);
        setPendingSwingToAnalyze(swing);
        setOpen(true);
    }

    const onSelectDirection = type => () => {
        const arr = analysisURLs;

        setViewingSwing(null);
        if (type === 'SIDE') {
            arr.push(pendingSwingToAnalyze.sideVideo);
        } else if (type === 'FRONT') {
            arr.push(pendingSwingToAnalyze.frontVideo);
        }
        setPendingSwingToAnalyze(null);
        setAnalysisURLs(arr);
        setOpen(false);
    }

    const onCancel = () => {
        setAnalysisURLs([]);
        setViewingSwing(null);
    }

    const onViewSwing = (swing) => {
        setAnalysisURLs([]);
        setPendingSwingToAnalyze(null);
        setViewingSwing(swing);
    }

    return (
        <Box>
            {
                pendingSwingToAnalyze && 
                <Dialog 
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <DialogTitle>Select Swing</DialogTitle>
                    <DialogContent >
                        <Button onClick={onSelectDirection('FRONT')} variant="contained" disabled={!pendingSwingToAnalyze.frontVideo}>Front</Button>
                        <Button onClick={onSelectDirection('SIDE')} variant="contained" disabled={!pendingSwingToAnalyze.sideVideo}>Side</Button>
                    </DialogContent>
                </Dialog>
            }
            {editView && <VideoSelector items={lessonSwingsData.getLessonSwings} text={"Add Swing to Analyze"} onAdd={onAddSwing}/>}
            <VideoSelector items={lessonAnalysesData.getLessonAnalyses} text={"View Analysis"} onAdd={onViewSwing}/>
            { analysisURLs.length > 0 && editView && <AnalysisPlayer playerId={playerId} lessonId={lessonId} videos={analysisURLs} key={analysisURLs.length} onCancel={onCancel}/>}
            { viewingSwing && <AnalysisVideoPlayer video1={viewingSwing.frontVideo} video2={viewingSwing.sideVideo} voice={viewingSwing.voice}/>}
        </Box>
    )
}

export default AddAnalysis;