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
  const [value, setValue] = useState(type === "original" ? name : originalName);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={selectMenu}>
        <TextField
          value={value}
          select
          sx={{ lineHeight: "normal", width: "100%", height: 39 }}
          size="small"
          disabled={type === "original"}
          SelectProps={type === "original" ? { IconComponent: null } : ""}
          onChange={(e) => {
            if (e.target.value === "reset") {
              setValue(originalName);
              setNameState(nameState, originalName, originalName);
            } else {
              setValue(e.target.value);
              setNameState(nameState, e.target.value, originalName);
            }
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
              <div style={{ display: "inline-flex", alignItems: "center", width: "100%", height: 22 }}>No Class in Roster</div>
            </MenuItem>
          ) : (
            ls
              .get("healerInfo")
              .filter((filter) => filter.class === classLock)
              .map((key, i, arr) => {
                let lastItem = i + 1 === arr.length ? false : true;
                return (
                  <MenuItem divider={lastItem} style={{ color: classColoursJS(key.class), height: 39 }} key={i} value={key.name}>
                    <div style={{ display: "inline-flex", alignItems: "center", width: "100%", color: classColoursJS(key.class) }}>
                      {classIcons(key.class, { height: 20, width: 20, margin: "0px 5px 0px 0px", verticalAlign: "middle", border: "1px solid #595959", borderRadius: 4 })}
                      {key.name}
                    </div>
                  </MenuItem>
                );
              })
          )}

          <MenuItem style={{ height: 39 }} key="removeLineFromArray" value="removeLineFromArray">
            <div style={{ display: "inline-flex", alignItems: "center", width: "100%", height: 22 }}>Don't Import</div>
          </MenuItem>
          {value === originalName ? null : (
            <MenuItem key={"remove"} value={"reset"}>
              <ClearIcon sx={{ color: "#ad2c34", margin: "0px 4px 0px 0px" }} fontSize="small" />
              {t("Reset")}
            </MenuItem>
          )}
          {type !== "original" ? (
            <MenuItem style={{ color: classColoursJS(classLock), display: "none" }} key={originalName + classLock} value={originalName}>
              <div style={{ display: "inline-flex", alignItems: "center", width: "100%", color: classColoursJS(classLock) }}>
                {classIcons(classLock, { height: 20, width: 20, margin: "0px 5px 0px 0px", verticalAlign: "middle", border: "1px solid #595959", borderRadius: 4 })}
                {originalName}
              </div>
            </MenuItem>
          ) : null}
        </TextField>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
