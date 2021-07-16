import { useState } from 'react';
import { Tabs, Box, AppBar, Tab, Divider, Button, Typography } from "@material-ui/core"
import AddSwing from '../swing/AddSwing';
import Swing from '../swing/SwingPlayer';
import Notes from '../notes/Notes';
import { useNavigate, useParams } from 'react-router';
import DrillView from '../drill/DrillView';
import LessonSwingView from '../swing/LessonSwingView';
import { useQuery } from '@apollo/client';
import { GET_LESSON } from 'src/graphql/lesson';
import LessonAnalysisView from '../analysis/LessonAnalysisView';

const Lesson = (props) => {
    const { editView } = props;
    const { _id } = useParams();
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_LESSON, { variables: { lessonId: _id } });

    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>Error</h1>

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <Box p={6}>
            <Box mb={3} display="flex" flexDirection="row">
                <Typography variant='h3' flexGrow={1}>{"data.getLesson.title"} - {"data.getLesson.date"}</Typography>
                { !editView ? <Button color="primary" variant="contained" onClick={() => navigate(`/app/lesson/add/${_id}`, { replace: true })}>Coach View</Button> : <Button color="primary" variant="contained" onClick={() => navigate(`/app/lesson/${_id}`, { replace: true })}>User View</Button>}
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
                    <Tab label="Drills"/>
                    <Tab label="Notes"/>
                </Tabs>
            </AppBar>
            { value == 0 && <LessonSwingView lessonId={_id} playerId={data.getLesson.player._id} editView={editView}/> }
            { value == 1 && <LessonAnalysisView lessonId={_id} playerId={data.getLesson.player._id} editView={editView}/> }
            { value == 2 && <DrillView lessonId={_id} /> }
            { value == 3 && <Notes lessonId={_id} /> }
        </Box>
    )
}

export default Lesson;