import React, { useEffect } from "react";
import "./QEMainMenu.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CharCards from "./CharacterModules/CharacterCards";
import AddNewChar from "./CharacterModules/CharacterCreator";
import { makeStyles } from "@material-ui/core/styles";
import ReactGA from "react-ga";
import { dbCheckPatron, dbGetArticleList } from "./ConnectionUtilities";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { Paper, Grid, Button, Typography, Tooltip } from "@material-ui/core";
// import HallOfFame from "../HallOfFame/HallOfFame";
import MessageOfTheDay from "./MessageOftheDay";
import ArticleCard from "../ArticleCards/ArcticleCard";
import Changelog from "../ChangeLog/Changelog";


// Warning: If a button name has to change, do it in the translation files. Consider the titles here to be ID's rather than strings.
// [route, show button?, tooltip]
const mainMenuOptions = {
  "MainMenu.TopGear": ["/topgear", true, "TopGear"],
  "MainMenu.UpgradeFinder": ["/UpgradeFinder", true, "UpgradeFinder"],
  "MainMenu.QuickCompare": ["/quickcompare", true, "QuickCompare"],
  "MainMenu.ExploreCovenants": ["/soulbinds", true, "ExploreCovenants"],
  "MainMenu.LegendaryAnalysis": ["/legendaries", true, "LegendaryAnalysis"],
  //"MainMenu.TrinketAnalysis": ["/trinkets", false, "TrinketAnalysis"],
  "MainMenu.CooldownPlanner": ["/holydiver", false, "CooldownPlanner"],
  "MainMenu.Profile": ["/profile", true, "Profile"],
};

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      margin: "auto",
      width: "80%",
      justifyContent: "center",
      display: "block",
      marginTop: 120,
    },
    [theme.breakpoints.up("md")]: {
      margin: "auto",
      width: "65%",
      justifyContent: "center",
      display: "block",
    },
    [theme.breakpoints.up("lg")]: {
      margin: "auto",
      width: "45%",
      justifyContent: "center",
      display: "block",
    },
  },
}));

export default function QEMainMenu(props) {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const characterCount = props.allChars.getAllChar().length;
  const patron = ["Diamond", "Gold", "Rolls Royce", "Sapphire"].includes(props.patronStatus);

  //const articles = dbGetArticleList();
  //console.log(articles);

  const articles = props.articleList;

  const links = [
    {
      image: "https://questionablyepic.com/wp-content/uploads/2020/11/Castle-Nathria-300x250.jpg",
      title: "Castle Nathria Ramp Guide I – Discipline",
      url: "https://questionablyepic.com/castle-nathria-ramps/",
      date: "January 27, 2021",
      specs: ["Priest"],
      blurb: "Castle Nathria opens Shadowlands with a fantastic ten boss raid in which Disc Priest reigns...",
    },
    {
      image: "https://questionablyepic.com/wp-content/uploads/2021/01/Rising-Mist-in-Mythic-300x250.jpg",
      title: "The Fistweaving Compendium – Mythic+",
      url: "https://questionablyepic.com/fistweaving-dungeon-compendium/",
      date: "January 23, 2021",
      specs: ["Monk"],
      blurb: "The following guide was written by Sweggles from Vesper on Area 52...",
    },
    {
      image: "https://questionablyepic.com/wp-content/uploads/2021/01/Rising-Mist-vs-Upwelling-300x250.jpg",
      title: "The Fistweaving Compendium – Raid",
      url: "https://questionablyepic.com/fistweaving-raid-compendium/",
      date: "January 18, 2021",
      specs: ["Monk"],
      blurb: "The following guide was written by Sweggles from Vesper on Area 52...",
    },
  ];

  const oddEven = (number) => {
    if (number % 2 == 0) {
      return "left";
    }
    return "right";
  };
  //console.log(props.patronStatus);

  return (
    <div style={{ backgroundColor: "#313131" }}>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              key={321}
              variant="contained"
              onClick={() => window.open("https://patreon.com/questionablyepic", "_blank")}
              color="secondary"
              disabled={patron}
              style={{
                width: "100%",
                height: "46px",
                whiteSpace: "nowrap",
                justifyContent: "center",
                textTransform: "none",
                paddingLeft: "32px",
                color: "#F2BF59",
              }}
            >
              {patron ? t("MainMenu.PatronThanks") : t("MainMenu.PatronInvite")}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <MessageOfTheDay />
          </Grid>

          {Object.keys(mainMenuOptions).map((key, index) => (
            // Buttons are translated and printed from a dictionary.
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={index}>
              <Tooltip title={t("MainMenu.Tooltips." + mainMenuOptions[key][2])} placement={oddEven(index)} arrow>
                <Button
                  key={index}
                  variant="contained"
                  disabled={!mainMenuOptions[key][1] || characterCount === 0}
                  color="secondary"
                  style={{
                    width: "100%",
                    height: "55px",
                    whiteSpace: "nowrap",
                    justifyContent: "left",
                    paddingLeft: "32px",
                    color: mainMenuOptions[key][1] && characterCount > 0 ? "#F2BF59" : "#9c9c9c",
                  }}
                  component={Link}
                  to={mainMenuOptions[key][0]}
                >
                  <ArrowForward style={{ paddingRight: 32 }} />
                  {t(key)}
                </Button>
              </Tooltip>
            </Grid>
          ))}
        </Grid>

        {/* <p className="headers"> */}
        <Typography variant="h5" align="center" style={{ padding: "10px 10px 5px 10px" }} color="primary">
          {t("MainMenu.CharHeader")}
        </Typography>
        {/* </p> */}
        <Typography style={{ color: "white", marginBottom: "10px", fontStyle: "italic" }} variant="body2" align="center">
          {t("MainMenu.CharHelpText")}
        </Typography>

        <Grid container spacing={2}>
          {props.allChars.getAllChar().length > 0
            ? props.allChars
                .getAllChar()
                .map((char, index) => (
                  <CharCards
                    key={index}
                    name={char.charName}
                    char={char}
                    cardType="Char"
                    allChars={props.allChars}
                    charUpdate={props.charUpdate}
                    singleUpdate={props.singleUpdate}
                    isActive={index === props.allChars.activeChar}
                    contentType={props.contentType}
                    charUpdatedSnack={props.charUpdatedSnack}
                    delChar={props.delChar}
                  />
                ))
            : ""}
          {props.allChars.getAllChar().length < 9 ? <AddNewChar allChars={props.allChars} charUpdate={props.charUpdate} charAddedSnack={props.charAddedSnack} /> : ""}
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center" style={{ padding: "10px 10px 5px 10px" }} color="primary">
              {/* // TODO Translations and reword */}
              Class Related Links
            </Typography>
            {/* <Typography style={{ color: "white", fontStyle: "italic" }} variant="body2" align="center">
              Some Links Relevant to the Class
            </Typography> */}
          </Grid>
          {/* add a filter here for the players class */}
          {articles.map((key) => (
            <ArticleCard url={key.url} title={key.title} image={key.image} date={key.date} blurb={key.blurb} />
          ))}
        </Grid>
        <Changelog />
      </div>
    </div>
  );
}
