import ReactPlayer from 'react-player';
import { Icon, Box, Button, Tooltip, Divider } from '@material-ui/core'
import React, { useState, createRef, useRef, useEffect, Fragment, useImperativeHandle, forwardRef } from 'react';
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
import { useMutation } from '@apollo/client';
import { ADD_ANALYSIS } from 'src/graphql/analysis';
import { ADD_ANALYSIS_TO_LESSON } from 'src/graphql/lesson';
import { toast } from 'react-toastify';

const drawOptions = [
    {
        text: 'Draw',
        value: 0,
        icon: <GestureIcon/>
    },
    {
        text: 'Line',
        value: 1,
        icon: <RemoveIcon />
    },
    {
        text: 'Circle',
        value: 2,
        icon: <RadioButtonUncheckedIcon />
    }
];

const AnalysisBase = forwardRef((props, ref) => {
    const [addAnalysis, {}] = useMutation(ADD_ANALYSIS);
    const [addAnalysisToLesson, {}] = useMutation(ADD_ANALYSIS_TO_LESSON);
    
    const { videoURL } = props;

    const [preview, setPreview] = useState(false);
    const [previewSource, setPreviewSource] = useState(null);

    const [analysisFile, setAnalysisFile] = useState(null);

    const contextRef = useRef(null);
    const canvasRef = useRef(null);

    const videoContextRef = useRef(null);
    const canvasVideoRef = useRef(null);

    const combinedContextRef = useRef(null);
    const combinedCanvasRef = useRef(null);

    const mediaRecorder = useRef(null);
    const videoRef = useRef(null);

    const [canvasStep, setCanvasStep] = useState(-1);
    const [canvasArray, setCanvasArray] = useState([]);
    const [drawingType, setDrawingType] = useState(0);

    const [isDrawing, setIsDrawing] = useState(false);
    const [recording, setRecording] = useState(false);

    const [playing, setPlaying] = useState(true);

    const canvasPush = () => {
        const newStep = canvasStep + 1;
        setCanvasStep(newStep);
        setCanvasArray(prevArray => [...prevArray, canvasRef.current.toDataURL()])
    }
    // const onUndo = () => {
    // }
    // const onRedo = () => {
    // }

    const onClear = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        canvasPush();
    }

    const move = (amount) => {
        videoRef.current.currentTime = videoRef.current.currentTime + amount;
    }

    const setPlaybackHandle = (e) => {
        videoRef.current.playbackRate = parseFloat(e.currentTarget.value);
    }

    useImperativeHandle(ref, () => ({
        startRecord() {
            setRecording(true);
    
            const videoStream = combinedCanvasRef.current.captureStream(60);
            mediaRecorder.current = new MediaRecorder(videoStream);
            
            mediaRecorder.current.addEventListener('dataavailable', (e) => {
                const file = new File([e.data], "analysis.mp4", { lastModified: new Date(), type: "video/mp4" });
                console.log(file);
                setAnalysisFile(file);
            });
            mediaRecorder.current.start();
        },
        stopRecord() {
            mediaRecorder.current.stop();
            setRecording(false);
        },
        getFile() {
            return analysisFile;
        }
    }));

    useEffect(() => {

        if (canvasRef && canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = 700;
            canvas.height = 700;
            const context = canvas.getContext('2d');
    
            context.lineCap = 'round';
            context.strokeStyle = 'black';
            context.lineWidth = 5;
            contextRef.current = context;
        }

        if (canvasVideoRef && canvasVideoRef.current) {
            const videoCanvas = canvasVideoRef.current;
            videoCanvas.width = 700;
            videoCanvas.height = 700;
            const videoCanvasContext = videoCanvas.getContext('2d');
            videoContextRef.current = videoCanvasContext;
        }
        
        if (combinedCanvasRef && combinedCanvasRef.current) {
            const combinedCanvas = combinedCanvasRef.current;
            combinedCanvas.width = 700;
            combinedCanvas.height = 700;
            const combinedCanvasContext = combinedCanvas.getContext('2d');
            combinedContextRef.current = combinedCanvasContext;
        }
        
    }, [preview]);

    useEffect(() => {
        if (videoRef && videoRef.current) {
            videoRef.current.addEventListener('play', () => {
                function step() {
                    if (!canvasVideoRef || !canvasVideoRef.current || !videoContextRef || !videoContextRef.current || !videoRef || !videoRef.current || !canvasRef || !canvasRef.current || !combinedContextRef || !combinedContextRef.current) return;
                    
                    videoContextRef.current.drawImage(videoRef.current, 0, 0, canvasVideoRef.current.width, canvasVideoRef.current.height);

                    combinedContextRef.current.drawImage(canvasVideoRef.current, 0, 0);
                    combinedContextRef.current.drawImage(canvasRef.current, 0, 0);
                    
                    requestAnimationFrame(step);
                }
        
                requestAnimationFrame(step);
            });
        }
    }, [preview]);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
        canvasPush();
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }

        const { offsetX, offsetY } = nativeEvent;

        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    };

    const onPause = () => {
        videoRef.current.pause();
        setPlaying(false);
    }

    const onPlay = () => {
        setPlaying(true);
        videoRef.current.play();
    }

    return (
        <Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Button size="small" variant="contained" value={0.25} onClick={setPlaybackHandle}>0.25x</Button>
                <Button size="small" variant="contained" value={0.5} onClick={setPlaybackHandle}>0.5x</Button>
                <Button size="small" variant="contained" value={1} onClick={setPlaybackHandle}>1x</Button>
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                { drawOptions.map(item => <Box onClick={() => setDrawingType(item.value)}>{item.icon}</Box> )}
                {/* <UndoIcon onClick={onUndo}/> */}
                {/* <RedoIcon /> */}
                <ClearIcon onClick={onClear}/>
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Box position='relative' width={700} height={700} border={1}>
                    <canvas ref={canvasVideoRef} style={{ position: 'absolute', zIndex: 997, width: '700px', height: '700px' }}/>
                    <canvas onMouseDown={startDrawing} onMouseUp={finishDrawing} onMouseMove={draw} ref={canvasRef} style={{ position: 'absolute', zIndex: 998, width: '700px', height: '700px' }}/>
                    <canvas ref={combinedCanvasRef} style={{ position: 'absolute', zIndex: 996, width: '700px', height: '700px' }}></canvas>
                </Box>
            </Box>

            <video hidden crossOrigin="anonymous" src={videoURL} ref={videoRef} autoPlay loop></video>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <FastRewindIcon onClick={() => move(-0.1)} />
                { playing ? <PauseIcon onClick={onPause} /> : <PlayArrowIcon onClick={onPlay} />}
                <FastForwardIcon onClick={() => move(0.1)} />            
            </Box>
        </Box>
    )
});

export default AnalysisBase;