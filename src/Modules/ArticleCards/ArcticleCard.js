import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid, Divider } from "@material-ui/core/";
import test from "../../Images/Bosses/MythicPlus.png";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 86,
  },
});

function truncate(str, no_words) {
  return str.split(" ").splice(0, no_words).join(" ") + "...";
}

export default function ArticleCard(props) {
  const classes = useStyles();

  const openURL = (url) => {
    let win = window.open(url);
    if (win) {
      //Browser has allowed it to be opened
      win.focus();
    } else {
      //Browser has blocked it
      alert("Please allow popups for this website");
    }
  };

  return (
    <Grid item xs={4}>
      <Card className={classes.root}>
        <CardActionArea onClick={() => openURL(props.url)}>
          <CardMedia className={classes.media} image={props.image} title={props.title}>
            <CardContent style={{ paddingTop: 12, paddingBottom: 12 }}>
              <Typography align="center" variant="caption" style={{ textShadow: "black -1px 1px 1px" }} component="h2">
                {props.date}
              </Typography>
              <Divider style={{ height: 1, backgroundColor: "#fff", boxShadow: "-1px 1px 20px 1px black" }} />

              <Typography align="center" style={{ textShadow: "black -1px 1px 1px", fontSize: 16 }} variant="h6" component="h2">
                {props.title}
              </Typography>

              {<Typography align="center" style={{ fontSize: 14, textShadow: "black -1px 1px 1px" }} variant="body2" component="p">
                {props.extrainfo.length > 0 ? " - " + props.extrainfo + " - " : ""}
              </Typography> }
            </CardContent>
          </CardMedia>
        </CardActionArea>
        {/* <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions> */}
      </Card>
    </Grid>
  );
}
