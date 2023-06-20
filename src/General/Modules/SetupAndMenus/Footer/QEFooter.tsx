import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import HallOfFame from "General/Modules/HallOfFame/HallOfFame";
import Changelog from "General/Modules/ChangeLog/Changelog";
import FooterLinks from "./FooterLinks";
import { changeLog } from "../../ChangeLog/Log";

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const useStyles = makeStyles((theme?: any) => ({
  root: {
    padding: 12,
    backgroundColor: "rgb(82, 82, 82,0.25)",
    borderRadius: 4,
    marginTop: 80,
    bottom: 0,
    position: "relative",
    left: 0,
  },
  subRoot: {
    [theme.breakpoints.down("md")]: {
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

export default function QEFooter() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <div className={classes.subRoot}>
        <Grid container spacing={1} justifyContent="space-between">
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
