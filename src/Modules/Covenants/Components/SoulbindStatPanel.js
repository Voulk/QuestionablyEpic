import React from "react";
import { Paper, Grid, Typography, Divider } from "@material-ui/core";
import { useTranslation } from "react-i18next";

// The soulbind stat panel sums up all of the active soulbinds in the tree.
export default function SoulbindStatPanel(props) {
  const { t, i18n } = useTranslation();
  const covAbilityEst = props.covAbility > 0 ? props.covAbility : "NA";

  return (
    <Grid item xs={12} style={{ paddingBottom: 8 }}>
      <Paper
        style={{
          fontSize: "12px",
          textAlign: "left",
          minHeight: 90,
        }}
      >
        <Grid container direction="column" spacing={1}>
          <Grid item xs={12}>
            <Typography
              style={{ fontSize: 18 }}
              variant="h6"
              align="center"
              color="primary"
            >
              {t("Soulbinds.StatPanel.Summary")}
            </Typography>
            <Divider variant="middle" />
          </Grid>
          <Grid container direction="column">
            <Grid item xs={12}>
              <Typography
                style={{ fontSize: 16 }}
                variant="body1"
                align="center"
              >
                {t("Soulbinds.StatPanel.Score")}: {props.hps + props.covAbility}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                style={{ fontSize: 16 }}
                variant="body1"
                align="center"
              >
                {t("Soulbinds.StatPanel.CovenantEstimate")}: {covAbilityEst}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                style={{ fontSize: 16 }}
                variant="body1"
                align="center"
              >
                {t("Soulbinds.StatPanel.SelectedNodes")}: {props.hps}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
