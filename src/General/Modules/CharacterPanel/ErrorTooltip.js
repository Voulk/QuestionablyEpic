import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import Tooltip from "@mui/material/Tooltip";

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
