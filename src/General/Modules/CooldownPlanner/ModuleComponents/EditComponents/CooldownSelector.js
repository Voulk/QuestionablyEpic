import React from "react";
import { TextField } from "@mui/material";
import { ThemeProvider, StyledEngineProvider, createTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import ClassCooldownMenuItems from "../../Menus/ClassCooldownMenuItems";

const selectMenu = createTheme({
  components: {
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
      styleOverrides: { selectMenu: { height: 20 } },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: 12,
        },
      },
    },
  },
  palette: {
    mode: "dark",
    primary: { main: "#d3bc47" },
    secondary: { main: "#e0e0e0" },
  },
});

export default function CooldownSelector(props, rowData, cooldown, nameClass) {
  const { t, i18n } = useTranslation();
  let data = { ...props.rowData };
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={selectMenu}>
        <TextField
          select
          value={rowData[cooldown] || props.value || ""}
          sx={{ lineHeight: "normal", width: "100%", textAlign: "left" }}
          size="small"
          onChange={(e) => {
            props.onChange(e.target.value);
          }}
        >
          {ClassCooldownMenuItems(data[nameClass]) || []}
        </TextField>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
