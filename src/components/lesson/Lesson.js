import { useState } from 'react';
import { Tabs, Box, AppBar, Tab, Divider, Button, Typography, FormControlLabel, Checkbox } from "@material-ui/core"
import AddSwing from '../swing/AddSwing';
import Swing from '../swing/SwingPlayer';
import Notes from '../notes/Notes';
import { useNavigate, useParams } from 'react-router';
import DrillView from '../drill/DrillView';
import LessonSwingView from '../swing/LessonSwingView';
import { useQuery } from '@apollo/client';
import { GET_LESSON } from 'src/graphql/lesson';
import LessonAnalysisView from '../analysis/LessonAnalysisView';
import moment from 'moment';
import Spinner from '../spinner/Spinner';
import { Navigate } from 'react-router-dom';
import { ME } from 'src/graphql/auth';
import LessonInfo from './LessonInfo';

const Lesson = (props) => {
    const { editView } = props;
    const { _id } = useParams();
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_LESSON, { variables: { lessonId: _id } });
    const { loading: userLoading, error: userError, data: userData } = useQuery(ME);

    if (loading || userLoading) return <Spinner />
    if (error || userError) return <h1>Error</h1>

    if (editView && (data.getLesson.coach._id !== userData.userInfo._id)){
        return <Navigate to="/dashboard"/>
    }

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    
    return (
        <Box p={6}>
            <Box mb={3} display="flex" flexDirection="row">
                <Typography flexGrow={1} variant='h3' >{data.getLesson.player.firstname + " " + data.getLesson.player.lastname} - {moment.unix(data.getLesson.createdAt / 1000).format('MMMM Do YYYY')}</Typography>
                {(data.getLesson.coach._id === userData.userInfo._id) ? !editView ? <Button color="primary" variant="contained" onClick={() => navigate(`/app/lesson/edit/${_id}`, { replace: true })}>Coach View</Button> : <Button color="primary" variant="contained" onClick={() => navigate(`/app/lesson/${_id}`, { replace: true })}>User View</Button> : null}
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
                    <Tab label="Swings"/>
                    <Tab label="Analysis"/>
                    {/* <Tab label="Drills"/> */}
                    <Tab label="Notes"/>
                    <Tab label="Info"/>
                </Tabs>
            </AppBar>
            { value == 0 && <LessonSwingView lessonId={_id} playerId={data.getLesson.player._id} editView={editView}/> }
            { value == 1 && <LessonAnalysisView lessonId={_id} playerId={data.getLesson.player._id} editView={editView}/> }
            {/* { value == 2 && <DrillView lessonId={_id} /> } */}
            { value == 2 && <Notes lessonId={_id} /> }
            { value == 3 && <LessonInfo lesson={data.getLesson}/>}
        </Box>
    )
}

export default Lesson;