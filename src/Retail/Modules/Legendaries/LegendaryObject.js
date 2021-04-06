import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardActions, CardContent, Divider, Grid, Typography } from "@material-ui/core";
import { legendaryImages } from "./LegendaryIcons";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 200,
    borderColor: "goldenrod",
  },
  content: { height: 150 },
  title: { fontSize: 14 },
  pos: { marginBottom: 12 },
});

export default function LegendaryObject(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  // Item Provided to Component
  const item = props.item;
  // Player Data
  const player = props.player;
  // HPS String - if > 5 then Round the items effectiveHPS else return "Coming Soon"
  const hpsString = item.effectiveHPS > 5 ? Math.round(item.effectiveHPS) : "Coming Soon";
  // DPS String - Round effectiveDPS as string, add 3 spaces of padding to the start of the string
  const paddedDPS = Math.round(item.effectiveDPS).toString().padStart(3);
  // If the dps string is greater than 5, return DPS: paddedDPS else nothing
  const dpsString = item.effectiveDPS > 5 ? "DPS: " + paddedDPS : "";

  return (
    // Breakpoints (12 units / row)
    // value         |0px     600px    960px    1280px   1920px
    // key           |xs      sm       md       lg       xl
    // screen width  |--------|--------|--------|--------|-------->
    // range         |   xs   |   sm   |   md   |   lg   |   xl
    // xs - 12/12 = one card per row,
    // sm = 6/12 = Two cards per row,
    // lg = 4/12 = Three cards per row,
    // xl = 3/12 = Four cards per row

    <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
      <Card className={classes.root} variant="outlined">
        <CardContent className={classes.content}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ alignSelf: "center" }}>
              {/* --------------------------------------- Legendary Name --------------------------------------- */}
              <Typography
                color="primary"
                variant="h6"
                component="h2"
                style={{
                  fontSize: "0.9rem",
                  alignSelf: "center",
                  lineHeight: 1,
                }}
              >
                {t(item.name + ".name")}
              </Typography>
              {/* -------------------------------- Slots available to Legendary -------------------------------- */}
              <Typography variant="caption">{t(item.name + ".slot")}</Typography>
            </div>
            {/* --------------------------------------- Legendary Icon --------------------------------------- */}
            <img
              height={40}
              width={40}
              src={legendaryImages[item.name].default}
              alt=""
              style={{
                borderRadius: 4,
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "#ff8000",
              }}
            />
          </div>
          {/* ---------------------------- Divider to seperate header from body ---------------------------- */}
          <Divider style={{ marginTop: 4 }} />
          <Grid container direction="row" justify="space-between" alignItems="center" style={{ height: 110 }}>
            <Grid item xs={12}>
              <CardContent style={{ padding: 0 }}>
                {/* -------------------------------- Legendary Effect Description -------------------------------- */}
                <Typography align="left" variant="caption" style={{ fontSize: "0.75rem", lineHeight: 1.1 }} component="p">
                  {t(item.name + ".desc")}
                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs={12}>
              <CardContent style={{ padding: 0, height: 20 }}>
                {/* -------------------------------------- HPS / DPS Scores -------------------------------------- */}
                <Typography align="center" variant="caption" component="p" style={{ lineHeight: 1.1, fontSize: "16px" }}>
                  {t("HPS")}: {hpsString}
                  <br />
                  {dpsString !== "" ? dpsString : ""}
                  <br />
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </CardContent>
        {/* ------------------------ Divider to seperate body from Drop location. ------------------------ */}
        <Divider />
        <CardActions>
          {/* ----------------------------------- Legendary drop location ---------------------------------- */}
          <Typography variant="caption" component="p" style={{ padding: "0px 8px" }}>
            {t("Source")}: {t(item.name + ".droploc")}
          </Typography>
        </CardActions>
      </Card>
    </Grid>
  );
}
