import { Helmet } from 'react-helmet';
import { AppBar, Tabs, Tab, Box, Container, Grid, Card, CardHeader, Button, CardContent, Dialog, DialogContent, DialogTitle, DialogActions, Autocomplete, TextField, Divider, Typography, Chip, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
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
import Spinner from 'src/components/spinner/Spinner';
import { USER_STUDENTS } from 'src/graphql/user';
import StudentsList from 'src/components/students/StudentsList';

const MyCoaching = () => {
  const { loading: coachLessonsLoading, error: coachLessonsError, data: coachLessonsData } = useQuery(GET_USER_LESSONS_COACH);
  const { loading : coachLessonRequestsLoading, error : coachLessonRequestsError, data : coachLessonRequestsData } = useQuery(GET_USER_LESSON_REQUESTS_COACH);
  const { loading : usersLoading, error : usersError, data : usersData } = useQuery(GET_USERS);
  const { loading : studentsLoading, error : studentsError, data : studentsData } = useQuery(USER_STUDENTS);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (usersLoading || coachLessonsLoading || coachLessonRequestsLoading || studentsLoading) return <Spinner />;
  if (usersError || coachLessonsError || coachLessonRequestsError || studentsError) return <h1>Error</h1>;

  return (
  <>
    <Helmet>
      <title>My Coaching</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <AppBar position="static" color="default">
          <Tabs
              value={value}
              onChange={handleChange}
              centered
              textColor="primary"
              indicatorColor="primary"
          >
              <Tab label="My Game"/>
              <Tab label="My Students"/>
          </Tabs>
        </AppBar>
        
        <Grid
        container
        spacing={3}
        mt={3}
        >
          {
          value == 0 &&
          <>
            <Grid
              item
              xs={12}
              lg={6}
            >
              <LessonRequestsTable lessonRequests={coachLessonRequestsData.getUserCoachLessonRequests} players={usersData.getUsers}/>
            </Grid>
            <Grid
              item
              xs={12}
              lg={6}
            >
              <LessonsTable lessons={coachLessonsData.getUserCoachLessons} />
            </Grid>
          </>
        }
        {
          value == 1 &&
          <Grid item xs={12}>
            <StudentsList students={studentsData.userStudents} players={usersData.getUsers}/>
          </Grid>
        }         
        </Grid>
      </Container>
    </Box>
  </>
)};

export default MyCoaching;
