import React from "react";
import { classColoursJS } from "../../Functions/ClassColourFunctions";
import classIcons from "../../Functions/IconFunctions/ClassIcons";
import { getTranslatedClassName } from "locale/ClassNames";

export default function ClassRender(rowData, characterClass) {
  /* -------------------------------- Handles no name defined -------------------------------- */
  if (rowData[characterClass] === "" || rowData[characterClass] === undefined) {
    return null;
  }

  return (
    <div style={{ color: classColoursJS(rowData[characterClass]), display: "inline-flex" }}>
      {rowData[characterClass] === undefined ? "" : classIcons(rowData[characterClass], { height: 30, width: 30, padding: "0px 5px 0px 5px", verticalAlign: "middle", borderRadius: 4 })}
      {getTranslatedClassName(rowData[characterClass])}
    </div>
  );
}
