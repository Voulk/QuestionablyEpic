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

{
  /* <BootstrapTooltip title="Add">
<Button>Bootstrap</Button>
</BootstrapTooltip> */
}

const errorMessage = (
  <div>
    There is a problem with your import, please check if your character is wearing the correct items:
    <br />
    <span>• Weapon / Off Hands</span>
    <br />
    <span>• Helm / Neck / Chest / Wrist / Hands / Belt / Legs / Boots / Rings </span>
    <br />
    <span>• Trinkets</span>
  </div>
);

export default function ErrorTooltip(props) {
  const classes = useStylesError();

  return <Tooltip title={errorMessage} arrow classes={classes} {...props} />;
}
