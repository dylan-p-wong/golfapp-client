import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Card, CardHeader, Button, CardContent } from '@material-ui/core';
import { useNavigate } from 'react-router';

const MyGame = () => {
  const navigate = useNavigate();

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
        <Grid
        container
        spacing={3}
        >
          <Grid
            item
            xs={4}
          >
            <Card>
            <CardHeader title="Saved Swings" action={<Button color="primary" variant="contained" size="small" onClick={() => navigate('/app/swing/add', { replace: true })}>Add Swing</Button>}/>
            <CardContent>
                <Box m={2}>
                  <Card>
                    <CardHeader title="2021-03-04" subheader="Dylan Wong"/>
                  </Card>
                </Box>
                <Box m={2}>
                  <Card>
                    <CardHeader title="2021-03-04" subheader="Dylan Wong"/>
                  </Card>
                </Box>
                <Box m={2}>
                  <Card>
                    <CardHeader title="2021-03-04" subheader="Dylan Wong"/>
                  </Card>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={4}
          >
            <Card>
              <CardHeader title="Saved Drills" action={<Button color="primary" variant="contained" size="small">Find Drills</Button>}/>
              <CardContent>
                <Box m={2}>
                  <Card>
                    <CardHeader title="2021-03-04" subheader="Dylan Wong"/>
                  </Card>
                </Box>
                <Box m={2}>
                  <Card>
                    <CardHeader title="2021-03-04" subheader="Dylan Wong"/>
                  </Card>
                </Box>
                <Box m={2}>
                  <Card>
                    <CardHeader title="2021-03-04" subheader="Dylan Wong"/>
                  </Card>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={4}
          >
            <Card>
              <CardHeader title="My Lessons" action={<Button color="primary" variant="contained" size="small">Find Lesson</Button>}/>
              <CardContent>
                <Box m={2} onClick={() => navigate('/app/lesson/asdf', { replace: true })}>
                  <Card>
                    <CardHeader title="2021-03-04" subheader="Dylan Wong"/>
                  </Card>
                </Box>
                <Box m={2}>
                  <Card>
                    <CardHeader title="2021-03-04" subheader="Dylan Wong"/>
                  </Card>
                </Box>
                <Box m={2}>
                  <Card>
                    <CardHeader title="2021-03-04" subheader="Dylan Wong"/>
                  </Card>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
)};

export default MyGame;
