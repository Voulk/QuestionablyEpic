import React from "react";
import { Typography } from "@mui/material";
import abilityIcons from "../../Functions/IconFunctions/AbilityIcons";
import { useTranslation } from "react-i18next";
import { healerCooldownsDetailed } from "../../Data/CooldownDB";

export default function CastTextField(rowData, cooldown) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const getTranslatedSpellName = (spellID) => {
    let spellName = healerCooldownsDetailed
      .filter((obj) => {
        return obj.guid === spellID;
      })
      .map((obj) => obj.name[currentLanguage])
      .toString();

    return spellName;
  };

  return (
    <div style={{ minminWidth: 105, display: "inline-flex", alignItems: "center", width: "100%" }}>
      <div>
        {abilityIcons(rowData[cooldown], {
          height: 30,
          width: 30,
          margin: "0px 4px 0px 0px",
          verticalAlign: "middle",
          border: "1px solid #595959",
          borderRadius: 4,
        })}
      </div>
      <Typography align="center" style={{ fontSize: 12, lineHeight: "normal", width: "100%" }}>
        {getTranslatedSpellName(rowData[cooldown])}
      </Typography>
    </div>
  );
}
