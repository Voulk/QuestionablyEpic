import React from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { cooldownDB } from "../../Data/CooldownDB";
import { classColoursFonts, classColoursJS } from "../../Functions/ClassColourFunctions";

export default function CastTextField(rowData, cooldown, className) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const spell = cooldownDB.find((obj) => obj.guid === rowData[cooldown]);
  let spellExists = "";
  spell ? (spellExists = true) : (spellExists = false);

  const getTranslatedSpellName = (spellID) => {
    let spell = cooldownDB.find((obj) => obj.guid === spellID);
    if (spell) {
      let spellName = spell.name[currentLanguage].toString();
      return spellName;
    } else {
      return spellID;
    }
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
      {spellExists ? (
        <a data-wowhead={"spell=" + rowData[cooldown]}>
          <img
            style={{ height: 22, width: 22, verticalAlign: "middle", border: "1px solid #595959", borderRadius: 4 }}
            src={getSpellIcon(rowData[cooldown])}
            alt={getTranslatedSpellName(rowData[cooldown])}
          />
        </a>
      ) : (
        ""
      )}

      <Typography
        align="center"
        style={{
          fontSize: 12,
          lineHeight: "normal",
          width: "100%",
          marginLeft: 2,
          backgroundColor: rowData[className] ? classColoursJS(rowData[className]) : "",
          color: classColoursFonts(rowData[className]),
          // justifyContent: "center",
          borderRadius: "4px",
          border: "1px #595959 solid",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {getTranslatedSpellName(rowData[cooldown])}
      </Typography>
    </div>
  );
}
