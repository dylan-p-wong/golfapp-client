import ReactPlayer from 'react-player';
import { Icon, Box, Button, IconButton } from '@material-ui/core'
import React, { useState, createRef } from 'react';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const VideoPlayer = (props) => {
    const player = createRef();

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

    const setPlaybackHandle = (e) => {
        setPlaybackRate(parseFloat(e.currentTarget.value));
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
                <IconButton><FastRewindIcon onClick={() => move(-0.1)} /></IconButton>
                { playing ? <IconButton><PauseIcon onClick={() => setPlaying(false)} /></IconButton> : <IconButton><PlayArrowIcon onClick={() => setPlaying(true)} /></IconButton>}
                <IconButton><FastForwardIcon onClick={() => move(0.1)} /></IconButton>
            </Box>
        </Box>
    )
}

export default VideoPlayer;