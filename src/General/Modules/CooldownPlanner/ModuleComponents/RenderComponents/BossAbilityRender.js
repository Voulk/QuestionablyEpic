import React from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import bossAbilityIcons from "../../Functions/IconFunctions/BossAbilityIcons";

export default function BossAbilityRender(rowData) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  /* -------------------------------- Handles no defined bossAbility -------------------------------- */
  if (rowData.bossAbility === "" || rowData.bossAbility === undefined) {
    return null;
  }

  return (
    <div style={{ minWidth: 105, display: "inline-flex", alignItems: "center", width: "100%" }}>
      <div>
        <a data-wowhead={"spell=" + rowData.bossAbility + "&domain=" + currentLanguage}>
          {bossAbilityIcons(rowData.bossAbility, {
            height: 30,
            width: 30,
            margin: "0px 4px 0px 0px",
            verticalAlign: "middle",
            border: "1px solid #595959",
            borderRadius: 4,
          })}
        </a>
      </div>
      <Typography align="center" style={{ fontSize: 12, lineHeight: "normal", width: "100%" }}>
        {t("CooldownPlanner.BossAbilities." + rowData.bossAbility)}
      </Typography>
    </div>
  );
}
