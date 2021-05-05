import React, { useEffect } from "react";
import "./QEMainMenu.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CharCards from "./CharacterModules/CharacterCards";
import AddNewChar from "./CharacterModules/CharacterCreator";
import { makeStyles } from "@material-ui/core/styles";
import ReactGA from "react-ga";
import ArrowForward from "@material-ui/icons/ArrowForward";
import HallOfFame from "../HallOfFame/HallOfFame";
import { Grid, Button, Typography, Tooltip } from "@material-ui/core";
import MessageOfTheDay from "./MessageOftheDay";
import ArticleCard from "../ArticleCards/ArcticleCard";
import Changelog from "../ChangeLog/Changelog";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useSelector } from "react-redux";
import GameTypeSwitch from "./GameTypeToggle";

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

  const gameType = useSelector((state) => state.gameType);

  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Warning                                            */
  /*                 If a button name has to change, do it in the translation files.                */
  /*                    Consider the titles here to be ID's rather than strings                     */
  /* ---------------------------------------------------------------------------------------------- */
  // [route, show button?, tooltip]
  const mainMenuOptions =
    gameType === "Retail"
      ? {
          "MainMenu.TopGear": ["/topgear", true, "TopGear"],
          "MainMenu.UpgradeFinder": ["/UpgradeFinder", true, "UpgradeFinder"],
          "MainMenu.QuickCompare": ["/quickcompare", true, "QuickCompare"],
          "MainMenu.ExploreCovenants": ["/soulbinds", true, "ExploreCovenants"],
          "MainMenu.LegendaryAnalysis": ["/legendaries", true, "LegendaryAnalysis"],
          "MainMenu.TrinketAnalysis": ["/trinkets", true, "TrinketAnalysis"],
          "MainMenu.CooldownPlanner": ["/holydiver", false, "CooldownPlanner"],
          "MainMenu.Profile": ["/profile", true, "Profile"],
        }
      : {
          "MainMenu.TopGear": ["/topgear", true, "TopGear"],
          "MainMenu.UpgradeFinder": ["/UpgradeFinder", true, "UpgradeFinder"],
          "MainMenu.QuickCompare": ["/quickcompare", true, "QuickCompare"],
          "MainMenu.TierSets": ["/TierSets", true, "TierSets"],
          "MainMenu.TrinketAnalysis": ["/trinkets", true, "TrinketAnalysis"],
          "MainMenu.Profile": ["/profile", true, "Profile"],
        };

  const { t } = useTranslation();
  const classes = useStyles();
  const characterCount = props.allChars.getAllChar().length;
  const patron = ["Diamond", "Gold", "Rolls Royce", "Sapphire"].includes(props.patronStatus);

  let articles = [];
  if (props.allChars.allChar.length > 0) {
    articles = props.articleList.filter((article) => article.specs.includes(props.player.getSpec()) || article.specs === "All");
    articles.sort((a, b) => (a.date < b.date ? 1 : -1));
    articles = articles.slice(0, 3);
  }
  const oddEven = (number) => {
    if (number % 2 == 0) {
      return "left";
    }
    return "right";
  };

  return (
    <div style={{ backgroundColor: "#313131" }}>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{textAlign: "center"}} >
            <GameTypeSwitch />
          </Grid>
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
          {/*<Grid item xs={12}>
            <MessageOfTheDay /> 
          </Grid>*/}

          {Object.keys(mainMenuOptions).map((key, index) => (
            // Buttons are translated and printed from a dictionary.
            <Grid item xs={10} sm={12} md={6} lg={6} xl={6} key={index}>
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

        <Typography variant="h5" align="center" style={{ padding: "25px 10px 5px 10px" }} color="primary">
          {t("MainMenu.CharHeader")}
          <Tooltip title={t("MainMenu.CharHelpText")} placement="top-start">
            <InfoOutlinedIcon style={{ color: "white", marginLeft: 4 }} fontSize="small" />
          </Tooltip>
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
                    charUpdatedSnack={props.charUpdatedSnack}
                    delChar={props.delChar}
                  />
                ))
            : ""}
          {props.allChars.getAllChar().length < 9 ? <AddNewChar allChars={props.allChars} charUpdate={props.charUpdate} charAddedSnack={props.charAddedSnack} /> : ""}
        </Grid>

        {articles.length > 0 ? (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center" style={{ padding: "25px 10px 5px 10px" }} color="primary">
                {t("MainMenu.Articles.Header")}
                {/* TODO: Voulk to Add Help Text */}
                {/* Help Text for Articles */}
                {/* <Tooltip title={t("MainMenu.Articles.HelpText")} placement="top-start">
                  <InfoOutlinedIcon style={{ color: "white", marginLeft: 4 }} fontSize="small" />
                </Tooltip> */}
              </Typography>
            </Grid>
            {articles.map((key, i) => (
              <ArticleCard key={i} url={key.url} title={key.title} image={key.image} date={key.date} extrainfo={key.extrainfo} />
            ))}
          </Grid>
        ) : (
          ""
        )}
        <Changelog />
        <HallOfFame />
      </div>
    </div>
  );
}
