import { createTheme, adaptV4Theme } from "@mui/material/styles";

export const theme = createTheme(
  //   adaptV4Theme
  {
    palette: {
      mode: "dark",
      primary: { main: "#F2BF59" },
      secondary: { main: "#525252" },
    },
    components: {
      // Name of the component
      MuiPaper: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            backgroundColor: "#424242",
            backgroundImage: null,
          },
        },
      },
      MuiAppBar: { styleOverrides: { root: { backgroundImage: null } } },
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
    },
  },
);
