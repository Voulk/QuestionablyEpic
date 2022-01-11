import React from "react";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";

export default function LogLinkInput(props) {
  const { t } = useTranslation();

  return (
    <TextField
      error={props.reportid !== "err" ? false : true}
      id="filled-basic"
      label={props.reportid !== "err" ? t("CooldownPlanner.UserInputs.Loglink") : "Incorrect Link / Report ID Provided :("}
      variant="outlined"
      onChange={props.changed}
      value={props.loglink}
      size="small"
      {...props.styleProps}
    />
  );
}
