import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Card, CardHeader, Button, CardContent, Dialog, DialogContent, DialogTitle, DialogActions, Autocomplete, TextField, Divider, Typography, Chip, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import customers from 'src/__mocks__/customers';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import users from '../__mocks__/customers';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USERS } from 'src/graphql/auth';
import { ADD_LESSON_TO_LESSON_REQUEST, CREATE_LESSON, GET_USER_LESSONS_COACH, GET_USER_LESSON_REQUESTS_COACH } from 'src/graphql/lesson';
import { Navigate } from 'react-router-dom';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';

const MyCoaching = () => {
  const navigate = useNavigate();
  const { loading: coachLessonsLoading, error: coachLessonsError, data: coachLessonsData } = useQuery(GET_USER_LESSONS_COACH);
  const { loading : usersLoading, error : usersError, data : usersData } = useQuery(GET_USERS);
  const { loading : coachLessonRequestsLoading, error : coachLessonRequestsError, data : coachLessonRequestsData } = useQuery(GET_USER_LESSON_REQUESTS_COACH);
  const [createLesson, { loading : lessonLoading, error : lessonError, data : lessonData }] = useMutation(CREATE_LESSON);
  const [addLessonToLessonRequest, { loading: addLessonToLessonRequestLoading, error: addLessonToLessonRequestError, data: addLessonToLessonRequestData }] = useMutation(ADD_LESSON_TO_LESSON_REQUEST);
  const [title, setTitle] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  if (usersLoading || lessonLoading || coachLessonsLoading || coachLessonRequestsLoading || addLessonToLessonRequestLoading) return <h1>Loading...</h1>
  if (usersError || lessonError || coachLessonsError || coachLessonRequestsError || addLessonToLessonRequestError) return <h1>Error</h1>

  if (lessonData) {
    return <Navigate to={`/app/lesson/add/${lessonData.createLesson._id}`} />
  }

  const addLessonHandle = async () => {
    await createLesson({ variables: { playerId: selectedUser._id, title }});
  }

  const addLessonToLessonRequestHandle = async (item) => {
    const { data, error, loading } = await createLesson({ variables: { playerId: item.player._id, title: item.note }});
    await addLessonToLessonRequest({ variables: { lessonId: data.createLesson._id, lessonRequestId: item._id }});
  }

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
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
        >
          <DialogTitle>{"Select Student"}</DialogTitle>
          <DialogContent>
            <TextField fullWidth label="Title" placeholder="Note title" onChange={e => setTitle(e.target.value)}/>
            <Autocomplete
              onChange={(event, newValue) => { setSelectedUser(newValue) }}
              style={{ width: 300 }} 
              options={usersData.getUsers}
              getOptionLabel={(option) => option.email}
              renderInput={(params) => <TextField {...params} label="Student" variant="outlined"/>}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained" size="small" onClick={addLessonHandle}>Create Lesson</Button>
          </DialogActions>
        </Dialog>
        <Grid
        container
        spacing={3}
        >
          <Grid
            item
            xs={6}
          >
            <Card>
            <CardHeader title="Lesson Requests" action={<Button color="primary" variant="contained" size="small" onClick={() => setOpen(true)}>Create Lesson</Button>}/>
              <CardContent>
                <PerfectScrollbar>
                  <Box>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            Player
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
                        {coachLessonRequestsData.getUserCoachLessonRequests.map(item => (
                          <TableRow
                            hover
                            key={item._id}
                          >
                            <TableCell>
                              {item.player.firstname + " " + item.player.lastname}
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
                              {item.lesson ? <Button onClick={() => navigate(`/app/lesson/${item.lesson._id}`, { replace: true })} variant="contained" size="small">View</Button> : !item.isCancelled ? <Button variant="contained" size="small" onClick={() => addLessonToLessonRequestHandle(item)}>Create Lesson</Button> : null}
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
          {/* <Grid
            item
            xs={4}
          >
            <Card>
            <CardHeader title="Drills" action={<Button color="primary" variant="contained" size="small" onClick={() => navigate('/app/swing/add', { replace: true })}>Create Drill</Button>}/>
              <CardContent>
              </CardContent>
            </Card>
          </Grid> */}
          <Grid
            item
            xs={6}
          >
            <Card>
              <CardHeader title="Past Lessons"/>
              <CardContent>
                { coachLessonsData.getUserCoachLessons.map(item => {
                  return (
                    <Box m={2} key={item._id} onClick={() => navigate(`/app/lesson/${item._id}`, { replace: true })}>
                      <Card>
                        <CardHeader title={item.title + " - " + item.player.firstname + " " + item.player.lastname}/>
                        <Divider />
                        <Box p={1} display="flex" alignItems="center">
                            <Typography align="left" variant="body2" color="textSecondary" pl={1}>{moment.unix(item.createdAt / 1000).format('MMMM Do YYYY')}</Typography>
                        </Box>
                      </Card>
                    </Box>
                  )
                })}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            {/* <CustomerListResults customers={customers}/> */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
)};

export default MyCoaching;
