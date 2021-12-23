import { createTheme } from "@mui/material/styles";

export const CooldownPlannerTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#d3bc47" },
    secondary: { main: "#e0e0e0" },
  },
  components: {
    // Name of the component
    MuiPaper: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: "#424242",
          backgroundImage: "unset", // Disables MUI5's new elevation gradients
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          backgroundColor: "#343434",
          lineHeight: "36px",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "4px",
          borderBottom: "1px solid #595959",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: "4px",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: { color: "#345" },
        regular: {
          minHeight: 0,
          "@media (min-width: 600px)": {
            minHeight: "0px",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: 12,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: { padding: 10 },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        regular: {
          minHeight: 0,
          "@media (min-width: 600px)": {
            minHeight: "0px",
          },
        },
      },
    },
  },
});
