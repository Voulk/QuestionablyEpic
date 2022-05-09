import React from "react";
import { TextField, MenuItem } from "@mui/material";
import ls from "local-storage";
import { ThemeProvider, StyledEngineProvider, createTheme } from "@mui/material/styles";
import { classColoursJS } from "../../Functions/ClassColourFunctions";
import classIcons from "../../Functions/IconFunctions/ClassIcons";
import { useTranslation } from "react-i18next";
import ClearIcon from "@mui/icons-material/Clear";

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

export default function HealerSelector(props, name, nameClass, cooldown) {
  const { t } = useTranslation();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={selectMenu}>
        <TextField
          value={props.value || ""}
          select
          sx={{ lineHeight: "normal", width: "100%" }}
          size="small"
          onChange={(e) => {
            const newClass = ls
              .get("healerInfo")
              .filter((obj) => {
                return obj.name === e.target.value;
              })
              .map((obj) => obj.class)
              .toString();

            /* ------------------------------ Spread the rows data for updating ----------------------------- */
            let data = { ...props.rowData };
            /* -------------------- Set the name of the row to the selected from dropdown ------------------- */
            data[name] = e.target.value;
            /* --------------------- Update the class from the healerinfo local storage --------------------- */
            data[nameClass] = newClass;
            /* ------------------------------- Reset the cooldown for the row ------------------------------- */
            if (props.rowData[nameClass] !== newClass) {
              data[cooldown] = undefined;
            }
            /* --------------------------------------- Update the data -------------------------------------- */
            props.onRowDataChange(data);
          }}
        >
          {/* ----- Map Healer Names from the healerInfo local storage (created from Heal Team Module) ----- */}
          {ls.get("healerInfo").map((key, i) => (
            <MenuItem divider style={{ color: classColoursJS(key.class) }} key={key.name} value={key.name}>
              <div style={{ display: "inline-flex", alignItems: "center", width: "100%" }}>
                {classIcons(key.class, { height: 20, width: 20, margin: "0px 5px 0px 0px", verticalAlign: "middle", border: "1px solid #595959", borderRadius: 4 })}
                {key.name}
              </div>
            </MenuItem>
          ))}
          <MenuItem key={"remove"} value={""}>
            <ClearIcon sx={{ color: "#ad2c34", margin: "0px 4px 0px 0px" }} fontSize="small" />
            {t("Remove")}
          </MenuItem>
        </TextField>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
