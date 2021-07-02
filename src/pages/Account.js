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

const Account = () => (
  <>
    <Helmet>
      <title>Account | Material Kit</title>
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
              <AccountProfile />
            </Box>

            <SettingsNotifications />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <Box mb={2}>
              <AccountProfileDetails />
            </Box>
            <SettingsPassword />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Account;
