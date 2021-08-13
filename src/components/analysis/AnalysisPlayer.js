import { Box, Button, DialogContent, DialogTitle, Dialog, TextField, Input, LinearProgress, Typography, Tooltip, IconButton } from '@material-ui/core';
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
import { ADD_ANALYSIS_TO_LESSON, GET_LESSON_ANALYSES } from 'src/graphql/lesson';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import AnalysisVideoPlayer from '../video/AnalysisVideoPlayer';
import MicRecorder from 'mic-recorder-to-mp3';

const AnalysisPlayer = (props) => {
    const { videos, onCancel, playerId, lessonId } = props; 
    const [error, setError] = useState(null);
    const [addAnalysis, { data, loading }] = useMutation(ADD_ANALYSIS, {
        onError: setError
    });
    const [addAnalysisToLesson] = useMutation(ADD_ANALYSIS_TO_LESSON, {
        refetchQueries: [{query: GET_LESSON_ANALYSES, variables: { lessonId }}],
        onError: setError,
        onCompleted: () => toast("Analysis Saved!")
    });

    const recorderRef = useRef(new MicRecorder({
        bitRate: 128
    }));

    const [previewOpen, setPreviewDialogOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [preview, setPreview] = useState(false);
    const [recording, setRecording] = useState(false);
    const [videoURLs, setVideoURLs] = useState([...videos]);
    const [analysisVideoURLs, setAnalysisVideoURLs] = useState([]);
    const [voiceBlob, setVoiceBlob] = useState(null);
    const analysisPlayerRef = useRef();
    const analysisPlayerRef2 = useRef();

    if (error) {
        toast(error.message);
        setError(null);
    }

    const onRecord = async () => {
        setRecording(true);

        await recorderRef.current.start();

        if (analysisPlayerRef && analysisPlayerRef.current) {
            analysisPlayerRef.current.startRecord();
        }
        if (analysisPlayerRef2 && analysisPlayerRef2.current) {
            analysisPlayerRef2.current.startRecord();
        }
    }

    const onStopRecord = async () => {
        
        recorderRef.current.stop().getMp3().then(([buffer, blob]) => {         
            setVoiceBlob(blob);
        });

        if (analysisPlayerRef && analysisPlayerRef.current) {
            analysisPlayerRef.current.stopRecord();
        }

        if (analysisPlayerRef2 && analysisPlayerRef2.current) {
            analysisPlayerRef2.current.stopRecord();
        }

        setRecording(false);
        setPreviewDialogOpen(true);
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

        let voiceFile;

        if (voiceBlob) {
            voiceFile = new File([voiceBlob], "voiceFile.mp3", { lastModified: new Date(), type: voiceBlob.type });
        }

        const { data } = await addAnalysis({ variables: { date: "2021-01-01", title, playerId, video1: file1, video2: file2, voice: voiceFile} });
        
        if (lessonId) {
            await addAnalysisToLesson({ variables: { lessonId, analysisId: data.addAnalysis._id }});
        }
        
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

        if (arr.length > 0) {
            setPreview(true);
        }
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
            <Dialog
                open={previewOpen}
                onClose={() => setPreviewDialogOpen(false)}
            >
                <DialogContent>
                    <Box flexDirection="column" display="flex" p={4}>
                        <Typography>Your analysis has been recorded!</Typography>
                    </Box>
                    <Button fullWidth onClick={() => {setPreviewDialogOpen(false); startPreview()}} variant="contained">Preview</Button>
                </DialogContent>
            </Dialog>
            <Box display={analysisVideoURLs.length ? "none" : ""}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    
                    { recording ? <IconButton><Tooltip title="Stop recording"><StopIcon onClick={onStopRecord}/></Tooltip></IconButton> : <IconButton><Tooltip title="Record"><MicIcon onClick={onRecord}/></Tooltip></IconButton>}
                    <IconButton>
                        <Tooltip title="Clear">
                            <CancelIcon onClick={onCancel}/>
                        </Tooltip>
                    </IconButton>
                </Box>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    { videoURLs.length && <AnalysisBase ref={analysisPlayerRef} videoURL={videoURLs[0]}/>}
                    { videoURLs.length > 1 && <AnalysisBase ref={analysisPlayerRef2} videoURL={videoURLs[1]}/>}
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
                        <IconButton>
                            <Tooltip title="Save">
                                <SaveIcon onClick={() => setOpen(true)}/>
                            </Tooltip>
                        </IconButton>
                        <IconButton>
                            <Tooltip title="Clear">
                                <CancelIcon onClick={onCancel}/>
                            </Tooltip>
                        </IconButton>
                        <IconButton>
                            <Tooltip title="Redo Recording">
                                <RedoIcon onClick={() => {setPreview(false); setAnalysisVideoURLs([])}}/>
                            </Tooltip>
                        </IconButton>
                    </Box>
                    <AnalysisVideoPlayer video1={analysisVideoURLs.length ? analysisVideoURLs[0] : null} video2={analysisVideoURLs.length > 1 ? analysisVideoURLs[1] : null} voice={voiceBlob ? URL.createObjectURL(voiceBlob) : null}/>
                </Box>
            }

        </Box>
    )
}

export default AnalysisPlayer;