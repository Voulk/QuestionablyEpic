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

const getBreakdownEntry = (breakdownEntry: any, stat: string): number => {
  if (stat in breakdownEntry) {
    return Math.round(breakdownEntry[stat]);
  }
  else return 0;
}

const getTotal = (breakdownEntry: any, stat: string): number => {
  return Math.max(Math.round(
    getBreakdownEntry(breakdownEntry.gear, stat) +
    getBreakdownEntry(breakdownEntry.effects, stat) +
    getBreakdownEntry(breakdownEntry.gems, stat) +
    getBreakdownEntry(breakdownEntry.enchants, stat) +
    getBreakdownEntry(breakdownEntry.consumables, stat)
  ), 0);
}

export default function TopSetStatsPanel(props) {
  const statList = props.statList;
  const breakdown = props.statBreakdown;
  const { t } = useTranslation();
  const gameType = props.gameType;
  const setHPS = props.setHPS || 0;
  const equippedHPS = props.equippedHPS || 0;

  // How much of an upgrade the best set is over what the player is wearing right now. Negative is possible and is
  // shown as such - it means the set Top Gear built is worse than what they already have on.
  const upgradePercent = equippedHPS > 0 && setHPS > 0 ? ((setHPS - equippedHPS) / equippedHPS) * 100 : null;
  const formatUpgrade = (percent: number) => (percent > 0 ? "+" : "") + (Math.round(percent * 100) / 100) + "%";

  // A dead-on 0% almost always means the player ran Top Gear without adding any candidate items, so the best set
  // is simply the gear they're wearing. "+0.00%" reads like the comparison failed, so say what happened instead.
  const isSameAsEquipped = upgradePercent !== null && Math.abs(setHPS - equippedHPS) < 1;
  const stats =
    gameType === "Retail"
      ? [
          {label: "Intellect", value: statList.intellect, breakdown: { gear: getBreakdownEntry(breakdown.gear, "intellect"), effects: getBreakdownEntry(breakdown.effects, "intellect"), gemsAndEnchants: getBreakdownEntry(breakdown.gems, "intellect") + getBreakdownEntry(breakdown.enchants, "intellect"), consumables: getBreakdownEntry(breakdown.consumables, "intellect"), talents: "3%", total: getTotal(breakdown, "intellect") }},
          {label: "Haste", value: statList.haste / STATCONVERSION.HASTE, breakdown: { gear: getBreakdownEntry(breakdown.gear, "haste"), effects: getBreakdownEntry(breakdown.effects, "haste"), gemsAndEnchants: getBreakdownEntry(breakdown.gems, "haste") + getBreakdownEntry(breakdown.enchants, "haste"), consumables: getBreakdownEntry(breakdown.consumables, "haste"), talents: 0, total: getTotal(breakdown, "haste") }},
          {label: "Crit", value: statList.crit / STATCONVERSION.CRIT, breakdown: { gear: getBreakdownEntry(breakdown.gear, "crit"), effects: getBreakdownEntry(breakdown.effects, "crit"), gemsAndEnchants: getBreakdownEntry(breakdown.gems, "crit") + getBreakdownEntry(breakdown.enchants, "crit"), consumables: getBreakdownEntry(breakdown.consumables, "crit"), talents: 0, total: getTotal(breakdown, "crit") }},
          {label: "Mastery", value: getMasteryPercentage(statList.mastery, props.spec), breakdown: { gear: getBreakdownEntry(breakdown.gear, "mastery"), effects: getBreakdownEntry(breakdown.effects, "mastery"), gemsAndEnchants: getBreakdownEntry(breakdown.gems, "mastery") + getBreakdownEntry(breakdown.enchants, "mastery"), consumables: getBreakdownEntry(breakdown.consumables, "mastery"), talents: 0, total: getTotal(breakdown, "mastery") }},
          {label: "Versatility", value: statList.versatility / STATCONVERSION.VERSATILITY, breakdown: { gear: getBreakdownEntry(breakdown.gear, "versatility"), effects: getBreakdownEntry(breakdown.effects, "versatility"), gemsAndEnchants: getBreakdownEntry(breakdown.gems, "versatility") + getBreakdownEntry(breakdown.enchants, "versatility"), consumables: getBreakdownEntry(breakdown.consumables, "versatility"), talents: 0, total: getTotal(breakdown, "versatility") }},
          {label: "Leech", value: statList.leech / STATCONVERSION.LEECH, breakdown: { gear: getBreakdownEntry(breakdown.gear, "leech"), effects: getBreakdownEntry(breakdown.effects, "leech"), gemsAndEnchants: getBreakdownEntry(breakdown.gems, "leech") + getBreakdownEntry(breakdown.enchants, "leech"), consumables: getBreakdownEntry(breakdown.consumables, "leech"), talents: 0, total: getTotal(breakdown, "leech") }},
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
    else return t(stat) + ": " + Math.round(value);
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
      ...(label === "Intellect" 
        ? [{ label: "Armor Specialization Bonus", value: "5%", color: "#ffb3ba" }] 
        : [])
    ].map(({ label, value, color }) => (
      <Box key={label} sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 0.25 }}>
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>{label}</Typography>
        <Typography variant="caption" sx={{ color }}>{value.toLocaleString()}</Typography>
      </Box>
    ))}
    <Divider sx={{ borderColor: "rgba(255,255,255,0.15)", mt: 0.75, mb: 0.5 }} />
    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.85)", fontWeight: "bold" }}>Effective Rating</Typography>
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

        {/* Absolute throughput. Only rendered for specs / content types that are evaluated through a cast model or
            ramp sim, since those are the only paths that produce a real healing number. */}
        {setHPS > 0 && (
          <>
            <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
            <Tooltip
              arrow
              placement="right"
              title={
                <Box sx={{ p: 1, minWidth: 200 }}>
                  <Typography variant="caption" sx={{ color: "goldenrod", fontWeight: "bold", display: "block", mb: 0.5 }}>
                    Estimated HPS
                  </Typography>
                  <Divider sx={{ borderColor: "rgba(255,255,255,0.15)", mb: 0.75 }} />
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)", display: "block" }}>
                    Total healing per second this set is modelled to do, from a full cast profile at these stats.
                    Use it to compare sets - it is not a prediction of your logs.
                  </Typography>
                  {upgradePercent !== null && (
                    <>
                      <Divider sx={{ borderColor: "rgba(255,255,255,0.15)", mt: 0.75, mb: 0.5 }} />
                      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>Currently equipped</Typography>
                        <Typography variant="caption" sx={{ color: "#aad4f5" }}>{Math.round(equippedHPS).toLocaleString()}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>Gained</Typography>
                        <Typography variant="caption" sx={{ color: "#a0f0a0" }}>
                          {(setHPS - equippedHPS >= 0 ? "+" : "") + Math.round(setHPS - equippedHPS).toLocaleString()}
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>
              }
              slotProps={tooltipSlotProps}
            >
              <Typography
                variant="subtitle2"
                align="center"
                sx={{
                  cursor: "help",
                  color: "goldenrod",
                  fontWeight: "bold",
                  display: "block",
                  transition: "color 0.15s ease",
                }}
              >
                {Math.round(setHPS).toLocaleString() + " HPS"}
                {upgradePercent !== null && !isSameAsEquipped && (
                  <span style={{ color: upgradePercent > 0 ? "#a0f0a0" : "#f28b82", fontWeight: "normal" }}>
                    {" (" + formatUpgrade(upgradePercent) + ")"}
                  </span>
                )}
              </Typography>
            </Tooltip>

            {isSameAsEquipped && (
              <Typography variant="caption" align="center" sx={{ color: "rgba(255,255,255,0.5)", display: "block" }}>
                Same as your equipped gear — add items to compare
              </Typography>
            )}
          </>
        )}
      </Grid>
    </Grid>
  </Paper>
);

}
