import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const useStylesError = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.error.main,
  },
  tooltip: {
    backgroundColor: theme.palette.error.main,
  },
}));

export default function ErrorTooltip(props) {
  const classes = useStylesError();

  return <Tooltip arrow classes={classes} {...props} />;
}
