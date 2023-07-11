import React from "react";
import { useTranslation } from "react-i18next";
import makeStyles from "@mui/styles/makeStyles";
import { Card, CardActions, CardContent, Divider, Grid, Typography } from "@mui/material";
import { legendaryImages } from "./LegendaryIcons";
import { legendaryNameTranslator } from "./LegendaryTranslations";
import WowheadTooltip from "General/Modules/1. GeneralComponents/WHTooltips.tsx";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    // minHeight: 200,
    borderColor: "goldenrod",
  },
  content: { height: 150 },
  title: { fontSize: 14 },
  pos: { marginBottom: 12 },
});

export default function LegendaryObject(props) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const classes = useStyles();
  // Item Provided to Component
  const item = props.item;
  // Player Data
  // const player = props.player;
  // HPS String - if > 5 then Round the items effectiveHPS else return "Coming Soon"
  const hpsString = item.effectiveHPS > 5 ? Math.round(item.effectiveHPS) : item.effectiveHPS == -3 ? "Different Cov" : "Coming Soon";
  // DPS String - Round effectiveDPS as string, add 3 spaces of padding to the start of the string
  const paddedDPS = Math.round(item.effectiveDPS).toString().padStart(3);
  // If the dps string is greater than 5, return DPS: paddedDPS else nothing
  const dpsString = item.effectiveDPS > 5 ? "DPS: " + paddedDPS : "";

  const legendaryDataObject = legendaryNameTranslator(item.name)[currentLanguage];

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
        <CardContent sx={{ padding: "8px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "start",
              }}
            >
              <div style={{ display: "inline" }}>
                {/* --------------------------------------- Legendary Icon --------------------------------------- */}
                <WowheadTooltip type="spell" id={item.id} domain={currentLanguage}>
                  <img
                    height={40}
                    width={40}
                    src={legendaryImages[item.name]}
                    alt=""
                    style={{
                      borderRadius: 4,
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: "#ff8000",
                      marginRight: 8,
                    }}
                  />
                </WowheadTooltip>
              </div>

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
                  {legendaryDataObject.name}
                </Typography>
                {/* -------------------------------- Slots available to Legendary -------------------------------- */}
                <Typography variant="caption">{legendaryDataObject.slot}</Typography>
              </div>
            </div>
          </div>
          {/* ---------------------------- Divider to seperate header from body ---------------------------- */}
        </CardContent>
        {/* ------------------------ Divider to seperate body from Drop location. ------------------------ */}
        <Divider />
        <CardActions>
          {/* ----------------------------------- Legendary drop location ---------------------------------- */}
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item xs={12}>
              <div style={{ textAlign: "center", lineHeight: 1.1, fontSize: "16px", width: "100%" }}>{t("HPS") + ": " + hpsString + (dpsString !== "" ? " " + t("DPS") + ": " + dpsString : "")}</div>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}
