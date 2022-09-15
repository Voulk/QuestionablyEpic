import React from "react";
import { classColoursJS } from "../../Functions/ClassColourFunctions";
import classIcons from "../../Functions/IconFunctions/ClassIcons";
import { getTranslatedClassName } from "locale/ClassNames";
import { useTranslation } from "react-i18next";

export default function ClassRender(rowData, characterClass) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.currentLanguage;
  /* -------------------------------- Handles no name defined -------------------------------- */
  if (rowData[characterClass] === "" || rowData[characterClass] === undefined) {
    return null;
  }

  return (
    <div style={{ color: classColoursJS(rowData[characterClass]), display: "inline-flex" }}>
      {rowData[characterClass] === undefined ? "" : classIcons(rowData[characterClass], { height: 30, width: 30, padding: "0px 5px 0px 5px", verticalAlign: "middle", borderRadius: 4 })}
      {getTranslatedClassName(rowData[characterClass], currentLanguage)}
    </div>
  );
}
