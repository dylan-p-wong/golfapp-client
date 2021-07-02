import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Card, CardHeader, Button, CardContent } from '@material-ui/core';
import { Outlet } from 'react-router';

const SwingPage = () => {

return (
    <>
        <Helmet>
        <title>Customers | Material Kit</title>
        </Helmet>
        <Box
            sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
            }}
        >
        <Container maxWidth={false}>
            <Outlet />
        </Container>
    </Box>
    </>
)
};

export default SwingPage;
