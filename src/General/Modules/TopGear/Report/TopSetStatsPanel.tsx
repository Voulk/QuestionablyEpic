import React from "react";
import { Paper, Grid, Typography, Divider, Tooltip, Box } from "@mui/material";

import { getMasteryPercentage, STATCONVERSION } from "../../../Engine/STAT";
import { useTranslation } from "react-i18next";

/* ---------------------------------------------------------------------------------------------- */
/*                   This is the stats panel for the Top Gear current best set.                   */
/* ---------------------------------------------------------------------------------------------- */

interface StatBreakdown {
  gear: number;
  effects: number;
  gemsAndEnchants: number;
  consumables: number;
  talents: number;
  total: number;
}

interface StatEntry {
  label: string;
  value: number;
  breakdown?: StatBreakdown;
}

export default function TopSetStatsPanel(props) {
  const statList = props.statList;
  const { t } = useTranslation();
  const gameType = props.gameType;
  const stats =
    gameType === "Retail"
      ? [
          {label: "Intellect", value: statList.intellect, breakdown: { gear: 2000, effects: 500, gemsAndEnchants: 300, consumables: 20, talents: 5, total: 2800 }},
          {label: "Haste", value: statList.haste / STATCONVERSION.HASTE, breakdown: { gear: 1500, effects: 400, gemsAndEnchants: 200, consumables: 10, talents: 0, total: 2110 }},
          {label: "Crit", value: statList.crit / STATCONVERSION.CRIT, breakdown: { gear: 1200, effects: 300, gemsAndEnchants: 150, consumables: 5, talents: 0, total: 1655 }},
          {label: "Mastery", value: getMasteryPercentage(statList.mastery, props.spec), breakdown: { gear: 1000, effects: 200, gemsAndEnchants: 100, consumables: 5, talents: 0, total: 1305 }},
          {label: "Versatility", value: statList.versatility / STATCONVERSION.VERSATILITY, breakdown: { gear: 800, effects: 150, gemsAndEnchants: 80, consumables: 5, talents: 0, total: 1035 }},
          {label: "Leech", value: statList.leech / STATCONVERSION.LEECH, breakdown: { gear: 500, effects: 100, gemsAndEnchants: 50, consumables: 0, talents: 0, total: 650 }},
        ]
      : [
          {label: "Spellpower", value: statList.spellpower},
          {label: "Intellect", value: statList.intellect},
          {label: "Spirit", value: statList.spirit},
          {label: "Crit", value: statList.crit},
          {label: "Haste", value: statList.haste},
          {label: "Mastery", value: statList.mastery},
        ];

  /* ----------------------- Returns a formatted string for the stat panel. ----------------------- */
  function printStat(stat, value, gameType) {
    if (gameType === "Retail" && ["Haste", "Crit", "Versatility", "Mastery", "Leech"].includes(stat)) {
      return t(stat) + ": " + Math.round(100 * value) / 100 + "%";
    } 
    else return t(stat) + ": " + Math.floor(value);
  }

  function addMods(spec, stat, value) {
    if (spec === "Holy Paladin") {
      if (stat === "Crit") return value + 0.04;
      else if (stat === "Haste") return value * 1.04;
      else if (stat === "Mastery") return value + 0.06;
    }

  }

  const StatTooltip = ({ breakdown, label }: { breakdown: StatBreakdown; label: string }) => (
  <Box sx={{ p: 1, minWidth: 180 }}>
    <Typography variant="caption" sx={{ color: "goldenrod", fontWeight: "bold", display: "block", mb: 0.5 }}>
      {label}
    </Typography>
    <Divider sx={{ borderColor: "rgba(255,255,255,0.15)", mb: 0.75 }} />
    {[
      { label: "Gear",            value: breakdown.gear,            color: "#aad4f5" },
      { label: "Effects",         value: breakdown.effects,         color: "#a0f0a0" },
      { label: "Gems & Enchants", value: breakdown.gemsAndEnchants, color: "#e0a0f0" },
      { label: "Consumables",     value: breakdown.consumables,     color: "#f0d080" },
      { label: "Talents & Buffs",         value: breakdown.talents,         color: "#80c8f0" },
    ].map(({ label, value, color }) => (
      <Box key={label} sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 0.25 }}>
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>{label}</Typography>
        <Typography variant="caption" sx={{ color }}>{value.toLocaleString()}</Typography>
      </Box>
    ))}
    <Divider sx={{ borderColor: "rgba(255,255,255,0.15)", mt: 0.75, mb: 0.5 }} />
    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.85)", fontWeight: "bold" }}>Total Rating</Typography>
      <Typography variant="caption" sx={{ color: "white", fontWeight: "bold" }}>{breakdown.total.toLocaleString()}</Typography>
    </Box>
  </Box>
);

const tooltipSlotProps = {
  tooltip: {
    sx: {
      bgcolor: "rgba(10, 10, 18, 0.97)",
      border: "1px solid rgba(255, 200, 80, 0.4)",
      borderRadius: "4px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.8)",
      p: 0,
    },
  },
  arrow: {
    sx: { color: "rgba(255, 200, 80, 0.4)" },
  },
};

return (
  <Paper
    elevation={0}
    sx={{
      fontSize: "12px",
      textAlign: "left",
      minHeight: 90,
      maxWidth: 300,
      width: { xs: "100%", sm: "300px" },
      bgcolor: "rgba(44, 44, 44, 0.5)",
      margin: "auto",
    }}
  >
    <Grid container direction="column" spacing={1}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" align="center" color="primary">
          {t("TopGear.StatPanel.AvgStats")}
        </Typography>
        <Divider variant="middle" />
      </Grid>

      <Grid item xs={12} sx={{ p: "4px 16px 16px 16px" }}>
        <Grid container direction={{ xs: "column", sm: "row" }} spacing={0}>
          {stats.map((stat, index) => (
            <Grid item xs={6} key={index}>
              <Tooltip
                arrow
                placement="right"
                disableHoverListener={!stat.breakdown}
                title={stat.breakdown ? <StatTooltip breakdown={stat.breakdown} label={stat.label} /> : ""}
                slotProps={tooltipSlotProps}
              >
                <Typography
                  variant="subtitle2"
                  align="left"
                  sx={{
                    ml: "4px",
                    cursor: stat.breakdown ? "help" : "default",
                    borderBottom: stat.breakdown ? "1px dashed rgba(255,255,255,0.25)" : "none",
                    display: "inline-block",
                    "&:hover": stat.breakdown ? { color: "goldenrod" } : {},
                    transition: "color 0.15s ease",
                  }}
                >
                  {printStat(stat.label, stat.value, gameType)}
                </Typography>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  </Paper>
);

}
