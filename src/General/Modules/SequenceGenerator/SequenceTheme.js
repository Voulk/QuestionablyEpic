import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const sequenceTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#F2BF59" },
    secondary: { main: "#525252" },
    background: { paper: "#424242", default: "#121212" },
    white: { main: "#fff", contrastText: "#000" },
    black: { main: "#000", contrastText: "#fff" },
  },
  components: {
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: 90,
        //   height: 36,
          "&.Mui-expanded": {
            minHeight: 90,
            // height: 36,
          },
        },
        content: {
          margin: "0px 0px",
          "&.Mui-expanded": {
            margin: "0px 0px",
          },
        },
      },
    },
  },
});
