import VideoPlayer from "../video/VideoPlayer";
import { Grid, Typography, Box, Button, Divider } from '@material-ui/core';
import { useParams } from 'react-router';
import { GET_SWING } from "src/graphql/swing";
import { useQuery } from "@apollo/client";
import ViewSwing from "./SwingPlayer";

const Swing = (props) => {
    const { _id } = useParams();
    const { loading, error, data } = useQuery(GET_SWING, { variables: { _id } });

    if (loading) return <h1>Loading..</h1>;
    if (error) return <h1>Error</h1>

    return (
        <Box p={6}>
            <Box mb={3} display="flex" flexDirection="row">
                <Typography variant='h3' flexGrow={1}>{data.getSwing.title} - {data.getSwing.date}</Typography>
                <Button color="secondary" variant="contained">Delete</Button>
            </Box>
            <Divider />
            <ViewSwing frontVideoURL={data.getSwing.frontVideo} sideVideoURL={data.getSwing.sideVideo}/>
        </Box>
    )
}

export default Swing;