import React from "react";
import { TextField, MenuItem } from "@mui/material";
import ls from "local-storage";
import { ThemeProvider, StyledEngineProvider, createTheme } from "@mui/material/styles";
import { classColoursJS } from "../Functions/ClassColourFunctions";
import classIcons from "../Functions/IconFunctions/ClassIcons";
import { useTranslation } from "react-i18next";

const selectMenu = createTheme({
  components: {
    MuiTextField: { styleOverrides: { selectMenu: { height: 20 } } },
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

export default function HealerSelector(props, name, nameClass, cooldown) {
  const { t, i18n } = useTranslation();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={selectMenu}>
        <TextField
          value={props.value}
          select
          label={t("Name")}
          labelId="HealerSelector"
          size="small"
          onChange={(e) => {
            /* ------------------------------ Spread the rows data for updating ----------------------------- */
            let data = { ...props.rowData };
            /* -------------------- Set the name of the row to the selected from dropdown ------------------- */
            data[name] = e.target.value;
            /* --------------------- Update the class from the healerinfo local storage --------------------- */
            data[nameClass] = ls
              .get("healerInfo")
              .filter((obj) => {
                return obj.name === e.target.value;
              })
              .map((obj) => obj.class)
              .toString();
            /* ------------------------------- Reset the cooldown for the row ------------------------------- */
            data[cooldown] = undefined;
            /* --------------------------------------- Update the data -------------------------------------- */
            props.onRowDataChange(data);
          }}
        >
          {/* ----- Map Healer Names from the healerInfo local storage (created from Heal Team Module) ----- */}
          {ls.get("healerInfo").map((key, i) => (
            <MenuItem divider style={{ color: classColoursJS(key.class) }} key={key.name} value={key.name}>
              <div style={{ display: "inline-flex", alignItems: "center", width: "100%" }}>
                {classIcons(key.class, { height: 20, width: 20, padding: "0px 5px 0px 5px", verticalAlign: "middle" })}
                {key.name}
              </div>
            </MenuItem>
          ))}
          <MenuItem key={"remove"} value={""}>
            {/* // TODO Translate */}
            Remove
          </MenuItem>
        </TextField>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
