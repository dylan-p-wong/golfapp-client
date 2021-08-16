import { useNavigate } from "react-router";
import Tiers from "./Tiers";

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
            <Tiers />
        </Box>
            
        </>
    )
}

export default Pricing;