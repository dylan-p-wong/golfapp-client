import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import AccountProfile from 'src/components/account/AccountProfile';
import AccountProfileDetails from 'src/components/account/AccountProfileDetails';
import SettingsPassword from 'src/components/settings/SettingsPassword';
import SettingsNotifications from 'src/components/settings/Notifications';
import AccountPlayerDetails from 'src/components/account/AccountPlayerDetails';
import AccountCourseDetails from 'src/components/account/AccountCourseDetails';
import AccountCoachDetails from 'src/components/account/AccountCoachDetails';
import { useMutation, useQuery } from '@apollo/client';
import { ME } from '../graphql/auth';
import { UPDATE_USER } from 'src/graphql/user';
import AccountTypeDetails from 'src/components/account/AccountTypeDetails';
import Spinner from 'src/components/spinner/Spinner';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Account = () => {
  const { loading, userError, data } = useQuery(ME);
  const [error, setError] = useState(null);
  const [updateUser, {loading: updateLoading, error: updateError, data: updateData}] = useMutation(UPDATE_USER, {
    onError: setError,
    onCompleted: () => toast("Account Updated")
  });

  if (loading) return <Spinner />
  if (userError) return <h1>Error</h1>

  if (error) {
    toast(error.message);
    setError(null);
  }

  const { coachInfoCompleted, playerInfoCompleted, createdAt, updatedAt, firstname, lastname, email, phone, hand, handicap, homeCourse, homeCourseCity, homeCourseProvince, homeCourseCountry, coachingCredentials, dateStartedCoaching, playerAccount, coachAccount } = data.userInfo;

  return (
  <>
    <Helmet>
      <title>Account</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Box mb={2}>
              <AccountProfile firstname={firstname} lastname={lastname} createdAt={createdAt} updatedAt={updatedAt}/>
            </Box>

            <AccountTypeDetails playerAccount={playerAccount} coachAccount={coachAccount} updateUser={updateUser} coachInfoCompleted={coachInfoCompleted} playerInfoCompleted={playerInfoCompleted}/>
            {/* <SettingsNotifications /> */}
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <Box mb={2}>
              <AccountProfileDetails firstname={firstname} lastname={lastname} email={email} phone={phone} updateUser={updateUser}/>
            </Box>
            <Box mb={2}>
              {playerAccount && <AccountPlayerDetails hand={hand} handicap={handicap} updateUser={updateUser}/>}
            </Box>
            <Box mb={2}>
              <AccountCourseDetails homeCourse={homeCourse} homeCourseCity={homeCourseCity} homeCourseProvince={homeCourseProvince} homeCourseCountry={homeCourseCountry} updateUser={updateUser}/>
            </Box>
            <Box mb={2}>
              {coachAccount && <AccountCoachDetails dateStartedCoaching={dateStartedCoaching} coachingCredentials={coachingCredentials} updateUser={updateUser}/>}
            </Box>
            <SettingsPassword updateUser={updateUser}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
)};

export default Account;
