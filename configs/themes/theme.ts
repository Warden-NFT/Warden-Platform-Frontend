import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Kanit',
      'sans-serif',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ].join(),
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#2E85FE',
    },
    secondary: {
      main: '#C397FE',
    },
    info: {
      main: '#efefef',
    },
  },
});

export default theme;
