import { Helmet } from 'react-helmet';
import { AppBar, Tabs, Tab, Autocomplete, DialogActions, Dialog, DialogTitle, DialogContent, TextField, Box, Container, Grid, Card, CardHeader, Button, CardContent, Divider, Typography, Chip, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
import { useNavigate } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation, useQuery } from '@apollo/client';
import { USER_SWINGS } from 'src/graphql/swing';
import { CANCEL_LESSON_REQUEST, CREATE_LESSON_REQUEST, GET_USER_LESSONS_PLAYER, GET_USER_LESSON_REQUESTS_PLAYER } from 'src/graphql/lesson';
import moment from 'moment';
import { useState } from 'react';
import { GET_COACHES } from 'src/graphql/auth';
import PerfectScrollbar from 'react-perfect-scrollbar';
import LessonsTable from 'src/components/mygame/LessonsTable';
import LessonRequestsTable from 'src/components/mygame/LessonRequestsTable';
import SwingsTable from 'src/components/mygame/SwingsTable';
import Spinner from 'src/components/spinner/Spinner';
import { USER_COACHES } from 'src/graphql/user';
import CoachesList from 'src/components/coaches/CoachesList';

const MyGame = () => {
  const navigate = useNavigate();
  const { loading: userSwingsLoading, error: userSwingsError, data: userSwingsData } = useQuery(USER_SWINGS);
  const { loading: userLessonsLoading, error: userLessonsError, data: userLessonsData } = useQuery(GET_USER_LESSONS_PLAYER);
  const { loading: userLessonRequestsLoading, error: userLessonRequestsError, data: userLessonRequestsData } = useQuery(GET_USER_LESSON_REQUESTS_PLAYER);
  const { loading: coachesLoading, error: coachesError, data: coachesData} = useQuery(GET_COACHES);
  const { loading: userCoachesLoading, error: userCoachesError, data: userCoachesData} = useQuery(USER_COACHES);
  
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (coachesLoading || userSwingsLoading || userLessonsLoading || userLessonRequestsLoading || userCoachesLoading) return <Spinner />;
  if (coachesError || userSwingsError || userLessonsError || userLessonRequestsError || userCoachesError) return <h1>Error</h1>;

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
        <AppBar position="static" color="default">
            <Tabs
                value={value}
                onChange={handleChange}
                centered
                textColor="primary"
                indicatorColor="primary"
            >
                <Tab label="My Game"/>
                <Tab label="My Coaches"/>
                <Tab label="Find Coaches"/>
            </Tabs>
        </AppBar>
        <Grid
        mt={3}
        container
        spacing={3}
        >
          {
            value == 0 &&
            <>
              <Grid
                item
                xs={12}
                lg={4}
              >
                <SwingsTable swings={userSwingsData.userSwings}/>
              </Grid>
              <Grid
                item
                xs={12}
                lg={4}
              >
                <LessonRequestsTable lessonRequests={userLessonRequestsData.getUserPlayerLessonRequests} coaches={coachesData.getCoaches}/>
              </Grid>
              <Grid
                item
                xs={12}
                lg={4}
              >
                <LessonsTable lessons={userLessonsData.getUserPlayerLessons}/>
              </Grid>
            </>
          }
          
          {
            value == 1 &&
            <>
              <Grid xs={12}>
                <CoachesList coaches={userCoachesData.userCoaches}/>
              </Grid>
            </>
          }

          {
            value == 2 &&
            <>
              <Grid xs={12}>
                <CoachesList coaches={coachesData.getCoaches}/>
              </Grid>
            </>
          }
          
        </Grid>
      </Container>
    </Box>
  </>
)};

export default MyGame;
