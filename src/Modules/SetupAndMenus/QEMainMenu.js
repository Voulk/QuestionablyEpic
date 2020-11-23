import React, { useEffect } from "react";
import "./QEMainMenu.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CharCards from "./CharComponentGen";
import AddNewChar from "./CharCreator";
import { makeStyles } from "@material-ui/core/styles";
import ReactGA from "react-ga";
import { dbCheckPatron } from "./ConnectionUtilities";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { Paper, Grid, Button, Typography } from "@material-ui/core";

// Warning: If a button name has to change, do it in the translation files. Consider the titles here to be ID's rather than strings.
const mainMenuOptions = {
  "MainMenu.TopGear": ["/topgear", false],
  "MainMenu.GreatVault": ["/greatvault", false],
  "MainMenu.QuickCompare": ["/quickcompare", true],
  "MainMenu.ExploreCovenants": ["/soulbinds", true],
  "MainMenu.LegendaryAnalysis": ["/legendaries", true],
  "MainMenu.CooldownPlanner": ["/holydiver", false],
};

/* Buttons to be added back.
  "MainMenu.UpgradeFinder": ["/upgradefinder", false],
  "MainMenu.TrinketAnalysis": ["/trinkets", false],
*/

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      margin: "auto",
      width: "80%",
      justifyContent: "center",
      display: "block",
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

// <p>{props.pl.getSpec()}</p>

export default function QEMainMenu(props) {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const { t, i18n } = useTranslation();
  // const currentLanguage = i18n.language;
  const classes = useStyles();
  const characterCount = props.allChars.getAllChar().length;

  return (
    <div style={{ backgroundColor: "#313131" }}>
      <div
        className={classes.root}
        // style={{
        //   margin: "auto",
        //   width: "45%",
        //   justifyContent: "center",
        //   display: "block",
        // }}
        /*startIcon={<Avatar src={''} />} */
      >
        <p className="headers">{/*t("MainMenuItemsH") */}</p>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper elevation={0} style={{ border: "1px", padding: 10 }}>
              <Typography
                style={{ color: "limegreen" }}
                align="left"
                variant="subtitle1"
                // gutterBottom
              >
                An expansion launch is a chaotic time and the game continues to
                see frequent, decision-altering changes. Continue to use your
                class discords as your primary resource for information. ~Voulk V1.03

              </Typography>
            </Paper>
          </Grid>
          {Object.keys(mainMenuOptions).map((key, index) => (
            // Buttons are translated and printed from a dictionary.
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={index}>
              <Button
                key={index}
                variant="contained"
                disabled={!mainMenuOptions[key][1] || characterCount === 0}
                color="secondary"
                style={{
                  width: "100%",
                  height: "60px",
                  whiteSpace: "nowrap",
                  justifyContent: "left",
                  paddingLeft: "32px",
                  color:
                    mainMenuOptions[key][1] && characterCount > 0
                      ? "#F2BF59"
                      : "#9c9c9c",
                }}
                component={Link}
                to={mainMenuOptions[key][0]}
              >
                <ArrowForward style={{ paddingRight: 32 }} />
                {t(key)}
              </Button>
            </Grid>
          ))}
        </Grid>

        <p className="headers">{t("MainMenuCharactersH")}</p>
        <Typography
          style={{ color: "white", marginBottom: "10px", fontStyle: "italic" }}
          variant="body2"
          align="center"
        >
          Add your characters here. Right click to edit your stat weights, realm
          information and more.
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
                  />
                ))
            : ""}
          {props.allChars.getAllChar().length < 9 ? (
            <AddNewChar
              allChars={props.allChars}
              charUpdate={props.charUpdate}
              charAddedSnack={props.charAddedSnack}
            />
          ) : (
            ""
          )}
        </Grid>
      </div>
    </div>
  );
}
