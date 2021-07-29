import { Helmet } from 'react-helmet';
import { Autocomplete, DialogActions, Dialog, DialogTitle, DialogContent, TextField, Box, Container, Grid, Card, CardHeader, Button, CardContent, Divider, Typography, Chip, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation, useQuery } from '@apollo/client';
import { USER_SWINGS } from 'src/graphql/swing';
import { CANCEL_LESSON_REQUEST, CREATE_LESSON_REQUEST, GET_USER_LESSONS_PLAYER, GET_USER_LESSON_REQUESTS_PLAYER } from 'src/graphql/lesson';
import moment from 'moment';
import { useState } from 'react';
import { GET_COACHES } from 'src/graphql/auth';
import PerfectScrollbar from 'react-perfect-scrollbar';

const MyGame = () => {
  const navigate = useNavigate();
  const { loading: userSwingsLoading, error: userSwingsError, data: userSwingsData } = useQuery(USER_SWINGS);
  const { loading: userLessonsLoading, error: userLessonsError, data: userLessonsData } = useQuery(GET_USER_LESSONS_PLAYER);
  const { loading: userLessonRequestsLoading, error: userLessonRequestsError, data: userLessonRequestsData } = useQuery(GET_USER_LESSON_REQUESTS_PLAYER);
  const { loading: coachesLoading, error: coachesError, data: coachesData} = useQuery(GET_COACHES);
  const [createLessonRequest, { loading: createLessonRequestLoading, error: createLessonRequestError, data: createLessonRequestData }] = useMutation(CREATE_LESSON_REQUEST);
  const [cancelLessonRequest, { loading: cancelLessonRequestLoading, error: cancelLessonRequestError, data: cancelLessonRequestData }] = useMutation(CANCEL_LESSON_REQUEST);


  const [note, setNote] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);

  if (coachesLoading || userSwingsLoading || userLessonsLoading || userLessonRequestsLoading || createLessonRequestLoading || cancelLessonRequestLoading) return <h1>Loading...</h1>;
  if (coachesError || userSwingsError || userLessonsError || userLessonRequestsError || createLessonRequestError || cancelLessonRequestError) return <h1>Error</h1>;

  const cancelLessonRequestHandle = async (lessonRequestId) => {
    await cancelLessonRequest({ variables: { lessonRequestId }});
    toast("Lesson Request Cancelled!");
  }

  const addLessonRequestHandle = async () => {
    await createLessonRequest({ variables: { note, coachId: selectedCoach._id }});
    toast("Lesson Request Sent!");
    setOpen(false);
  }

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
      <Dialog
          open={open}
          onClose={() => setOpen(false)}
        >
          <DialogTitle>{"Select Coach"}</DialogTitle>
          <DialogContent>
            <TextField fullWidth label="Note" placeholder="Swing fix" onChange={e => setNote(e.target.value)}/>
            <Autocomplete
              onChange={(event, newValue) => { setSelectedCoach(newValue) }}
              style={{ width: 300 }} 
              options={coachesData.getCoaches}
              getOptionLabel={(option) => option.email}
              renderInput={(params) => <TextField {...params} label="Coach" variant="outlined"/>}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained" size="small" onClick={addLessonRequestHandle}>Create Request</Button>
          </DialogActions>
        </Dialog>
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
              <CardHeader title="Requested Lessons" action={<Button color="primary" variant="contained" size="small" onClick={() => setOpen(true)}>Request Lesson</Button>}/>
              <CardContent>
                <PerfectScrollbar>
                  <Box>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            Coach
                          </TableCell>
                          <TableCell sortDirection="desc">
                            <Tooltip
                              enterDelay={300}
                              title="Sort"
                            >
                              <TableSortLabel
                                active
                                direction="desc"
                              >
                                Date
                              </TableSortLabel>
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            Status
                          </TableCell>
                          <TableCell>
                            Actions
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {userLessonRequestsData.getUserPlayerLessonRequests.map(item => (
                          <TableRow
                            hover
                            key={item._id}
                          >
                            <TableCell>
                              {item.coach.firstname + " " + item.coach.lastname}
                            </TableCell>
                            <TableCell>
                              {moment.unix(item.createdAt / 1000).format('DD/MM/YYYY')}
                            </TableCell>
                            <TableCell>
                              <Chip
                                color="primary"
                                label={item.lesson ? 'completed' : item.isCancelled ? 'cancelled' : 'pending'}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              {item.lesson ? <Button onClick={() => navigate(`/app/lesson/${item.lesson._id}`, { replace: true })} variant="contained" size="small">View</Button> : item.isCancelled ? null : <Button variant="contained" size="small" onClick={() => cancelLessonRequestHandle(item._id)}>Cancel</Button>}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </PerfectScrollbar>
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
