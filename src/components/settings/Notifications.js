import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid,
    Typography
} from '@material-ui/core';

const Notifications = () => {
    return (
        <form>
            <Card>
                <CardHeader
                    subheader="Manage the notifications"
                    title="Notifications"
                />
                <Divider />
                <Box display="flex" flexDirection="column" p={2}>
                    <FormControlLabel
                    control={(
                        <Checkbox
                        color="primary"
                        defaultChecked
                        />
                    )}
                    label="Email"
                    />
                    <FormControlLabel
                    control={(
                        <Checkbox
                        color="primary"
                        defaultChecked
                        />
                    )}
                    label="Push Notifications"
                    />
                    <FormControlLabel
                    control={(
                        <Checkbox 
                        color="primary"
                        defaultChecked
                        />
                    )}
                    label="Text Messages"
                    />
                    <FormControlLabel
                    control={(
                        <Checkbox
                        color="primary"
                        defaultChecked
                        />
                    )}
                    label="Phone calls"
                    />
                </Box>
            </Card>
        </form>
    )
}

export default Notifications;