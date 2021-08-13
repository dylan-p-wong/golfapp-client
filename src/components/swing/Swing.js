import VideoPlayer from "../video/VideoPlayer";
import { Grid, Typography, Box, Button, Divider, AppBar, Tab, Tabs } from '@material-ui/core';
import { Navigate, useParams } from 'react-router';
import { GET_SWING } from "src/graphql/swing";
import { useQuery } from "@apollo/client";
import ViewSwing from "./SwingPlayer";
import Spinner from "../spinner/Spinner";
import { useState } from "react";
import SwingInfo from "./SwingInfo";
import { ME } from "src/graphql/auth";
import moment from "moment";

const Swing = (props) => {
    const { _id } = useParams();
    const { loading, error, data } = useQuery(GET_SWING, { variables: { _id } });
    const { loading: userLoading, error: userError, data: userData } = useQuery(ME); 
    const [value, setValue] = useState(0);

    if (loading || userLoading) return <Spinner />;
    if (error || userError) return <Navigate to="/app/dashboard"/>

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const headerText = `${data.getSwing.title ? data.getSwing.title + " -" : ""} ${data.getSwing.player.firstname} ${data.getSwing.player.lastname} - ${moment.unix(data.getSwing.createdAt / 1000).format('MMMM Do YYYY')}`;

    return (
        <Box p={6}>
            <Box mb={3} display="flex" flexDirection="row">
                <Typography variant='h3' flexGrow={1}>{headerText}</Typography>
                <Button color="secondary" variant="contained">Delete</Button>
            </Box>
            <Divider />
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    centered
                    textColor="primary"
                    indicatorColor="primary"
                >
                    <Tab label="Swing"/>
                    <Tab label="Info"/>
                </Tabs>
            </AppBar>
            { value == 0 && <ViewSwing video1={data.getSwing.frontVideo} video2={data.getSwing.sideVideo}/>}
            { value == 1 && <SwingInfo userId={userData.userInfo._id} swing={data.getSwing}/> }
        </Box>
    )
}

export default Swing;