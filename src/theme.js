import { createTheme } from "@mui/material/styles";

export const theme = createTheme(
  //   adaptV4Theme
  {
    palette: {
      mode: "dark",
      primary: { main: "#F2BF59" },
      secondary: { main: "#525252" },
      background: { paper: "#424242", default: "#121212" },
      white: { main: "#fff", contrastText: "#000" },
      black: { main: "#000", contrastText: "#fff" },
    },
    components: {
      // Name of the component
      MuiPaper: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            backgroundImage: "unset", // Disables MUI5's new elevation gradients
          },
        },
      },
      // MuiAppBar: { styleOverrides: { root: { backgroundImage: "unset" } } },
      MuiToolbar: {
        styleOverrides: {
          root: {
            padding: "4px 4px 4px 4px",
            color: "#c8b054",
          },
          regular: {
            minHeight: 0,
            "@media (min-width: 600px)": {
              minHeight: "0px",
            },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            minHeight: 36,
            height: 36,
            "&.Mui-expanded": {
              minHeight: 36,
              height: 36,
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
      MuiSlider: {
        styleOverrides: {
          markLabel: {
            width: 70,
            whiteSpace: "normal",
            textAlign: "center",
            color: "#fff",
          },
          markLabelActive: {
            color: "#F2BF59",
          },
        },
      },
    },
  },
);
