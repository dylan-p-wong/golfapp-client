import VideoPlayer from "../video/VideoPlayer";
import { Grid, Typography, Box, Button } from '@material-ui/core';
import { useParams } from 'react-router';
import { GET_SWING } from "src/graphql/swing";
import { useQuery } from "@apollo/client";
import ViewSwing from "./ViewSwing";

const Swing = (props) => {
    const { _id } = useParams();
    const { loading, error, data } = useQuery(GET_SWING, { variables: { _id } });

    if (loading) return <h1>Loading..</h1>;
    if (error) return <h1>Error</h1>

    console.log(data);

    return (
        <Box>
            <ViewSwing videoURL={data.getSwing.frontVideo}/>
        </Box>
    )
}

export default Swing;