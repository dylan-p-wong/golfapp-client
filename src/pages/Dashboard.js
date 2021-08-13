import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Button,
  Typography
} from '@material-ui/core';
import Budget from 'src/components/dashboard//Budget';
import LatestOrders from 'src/components/dashboard//LatestOrders';
import LatestProducts from 'src/components/dashboard//LatestProducts';
import TasksProgress from 'src/components/dashboard//TasksProgress';
import TotalStudents from 'src/components/dashboard//TotalCustomers';
import TotalProfit from 'src/components/dashboard//TotalProfit';
import LessonsTaught from 'src/components/dashboard/LessonsTaught';
import LessonsRecieved from 'src/components/dashboard/LessonsRecieved';
import TotalSwings from 'src/components/dashboard/TotalSwings';
import Messages from 'src/components/dashboard/Messages';
import Activity from 'src/components/dashboard/Activity';
import { useQuery } from '@apollo/client';
import { USER_TOTALS } from 'src/graphql/user';
import Spinner from 'src/components/spinner/Spinner';

const Dashboard = () => {

  const { error, loading, data} = useQuery(USER_TOTALS);

  if (loading) return <Spinner />
  if (error) return <h1>Error</h1>

  console.log(data);
  
  return (
  <>
    <Helmet>
      <title>Dashboard | Material Kit</title>
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
            <Button variant="contained">My Game</Button>
            <Button variant="contained">My Coaching</Button>
        </Box>
        <Grid
          container
          spacing={3}
        >
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
            <TotalStudents sx={{ height: '100%' }}/>
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
