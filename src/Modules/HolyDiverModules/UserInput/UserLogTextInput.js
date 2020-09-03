import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));
export default function UserLogTextInput(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  return (
    <TextField
      className={classes.root}
      error={props.reportid !== "err" ? false : true }
      id="filled-basic"
      label={props.reportid !== "err" ? t("Paste WarcraftLog Link Here") : "Incorrect Link / Report ID Provided :(" }
      variant="outlined"
      onChange={props.changed}
      value={props.loglink}
      size="small"
      style={{ width: "100%" }}
    />
  );
}