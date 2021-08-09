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
    const [viewingAnalysis, setViewingAnalysis ] = useState(null);

    const [analysisURLs, setAnalysisURLs] = useState([]);
    const [open, setOpen] = useState(false);

    if (lessonSwingsLoading || lessonAnalysesLoading) return <Spinner />
    if (lessonSwingsError || lessonAnalysesError) return <h1>Error</h1>

    const onAddSwing = (swing) => {
        
        if (analysisURLs.length >= 2) {
            toast("You can only analyze 2 swings at once.");
            return;
        }

        if (!swing) {
            toast("Please select a swing");
        }

        setViewingAnalysis(null);
        setPendingSwingToAnalyze(swing);
        setOpen(true);
    }

    const onSelectDirection = type => () => {
        const arr = analysisURLs;

        setViewingAnalysis(null);
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
        setViewingAnalysis(null);
    }

    const onViewAnalysis = (analysis) => {
        if (!analysis) {
            toast("Please select an analysis");
        }
        setAnalysisURLs([]);
        setPendingSwingToAnalyze(null);
        setViewingAnalysis(analysis);
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
            <VideoSelector items={lessonAnalysesData.getLessonAnalyses} text={"View Analysis"} onAdd={onViewAnalysis}/>
            { analysisURLs.length > 0 && editView && <AnalysisPlayer playerId={playerId} lessonId={lessonId} videos={analysisURLs} key={analysisURLs.length} onCancel={onCancel}/>}
            { viewingAnalysis && <AnalysisVideoPlayer video1={viewingAnalysis.frontVideo} video2={viewingAnalysis.sideVideo} voice={viewingAnalysis.voice}/>}
        </Box>
    )
}

export default AddAnalysis;