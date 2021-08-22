import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#F4F6F8',
      paper: colors.common.white
    },
    primary: {
      contrastText: '#FAF9F6',
      main: '#5d755d'
    },
    pending: {
      contrastText: '#000000',
      main: '#eff5ab'
    }, 
    text: {
      primary: '#172b4d',
      secondary: '#6b778c'
    },
  },
  shadows,
  typography,
});

export default theme;
