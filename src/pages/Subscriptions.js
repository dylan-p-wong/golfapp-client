import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Card, CardHeader, Button, CardContent } from '@material-ui/core';

const Subscriptions = () => {
  return (
  <>
    <Helmet>
      <title>Subscriptions | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <h1>Subs</h1>
      </Container>
    </Box>
  </>
)};

export default Subscriptions;
