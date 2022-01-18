import React from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { classColoursJS } from "../../Functions/ClassColourFunctions";
import classIcons from "../../Functions/IconFunctions/ClassIcons";

export default function ClassEditRender(props, characterClass) {
    const { t, i18n } = useTranslation();
    let data = { ...props.rowData };
  /* -------------------------------- Handles no name defined -------------------------------- */
  if (data[characterClass] === "" || data[characterClass] === undefined) {
    return null;
  }


  return (
    <div style={{ color: classColoursJS(data[characterClass]), display: "inline-flex" }}>
      {data[characterClass] === undefined ? "" : classIcons(data[characterClass], { height: 30, width: 30, padding: "0px 5px 0px 5px", verticalAlign: "middle", borderRadius: 4 })}
      {t("CooldownPlanner.Classes." + data[characterClass])}
    </div>
  );
}
