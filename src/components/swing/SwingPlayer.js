import VideoPlayer from "../video/VideoPlayer";
import { Grid, Typography, Box, Button } from '@material-ui/core';

const ViewSwing = (props) => {
    const { video1, video2 } = props;

    return (
        <Box p={6}>
            <Grid container spacing={3} >
                    { video1 && <VideoPlayer url={video1}/>}
                    { video2 && <VideoPlayer url={video2}/>}
            </Grid>
        </Box>
    )
}

export default ViewSwing;