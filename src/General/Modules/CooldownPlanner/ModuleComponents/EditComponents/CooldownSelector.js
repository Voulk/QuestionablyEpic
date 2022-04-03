import React from "react";
import { TextField, MenuItem } from "@mui/material";
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
          sx={{ lineHeight: "normal", width: "100%" }}
          size="small"
          onChange={(e) => {
            props.onChange(e.target.value);
          }}
        >
          {data[nameClass]
            ? ClassCooldownMenuItems(data[nameClass])
            : [
                <MenuItem divider={true} value={"Potion/Healthstone"} key={"Potion/Healthstone"}>
                  <img
                    style={{
                      height: 20,
                      width: 20,
                      margin: "0px 5px 0px 0px",
                      verticalAlign: "middle",
                      border: "1px solid #595959",
                      borderRadius: 4,
                    }}
                    src={require("Images/CooldownPlanner/SpellIcons/trade_alchemy_potionb5.jpg").default}
                    alt={"Potion/Healthstone"}
                  />
                  Potion/Healthstone
                </MenuItem>,
                <MenuItem divider={false} value={"Personals"} key={"Personals"}>
                  <img
                    style={{
                      height: 20,
                      width: 20,
                      margin: "0px 5px 0px 0px",
                      verticalAlign: "middle",
                      border: "1px solid #595959",
                      borderRadius: 4,
                    }}
                    src={require("Images/CooldownPlanner/SpellIcons/inv_shield_30.jpg").default}
                    alt={"Personals"}
                  />
                  Personals
                </MenuItem>,
              ]}
        </TextField>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
