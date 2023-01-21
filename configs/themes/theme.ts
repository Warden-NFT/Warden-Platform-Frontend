import { createTheme } from '@mui/material'

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
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
      'sans-serif'
    ].join()
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#000'
    },
    secondary: {
      main: '#C397FE'
    },
    info: {
      main: '#faf8ff'
    }
  }
})

export default theme
