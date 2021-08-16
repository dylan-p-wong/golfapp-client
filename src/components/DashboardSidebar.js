import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  Typography
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  LogOut as LogOutIcon
} from 'react-feather';
import NavItem from './NavItem';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import SchoolIcon from '@material-ui/icons/School';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { LOGOUT, ME } from '../graphql/auth';
import getInitials from 'src/utils/getInitials';
import CardMembershipIcon from '@material-ui/icons/CardMembership';

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard',
    player: true,
    coach: true
  },
  {
    href: '/app/mygame',
    icon: GolfCourseIcon,
    title: 'My Game',
    player: true,
    coach: false
  },
  {
    href: '/app/mycoaching',
    icon: SchoolIcon,
    title: 'My Coaching',
    player: false,
    coach: true
  },
  {
    href: '/app/subscription',
    icon: CardMembershipIcon,
    title: 'My Subscription',
    player: true,
    coach: true
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account',
    player: true,
    coach: true
  }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const client = useApolloClient();
  const location = useLocation();
  const { loading, error, data } = useQuery(ME);
  const [logout, {}] = useMutation(LOGOUT, {
    onCompleted: async () => {
      await client.resetStore();
    }
  });

  if (loading) return;
  if (error) return;

  const filteredItems = items.filter(item => {
    return (item.player ? data.userInfo.playerAccount : false) || (item.coach ? data.userInfo.coachAccount : false);
  });

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        {
          
        }
        <Avatar
          component={RouterLink}
          src={data.userInfo.avatar}
          sx={{
            cursor: 'pointer',
          }}
          to="/app/account"
        >
          {getInitials(data.userInfo.firstname + " " + data.userInfo.lastname)}
        </Avatar>
        {
          
          data && data.userInfo ? 
          <Box>
            
            <Typography
              color="textPrimary"
              variant="h5"
              align="center"
            >
              {data.userInfo.firstname + " " + data.userInfo.lastname}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
              align="center"
            >
              { data.userInfo.playerAccount && data.userInfo.coachAccount ? "Player | Coach" : data.userInfo.coachAccount ? "Coach" : data.userInfo.playerAccount ? "Player" : null }
            </Typography>
          </Box> : null
        }
        
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {filteredItems.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
          <NavItem
              href={'/logout'}
              key={'Logout'}
              title={'Logout'}
              icon={LogOutIcon}
              onClick={logout}
            />
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      {/* <Box
        sx={{
          backgroundColor: 'background.default',
          m: 2,
          p: 2
        }}
      >
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          Want to upload more swings?
        </Typography>
        <Typography
          align="center"
          variant="body2"
        >
          Upgrade your subscription
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          <Button
            color="primary"
            component="a"
            href="/app/subscription"
            variant="contained"
          >
            View Subscriptions
          </Button>
        </Box>
      </Box> */}
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
