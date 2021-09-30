import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import HallOfFame from "General/Modules/HallOfFame/HallOfFame";
import Changelog from "General/Modules/ChangeLog/Changelog";
import FooterLinks from "./FooterLinks";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 4,
    backgroundColor: "rgb(82, 82, 82,0.15)",
    borderRadius: 4,
    marginTop: 100,
    bottom: 0,
  },
  subRoot: { margin: "auto", width: "45%" },
}));

export default function QEFooter(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <div className={classes.subRoot}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={3}>
            <FooterLinks />
          </Grid>
          <Grid item xs={6}>
            <HallOfFame />
            <Changelog />
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </div>
    </div>
  );
}
