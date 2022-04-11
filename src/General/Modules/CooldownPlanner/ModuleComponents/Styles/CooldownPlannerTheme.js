import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const CooldownPlannerTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#d3bc47" },
    secondary: { main: "#e0e0e0" },
    delete: { main: "#FF0000", contrastText: "#fff" },
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
  },
});

export const deleteTheme = createTheme({
  palette: {
    primary: red,
  },
});
