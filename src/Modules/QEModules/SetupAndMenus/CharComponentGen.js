import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { classColoursJS } from "../../HolyDiverModules/CooldownTable/ClassColourFunctions";

const specImages = {
  "Restoration Druid": require("../../../Images/DruidSmall.png"),
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-flex",
    maxWidth: "240px",
    width: "240px",
    maxHeight: "80px",
    borderColor: "green",
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
  return (
    <div>
      <Card className={classes.root} variant="outlined" raised={true}>
      <Avatar src={specImages[props.spec]} variant="rounded" alt="Remy Sharp" className={classes.large} />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h6" component="h2">
              {props.name}
            </Typography>
            <Typography style={{ color: classColoursJS(props.spec) }}>
              {props.spec}
            </Typography>
          </CardContent>
        </div>
        
      </Card>
    </div>
  );
}