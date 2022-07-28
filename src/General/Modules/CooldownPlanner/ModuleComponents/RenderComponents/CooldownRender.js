import React from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { cooldownDB } from "../../Data/CooldownDB";

export default function CastTextField(rowData, cooldown) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const getTranslatedSpellName = (spellID) => {
    let spellName = cooldownDB
      .filter((obj) => {
        return obj.guid === spellID;
      })
      .map((obj) => obj.name[currentLanguage])[0]
      .toString();

    return spellName;
  };

  const getSpellIcon = (spellID) => {
    let icon = cooldownDB
      .filter((obj) => {
        return obj.guid === spellID;
      })
      .map((obj) => obj.icon)[0];

    return icon;
  };

  /* -------------------------------- Handles no cooldowns defined -------------------------------- */
  if (rowData[cooldown] === "" || rowData[cooldown] === undefined) {
    return null;
  }

  return (
    <div style={{ display: "inline-flex", alignItems: "center", width: "100%", textAlign: "center" }}>
      <a data-wowhead={"spell=" + rowData[cooldown]}>
        <img
          style={{ height: 22, width: 22, verticalAlign: "middle", border: "1px solid #595959", borderRadius: 4 }}
          src={getSpellIcon(rowData[cooldown])}
          alt={getTranslatedSpellName(rowData[cooldown])}
        />
      </a>
      <Typography
        align="left"
        style={{
          fontSize: 12,
          lineHeight: "normal",
          width: "100%",
          marginLeft: 8,
        }}
      >
        {getTranslatedSpellName(rowData[cooldown])}
      </Typography>
    </div>
  );
}
