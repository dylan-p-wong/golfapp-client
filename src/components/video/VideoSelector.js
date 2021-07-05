import { useState } from 'react';
import { Tab, Tabs, Box, AppBar, Avatar, Button } from "@material-ui/core"

const VideoSelector = (props) => {
    const { items, onAdd } = props;

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <AppBar position="static" color="default">
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
            >
                <Tab 
                    label={"test"}
                    value={0}
                    icon={<Avatar src="https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg"/>}
                />
                <Tab 
                    label={"test"}
                    value={1}
                    icon={<Avatar src="https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg"/>}
                />
            </Tabs>
            <Button onClick={props.onAdd}>Add Swing</Button>
        </AppBar>
    )
}

export default VideoSelector;