import ReactPlayer from 'react-player';
import { Icon, Box, Button, Tooltip, Divider, IconButton, } from '@material-ui/core'
import React, { useState, createRef, useRef, useEffect, Fragment, useImperativeHandle, forwardRef } from 'react';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import GestureIcon from '@material-ui/icons/Gesture';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RemoveIcon from '@material-ui/icons/Remove';
import ClearIcon from '@material-ui/icons/Clear';

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
    
    const [startPoint, setStartPoint] = useState({
        x: null,
        y: null
    });
    
    const [isDrawing, setIsDrawing] = useState(false);
    const [recording, setRecording] = useState(false);

    const [playing, setPlaying] = useState(true);

    const canvasPush = () => {
        const newStep = canvasStep + 1;
        setCanvasStep(newStep);
        setCanvasArray(prevArray => [...prevArray, canvasRef.current.toDataURL()])
    }

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
    
            const videoStream = combinedCanvasRef.current.captureStream(240);
            mediaRecorder.current = new MediaRecorder(videoStream);
            
            mediaRecorder.current.addEventListener('dataavailable', (e) => {
                const file = new File([e.data], "analysis.mp4", { lastModified: new Date(), type: "video/mp4" });
                setAnalysisFile(file);
            });
            mediaRecorder.current.start();
        },
        stopRecord() {
            mediaRecorder.current.stop();
            onPause();
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

    const onPause = () => {
        videoRef.current.pause();
        setPlaying(false);
    }

    const onPlay = () => {
        setPlaying(true);
        videoRef.current.play();
    }

    const onMouseDown = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;

        if (drawingType === 0) {
            contextRef.current.beginPath();
            contextRef.current.moveTo(offsetX, offsetY);
            setIsDrawing(true);
        } else if (drawingType === 1 || drawingType === 2) {
            setStartPoint({ x: offsetX, y: offsetY});
            setIsDrawing(true);
        }

    };

    const onMouseUp = () => {
        if (drawingType === 0) {
            contextRef.current.closePath();
            canvasPush();
        } else if (drawingType === 1 || drawingType === 2) {
            canvasPush();
        }
        setIsDrawing(false);
    };

    const onMouseMove = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;

        if (!isDrawing) {
            return;
        }

        if (drawingType === 0) {
    
            contextRef.current.lineTo(offsetX, offsetY);
            contextRef.current.stroke();
        } else if (drawingType === 1) {
            contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            const image = new Image();
            image.src = canvasArray[canvasArray.length - 1];
            contextRef.current.drawImage(image, 0, 0);

            contextRef.current.beginPath();
            contextRef.current.moveTo(startPoint.x, startPoint.y);
            contextRef.current.lineTo(offsetX, offsetY);
            contextRef.current.stroke();
            contextRef.current.closePath();
        } else if (drawingType === 2) {
            contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            const image = new Image();
            image.src = canvasArray[canvasArray.length - 1];
            contextRef.current.drawImage(image, 0, 0);

            contextRef.current.beginPath();
            contextRef.current.arc((offsetX - startPoint.x) / 2 + startPoint.x, (offsetY - startPoint.y) / 2 + startPoint.y, Math.sqrt((startPoint.x - offsetX) * (startPoint.x - offsetX) + (startPoint.y - offsetY) * (startPoint.y - offsetY)), 0, 2 * Math.PI);
            contextRef.current.stroke();
            contextRef.current.closePath();
        }
    };

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
                { drawOptions.map(item => <IconButton><Tooltip title={item.text}><Box onClick={() => setDrawingType(item.value)}>{item.icon}</Box></Tooltip></IconButton> )}
                {/* <UndoIcon onClick={onUndo}/> */}
                {/* <RedoIcon /> */}
                
                <Tooltip title="Clear Drawing">
                    <IconButton>
                        <ClearIcon onClick={onClear}/>
                    </IconButton>
                </Tooltip>
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Box position='relative' width={700} height={700} border={1}>
                    <canvas ref={canvasVideoRef} style={{ position: 'absolute', zIndex: 997, width: '700px', height: '700px' }}/>
                    <canvas onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove} ref={canvasRef} style={{ position: 'absolute', zIndex: 998, width: '700px', height: '700px' }}/>
                    <canvas ref={combinedCanvasRef} style={{ position: 'absolute', zIndex: 996, width: '700px', height: '700px' }}></canvas>
                </Box>
            </Box>

            <video hidden crossOrigin="anonymous" src={videoURL} ref={videoRef} autoPlay loop type="video/mp4"></video>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <IconButton><FastRewindIcon onClick={() => move(-0.1)} /></IconButton>
                
                { playing ?  <IconButton><PauseIcon onClick={onPause} /></IconButton> : <IconButton><PlayArrowIcon onClick={onPlay} /></IconButton>}
                <IconButton><FastForwardIcon onClick={() => move(0.1)} /></IconButton>            
            </Box>
        </Box>
    )
});

export default AnalysisBase;