import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { deepPurple, amber } from "@mui/material/colors";

let theme = createTheme({
  palette: {
    primary: {
      main: '#009FA9',
    },
    secondary: {
      main: 'rgb(19, 23, 42)',
    }
  },
});

theme = responsiveFontSizes(theme);

export default theme;