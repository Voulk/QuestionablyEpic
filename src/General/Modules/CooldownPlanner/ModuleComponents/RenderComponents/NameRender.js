import React from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { classColoursJS } from "../../Functions/ClassColourFunctions";

export default function RenderName(rowData, name, characterClass) {
  /* -------------------------------- Handles no name defined -------------------------------- */
  if (rowData.name === "" || rowData.name === undefined) {
    return null;
  }

  return (
    <div style={{ minminWidth: 105, display: "inline-flex", alignItems: "center" }}>
      <Typography
        align="center"
        style={{
          fontSize: 12,
          lineHeight: "normal",
          textAlign: "center",
          color: classColoursJS(rowData[characterClass]),
        }}
      >
        {rowData[name]}
      </Typography>
    </div>
  );
}
