import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Popover, Typography, Grid, Divider } from "@material-ui/core/";
import classIcons from "../../CooldownPlanner/Functions/IconFunctions/ClassIcons";
import { classColoursJS } from "../../CooldownPlanner/Functions/ClassColourFunctions";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function CharacterHeaderButton(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const currentCharacter = props.allChars.allChar[props.allChars.activeChar];

  return (
    <div>
      <Button aria-describedby={id} style={{ color: classColoursJS(currentCharacter.spec) }} onClick={handleClick}>
        {props.allChars.getAllChar().length > 0 ? (
          // TODO: Change classIcons to accept a styles prop to remove the padding on the right for this component only
          <div>
            {currentCharacter.charName}
            {classIcons(currentCharacter.spec, 18)}
          </div>
        ) : (
          ""
        )}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>
          <Grid container spacing={1} direction="row">
            {/* -------------------------------------------------------------------------- */
            /*                          Container for Characters                          */
            /* -------------------------------------------------------------------------- */}
            <Grid item xs={6} container direction="column">
              <Grid item xs={12}>
                Test
              </Grid>
            </Grid>

            {/* -------------------------------------------------------------------------- */
            /*                             Container for Logs                             */
            /* -------------------------------------------------------------------------- */}
            <Grid item xs={6} container direction="column">
              <Grid item xs={12}>
                Test
              </Grid>
            </Grid>
          </Grid>
        </Typography>
      </Popover>
    </div>
  );
}
