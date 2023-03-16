import { createTheme } from "@mui/material"

const theme = createTheme({
  typography: {
    fontFamily: [
      "Montserrat",
      "sans-serif",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      "sans-serif"
    ].join(),
    fontSize: 13
  },
  palette: {
    mode: "light",
    primary: {
      main: "#000"
    },
    secondary: {
      main: "#C397FE"
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  }
})

export default theme
