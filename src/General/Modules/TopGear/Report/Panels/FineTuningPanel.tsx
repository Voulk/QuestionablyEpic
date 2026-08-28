import React from "react";
import { Grid, Paper, Typography, Divider, Box, Tooltip } from "@mui/material";

/* ---------------------------------------------------------------------------------------------- */
/*      Prices every gem, enchant, flask and Folio rune against the player's equipped gear.        */
/* ---------------------------------------------------------------------------------------------- */
// The engine evaluates each option by re-running the equipped set with only that setting changed, so these
// numbers already include diminishing returns and the cast model rather than being flat stat-weight estimates.

interface OptionRow {
  option: string;
  hps: number;
  hpsDelta: number;
  scoreDelta: number;
  isCurrent: boolean;
}

interface OptionGroup {
  label: string;
  current: string;
  resolvedTo: string | null;
  unmodelled: boolean;
  rows: OptionRow[];
}

const deltaColour = (delta: number) => (delta > 0 ? "#a0f0a0" : delta < 0 ? "#f28b82" : "rgba(255,255,255,0.5)");

const formatDelta = (row: OptionRow, hasHPS: boolean) => {
  if (hasHPS) {
    if (row.hpsDelta === 0) return "—";
    return (row.hpsDelta > 0 ? "+" : "") + Math.round(row.hpsDelta).toLocaleString() + " HPS";
  }
  if (row.scoreDelta === 0) return "—";
  return (row.scoreDelta > 0 ? "+" : "") + row.scoreDelta + "%";
};

export default function FineTuningPanel(props: any) {
  const comparisons: { [key: string]: OptionGroup } = props.optionComparisons || {};
  const groups = Object.keys(comparisons);

  if (groups.length === 0) {
    return (
      <Typography variant="body2" style={{ color: "rgba(255,255,255,0.7)" }}>
        Import a character so QE Live knows what you're currently wearing, and this tab will price every gem,
        enchant and Folio rune against it.
      </Typography>
    );
  }

  // Some specs are scored on stat weights and produce no throughput figure, in which case we show the relative
  // score difference instead. Never both, so the column means one thing at a time.
  const hasHPS = groups.some((key) => comparisons[key].rows.some((row) => row.hps > 0));

  const optimal = props.optimalConfig;

  return (
    <Grid container spacing={1}>
      {optimal && (
        <Grid item xs={12}>
          <Paper elevation={0} style={{ backgroundColor: "rgba(43,90,120,0.35)", padding: 8, marginBottom: 4 }}>
            <Typography variant="subtitle2" style={{ color: "#7fd1ff", fontWeight: "bold" }}>
              Optimised setup — {"+" + Number(optimal.gain).toLocaleString()} HPS over the defaults
            </Typography>
            <Typography variant="caption" style={{ color: "rgba(255,255,255,0.7)", display: "block", marginTop: 2 }}>
              Searched {optimal.setsOptimized} leading gear sets jointly across gems, enchants, flask and Folio runes.
            </Typography>
            <Box style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6 }}>
              {Object.entries(optimal.config).map(([key, value]) => (
                <Typography key={key} variant="caption" style={{ color: "#a0f0a0" }}>
                  {String(value)}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Grid>
      )}
      <Grid item xs={12}>
        <Typography variant="body2" style={{ color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>
          {hasHPS
            ? "Each option priced against your currently equipped gear. Your current pick is outlined."
            : "Each option compared against your currently equipped gear, as a percentage of set score. Your current pick is outlined."}
        </Typography>
      </Grid>

      {groups.map((key) => {
        const group = comparisons[key];
        const best = group.rows[0];

        return (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <Paper elevation={0} style={{ backgroundColor: "rgba(28,28,28,0.6)", padding: 8, height: "100%" }}>
              <Typography variant="subtitle2" style={{ color: "goldenrod", fontWeight: "bold" }}>
                {group.label}
              </Typography>
              {/* Settings usually read "Automatic", which tells the player nothing about what they're actually
                  running. Name the option it resolved to so the outlined row makes sense. */}
              <Typography variant="caption" style={{ color: "rgba(255,255,255,0.45)", display: "block" }}>
                {group.current === "Automatic" && group.resolvedTo
                  ? "Automatic — " + group.resolvedTo
                  : "Current — " + group.current}
              </Typography>
              <Divider style={{ borderColor: "rgba(255,255,255,0.15)", margin: "4px 0 6px 0" }} />

              {group.unmodelled && (
                <Typography variant="caption" style={{ color: "#f0c674", display: "block", marginBottom: 4 }}>
                  These options aren't modelled yet, so QE Live can't tell them apart.
                </Typography>
              )}

              {(group.unmodelled ? [] : group.rows).map((row) => {
                const isBest = row.option === best.option && (hasHPS ? row.hpsDelta > 0 : row.scoreDelta > 0);
                return (
                  <Tooltip
                    key={row.option}
                    placement="left"
                    title={
                      <Typography variant="caption">
                        {hasHPS ? Math.round(row.hps).toLocaleString() + " HPS with this option" : "Relative set score"}
                        {row.isCurrent ? " — this is your current selection" : ""}
                      </Typography>
                    }
                  >
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 8,
                        padding: "2px 4px",
                        borderRadius: 3,
                        border: row.isCurrent ? "1px solid rgba(255,200,80,0.5)" : "1px solid transparent",
                        backgroundColor: isBest ? "rgba(160,240,160,0.08)" : "transparent",
                      }}
                    >
                      <Typography variant="caption" style={{ color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap" }}>
                        {row.option}
                      </Typography>
                      <Typography variant="caption" style={{ color: deltaColour(hasHPS ? row.hpsDelta : row.scoreDelta), whiteSpace: "nowrap" }}>
                        {formatDelta(row, hasHPS)}
                      </Typography>
                    </Box>
                  </Tooltip>
                );
              })}
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}
