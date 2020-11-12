import React from "react";
import Button from "@material-ui/core/Button";
import "./QEMainMenu.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CharCards from "./CharComponentGen";
import { Grid } from "@material-ui/core";
import AddNewChar from "./CharCreator";
import { makeStyles } from "@material-ui/core/styles";

// Warning: If a button name has to change, do it in the translation files. Consider the titles here to be ID's rather than strings.
const mainMenuOptions = {
  // "Top Gear": "/topgear",
  // "Gear Quick Compare": "/quickcompare",
  // "Trinket Quick Compare": "/trinkets",
  // "Legendary Analysis": "/legendaries",
  // "Explore Covenants": "/soulbinds",
  "Cooldown Planner": "/holydiver",
};

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
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const classes = useStyles();

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
      >
        <p className="headers">{t("MainMenuItemsH")}</p>
        <Grid container spacing={1}>
          {Object.keys(mainMenuOptions).map((key, index) => (
            // Buttons are translated and printed from a dictionary.
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={index}>
              <Button
                key={index}
                variant="contained"
                color="primary"
                style={{
                  width: "100%",
                  height: "40px",
                  whiteSpace: "nowrap",
                }}
                component={Link}
                to={mainMenuOptions[key]}
              >
                {t(key)}
              </Button>
            </Grid>
          ))}
        </Grid>

        <p className="headers">{t("MainMenuCharactersH")}</p>

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
                    isActive={index === props.allChars.activeChar}
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
