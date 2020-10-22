import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { classColoursJS } from "../CooldownPlanner/Functions/ClassColourFunctions.js";
import { Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import classicons from "../CooldownPlanner/Functions/IconFunctions/ClassIcons.js"

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
    width: "100%",
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  content: {
    flex: "1 0 auto",
    padding: "0px",
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
            variant="square"
            alt=""
            className={classes.large}
          />
          <Divider orientation="vertical" flexItem />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="h6" component="h4" style={{ lineHeight: 1, color: classColoursJS(spec) }}>
                {props.name}
              </Typography>
              <Typography variant="caption" style={{ fontSize: 11 }}>
                US-Frostmourne
              </Typography>
              <Divider />
              <Typography style={{ color: classColoursJS(spec), marginTop: 2 }}>
                {spec}
                {classicons(spec, 18)}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  );
}