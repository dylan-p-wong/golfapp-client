import VideoPlayer from "../video/VideoPlayer";
import AnalysisPlayer from "../video/AnalysisPlayer";
import { Grid, Typography, Box, Button } from '@material-ui/core';

const ViewAnalysis = (props) => {
    return (
        <Box p={6}>
            <Grid container spacing={3} >
                <Grid container item xs={6} direction="column" alignItems="center" justify="center">
                    <AnalysisPlayer url='https://www.youtube.com/watch?v=5BehRvzETDY'/>
                </Grid>
            </Grid>
        </Box>
    )
};

export default ViewAnalysis;