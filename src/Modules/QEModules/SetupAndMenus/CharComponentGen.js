import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { classColoursJS } from "../../HolyDiverModules/CooldownTable/ClassColourFunctions";

const specImages = {
  "Restoration Druid": require("../../../Images/DruidSmall.png"),
};

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
  return (
    <div>
      <CardActionArea onClick={() => alert("Character Clicked" + props.name)}>
      <Card className={classes.root} variant="outlined" raised={true}>
      <Avatar src={specImages[props.spec]} variant="rounded" alt="Remy Sharp" className={classes.large} />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h6" component="h3">
              {props.name}
            </Typography>
            <Typography style={{ color: classColoursJS(props.spec) }}>
              {props.spec}
            </Typography>
          </CardContent>
        </div>
        
      </Card>
      </CardActionArea>
      
    </div>
  );
}