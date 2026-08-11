import { Box, Grid, Paper, Typography, Divider } from "@mui/material";
import WowheadTooltip from "General/Modules/GeneralComponents/WHTooltips";
import { getItemIcon } from "General/Engine/ItemUtilities";
import { CONSTANTS } from "General/Engine/CONSTANTS";

export default function EquippedItems({ items, gameType, contentType = "Raid" }) {
  if (items.length === 0) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        borderRadius: "10px",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        background: "linear-gradient(180deg, rgba(20, 23, 30, 0.92) 0%, rgba(14, 16, 22, 0.94) 100%)",
      }}
    >
      <Typography
        variant="subtitle1"
        align="start"
        sx={{
          fontWeight: 700,
          mb: 1,
          letterSpacing: "0.02em",
          color: "rgba(255, 255, 255, 0.95)",
        }}
      >
        Currently Equipped Items - {contentType}
      </Typography>
      <Divider sx={{ mb: 2, borderColor: "rgba(255, 255, 255, 0.16)" }} />
      <Grid container spacing={1} justifyContent="flex-start" alignItems="center" wrap="wrap">
        {items.map((item, index) => (
          <Grid item key={index}>
            <WowheadTooltip
              type="item"
              id={item.id}
              level={item.level}
              bonusIDS={item.bonusIDS}
              domain={gameType === "Retail" ? "en" : "mop-classic"}
            >
              <Box
                sx={{
                  p: "4px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                  background: "rgba(255, 255, 255, 0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "transform 160ms ease, box-shadow 160ms ease, background-color 160ms ease",
                  "&:hover": {
                    transform: "translateY(-1px) scale(1.05)",
                    boxShadow: "0 6px 14px rgba(0, 0, 0, 0.35)",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                  },
                }}
              >
                <img
                  src={getItemIcon(item.id, gameType)}
                  alt=""
                  style={{
                    height: 32,
                    width: 32,
                    borderRadius: "7px",
                    border: "2px solid",
                    borderColor: CONSTANTS.qualityColors[item.quality] || "#a73fee",
                    display: "block",
                  }}
                />
              </Box>
            </WowheadTooltip>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
