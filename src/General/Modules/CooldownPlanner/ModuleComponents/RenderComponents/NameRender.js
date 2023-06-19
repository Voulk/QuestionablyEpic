import React from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { classColoursJS, classColoursFonts } from "../../Functions/ClassColourFunctions";
import { useSelector } from "react-redux";

export default function NameRender(rowData, name, characterClass) {
  /* -------------------------------- Handles no name defined -------------------------------- */
  if (rowData[name] === "" || rowData[name] === undefined) {
    return null;
  }
  const themed = useSelector((state) => state.cooldownPlannerTheme);

  const divTheme = (themed) => {
    if (themed === true) {
      return {
        // minminWidth: 105,
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: rowData[characterClass] ? classColoursJS(rowData[characterClass]) : "",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        borderRadius: "4px",
        border: "1px #595959 solid",
        // height: "22px",
      };
    } else {
      return { minminWidth: 105, display: "inline-flex", alignItems: "center" };
    }
  };

  const typographyTheme = (themed) => {
    if (themed === true) {
      return {
        fontSize: 12,
        lineHeight: "normal",
        textAlign: "center",
        minHeight: "22px",
        height: "100%",
        color: classColoursFonts(rowData[characterClass]),
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        // color: classColoursJS(rowData[characterClass]),
      };
    } else {
      return {
        fontSize: 12,
        lineHeight: "normal",
        textAlign: "center",
        color: classColoursJS(rowData[characterClass]),
      };
    }
  };

  return (
    <div style={divTheme(themed)}>
      <Typography align="center" style={typographyTheme(themed)}>
        {rowData[name]}
      </Typography>
    </div>
  );
}
