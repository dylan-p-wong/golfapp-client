import ReactPlayer from 'react-player';
import { Icon, Box, Button } from '@material-ui/core'
import React, { useState, createRef } from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const AnalysisVideoPlayer = (props) => {
    const { video1, video2, voice } = props;

    const player = createRef();
    const [playing, setPlaying] = useState(false);

    return (
        <Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
            {
                video1 && 
                <ReactPlayer
                    ref={player}
                    playing={playing} 
                    muted={true}
                    loop={true}
                    url={video1} 
                    width='700px' 
                    height='700px'
                />
            }
            {
                video2 && 
                <ReactPlayer
                    ref={player}
                    playing={playing} 
                    muted={true}
                    loop={true}
                    url={video2} 
                    width='700px' 
                    height='700px'
                />
            }
            </Box>
            <ReactPlayer 
                ref={player}
                playing={playing} 
                muted={false}
                loop={true}
                //url={voice}
                url={voice}
            />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                { playing ? <PauseIcon onClick={() => setPlaying(false)} /> : <PlayArrowIcon onClick={() => setPlaying(true)} />}
            </Box>
        </Box>
    )
}

export default AnalysisVideoPlayer;