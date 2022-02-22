import React from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { classColoursJS } from "../../Functions/ClassColourFunctions";
import classIcons from "../../Functions/IconFunctions/ClassIcons";

export default function ClassRender(rowData, characterClass) {
    const { t, i18n } = useTranslation();
  /* -------------------------------- Handles no name defined -------------------------------- */
  if (rowData[characterClass] === "" || rowData[characterClass] === undefined) {
    return null;
  }

  return (
    <div style={{ color: classColoursJS(rowData[characterClass]), display: "inline-flex" }}>
      {rowData[characterClass] === undefined ? "" : classIcons(rowData[characterClass], { height: 30, width: 30, padding: "0px 5px 0px 5px", verticalAlign: "middle", borderRadius: 4 })}
      {t("CooldownPlanner.Classes." + rowData[characterClass])}
    </div>
  );
}
