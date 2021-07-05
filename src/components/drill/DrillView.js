import { Tab, Tabs, Box, AppBar, Avatar, Button } from "@material-ui/core"
import { useState } from 'react';
import VideoSelector from "../video/VideoSelector";

const DrillView = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <VideoSelector />
        </Box>
    )   
}

export default DrillView;
