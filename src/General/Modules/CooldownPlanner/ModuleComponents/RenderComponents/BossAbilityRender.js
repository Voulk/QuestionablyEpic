import React from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import bossAbilityIcons from "../../Functions/IconFunctions/BossAbilityIcons";
import { bossAbilities } from "../../Data/CooldownPlannerBossAbilityList";
import TimerIcon from "@mui/icons-material/Timer";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";

const iconStyle = {
  height: 22,
  width: 22,
  verticalAlign: "middle",
  border: "1px solid #595959",
  borderRadius: 4,
};

export default function BossAbilityRender(rowData, bossID, difficulty) {
  /* -------------------------------- Handles no defined bossAbility -------------------------------- */
  if (rowData.bossAbility === "" || rowData.bossAbility === undefined) {
    return null;
  }

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

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const translatedName = bossAbilities[bossID]
    .filter((obj) => {
      return obj.guid === rowData.bossAbility;
    })
    .map((obj) => obj.name[currentLanguage])
    .toString();

  const icon = (bossAbility, bossID, iconStyle) => {
    switch (bossAbility) {
      case "Phase 1":
        return <LooksOneIcon fontSize="small" sx={{ verticalAlign: "middle" }} />;
      case "Phase 2":
        return <LooksTwoIcon fontSize="small" sx={{ verticalAlign: "middle" }} />;
      case "Phase 3":
        return <Looks3Icon fontSize="small" sx={{ verticalAlign: "middle" }} />;
      case "Phase 3":
        return <Looks4Icon fontSize="small" sx={{ verticalAlign: "middle" }} />;
      case "Intermission":
        return <TimerIcon fontSize="small" sx={{ verticalAlign: "middle" }} />;
      default:
        return bossAbilityIcons(bossAbility, bossID, iconStyle);
    }
  };

  return (
    <div style={{ display: "inline-flex", alignItems: "center", width: "100%" }}>
      <a data-wowhead={"spell=" + rowData.bossAbility + "&domain=" + currentLanguage + "&dd=" + raidDifficulty(difficulty)}>{icon(rowData.bossAbility, bossID, iconStyle)}</a>
      <Typography align="left" style={{ fontSize: 12, lineHeight: "normal", width: "100%", marginLeft: 8 }} noWrap>
        {translatedName}
      </Typography>
    </div>
  );
}
