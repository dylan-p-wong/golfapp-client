import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Card, CardHeader, Button, CardContent } from '@material-ui/core';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from '@apollo/client';
import { USER_SWINGS } from 'src/graphql/swing';
import { GET_USER_LESSONS_PLAYER } from 'src/graphql/lesson';

const MyGame = () => {
  const navigate = useNavigate();
  const { loading: userSwingsLoading, error: userSwingsError, data: userSwingsData } = useQuery(USER_SWINGS);
  const { loading: userLessonsLoading, error: userLessonsError, data: userLessonsData } = useQuery(GET_USER_LESSONS_PLAYER);

  if (userSwingsLoading || userLessonsLoading) return <h1>Loading...</h1>;
  if (userSwingsError || userLessonsError) return <h1>Error</h1>;

  console.log(userLessonsData);

  return (
  <>
    <Helmet>
      <title>Swings | Material Kit</title>
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
              {
                userSwingsData.userSwings.map(swing => {
                  return (
                    <Box m={2} onClick={() => navigate(`/app/swing/${swing._id}`, { replace: true })}>
                      <Card>
                        <CardHeader title={swing.title} subheader={swing.date}/>
                      </Card>
                    </Box>
                  )
                })
              }
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
                { userLessonsData.getUserPlayerLessons.map(item => {
                  return (
                    <Box m={2} onClick={() => navigate(`/app/lesson/${item._id}`, { replace: true })}>
                      <Card>
                        <CardHeader title={"Coach: " + item.coach.firstname + " " + item.player.lastname} subheader={item.date}/>
                      </Card>
                    </Box>
                  )
                }) }
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
)};

export default MyGame;
