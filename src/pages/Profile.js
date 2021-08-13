import { Helmet } from 'react-helmet';
import { Box, Avatar, Container, Grid, Card, TextField, CardHeader, Button, CardContent, Typography, Divider } from '@material-ui/core';
import { Outlet, useParams } from 'react-router';
import StarIcon from '@material-ui/icons/Star';
import { useQuery } from '@apollo/client';
import { ME } from 'src/graphql/auth';
import moment from 'moment';

const ProfilePage = () => {
  const { _id } = useParams();

  const { loading, error, data } = useQuery(ME);

  if (loading) return <Spinner />
  if (error) return <h1>Error</h1>

  const { firstname, lastname, email, phone, homeCourse, homeCourseCity, homeCourseProvince, homeCourseCountry, hand, handicap, coachingCredentials, dateStartedCoaching, playerAccount, coachAccount, playerInfoCompleted, coachInfoCompleted } = data.userInfo;

  return (
  <>
    <Helmet>
      <title>Profile | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Box mb={3} p={2} display="flex" flexDirection="row">
          <Typography variant='h2' flexGrow={1}>Profile</Typography>
        </Box>
        <Divider />

        <Grid
        container
        spacing={3}
        >
          <Grid item xs={2}></Grid>
          <Grid
            item
            xs={8}
          >
            <Card>
              <Box justifyContent="center" display="flex" alignItems="center" alignContent="center" flexDirection="column" p={7}>
                <Avatar style={{ height: '70px', width: '70px' }} src="">
                  DW
                </Avatar>
                <Typography variant="h2">{`${firstname} ${lastname}`}</Typography>
                <Typography>{email}</Typography>
                <Typography>{phone}</Typography>
                <Typography>{`${homeCourse}, ${homeCourseCity}, ${homeCourseProvince}, ${homeCourseCountry}`}</Typography>
                <Typography>{ playerAccount && coachAccount ? `Player - ${playerInfoCompleted ? "Verified" : "Unverified"} | Coach - ${coachInfoCompleted ? "Verified" : "Unverified"}` : coachAccount ? `Coach - ${coachInfoCompleted ? "Verified" : "Unverified"}` : playerAccount ? `Player - ${playerInfoCompleted ? "Verified" : "Unverified"}` : null }</Typography>
                {/* <Box sx={{ width: '60%'}}>
                  <TextField 
                      fullWidth
                      placeholder="Common misses"
                      multiline
                      rows={6}
                      disabled
                      value={"Common misses"}
                  />
                </Box> */}
              </Box> 
            </Card>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid
            item
            xs={6}
          >
            <Card sx={{ height: '100%' }}>
              <Box justifyContent="center" display="flex" alignItems="center" alignContent="center" flexDirection="column" p={7}>
              <Box m={1} display="flex" flexDirection="row" alignItems="center" sx={{ width: '80%'}}>
                  <Box flexGrow={1}>
                    <Typography>Hand</Typography>
                  </Box>
                  <Box>
                    <Typography>{hand}</Typography>
                  </Box>
                </Box>
                {/* <Box m={1} display="flex" flexDirection="row" alignItems="center" sx={{ width: '80%'}}>
                  <Box flexGrow={1}>
                    <Typography>Lessons Taken</Typography>
                  </Box>
                  <Typography>21</Typography>
                </Box>
                <Box m={1} display="flex" flexDirection="row" alignItems="center" sx={{ width: '80%'}}>
                  <Box flexGrow={1}>
                    <Typography>Swings</Typography>
                  </Box>
                  <Typography>{handicap}</Typography>
                </Box> */}
                <Box m={1} display="flex" flexDirection="row" alignItems="center" sx={{ width: '80%'}}>
                  <Box flexGrow={1}>
                    <Typography>Handicap</Typography>
                  </Box>
                  <Typography>{handicap}</Typography>
                </Box>
              </Box> 
            </Card>
          </Grid>
          <Grid
            item
            xs={6}
          >
            <Card sx={{ height: '100%' }}>
              <Box justifyContent="center" display="flex" alignItems="center" alignContent="center" flexDirection="column" p={7}>
                <Box m={1} display="flex" flexDirection="row" alignItems="center" sx={{ width: '80%'}}>
                  <Box flexGrow={1}>
                    <Typography>Coaching Credentials</Typography>
                  </Box>
                  <Box>
                    <Typography>{coachingCredentials}</Typography>
                  </Box>
                </Box>
                <Box m={1} display="flex" flexDirection="row" alignItems="center" sx={{ width: '80%'}}>
                  <Box flexGrow={1}>
                    <Typography>Year Started Coaching</Typography>
                  </Box>
                  <Box>
                    <Typography>{moment.unix(dateStartedCoaching / 1000).format('YYYY')}</Typography>
                  </Box>
                </Box>
                {/* <Box m={1} display="flex" flexDirection="row" alignItems="center" sx={{ width: '80%'}}>
                  <Box flexGrow={1}>
                    <Typography>Lessons Taught</Typography>
                  </Box>
                  <Typography>21</Typography>
                </Box>
                <Box m={1} display="flex" flexDirection="row" alignItems="center" sx={{ width: '80%'}}>
                  <Box flexGrow={1}>
                    <Typography>Lessons Taught</Typography>
                  </Box>
                    <Typography>21</Typography>
                </Box> */}
              </Box> 
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
)};

export default ProfilePage;
