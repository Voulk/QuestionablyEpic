import React from "react";
import { TextField, MenuItem, InputAdornment, IconButton } from "@mui/material";
import { ThemeProvider, StyledEngineProvider, createTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { cooldownDB } from "../../Data/CooldownDB";
import ClassCooldownMenuItems from "../../Menus/ClassCooldownMenuItems";
import ClearIcon from "@mui/icons-material/Clear";
import BuildIcon from "@mui/icons-material/Build";

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

export default function CooldownSelector(props, rowData, cooldown, nameClass) {
  const { t, i18n } = useTranslation();
  let data = { ...props.rowData };

  const abilityArr = cooldownDB.map((key, i, arr) => key.guid);
  const [custom, setCustom] = React.useState(props.value === "" || props.value === undefined ? false : abilityArr.includes(props.value) ? false : true);

  const resetText = () => {
    props.onChange("");
    setCustom(false);
  };

  const customChange = () => {
    props.onChange("");
    setCustom(true);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={selectMenu}>
        <TextField
          select={abilityArr.includes(props.value) === true ? true : false || custom === false}
          InputProps={
            abilityArr.includes(props.value) === true
              ? true
              : false || custom === false
              ? ""
              : {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={(e) => resetText()} edge="end">
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }
          }
          value={rowData[cooldown] || props.value || ""}
          sx={{ lineHeight: "normal", width: "100%", textAlign: "left" }}
          size="small"
          onChange={(e) => {
            if (e.target.value === "custom") {
              props.onChange("");
            } else {
              props.onChange(e.target.value);
            }
          }}
        >
          [{ClassCooldownMenuItems(data[nameClass]) || []}
          <MenuItem divider={true} key={"Custom"} value={"custom"} onClick={(e) => customChange()}>
            <BuildIcon sx={{ margin: "0px 4px 0px 0px" }} fontSize="small" />
            {t("Custom")}
          </MenuItem>
          ,
          <MenuItem key={"remove"} value={""}>
            <ClearIcon sx={{ color: "#ad2c34", margin: "0px 4px 0px 0px" }} fontSize="small" />
            {t("Remove")}
          </MenuItem>
          , ]
        </TextField>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
