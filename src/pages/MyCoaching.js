import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Card, CardHeader, Button, CardContent, Dialog, DialogContent, DialogTitle, DialogActions, Autocomplete, TextField } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import customers from 'src/__mocks__/customers';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import users from '../__mocks__/customers';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USERS } from 'src/graphql/auth';
import { CREATE_LESSON, GET_USER_LESSONS_COACH } from 'src/graphql/lesson';
import { Navigate } from 'react-router-dom';

const MyCoaching = () => {
  const navigate = useNavigate();
  const { loading: coachLessonsLoading, error: coachLessonsError, data: coachLessonsData } = useQuery(GET_USER_LESSONS_COACH);
  const { loading : usersLoading, error : usersError, data : usersData } = useQuery(GET_USERS);
  const [createLesson, { loading : lessonLoading, error : lessonError, data : lessonData }] = useMutation(CREATE_LESSON);

  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  if (usersLoading || lessonLoading || coachLessonsLoading) return <h1>Loading...</h1>
  if (usersError || lessonError || coachLessonsError) return <h1>Error</h1>

  if (lessonData) {
    return <Navigate to={`/app/lesson/add/${lessonData.createLesson._id}`} />
  }

  const addLessonHandle = () => {
    createLesson({ variables: { playerId: selectedUser._id }});
  }

  console.log(coachLessonsData)

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
            xs={4}
          >
            <Card>
            <CardHeader title="Lesson Requests" action={<Button color="primary" variant="contained" size="small" onClick={() => setOpen(true)}>Create Lesson</Button>}/>
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
            <CardHeader title="Drills" action={<Button color="primary" variant="contained" size="small" onClick={() => navigate('/app/swing/add', { replace: true })}>Create Drill</Button>}/>
              <CardContent>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={4}
          >
            <Card>
              <CardHeader title="Past Lessons"/>
              <CardContent>
                { coachLessonsData.getUserCoachLessons.map(item => {
                  return (
                    <Box m={2} key={item._id} onClick={() => navigate(`/app/lesson/${item._id}`, { replace: true })}>
                      <Card>
                        <CardHeader title={item.player.firstname + " " + item.player.lastname} subheader={item.date}/>
                      </Card>
                    </Box>
                  )
                })}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <CustomerListResults customers={customers}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
)};

export default MyCoaching;
