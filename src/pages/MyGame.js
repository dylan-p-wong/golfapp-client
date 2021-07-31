import { Helmet } from 'react-helmet';
import { Autocomplete, DialogActions, Dialog, DialogTitle, DialogContent, TextField, Box, Container, Grid, Card, CardHeader, Button, CardContent, Divider, Typography, Chip, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
import { useNavigate } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation, useQuery } from '@apollo/client';
import { USER_SWINGS } from 'src/graphql/swing';
import { CANCEL_LESSON_REQUEST, CREATE_LESSON_REQUEST, GET_USER_LESSONS_PLAYER, GET_USER_LESSON_REQUESTS_PLAYER } from 'src/graphql/lesson';
import moment from 'moment';
import { useState } from 'react';
import { GET_COACHES } from 'src/graphql/auth';
import PerfectScrollbar from 'react-perfect-scrollbar';
import LessonsTable from 'src/components/mycoaching/LessonsTable';
import LessonRequestsTable from 'src/components/mygame/LessonRequestsTable';
import SwingsTable from 'src/components/mygame/SwingsTable';

const MyGame = () => {
  const navigate = useNavigate();
  const { loading: userSwingsLoading, error: userSwingsError, data: userSwingsData } = useQuery(USER_SWINGS);
  const { loading: userLessonsLoading, error: userLessonsError, data: userLessonsData } = useQuery(GET_USER_LESSONS_PLAYER);
  const { loading: userLessonRequestsLoading, error: userLessonRequestsError, data: userLessonRequestsData } = useQuery(GET_USER_LESSON_REQUESTS_PLAYER);
  const { loading: coachesLoading, error: coachesError, data: coachesData} = useQuery(GET_COACHES);

  if (coachesLoading || userSwingsLoading || userLessonsLoading || userLessonRequestsLoading) return <h1>Loading...</h1>;
  if (coachesError || userSwingsError || userLessonsError || userLessonRequestsError) return <h1>Error</h1>;

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
            <SwingsTable swings={userSwingsData.userSwings}/>
          </Grid>
          <Grid
            item
            xs={4}
          >
            <LessonRequestsTable lessonRequests={userLessonRequestsData.getUserPlayerLessonRequests} coaches={coachesData.getCoaches}/>
          </Grid>
          <Grid
            item
            xs={4}
          >
            <LessonsTable lessons={userLessonsData.getUserPlayerLessons}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
)};

export default MyGame;
