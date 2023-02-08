import React from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { classColoursJS, classColoursFonts } from "../../Functions/ClassColourFunctions";

export default function NameRender(rowData, name, characterClass) {
  /* -------------------------------- Handles no name defined -------------------------------- */
  if (rowData[name] === "" || rowData[name] === undefined) {
    return null;
  }

  return (
    <div
      style={{
        minminWidth: 105,
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: rowData[characterClass] ? classColoursJS(rowData[characterClass]) : "",
        width: "100%",
        justifyContent: "center",
        borderRadius: "4px",
        border: "1px #595959 solid",
        // height: "22px",
      }}
    >
      <Typography
        align="center"
        style={{
          fontSize: 12,
          lineHeight: "normal",
          textAlign: "center",
          color: classColoursFonts(rowData[characterClass]),
          // color: classColoursJS(rowData[characterClass]),
        }}
      >
        {rowData[name]}
      </Typography>
    </div>
  );
}
