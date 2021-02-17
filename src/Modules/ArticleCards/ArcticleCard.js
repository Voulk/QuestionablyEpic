import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid } from "@material-ui/core/";
import test from "../../Images/Bosses/MythicPlus.png";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 110,
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
            <Typography style={{ position: "absolute", right: 10, top: 2 }} variant="caption" component="h2">
              {props.date}
            </Typography>
            <CardContent>
              <Typography gutterBottom style={{ fontSize: 16 }} variant="h6" component="h2">
                {props.title}
              </Typography>

              <Typography style={{ fontSize: 12 }} variant="body2" component="p">
                {truncate(props.blurb, 10)}
              </Typography>
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
