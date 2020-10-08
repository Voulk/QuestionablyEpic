import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { classColoursJS } from "../CooldownPlanner/Functions/ClassColourFunctions.js";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid } from "@material-ui/core";
import FormDialog from "./CharCreator";

// Spec Images.
const specImages = {
  "Restoration Druid": require("../../Images/DruidSmall.png"),
  "Discipline Priest": require("../../Images/DiscSmall.png"),
  "Holy Paladin": require("../../Images/PaladinSmall.png"),
};

// Called when a character is clicked.
// TODO: Add Logic
const charClicked = (char, cardType, allChars, updateChar) => {
  if (cardType === "Char") {
    // Character Clicked. Take player to character sheet.
    //alert("Character Clicked " + char.charName);
    allChars.setActiveChar(char.charID);
    updateChar(allChars);
  } else {
    // New character clicked. Offer new character dialog.
    //alert("New Character");
    //charCreationDialog(char);
    // allChars.addChar("VoulkPriest", "Discipline Priest");
    // updateChar(allChars);
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-flex",
    // maxWidth: "260px",
    width: "100%",
    maxHeight: "80px",
    borderColor: "Gold",
    padding: "0px",
    marginRight: "0px",
  },
  activeChar: {
    borderColor: "ForestGreen",
  },

  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    padding: "5px",
  },
  large: {
    width: "80px",
    height: "80px",
  },
}));

export default function CharCards(props) {
  const classes = useStyles();
  const spec = props.cardType === "Char" ? props.char.spec : "";
  const rootClassName =
    classes.root + " " + (props.isActive ? classes.activeChar : "");
  //alert(rootClassName);

  return (
    <Grid item xs={4}>
      <CardActionArea
        onClick={(e) =>
          charClicked(
            props.char,
            props.cardType,
            props.allChars,
            props.charUpdate,
            e
          )
        }
      >
        <Card className={rootClassName} variant="outlined" raised={true}>
          <Avatar
            src={specImages[spec]}
            variant="rounded"
            alt=""
            className={classes.large}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="h6" component="h4">
                {props.name}
              </Typography>
              <Typography style={{ color: classColoursJS(spec) }}>
                {spec}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

// TODO
const charCreationDialog = (props) => {
  //alert("Hello")
  //const [open, setOpen] = React.useState(false);
  const open = true;

  const handleClickOpen = () => {
    //setOpen(true);
  };

  const handleClose = () => {
    //setOpen(false);
  };

  return (
    <div>
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};