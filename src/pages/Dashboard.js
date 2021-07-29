import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import Budget from 'src/components/dashboard//Budget';
import LatestOrders from 'src/components/dashboard//LatestOrders';
import LatestProducts from 'src/components/dashboard//LatestProducts';
import TasksProgress from 'src/components/dashboard//TasksProgress';
import TotalCustomers from 'src/components/dashboard//TotalCustomers';
import TotalProfit from 'src/components/dashboard//TotalProfit';
import LessonsTaught from 'src/components/dashboard/LessonsTaught';
import LessonsRecieved from 'src/components/dashboard/LessonsRecieved';
import TotalSwings from 'src/components/dashboard/TotalSwings';
import Messages from 'src/components/dashboard/Messages';

const Dashboard = () => (
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
            <LessonsRecieved sx={{ height: '100%' }}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCustomers sx={{ height: '100%' }}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalSwings />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <LessonsTaught sx={{ height: '100%' }} />
          </Grid>

          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            {/* <LatestProducts sx={{ height: '100%' }} /> */}
            <img src="/static/images/sky_on_course.jpg" width={380}>
            </img>

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
);

export default Dashboard;
