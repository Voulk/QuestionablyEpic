import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import HallOfFame from "General/Modules/HallOfFame/HallOfFame";
import Changelog from "General/Modules/ChangeLog/Changelog";
import FooterLinks from "./FooterLinks";
import { changeLog } from "../../ChangeLog/Log";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 6,
    backgroundColor: "rgb(82, 82, 82,0.25)",
    borderRadius: 4,
    marginTop: 80,
    bottom: 0,
  },
  subRoot: {
    [theme.breakpoints.down("xs")]: {
      margin: "auto",
      width: "85%",
    },
    [theme.breakpoints.up("sm")]: {
      margin: "auto",
      width: "80%",
    },
    [theme.breakpoints.up("md")]: {
      margin: "auto",
      width: "65%",
    },
    [theme.breakpoints.up("lg")]: {
      margin: "auto",
      width: "45%",
    },
  },
}));

export default function QEFooter(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <div className={classes.subRoot}>
        <Grid container spacing={1} justify="space-between">
          {/* ---------------------------------------------------------------------------------------------- */
          /*                                         Left Side Links                                        */
          /* ----------------------------------------------------------------------------------------------  */}
          <Grid item>
            <FooterLinks />
          </Grid>

          {/* ---------------------------------------------------------------------------------------------- */
          /*                                        Right Side Links                                        */
          /* ----------------------------------------------------------------------------------------------  */}
          <Grid item>
            <HallOfFame />
            <Changelog />
            <Typography variant="subtitle2" style={{ color: "white" }}>
              {t("Changelog.LastUpdated")} {changeLog[0].date}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
