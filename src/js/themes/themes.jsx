import { createMuiTheme } from "@material-ui/core/styles";
import yellow from "@material-ui/core/colors/Yellow";
import blueGrey from "@material-ui/core/colors/blueGrey";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: yellow,
    secondary: blueGrey
  },
  spacing: {
    unit: 40
  }
});

export default theme;
