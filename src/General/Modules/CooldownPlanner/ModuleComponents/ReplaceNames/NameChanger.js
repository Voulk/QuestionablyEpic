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

export default function NameChanger(props) {
  const { name, className, type, classLock, originalName, setNameState, nameState } = props;
  const { t } = useTranslation();
  const [value, setValue] = useState(name);
  const nameValidation = ls.get("healerInfo").map((key, i) => key.name);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={selectMenu}>
        <TextField
          value={ls.get("healerInfo").filter((filter) => filter.class === classLock).length === 0 && type !== "original" ? "No Class in Roster" : value}
          select
          sx={{ lineHeight: "normal", width: "100%", height: 39 }}
          size="small"
          disabled={type === "original" || (ls.get("healerInfo").filter((filter) => filter.class === classLock).length === 0 && type !== "original")}
          SelectProps={type === "original" ? { IconComponent: null } : ""}
          onChange={(e) => {
            setValue(e.target.value);
            setNameState(nameState, e.target.value, originalName);
          }}
        >
          {type === "original" ? (
            <MenuItem disabled divider style={{ color: classColoursJS(className) }} key={name + className} value={name}>
              <div style={{ display: "inline-flex", alignItems: "center", width: "100%", color: classColoursJS(className) }}>
                {classIcons(className, { height: 20, width: 20, margin: "0px 5px 0px 0px", verticalAlign: "middle", border: "1px solid #595959", borderRadius: 4 })}
                {name}
              </div>
            </MenuItem>
          ) : ls.get("healerInfo").filter((filter) => filter.class === classLock).length === 0 ? (
            <MenuItem disabled style={{ height: 39 }} key="No Class in Roster" value="No Class in Roster">
              <div style={{ display: "inline-flex", alignItems: "center", width: "100%" }}>No Class in Roster</div>
            </MenuItem>
          ) : (
            ls
              .get("healerInfo")
              .filter((filter) => filter.class === classLock)
              .map((key, i) => (
                <MenuItem divider style={{ color: classColoursJS(key.class), height: 39 }} key={i} value={key.name}>
                  <div style={{ display: "inline-flex", alignItems: "center", width: "100%", color: classColoursJS(key.class) }}>
                    {classIcons(key.class, { height: 20, width: 20, margin: "0px 5px 0px 0px", verticalAlign: "middle", border: "1px solid #595959", borderRadius: 4 })}
                    {key.name}
                  </div>
                </MenuItem>
              ))
          )}
          {ls.get("healerInfo").filter((filter) => filter.class === classLock).length === 0 ? null : (
            <MenuItem key={"remove"} value={""}>
              <ClearIcon sx={{ color: "#ad2c34", margin: "0px 4px 0px 0px" }} fontSize="small" />
              {t("Remove")}
            </MenuItem>
          )}
        </TextField>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
