import { useState } from 'react';
import { Tabs, Box, AppBar, Tab, Divider } from "@material-ui/core"
import AddSwing from '../swing/AddSwing';
import Swing from '../swing/ViewSwing';
import Notes from '../notes/Notes';
import { useParams } from 'react-router';
import ViewAnalysis from '../analysis/ViewAnalysis';
import DrillView from '../drill/DrillView';
import LessonSwingChoice from '../swing/LessonSwingChoice';
import { useQuery } from '@apollo/client';
import { GET_LESSON } from 'src/graphql/lesson';
import AddAnalysis from '../analysis/AddAnalysis';

const Lesson = (props) => {
    const { _id } = useParams();
    const [value, setValue] = useState(0);
    const { loading, error, data } = useQuery(GET_LESSON, { variables: { lessonId: _id } });

    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>Error</h1>

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <Box>
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
            { value == 0 && <LessonSwingChoice lessonId={_id} playerId={data.getLesson.player}/> }
            { value == 1 && <AddAnalysis lessonId={_id} playerId={data.getLesson.player} /> }
            { value == 2 && <DrillView lessonId={_id} /> }
            { value == 3 && <Notes lessonId={_id} /> }
        </Box>
    )
}

export default Lesson;