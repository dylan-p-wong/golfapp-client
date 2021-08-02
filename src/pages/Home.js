import { Helmet } from 'react-helmet';
import { Link, Box, Container, Grid, Card, CardHeader, Button, CardContent, AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { Outlet } from 'react-router';

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
          paddingTop: theme.spacing(6),
          paddingBottom: theme.spacing(6),
        },
    }
}));

const Home = () => {
const classes = useStyles();

return (
    <>
        <Helmet>
        <title>Home | Material Kit</title>
        </Helmet>
        <Box>
            <Container maxWidth={false}>
                <Outlet />
            </Container>
            <Container maxWidth="md" component="footer" className={classes.footer}>
                <Grid container spacing={4} justifyContent="space-evenly">
                    <Grid container item xs={6} sm={3} alignItems="center" justifyContent="center" flexDirection="column">
                        <Typography variant="h5" gutterBottom>Golf App</Typography>
                        <ul>
                            <li>
                                <Link href="#" variant="subtitle1" color="textSecondary">
                                    About
                                </Link>
                            </li>
                        </ul>
                    </Grid>
                    <Grid container item xs={6} sm={3} alignItems="center" justifyContent="center" flexDirection="column">
                        <Typography variant="h5" gutterBottom>Resources</Typography>
                        <ul>
                            <li>
                                <Link href="#" variant="subtitle1" color="textSecondary">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </Grid>
                </Grid>
                <Box mt={5}>
                    <Typography variant="body2" color="textSecondary" align="center">Golf App 2021</Typography>
                </Box>
            </Container>
        </Box>
    </>
)
};

export default Home;
