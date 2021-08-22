import { useQuery } from '@apollo/client';
import {
  Box, Button, Container,
  Grid, Typography
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import Activity from 'src/components/dashboard/Activity';
import LessonsRecieved from 'src/components/dashboard/LessonsRecieved';
import LessonsTaught from 'src/components/dashboard/LessonsTaught';
import Messages from 'src/components/dashboard/Messages';
import TotalStudents from 'src/components/dashboard/TotalStudents';
import TotalSwings from 'src/components/dashboard/TotalSwings';
import Spinner from 'src/components/spinner/Spinner';
import { ME } from 'src/graphql/auth';
import { USER_TOTALS } from 'src/graphql/user';

const Dashboard = () => {
  const { loading: userLoading, error: userError, data: userData } = useQuery(ME); 
  const { error, loading, data} = useQuery(USER_TOTALS);
  const navigate = useNavigate();

  if (loading || userLoading) return <Spinner />
  if (error || userError) return <h1>Error</h1>
  
  return (
  <>
    <Helmet>
      <title>Dashboard</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Box mb={3} display="flex" flexDirection="row">
            <Typography flexGrow={1} variant='h3' >Dashboard</Typography>
            {userData.userInfo.playerAccount && <Button variant="contained" onClick={() => navigate(`/app/mygame`, { replace: true })}>My Game</Button>}
            {userData.userInfo.coachAccount && <Button style={{ marginLeft: 5 }} variant="contained" onClick={() => navigate(`/app/mycoaching`, { replace: true })}>My Coaching</Button>}
        </Box>
        <Grid
          container
          spacing={3}
        >
          {
            userData.userInfo.playerAccount && 
            <>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <LessonsRecieved sx={{ height: '100%' }} total={data.userTotals.totalLessonsRecieved} month={data.userTotals.lessonsRecievedThisMonth}/>
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalSwings total={data.userTotals.totalSwings} month={data.userTotals.swingsThisMonth}/>
            </Grid>
            </>
          }

          {
            userData.userInfo.coachAccount &&
            <>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <LessonsTaught sx={{ height: '100%' }} total={data.userTotals.totalLessons} month={data.userTotals.lessonsThisMonth}/>
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalStudents total={data.userTotals.totalStudents} sx={{ height: '100%' }}/>
            </Grid>
            </>
          }
          
          
          </Grid>
          <Grid
            mt={3}
            container
            spacing={3}
          >
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <Activity sx={{ height: '100%' }}/>
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Messages />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
)};

export default Dashboard;
