import VideoPlayer from "../video/VideoPlayer";
import { Grid, Typography, Box, Button } from '@material-ui/core';

const ViewSwing = (props) => {
    const { video1, video2 } = props;

    return (
        <Box p={6}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                    { video1 && <VideoPlayer url={video1}/>}
                    { video2 && <VideoPlayer url={video2}/>}
            </Box>
        </Box>
    )
}

export default ViewSwing;