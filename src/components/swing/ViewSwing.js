import VideoPlayer from "../video/VideoPlayer";
import { Grid, Typography, Box, Button } from '@material-ui/core';

const ViewSwing = (props) => {
    return (
        <Box p={6}>
            <Grid container spacing={3} >
                <Grid container item xs={6} direction="column" alignItems="center" justify="center">
                    <VideoPlayer url={props.videoURL}/>
                </Grid>
                <Grid container item xs={6} direction="column" alignItems="center" justify="center">
                    <VideoPlayer url={props.videoURL}/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ViewSwing;