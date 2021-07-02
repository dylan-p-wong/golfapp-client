import { useState } from 'react';
import { Tabs, Box, AppBar, Tab, Divider } from "@material-ui/core"
import AddSwing from '../swing/AddSwing';
import Swing from '../swing/Swing';
import Notes from '../notes/Notes';
import { useParams } from 'react-router';
import ViewAnalysis from '../analysis/ViewAnalysis';

const Lesson = (props) => {
    const { id } = useParams();
    const [value, setValue] = useState(0);

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
            { value == 0 && <AddSwing /> }
            { value == 1 && <ViewAnalysis /> }
            { value == 2 && <Swing /> }
            { value == 3 && <Notes /> }
        </Box>
    )
}

export default Lesson;