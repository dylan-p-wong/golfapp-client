import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Card, CardHeader, Button, CardContent, Divider, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from '@apollo/client';
import { USER_SWINGS } from 'src/graphql/swing';
import { GET_USER_LESSONS_PLAYER, GET_USER_LESSON_REQUESTS_PLAYER } from 'src/graphql/lesson';
import moment from 'moment';

const MyGame = () => {
  const navigate = useNavigate();
  const { loading: userSwingsLoading, error: userSwingsError, data: userSwingsData } = useQuery(USER_SWINGS);
  const { loading: userLessonsLoading, error: userLessonsError, data: userLessonsData } = useQuery(GET_USER_LESSONS_PLAYER);
  const { loading: userLessonRequestsLoading, error: userLessonRequestsError, data: userLessonRequestsData } = useQuery(GET_USER_LESSON_REQUESTS_PLAYER);

  if (userSwingsLoading || userLessonsLoading || userLessonRequestsLoading) return <h1>Loading...</h1>;
  if (userSwingsError || userLessonsError || userLessonRequestsError) return <h1>Error</h1>;

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
                        <CardHeader title={swing.title}/>
                        <Divider />
                        <Box p={1} display="flex" alignItems="center">
                            <Typography align="left" variant="body2" color="textSecondary" pl={1}>{moment.unix(swing.createdAt / 1000).format('MMMM Do YYYY')}</Typography>
                        </Box>
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
              <CardHeader title="Requested Lessons" action={<Button color="primary" variant="contained" size="small">Request Lesson</Button>}/>
              <CardContent>
                {
                  userLessonRequestsData.getUserPlayerLessonRequests.map(item => {
                    return (
                      <Box m={2}>
                        <Card>
                          <CardHeader title={item.coach.firstname + " " + item.coach.lastname}/>
                          <Divider />
                          <Box p={1} display="flex" alignItems="center">
                              <Typography align="left" variant="body2" color="textSecondary" pl={1}>{moment.unix(item.createdAt / 1000).format('MMMM Do YYYY')}</Typography>
                          </Box>
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
              <CardHeader title="My Lessons"/>
              <CardContent>
                { userLessonsData.getUserPlayerLessons.map(item => {
                  return (
                    <Box m={2} onClick={() => navigate(`/app/lesson/${item._id}`, { replace: true })}>
                      <Card>
                        <CardHeader title={item.title + " - " + item.player.firstname + " " + item.player.lastname}/>
                        <Divider />
                        <Box p={1} display="flex" alignItems="center">
                            <Typography align="left" variant="body2" color="textSecondary" pl={1}>{moment.unix(item.createdAt / 1000).format('MMMM Do YYYY')}</Typography>
                        </Box>
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
