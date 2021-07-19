import { useState } from 'react';
import { Tab, Tabs, Box, AppBar, Avatar, Button, Typography } from "@material-ui/core"
import { USER_SWINGS } from 'src/graphql/swing';
import { useQuery } from '@apollo/client';
import moment from 'moment';

const VideoSelector = (props) => {
    const { items = [], onAdd, text } = props;
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
                {
                    items.map((item, index) => {
                        return (
                            <Tab 
                                label={item.title + " " + moment.unix(item.createdAt).format('DD/MM/YYYY')}
                                icon={<Avatar src="https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg"/>}
                                index={index}
                            />
                        )
                    })
                }
            </Tabs>
            <Button onClick={() => props.onAdd(items[value])}>{text}</Button>
        </AppBar>
    )
}

export default VideoSelector;