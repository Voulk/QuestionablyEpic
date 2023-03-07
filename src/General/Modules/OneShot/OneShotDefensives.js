import * as React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { OneShotSpellIcon } from "./OneShotSpellIcon";

export default function OneShotDefensives(props) {
  const { defensives, activateSpell } = props;

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
              {"Defensives"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container spacing={1} alignItems="center">
              {defensives
                .filter((d) => d.defensiveType === "defensive")
                .map((spell, index) => (
                  <Grid item xs="auto" key={index}>
                    <OneShotSpellIcon
                      spell={spell}
                      iconType={"Spell"}
                      draggable
                      onClick={(e) => {
                        activateSpell(e, spell);
                      }}
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
