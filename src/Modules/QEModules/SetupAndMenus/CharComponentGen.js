import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { classColoursJS } from "../../HolyDiverModules/CooldownTable/ClassColourFunctions";

// Spec Images.
const specImages = {
  "Restoration Druid": require("../../../Images/DruidSmall.png"),
};

// Called when a character is clicked.
// TODO: Add Logic
const charClicked = (char, cardType) =>  {
  if (cardType === "Char") {
    // Character Clicked. Take player to character sheet.
    alert("Character Clicked " + char.charName);

  }
  else {
    // New character clicked. Offer new character dialog. 
    alert("New Character");
  }

  
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-flex",
    maxWidth: "260px",
    width: "260px",
    maxHeight: "80px",
    borderColor: "green",
    padding: "0px",
    marginRight: "10px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    padding: "5px"
  },
  large: {
    width: "80px",
    height: "80px",
  },
}));

export default function CharCards(props) {
  const classes = useStyles();
  const spec = props.cardType === "Char" ? props.char.spec : "";
  
  return (
    <div>
      <CardActionArea onClick={(e) => charClicked(props.char, props.cardType, e)}>
      <Card className={classes.root} variant="outlined" raised={true}>
      <Avatar src={specImages[spec]} variant="rounded" alt="" className={classes.large} />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h6" component="h3">
              {props.name}
            </Typography>
            <Typography style={{ color: classColoursJS(spec) }}>
              {spec}
            </Typography>
          </CardContent>
        </div>
        
      </Card>
      </CardActionArea>
      
    </div>
  );
}