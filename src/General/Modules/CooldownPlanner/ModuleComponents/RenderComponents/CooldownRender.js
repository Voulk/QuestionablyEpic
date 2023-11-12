import React from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { cooldownDB } from "../../Data/CooldownDB";
import { classColoursFonts, classColoursJS } from "../../Functions/ClassColourFunctions";
import { useSelector } from "react-redux";
import WowheadTooltip from "General/Modules/1. GeneralComponents/WHTooltips.tsx";

export default function CastTextField(rowData, cooldown, className) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const spell = cooldownDB.find((obj) => obj.guid === rowData[cooldown]);
  let spellExists = "";
  spell ? (spellExists = true) : (spellExists = false);

  const getTranslatedSpellName = (spellID) => {
    let spell = cooldownDB.find((obj) => obj.guid === spellID);
    if (spell) {
      let spellName = spell.name[currentLanguage]?.toString() ?? spell.name["en"];
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

  const themed = useSelector((state) => state.cooldownPlannerTheme);

  const divTheme = (themed) => {
    if (themed === true) {
      return { display: "inline-flex", alignItems: "center", width: "100%", height: "100%", textAlign: "center" };
    } else {
      return { display: "inline-flex", alignItems: "center", width: "100%", textAlign: "center" };
    }
  };

  const typographyTheme = (themed) => {
    if (themed === true) {
      return {
        fontSize: 12,
        lineHeight: "normal",
        width: "100%",
        marginLeft: 2,
        minHeight: "22px",
        backgroundColor: classColoursJS(rowData[className]),
        color: classColoursFonts(rowData[className]),
        // justifyContent: "center",
        borderRadius: "4px",
        border: "1px #595959 solid",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
      };
    } else {
      return {
        fontSize: 12,
        lineHeight: "normal",
        width: "100%",
        marginLeft: 2,
      };
    }
  };

  return (
    <div style={divTheme(themed)}>
      {spellExists ? (
        <WowheadTooltip type="spell" id={rowData[cooldown]}>
          <img
            style={{ height: 22, width: 22, verticalAlign: "middle", border: "1px solid #595959", borderRadius: 4 }}
            src={getSpellIcon(rowData[cooldown])}
            alt={getTranslatedSpellName(rowData[cooldown])}
          />
        </WowheadTooltip>
      ) : (
        ""
      )}

      <Typography align="center" style={typographyTheme(themed)}>
        {getTranslatedSpellName(rowData[cooldown])}
      </Typography>
    </div>
  );
}
