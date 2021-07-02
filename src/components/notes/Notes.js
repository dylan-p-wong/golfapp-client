const { Typography } = require("@material-ui/core")
const { TextField, Box, Grid, Button, Card, CardHeader, Divider } = require("@material-ui/core")
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const Notes = (props) => {
    return (
        <Box p={6}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Box display="flex" flexDirection="column" m={2}>
                        <TextField placeholder="Note title"/>
                        <TextField 
                            placeholder="Enter a note"
                            multiline
                            rows={6}
                        />
                        <Button variant="contained" color="primary">Add Note</Button>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box m={2}>
                        <Card m={3}>
                            <CardHeader style={{ textAlign: 'center' }} title="Note"/>
                            <Box p={2}>
                                <Typography align="center">Testing</Typography>
                            </Box>
                            <Divider />
                            <Box p={1} display="flex" alignItems="center">
                                <AccessTimeIcon color="action" />
                                <Typography align="left" variant="body2" color="textSecondary" pl={1}>Added 2h Ago</Typography>
                            </Box>
                        </Card>
                    </Box>

                    <Box m={2}>
                        <Card m={3}>
                            <CardHeader style={{ textAlign: 'center' }} title="Note"/>
                            <Box p={2}>
                                <Typography align="center">Testing</Typography>
                            </Box>
                            <Divider />
                            <Box p={1} display="flex" alignItems="center">
                                <AccessTimeIcon color="action" />
                                <Typography align="left" variant="body2" color="textSecondary" pl={1}>Added 2h Ago</Typography>
                            </Box>
                        </Card>
                    </Box>

                    <Box m={2}>
                        <Card m={3}>
                            <CardHeader style={{ textAlign: 'center' }} title="Note"/>
                            <Box p={2}>
                                <Typography align="center">Testing</Typography>
                            </Box>
                            <Divider />
                            <Box p={1} display="flex" alignItems="center">
                                <AccessTimeIcon color="action" />
                                <Typography align="left" variant="body2" color="textSecondary" pl={1}>Added 2h Ago</Typography>
                            </Box>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Notes;