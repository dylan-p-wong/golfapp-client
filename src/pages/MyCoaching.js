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
import LessonsTable from 'src/components/mycoaching/LessonsTable';
import LessonRequestsTable from 'src/components/mycoaching/LessonRequestsTable';

const MyCoaching = () => {
  const { loading: coachLessonsLoading, error: coachLessonsError, data: coachLessonsData } = useQuery(GET_USER_LESSONS_COACH);
  const { loading : coachLessonRequestsLoading, error : coachLessonRequestsError, data : coachLessonRequestsData } = useQuery(GET_USER_LESSON_REQUESTS_COACH);
  const { loading : usersLoading, error : usersError, data : usersData } = useQuery(GET_USERS);

  if (usersLoading || coachLessonsLoading || coachLessonRequestsLoading) return <h1>Loading...</h1>
  if (usersError || coachLessonsError || coachLessonRequestsError) return <h1>Error</h1>

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
            xs={6}
          >
            <LessonRequestsTable lessonRequests={coachLessonRequestsData.getUserCoachLessonRequests} players={usersData.getUsers}/>
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
            <LessonsTable lessons={coachLessonsData.getUserCoachLessons} />
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
