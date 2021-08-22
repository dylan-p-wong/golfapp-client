import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Card,
  CardContent,
  Hidden,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { useMutation, useApolloClient, useQuery } from '@apollo/client';
import { LOGOUT } from '../graphql/auth';
import { USER_TIER_INFO } from 'src/graphql/user';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const client = useApolloClient();
  const navigate = useNavigate();
  const [notifications] = useState([]);
  const [logout, {}] = useMutation(LOGOUT);
  const { loading, error, data } = useQuery(USER_TIER_INFO);

  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <img height={50} src="/static/images/logo.png"/>
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Box mr={1}>
          <Card>
            <Box m={1}>
              <Typography fontSize={10} color="primary">{loading ? '-' : data.userTier.playerTier.tier} Player Plan</Typography>
              <Typography fontSize={12}>{loading ? '-' : data.userTier.playerTier.swingsThisMonth}/{loading ? '-' : data.userTier.playerTier.swingUploadsPerMonth} Swings uploaded</Typography>
            </Box>
          </Card>
        </Box>
        <Card>
          <Box m={1}>
            <Typography fontSize={10} color="primary">{loading ? '-' : data.userTier.coachTier.tier} Coach Plan</Typography>
            <Typography fontSize={12}>{loading ? '-' : data.userTier.coachTier.lessonsThisMonth}/{loading ? '-' : data.userTier.coachTier.lessonsPerMonth} Lessons created</Typography>
          </Box>
        </Card>
        <Hidden lgDown>
          {/* <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <IconButton color="inherit">
            <InputIcon onClick={async () => {
              await logout(); 
              await client.resetStore(); 
              navigate('/login', { replace: true });
              }}
            />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
