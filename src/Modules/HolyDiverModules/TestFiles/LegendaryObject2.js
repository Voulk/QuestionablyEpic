import React, { Component } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

const legendaryImages = {
  "The Dark Titans Lesson": require("../../../Images/Legendaries/TheDarkTitansLesson.jpg"),
  "Circle of Life and Death": require("../../../Images/Legendaries/CircleOfLifeAndDeath.jpg"),
  "Lycaras Fleeting Glimpse": require("../../../Images/Legendaries/LycarasFleetingGlimpse.jpg"),
  "Memory of the Mother Tree": require("../../../Images/Legendaries/MemoryOfTheMotherTree.jpg"),
  "Oath of the Elder Druid": require("../../../Images/Legendaries/OathOfTheElderDruid.jpg"),
  "Verdant Infusion": require("../../../Images/Legendaries/VerdantInfusion.jpg"),
  "Vision of Unending Growth": require("../../../Images/Legendaries/VisionOfUnendingGrowth.jpg"),

  // Paladin
  "From Dusk till Dawn": require("../../../Images/Legendaries/FromDuskTillDawn.jpg"),
  "Vanguards Momentum": require("../../../Images/Legendaries/VanguardsMomentum.jpg"),
  "The Magistrates Judgment": require("../../../Images/Legendaries/TheMagistratesJudgment.jpg"),
  "Inflorescence of the Sunwell": require("../../../Images/Legendaries/InflorescenceOfTheSunwell.jpg"),
  "Maraads Dying Breath": require("../../../Images/Legendaries/MaraadsDyingBreath.jpg"),
  "Shadowbreaker, Dawn of the Sun": require("../../../Images/Legendaries/ShadowbreakerDawnOfTheSun.jpg"),
  "Shock Barrier": require("../../../Images/Legendaries/ShockBarrier.jpg"),
};

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const item = props.item;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {/* <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        /> */}
        <CardContent>
          <Grid container>
            <Grid item xs={10}>
              <Typography gutterBottom variant="h6" component="h2">
                {t(item.name + ".name")}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <img
                src={legendaryImages[item.name]}
                alt=""
                height={60}
                width={60}
              />
            </Grid>
            <Typography variant="body2" color="textSecondary" component="p">
              {t(item.name + ".desc")}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Expected HPS: {item.expectedHPS}
              Expected DPS: {item.expectedDPS}
            </Typography>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>Pattern drops from: {t(item.name + ".droploc")}</CardActions>
    </Card>
  );
}