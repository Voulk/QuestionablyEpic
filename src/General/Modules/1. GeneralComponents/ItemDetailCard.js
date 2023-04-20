import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardActions, CardContent, Divider, Grid, Typography, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getItemIcon } from "General/Engine/ItemUtilities";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    borderColor: theme.palette.secondary.main,
    padding: 8,
  },
  content: {
    minHeight: 150,
  },
  title: {
    fontSize: 14,
  },
}));

function ItemDetailCard(props) {
  // const { item } = props;
  const item = {
    effectiveHPS: 500,
    effectiveDPS: 500,
    name: "Glowing Shard of the Elements",
    slot: "Trinkets",
    id: 191492,
    description:
      "This trinket is a small, glowing shard of crystal that seems to pulse with elemental energy. It emits a faint humming sound when held. The Glowing Shard of the Elements has the power to enhance the wearer's elemental abilities and grant additional resistance to elemental attacks. When activated, the trinket glows brightly, releasing a burst of energy that can damage nearby enemies and heal nearby allies. This effect can only be used once every few minutes, but the trinket also has a passive effect that increases the wearer's spell power and critical strike chance with elemental spells. The Glowing Shard of the Elements is highly sought after by spellcasters who specialize in elemental magic.",
  };

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const classes = useStyles();

  const hpsString = item.effectiveHPS > 5 ? Math.round(item.effectiveHPS) : item.effectiveHPS === -3 ? t("Different Cov") : t("Coming Soon");
  const dpsString = item.effectiveDPS > 5 ? `${t("DPS")}: ${Math.round(item.effectiveDPS).toString().padStart(3)}` : "";

  return (
    <Grid item xs={12}>
      <Paper className={classes.root} variant="outlined">
        <Grid container spacing={0.5}>
          <Grid item xs={12}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <a data-wowhead={`spell=${item.id}&domain=${currentLanguage}`}>
                      <img height={40} width={40} src={getItemIcon(item.id)} alt="" style={{ borderRadius: 4, borderWidth: "1px", borderStyle: "solid", borderColor: "#ff8000" }} />
                    </a>
                  </Grid>
                  <Grid item>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <Typography color="primary" variant="h6" component="h2" style={{ fontSize: item.slot === "Trinket" ? "0.9rem" : "1rem", alignSelf: "center", lineHeight: 1 }}>
                          {item.name}
                        </Typography>
                        {item.slot === "Trinket" ? <Typography variant="caption">{item.slot}</Typography> : ""}
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                  <Grid item xs={12}>
                    <div style={{ textAlign: "center", lineHeight: 1.1, fontSize: "16px", width: "100%" }}>{`${t("HPS")}: ${hpsString}${dpsString !== "" ? ` ${dpsString}` : ""}`}</div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default ItemDetailCard;
