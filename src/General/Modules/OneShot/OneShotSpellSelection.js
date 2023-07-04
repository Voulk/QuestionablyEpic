import * as React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { OneShotSpellIcon } from "./OneShotSpellIcon";
import WowheadTooltip from "General/Modules/1. GeneralComponents/WHTooltips.tsx";

export default function OneShotSpellSelection(props) {
  const { defensives, activateSpell, defensiveType, label } = props;

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <Paper
        style={{
          border: "1px solid rgba(255, 255, 255, 0.24)",
          padding: "0px 0px 0px 4px",
        }}
        elevation={0}
      >
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
              {label}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container spacing={1} alignItems="center">
              {defensives
                .filter((d) => d.defensiveType === defensiveType)
                .map((spell, index) => (
                  <Grid item xs="auto" key={index}>
                    <WowheadTooltip type="spell" id={spell.guid}>
                      <OneShotSpellIcon
                        spell={spell}
                        iconType={"Spell"}
                        draggable
                        onClick={(e) => {
                          activateSpell(e, spell);
                        }}
                      />
                    </WowheadTooltip>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
