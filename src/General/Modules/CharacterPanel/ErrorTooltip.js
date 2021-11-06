import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

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
