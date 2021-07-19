import { Box, Button, DialogContent, DialogTitle, Dialog, TextField, Input, LinearProgress } from '@material-ui/core';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import MicIcon from '@material-ui/icons/Mic';
import StopIcon from '@material-ui/icons/Stop';
import GestureIcon from '@material-ui/icons/Gesture';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RemoveIcon from '@material-ui/icons/Remove';
import ClearIcon from '@material-ui/icons/Clear';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import { useRef, useState } from 'react';
import ViewSwing from '../swing/SwingPlayer';
import AnalysisBase from './AnalysisBase';
import { ADD_ANALYSIS } from 'src/graphql/analysis';
import { ADD_ANALYSIS_TO_LESSON } from 'src/graphql/lesson';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import AnalysisVideoPlayer from '../video/AnalysisVideoPlayer';

const AnalysisPlayer = (props) => {
    const { videos, onCancel, playerId, lessonId } = props; 
    const [addAnalysis, { data, loading }] = useMutation(ADD_ANALYSIS);
    const [addAnalysisToLesson] = useMutation(ADD_ANALYSIS_TO_LESSON, {
        update(cache, { data }) {
            const { addAnalysisToLesson } = data;
            cache.modify({
                fields: {
                    getLessonAnalyses(existingAnalyses = []) {
                        const newAnalysisRef = cache.writeFragment({
                            data: addAnalysisToLesson,
                            fragment: gql`
                            fragment SwingType on Analyses {
                                _id
                                date
                                title
                                note
                                frontVideo
                                sideVideo
                                player
                                owner
                            }`
                        });
                        return [...existingAnalyses, newAnalysisRef];
                    }
                }
            })
        }
    });

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [preview, setPreview] = useState(false);
    const [recording, setRecording] = useState(false);
    const [videoURLs, setVideoURLs] = useState([...videos]);
    const [analysisVideoURLs, setAnalysisVideoURLs] = useState([]);
    const analysisPlayerRef = useRef();
    const analysisPlayerRef2 = useRef();
    
    const onRecord = () => {
        setRecording(true);
        if (analysisPlayerRef && analysisPlayerRef.current) {
            analysisPlayerRef.current.startRecord();
        }
        if (analysisPlayerRef2 && analysisPlayerRef2.current) {
            analysisPlayerRef2.current.startRecord();
        }
    }

    const onStopRecord = async () => {
        const arr = [];

        if (analysisPlayerRef && analysisPlayerRef.current) {
            analysisPlayerRef.current.stopRecord();
            const file = analysisPlayerRef.current.getFile();
            if (file) {
                arr.push(URL.createObjectURL(file));
            }
        }

        if (analysisPlayerRef2 && analysisPlayerRef2.current) {
            analysisPlayerRef2.current.stopRecord();
            const file2 = analysisPlayerRef2.current.getFile();
            if (file2) {
                arr.push(URL.createObjectURL(file2));
            }
        }

        setRecording(false);
    }

    const onSave = async () => {
        let file1;
        let file2;

        if (analysisPlayerRef && analysisPlayerRef.current) {
            file1 = analysisPlayerRef.current.getFile();
        }
        if (analysisPlayerRef2 && analysisPlayerRef2.current) {
            file2 = analysisPlayerRef2.current.getFile();
        }

        const { data, error, loading } = await addAnalysis({ variables: { date: "2021-01-01", title, playerId, video1: file1, video2: file2 } })

        if (lessonId) {
            await addAnalysisToLesson({ variables: { lessonId, analysisId: data.addAnalysis._id }})
        }
        
        toast("Analysis Saved!");
        setPreview(false);
        onCancel();
    }

    const startPreview = () => {
        const arr = [];

        if (analysisPlayerRef && analysisPlayerRef.current) {
            const file = analysisPlayerRef.current.getFile();
            if (file) {
                arr.push(URL.createObjectURL(file));
            }
        }

        if (analysisPlayerRef2 && analysisPlayerRef2.current) {
            const file2 = analysisPlayerRef2.current.getFile();
            if (file2) {
                arr.push(URL.createObjectURL(file2));
            }
        }

        setAnalysisVideoURLs(arr);
        setPreview(true);
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    
    return (
        <Box>
            <Dialog 
                    open={open}
                    onClose={() => setOpen(false)}
            >
                <DialogContent>
                    <Box flexDirection="column" display="flex">
                        <TextField fullWidth placeholder="Title" onChange={handleTitleChange}/>
                        <Button onClick={onSave} variant="contained">Save</Button>
                        {loading && <LinearProgress />}
                    </Box>
                </DialogContent>
            </Dialog>
            <Box display={analysisVideoURLs.length ? "none" : ""}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    { recording ? <StopIcon onClick={onStopRecord}/> : <MicIcon onClick={onRecord}/>}
                    <CancelIcon onClick={onCancel}/>
                    {!recording &&<AddToQueueIcon onClick={startPreview}/>}
                </Box>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    {/* {
                        videoURLs.map((item, index) => {
                            return <AnalysisBase ref={index === 0 ? analysisPlayerRef : analysisPlayerRef2} videoURL={item}/>
                        })
                    } */}
                    { videoURLs.length && <AnalysisBase ref={analysisPlayerRef} videoURL={videoURLs[0]}/>}
                    
                    { videoURLs.length > 1 && <AnalysisBase ref={analysisPlayerRef} videoURL={videoURLs[1]}/>}
                </Box>
            </Box>
            {
                preview && 
                <Box>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <SaveIcon onClick={() => setOpen(true)}/>
                        <CancelIcon onClick={onCancel}/>
                        <RedoIcon onClick={() => {setPreview(false); setAnalysisVideoURLs([])}}/>
                    </Box>
                    {/* <ViewSwing key={analysisVideoURLs.length} frontVideoURL={analysisVideoURLs.length ? analysisVideoURLs[0] : null} sideVideoURL={analysisVideoURLs.length > 1 ? analysisVideoURLs[1] : null}/> */}
                    <AnalysisVideoPlayer video1={analysisVideoURLs.length ? analysisVideoURLs[0] : null} video2={analysisVideoURLs.length > 1 ? analysisVideoURLs[1] : null}/>
                </Box>
            }

        </Box>
    )
}

export default AnalysisPlayer;