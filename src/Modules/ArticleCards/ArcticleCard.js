import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid } from "@material-ui/core/";
import test from "../../Images/Bosses/MythicPlus.png"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 120,
  },
});

export default function ArticleCard(props) {
  const classes = useStyles();

  return (
    <Grid item xs={4}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={test} title="Contemplative Reptile">
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Some Cool Article
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.url}
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
