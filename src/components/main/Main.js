const { Divider, Typography, Container, Box, Button, Grid, Card, CardContent } = require("@material-ui/core")
const { makeStyles } = require("@material-ui/core/styles")
import SchoolIcon from '@material-ui/icons/School';
import AssessmentIcon from '@material-ui/icons/Assessment';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import Pricing from '../pricing/Pricing';
import { useNavigate } from 'react-router';

const useStyles = makeStyles(theme => ({
    mainImage: {
        borderRadius: 25,
        [theme.breakpoints.down('sm')]: {
            width: 300
        },
        [theme.breakpoints.up('sm')]: {
            width: 800
        }
    },
    subImage: {
        borderRadius: 16,
        [theme.breakpoints.down('sm')]: {
            width: 300
        },
        [theme.breakpoints.up('sm')]: {
            width: 500
        }
    }
}));

const Main = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    
    return (
    <Box mt={3}>
        <Container maxWidth="lg" style={{ flexDirection: 'column', display: 'flex', justifyContent: "center", alignItems: 'center' }}>
            <Box m={4} alignItems="center" justifyContent="center" display="flex" flexDirection="column">
            <Typography align="center" variant="h1">Built for golfers</Typography>
                <Container maxWidth="sm" style={{ marginTop: 20 }}>
                    <Typography align="center" variant="h4" color="textSecondary">Our platform provides golfers and coaches a place to collaborate and make golf improvement easier than ever.</Typography>
                </Container>
                <Box m={3}>
                    <Button variant="contained" onClick={() => navigate('/register', { replace: true })}>Get Started</Button>
                </Box>
            </Box>
            <Box border={1} borderRadius={16} p={2} borderColor="grey.500">
                <img className={classes.mainImage} src="static/images/analysis_board.png"/>
            </Box>
            <Grid container m={4} alignItems="center" justifyContent="center" style={{ backgroundColor: '#E0E0E0', borderRadius: 16 }}>
                <Grid container item item xs={12} lg={6} alignItems="center" justifyContent="center">
                    <Box p={5} display="flex" flexDirection="column" justifyContent="center" alignItems="center" > 
                        <SchoolIcon fontSize='large'/>
                        <Typography>Great for online recorded lessons</Typography>
                        <br />
                        <img className={classes.subImage} src="static/images/lesson_platform.png"/>
                    </Box>
                </Grid>
                <Grid container item xs={12} lg={6} alignItems="center" justifyContent="center">
                    <Box p={5} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <AssessmentIcon fontSize='large'/>
                        <Typography>Swing analysis tools</Typography>
                        <br />
                        <img className={classes.subImage} src="static/images/swing_tools.png"/>
                    </Box>
                </Grid>
                <Grid container item item xs={12} lg={6} alignItems="center" justifyContent="center">
                    <Box p={5} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <GolfCourseIcon fontSize='large'/>
                        <Typography>Improve your game!</Typography>
                        <br />
                        <img className={classes.subImage} src="static/images/trend_line.jpg"/>
                    </Box>
                </Grid>
            </Grid>
        </Container>
        <Pricing />
    </Box>
    )
}

export default Main;