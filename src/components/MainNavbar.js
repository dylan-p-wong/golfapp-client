import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Button, Hidden, Toolbar, Box } from '@material-ui/core';

const MainNavbar = (props) => (
  <AppBar
    elevation={0}
    {...props}
  >
    <Toolbar sx={{ height: 64 }}>
      <RouterLink to="/">
        <img height={50} src="/static/images/logo.png"/>
      </RouterLink>
      <Box sx={{ flexGrow: 1 }} />
      <Box mr={1}>
        <RouterLink to="/login">
          <Button variant="outlined" style={{ backgroundColor: '#F5F5F5'}}>Login</Button>
        </RouterLink>
      </Box>
      <RouterLink to="/register">
        <Button variant="outlined" style={{ backgroundColor: '#F5F5F5'}}>Sign up</Button>
      </RouterLink>      
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
