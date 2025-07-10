import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#EFB73E" },
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
    MuiSelect: {
      defaultProps: {
        // The props to change the default for.
        MenuProps: {
          style: { marginTop: 5 },
          MenuListProps: {
            style: { paddingTop: 0, paddingBottom: 0 },
          },
          PaperProps: {
            style: {
              border: "1px solid rgba(255, 255, 255, 0.23)",
            },
          },
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        // The props to change the default for.
        SelectProps: {
          MenuProps: {
            style: { marginTop: 5 },
            MenuListProps: {
              style: { paddingTop: 0, paddingBottom: 0 },
            },
            PaperProps: {
              style: {
                border: "1px solid rgba(255, 255, 255, 0.23)",
              },
            },
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
          },
          fontSize: "16px",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          color: "#d3bc47",
          paddingLeft: 0,
          paddingRight: 0,
        },
        regular: {
          minHeight: 0,
          "@media (min-width: 600px)": {
            minHeight: "0px",
            paddingLeft: 0,
            paddingRight: 0,
          },
          gutters: { paddingLeft: 0, paddingRight: 0 },
        },
      },
    },
    // MuiToolbar: {
    //   styleOverrides: {
    //     root: {
    //       padding: "4px 4px 4px 4px",
    //       color: "#c8b054",
    //     },
    //     regular: {
    //       minHeight: 0,
    //       "@media (min-width: 600px)": {
    //         minHeight: "0px",
    //       },
    //     },
    //   },
    // },
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
});
