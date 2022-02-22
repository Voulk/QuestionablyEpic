import React from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import bossAbilityIcons from "../../Functions/IconFunctions/BossAbilityIcons";
import { bossAbilities } from "../../Data/CooldownPlannerBossAbilityList";

const iconStyle = {
  height: 22,
  width: 22,
  verticalAlign: "middle",
  border: "1px solid #595959",
  borderRadius: 4,
};

export default function BossAbilityRender(rowData, bossID) {
  /* -------------------------------- Handles no defined bossAbility -------------------------------- */
  if (rowData.bossAbility === "" || rowData.bossAbility === undefined) {
    return null;
  }

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const translatedName = bossAbilities[bossID]
    .filter((obj) => {
      return obj.guid === rowData.bossAbility;
    })
    .map((obj) => obj.name[currentLanguage])
    .toString();

  return (
    <div style={{ minWidth: 105, display: "inline-flex", alignItems: "center", width: "100%" }}>
      <div>
        <a data-wowhead={"spell=" + rowData.bossAbility + "&domain=" + currentLanguage}>{bossAbilityIcons(rowData.bossAbility, bossID, iconStyle)}</a>
      </div>
      <Typography align="center" style={{ fontSize: 12, lineHeight: "normal", width: "100%" }}>
        {translatedName}
      </Typography>
    </div>
  );
}
