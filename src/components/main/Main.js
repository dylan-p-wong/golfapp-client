const { Divider, Typography, Container, Box, Button, Grid, Card, CardContent } = require("@material-ui/core")
import SchoolIcon from '@material-ui/icons/School';
import AssessmentIcon from '@material-ui/icons/Assessment';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import Pricing from '../pricing/Pricing';
import { useNavigate } from 'react-router';

const Main = (props) => {
    const navigate = useNavigate();
    
    return (
    <Box m={8}>
        <Container maxWidth="lg" style={{ flexDirection: 'column', display: 'flex', justifyContent: "center", alignItems: 'center' }}>
            <Box m={4} alignItems="center" justifyContent="center" display="flex" flexDirection="column">
            <Typography align="center" variant="h1">Built for golfers</Typography>
                <Container maxWidth="sm">
                    <Typography align="center" variant="h4" color="textSecondary">Golf App provides golfers and coaches a place to collaborate and make golf improvement easier than ever.</Typography>
                </Container>
                <Box m={3}>
                    <Button variant="contained" onClick={() => navigate('/register', { replace: true })}>Get Started</Button>
                </Box>
            </Box>
            <img src="https://via.placeholder.com/900x400"/>
            <Grid container m={4}>
                <Grid container item item xs={12} lg={4} alignItems="center" justifyContent="center">
                    <Card>
                        <Box p={2} display="flex" flexDirection="column" justifyContent="center" alignItems="center" width={300}> 
                            <SchoolIcon fontSize='large'/>
                            <Typography>Great platform for online lessons</Typography>
                            <br />
                            <img src="https://via.placeholder.com/150x150"/>
                        </Box>
                    </Card>
                </Grid>
                <Grid container item xs={12} lg={4} alignItems="center" justifyContent="center">
                    <Card> 
                        <Box p={2} display="flex" flexDirection="column" justifyContent="center" alignItems="center" width={300}>
                            <AssessmentIcon fontSize='large'/>
                            <Typography>Swing analysis tools</Typography>
                            <br />
                            <img src="https://via.placeholder.com/150x150"/>
                        </Box>
                    </Card>
                </Grid>
                <Grid container item item xs={12} lg={4} alignItems="center" justifyContent="center">
                    <Card>
                        <Box p={2} display="flex" flexDirection="column" justifyContent="center" alignItems="center" width={300}>
                            <GolfCourseIcon fontSize='large'/>
                            <Typography>Improve your game!</Typography>
                            <br />
                            <img src="https://via.placeholder.com/150x150"/>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Container>
        <Pricing />
    </Box>
    )
}

export default Main;