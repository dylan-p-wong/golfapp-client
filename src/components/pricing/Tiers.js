import { useNavigate } from "react-router";

const { Divider, Container, Typography, Box, Grid, Card, CardHeader, CardContent, CardActions, Button } = require("@material-ui/core")

const playerTiers = [
    {
        key: 'FREE_TIER',
        title: 'Free',
        price: '0',
        description: ['Record 10 swings a month', 'Store 5 swings'],
        buttonText: 'Get started',
        buttonVariant: 'contained',
        active: true
    },
    {
        key: '',
        title: 'Standard',
        // subheader: 'Most popular',
        price: '2.99',
        description: ['Record unlimited swings', 'Store 50 swings'],
        buttonText: 'Get started',
        buttonVariant: 'contained',
        active: false
    },
    {
        key: '',
        title: 'Pro',
        price: '9.99',
        description: ['Record unlimited swings', 'Store 1000 swings'],
        buttonText: 'Get started',
        buttonVariant: 'contained',
        active: false
    }
];

const coachTiers = [
    {
        key: 'FREE_TIER',
        title: 'Free',
        price: '0',
        description: ['Create 5 lessons a month', 'Store 5 videos'],
        buttonText: 'Get started',
        buttonVariant: 'contained',
        active: true
    },
    {
        key: '',
        title: 'Standard',
        // subheader: 'Most popular',
        price: '4.99',
        description: ['Create 50 lessons a month', 'Store 50 videos'],
        buttonText: 'Get started',
        buttonVariant: 'contained',
        active: false
    },
    {
        key: '',
        title: 'Pro',
        price: '19.99',
        description: ['Create 200 lessons a month', 'Store 1000 videos'],
        buttonText: 'Get started',
        buttonVariant: 'contained',
        active: false
    }
];

const Tiers = ({ playerTier, coachTier, showPlayerTier = true, showCoachTier = true }) => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="lg" component="main">
            {
                showPlayerTier &&
                <>
                <Box m={3}>
                    <Typography variant="h4" align="center">Player Account</Typography>
                    <br />
                    <Typography variant="h5" color="textSecondary" align="center">Upload swings | Analyze swings | Take lessons</Typography>
                </Box>
                <Grid container spacing={5} alignItems="flex-end" >
                    {
                        playerTiers.map(item => {
                            return (
                                <Grid item key={item.title} xs={12} md={4} >
                                    <Card >
                                        <CardHeader 
                                            title={item.title}
                                            subheader={item.subheader}
                                            titleTypographyProps={{ align: 'center' }}
                                            subheaderTypographyProps={{ align: 'center' }}
                                            style={{ backgroundColor: item.key === playerTier ? '#b8e3a3' : '#F5F5F5' }}                               
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
                                            <Button disabled={!item.active || item.key === playerTier} fullWidth variant={item.buttonVariant} color="primary" onClick={() => navigate('/register', { replace: true })}>
                                                {item.key === playerTier ? 'Current Subscription' : item.buttonText}
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
                </>
            }
            {
                showCoachTier &&
                <>
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
                                            style={{ backgroundColor: item.key === coachTier ? '#b8e3a3' : '#F5F5F5' }}                               
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
                                            <Button disabled={!item.active || item.key === coachTier} fullWidth variant={item.buttonVariant} color="primary" onClick={() => navigate('/register', { replace: true })}>
                                                {item.key === coachTier ? 'Current Subscription' : item.buttonText}
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
                </>
            }
        </Container>
    )
}

export default Tiers;