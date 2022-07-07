import React, { useState } from "react";
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
  let origValue = ls
    .get("healerInfo")
    .filter((filter) => props.rowData[name] === filter.name && props.rowData[nameClass] === filter.class)
    .map((obj, i) => i)
    .toString();
  const [value, setValue] = useState(origValue || props.rowData[name] || props.value || "");
  const nameValidation = ls.get("healerInfo").map((key, i) => key.name);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={selectMenu}>
        <TextField
          value={value}
          select
          sx={{ lineHeight: "normal", width: "100%" }}
          size="small"
          onChange={(e) => {
            const healerRoster = ls.get("healerInfo");
            const healerNum = parseInt(e.target.value);

            const newClass = healerRoster[healerNum].class;
            const newName = healerRoster[healerNum].name;

            let data = { ...props.rowData };
            data[name] = newName; // Set the name of the row to the selected from dropdown
            data[nameClass] = newClass; // Update the class from the healerinfo local storage
            setValue(e.target.value);
            /* ------------------------------- Reset the cooldown for the row ------------------------------- */
            if (props.rowData[nameClass] !== newClass) {
              data[cooldown] = undefined;
            }
            props.onRowDataChange(data); // Update the data
          }}
        >
          {nameValidation.includes(props.rowData[name]) ? null : (
            <MenuItem disabled divider style={{ color: classColoursJS(props.rowData[nameClass]) }} key={props.rowData[name] + i} value={props.rowData[name]}>
              <div style={{ display: "inline-flex", alignItems: "center", width: "100%" }}>
                {classIcons(props.rowData[nameClass], { height: 20, width: 20, margin: "0px 5px 0px 0px", verticalAlign: "middle", border: "1px solid #595959", borderRadius: 4 })}
                {props.rowData[name]}
              </div>
            </MenuItem>
          )}
          {
            /* ----- Map Healer Names from the healerInfo local storage (created from Heal Team Module) ----- */
            ls.get("healerInfo").map((key, i) => (
              <MenuItem divider style={{ color: classColoursJS(key.class) }} key={i} value={i}>
                <div style={{ display: "inline-flex", alignItems: "center", width: "100%" }}>
                  {classIcons(key.class, { height: 20, width: 20, margin: "0px 5px 0px 0px", verticalAlign: "middle", border: "1px solid #595959", borderRadius: 4 })}
                  {key.name}
                </div>
              </MenuItem>
            ))
          }
          <MenuItem key={"remove"} value={""}>
            <ClearIcon sx={{ color: "#ad2c34", margin: "0px 4px 0px 0px" }} fontSize="small" />
            {t("Remove")}
          </MenuItem>
        </TextField>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
