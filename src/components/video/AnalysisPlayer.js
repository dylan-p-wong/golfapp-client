import ReactPlayer from 'react-player';
import { Icon, Box, Button } from '@material-ui/core'
import React, { useState, createRef, useRef, useEffect } from 'react';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const AnalysisPlayer = (props) => {
    const player = createRef();
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const [playing, setPlaying] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);

    const move = (amount) => {
        const currentTime = player.current.getCurrentTime();
        const duration = player.current.getDuration();

        if (currentTime + amount < 0) {
            player.current.seekTo(0);
        } else if (currentTime + amount > duration) {
            player.current.seekTo(duration);
        } else {
            player.current.seekTo(currentTime + amount);
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        const context = canvas.getContext('2d');
        context.scale(2, 2);
        context.lineCap = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 5;
        contextRef.current = context;
    }, []);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    };

    return (
        <Box>
            <canvas onMouseDown={startDrawing} onMouseUp={finishDrawing} onMouseMove={draw} ref={canvasRef} style={{ position: 'absolute', zIndex: 998, width: '700px', height: '700px' }}/>
            <ReactPlayer
                ref={player}
                playing={playing} 
                playbackRate={playbackRate}
                muted={true}
                loop={true}
                url={props.url} 
                width='700px' 
                height='700px'
            />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                { playing ? <PauseIcon style={{ zIndex: 999}} onClick={() => setPlaying(false)} /> : <PlayArrowIcon style={{ zIndex: 999}} onClick={() => setPlaying(true)} />}
            </Box>
        </Box>
    )
}

export default AnalysisPlayer;