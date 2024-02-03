import React from "react";
import { TextField, MenuItem, InputAdornment, IconButton } from "@mui/material";
import { bossAbilities } from "../../Data/CooldownPlannerBossAbilityList";
import bossAbilityIcons from "../../Functions/IconFunctions/BossAbilityIcons";
import { ThemeProvider, StyledEngineProvider, createTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import TimerIcon from "@mui/icons-material/Timer";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import ClearIcon from "@mui/icons-material/Clear";
import BuildIcon from "@mui/icons-material/Build";
import WowheadTooltip from "General/Modules/1. GeneralComponents/WHTooltips.tsx";
import { getBossAbilityTranslation } from "General/Modules/CooldownPlanner/Data/CooldownPlannerBaillAbilityTranslations.js";

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

const iconStyle = {
  height: 20,
  width: 20,
  margin: "0px 4px 0px 0px",
  verticalAlign: "middle",
  border: "1px solid #595959",
  borderRadius: 4,
};

export default function BossAbilitySelector(props, currentBoss, difficulty) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const abilityArr = [
    ...bossAbilities[currentBoss]
      // .filter((obj) => {
      //   return obj.cooldownPlannerActive === true;
      // })
      .map((key, i, arr) => key.guid),
  ];
  const [custom, setCustom] = React.useState(props.value === "" || props.value === undefined ? false : abilityArr.includes(props.value) ? false : true);

  const raidDifficulty = (rDifficulty) => {
    let raidDif = 16;
    switch (rDifficulty) {
      case "Mythic":
        raidDif = 16;
        break;
      case "Heroic":
        raidDif = 15;
        break;
      case "Normal":
        raidDif = 14;
        break;
      default:
        raidDif = 16;
        break;
    }
    return raidDif;
  };

  const icon = (bossAbility, bossID, iconStyle) => {
    switch (bossAbility) {
      case "Phase 1":
        return <LooksOneIcon fontSize="small" sx={{ verticalAlign: "middle", margin: "0px 4px 0px 0px" }} />;
      case "Phase 2":
        return <LooksTwoIcon fontSize="small" sx={{ verticalAlign: "middle", margin: "0px 4px 0px 0px" }} />;
      case "Phase 3":
        return <Looks3Icon fontSize="small" sx={{ verticalAlign: "middle", margin: "0px 4px 0px 0px" }} />;
      case "Phase 4":
        return <Looks4Icon fontSize="small" sx={{ verticalAlign: "middle", margin: "0px 4px 0px 0px" }} />;
      case "Intermission":
        return <TimerIcon fontSize="small" sx={{ verticalAlign: "middle", margin: "0px 4px 0px 0px" }} />;
      default:
        return bossAbilityIcons(bossAbility, bossID, iconStyle);
    }
  };

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
          value={props.value || ""}
          size="small"
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
          sx={{ lineHeight: "normal", width: "100%", textAlign: "left" }}
          onChange={(e) => {
            if (e.target.value === "custom") {
              props.onChange("");
            } else {
              props.onChange(e.target.value);
            }
          }}
        >
          {(abilityArr.includes(props.value) === true ? true : false || custom === false)
            ? [
                bossAbilities[currentBoss]
                  .filter((obj) => {
                    return obj.cooldownPlannerActive === true;
                  })
                  .map((key, i, arr) => {
                    let lastItem = i + 1 === arr.length ? false : true;
                    let translatedAbility = getBossAbilityTranslation(key.guid, currentLanguage);
                    if (translatedAbility === undefined) {
                      translatedAbility = getBossAbilityTranslation(key.guid, "en");
                    }

                    return (
                      <MenuItem divider={true} key={i} value={key.guid}>
                        <WowheadTooltip type="spell" id={key.guid} domain={currentLanguage} difficulty={raidDifficulty(difficulty)}>
                          {icon(key.guid, currentBoss, iconStyle)}
                        </WowheadTooltip>
                        {translatedAbility}
                      </MenuItem>
                    );
                  }),
                <MenuItem divider={true} key={"Custom"} value={"custom"} onClick={(e) => customChange()}>
                  <BuildIcon sx={{ margin: "0px 4px 0px 0px" }} fontSize="small" />
                  {t("Custom")}
                </MenuItem>,
                <MenuItem key={"remove"} value={""}>
                  <ClearIcon sx={{ color: "#ad2c34", margin: "0px 4px 0px 0px" }} fontSize="small" />
                  {t("Remove")}
                </MenuItem>,
              ]
            : ""}
        </TextField>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
