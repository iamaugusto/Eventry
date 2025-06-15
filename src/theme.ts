import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6e48aa",
    },
    secondary: {
      main: "#9d50bb",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  // You can add more customizations here
});

export default theme;
