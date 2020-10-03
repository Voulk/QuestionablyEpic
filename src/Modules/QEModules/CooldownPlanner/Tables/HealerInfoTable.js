import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import classicons from "../Functions/IconFunctions/ClassIcons";
import talentIcons from "../Functions/IconFunctions/TalentIcons";
import { classColoursJS } from "../Functions/ClassColourFunctions";
import { useTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "100%",

    "& .MuiAccordionSummary-root": {
      minHeight: 0,
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    textAlign: "center",
  },
  content: {
    "& .MuiAccordionSummary-content.Mui-expanded": {
      margin: 0,
    },
    "& .MuiAccordionSummary-content": {
      margin: 0,
    },
    "& .MuiIconButton-root": {
      padding: 0,
    },
  },
}));

export default function HealerInfoTable(props) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Grid container spacing={1} style={{ display: "block", marginTop: "4px" }}>
      {props.heals.map((key, index) => (
        <Grid conatiner item>
          <Card
            style={{
              // width: "100%",
              display: "inline-flex",
              backgroundColor: "#353535",
            }}
            raised
          >
            <Grid container item justify="center" style={{ margin: 4}} >
              <Grid item xs={12}>
                <CardContent style={{ padding: "0px 8px 0px 8px" }}>
                  <Typography
                    style={{
                      color: classColoursJS(key.type),
                    }}
                    className={classes.heading}
                  >
                    {classicons(key.icon, 16)}
                    {key.name}
                  </Typography>
                </CardContent>
              </Grid>
              <Grid item xs="auto" style={{ display: "inline-flex" }}>
                <CardContent style={{ padding: "2px 8px 2px 8px" }}>
                  <Typography className={classes.heading} color="primary">
                    {t("HDAccordianTitles.StatsHeading")}
                  </Typography>
                  <Divider />
                  {key.stats.map((stats) => (
                    <Typography style={{ textAlign: "center" }}>
                      {t("HDAccordianTitles.Item Level")} {stats.ilvl}
                    </Typography>
                  ))}
                  {key.stats.map((stats) => (
                    <Typography style={{ textAlign: "center" }}>
                      {t("HDAccordianTitles.Crit")} {stats.crit}
                    </Typography>
                  ))}
                  {key.stats.map((stats) => (
                    <Typography style={{ textAlign: "center" }}>
                      {t("HDAccordianTitles.Haste")} {stats.haste}
                    </Typography>
                  ))}
                  {key.stats.map((stats) => (
                    <Typography style={{ textAlign: "center" }}>
                      {t("HDAccordianTitles.Mastery")} {stats.mastery}
                    </Typography>
                  ))}
                  {key.stats.map((stats) => (
                    <Typography style={{ textAlign: "center" }}>
                      {t("HDAccordianTitles.Versatility")} {stats.versatility}
                    </Typography>
                  ))}
                </CardContent>
              </Grid>
              <Grid item xs={8} justify="center">
                <CardContent style={{ padding: "4px 8px 4px 8px"}} >
                  <Typography className={classes.heading} color="primary">
                    {t("HDAccordianTitles.TalentHeader")}
                  </Typography>
                  <Divider />
                  <div style={{ textAlignLast: "center"}}>
                  {key.talents.map((talent) => talentIcons(talent.guid))}
                  </div>
                </CardContent>
                <CardContent style={{ padding: "4px 8px 4px 8px" }}>
                  <Typography className={classes.heading} color="primary">
                    {t("HDAccordianTitles.CovenantHeader")}
                  </Typography>
                  <Divider />
                </CardContent>
                <CardContent style={{ padding: "4px 8px 4px 8px" }}>
                  <Typography className={classes.heading} color="primary">
                    {t("HDAccordianTitles.LegendaryHeader")}
                  </Typography>
                  <Divider />
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}