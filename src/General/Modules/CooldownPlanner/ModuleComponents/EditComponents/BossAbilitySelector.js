import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { bossAbilities } from "../../Data/CooldownPlannerBossAbilityList";
import bossAbilityIcons from "../../Functions/IconFunctions/BossAbilityIcons";
import { ThemeProvider, StyledEngineProvider, createTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

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

export default function BossAbilitySelector(props, currentBoss) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={selectMenu}>
        <TextField
          value={props.value || ""}
          size="small"
          select
          sx={{ lineHeight: "normal", width: "100%" }}
          onChange={(e) => {
            props.onChange(e.target.value);
          }}
        >
          {bossAbilities
            .filter((obj) => {
              return obj.bossID === currentBoss && obj.cooldownPlannerActive === true;
            })
            .map((key, i, arr) => {
              let lastItem = i + 1 === arr.length ? false : true;
              return (
                <MenuItem divider={lastItem} key={i} value={key.guid}>
                  <a data-wowhead={"spell=" + key.guid + "&domain=" + currentLanguage}>
                    {bossAbilityIcons(key.guid, {
                      height: 20,
                      width: 20,
                      margin: "0px 4px 0px 0px",
                      verticalAlign: "middle",
                      border: "1px solid #595959",
                      borderRadius: 4,
                    })}
                  </a>
                  {t("CooldownPlanner.BossAbilities." + key.guid)}
                </MenuItem>
              );
            })}
        </TextField>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
