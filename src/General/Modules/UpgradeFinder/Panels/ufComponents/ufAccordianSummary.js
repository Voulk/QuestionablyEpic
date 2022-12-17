import React from "react";
import withStyles from "@mui/styles/withStyles";
import MuiAccordionSummary from "@mui/material/AccordionSummary";

const UFAccordionSummary = withStyles({
  root: {
    padding: "0px 16px 0px 0px",
    backgroundColor: "#35383e",
    "&$expanded": {
      backgroundColor: "rgb(255 255 255 / 10%)",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

export default UFAccordionSummary;
