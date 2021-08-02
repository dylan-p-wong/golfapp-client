import { useNavigate } from "react-router";

const { Divider, Container, Typography, Box, Grid, Card, CardHeader, CardContent, CardActions, Button } = require("@material-ui/core")

const playerTiers = [
    {
        title: 'Free',
        price: '0',
        description: ['Record 10 swings a month', 'Store 5 swings'],
        buttonText: 'Get started',
        buttonVariant: 'outlined'
    },
    {
        title: 'Standard',
        subheader: 'Most popular',
        price: '2.99',
        description: ['Record unlimited swings', 'Store 50 swings'],
        buttonText: 'Get started',
        buttonVariant: 'contained'
    },
    {
        title: 'Pro',
        price: '9.99',
        description: ['Record unlimited swings', 'Store 1000 swings'],
        buttonText: 'Get started',
        buttonVariant: 'outlined'
    }
];

const coachTiers = [
    {
        title: 'Free',
        price: '0',
        description: ['Create 5 lessons a month', 'Store 5 videos'],
        buttonText: 'Get started',
        buttonVariant: 'outlined'
    },
    {
        title: 'Standard',
        subheader: 'Most popular',
        price: '4.99',
        description: ['Create 50 lessons a month', 'Store 50 videos'],
        buttonText: 'Get started',
        buttonVariant: 'contained'
    },
    {
        title: 'Pro',
        price: '19.99',
        description: ['Create 200 lessons a month', 'Store 1000 videos'],
        buttonText: 'Get started',
        buttonVariant: 'outlined'
    }
];

const Pricing = (props) => {
    const navigate = useNavigate();

    return (
        <>
        <Box mt={4}>
            <Box m={7}>
                <Container maxWidth="sm" component="main">
                    <Typography variant="h1" align="center" gutterBottom>Pricing</Typography>
                    <Typography variant="h5" color="textSecondary" align="center" gutterBottom>
                        Our plans for players and students. If you have a different plan in mind contact us.
                    </Typography>
                </Container>
            </Box>
            <Container maxWidth="lg" component="main">
                <Box m={3}>
                    <Typography variant="h4" align="center">Player Account</Typography>
                    <br />
                    <Typography variant="h5" color="textSecondary" align="center">Upload swings | Analyze swings | Take lessons</Typography>
                </Box>
                <Grid container spacing={5} alignItems="flex-end">
                    {
                        playerTiers.map(item => {
                            return (
                                <Grid item key={item.title} xs={12} md={4}>
                                    <Card>
                                        <CardHeader 
                                            title={item.title}
                                            subheader={item.subheader}
                                            titleTypographyProps={{ align: 'center' }}
                                            subheaderTypographyProps={{ align: 'center' }}
                                            style={{ backgroundColor: '#F5F5F5' }}                               
                                        />
                                        <CardContent>
                                            <Box mb={3} display="flex" justifyContent="center" alignItems="baseline">
                                                <Typography variant="h2">
                                                    ${item.price}
                                                </Typography>
                                                <Typography variant="h5">
                                                    /mo
                                                </Typography>
                                            </Box>
                                            <ul>
                                                {item.description.map(line => 
                                                    <Typography variant="h6" align="center" key={line}>
                                                        {line}
                                                    </Typography>
                                                )}
                                            </ul>
                                        </CardContent>
                                        <CardActions>
                                            <Button fullWidth variant={item.buttonVariant} color="primary" onClick={() => navigate('/register', { replace: true })}>
                                                {item.buttonText}
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
                <Box m={3}>
                    <Typography variant="h4" align="center">Coach Account</Typography>
                    <br />
                    <Typography variant="h5" color="textSecondary" align="center">Upload swings | Analyze swings | Create drills | Create lessons</Typography>
                </Box>
                <Grid container spacing={5} alignItems="flex-end">
                    {
                        coachTiers.map(item => {
                            return (
                                <Grid item key={item.title} xs={12} md={4}>
                                    <Card>
                                        <CardHeader 
                                            title={item.title}
                                            subheader={item.subheader}
                                            titleTypographyProps={{ align: 'center' }}
                                            subheaderTypographyProps={{ align: 'center' }}
                                            style={{ backgroundColor: '#F5F5F5' }}                               
                                        />
                                        <CardContent>
                                            <Box mb={3} display="flex" justifyContent="center" alignItems="baseline">
                                                <Typography variant="h2">
                                                    ${item.price}
                                                </Typography>
                                                <Typography variant="h5">
                                                    /mo
                                                </Typography>
                                            </Box>
                                            <ul>
                                                {item.description.map(line => 
                                                    <Typography variant="h6" align="center" key={line}>
                                                        {line}
                                                    </Typography>
                                                )}
                                            </ul>
                                        </CardContent>
                                        <CardActions>
                                            <Button fullWidth variant={item.buttonVariant} color="primary" onClick={() => navigate('/register', { replace: true })}>
                                                {item.buttonText}
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </Box>
            
        </>
    )
}

export default Pricing;