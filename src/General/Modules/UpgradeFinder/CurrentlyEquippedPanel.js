import { Grid, Paper, Typography, Divider } from "@mui/material";
import WowheadTooltip from "General/Modules/GeneralComponents/WHTooltips"; // adjust the path if needed
import { getItemIcon } from "General/Engine/ItemUtilities"; // adjust the path if needed
import { CONSTANTS } from "General/Engine/CONSTANTS";

export default function EquippedItems({ items, gameType, contentType="Raid" }) {

  if (items.length === 0) return null;
  console.log(items);

  return (
    <Paper
      elevation={2}
      sx={{ padding: 2, width: "100%" }}
      
    >
      <Typography
        variant="subtitle1"
        align="start"
        sx={{ fontWeight: 600, mb: 1 }}
      >
        Currently Equipped Items - {contentType}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={1} justifyContent="flex-start" alignItems="center" wrap="wrap">
        {items.map((item, index) => (
          <Grid item key={index}>
            <WowheadTooltip type="item" id={item.id} level={item.level} bonusIDS={item.bonusIDS} domain={gameType === "Retail" ? currentLanguage : "mop-classic"}>
              <img
                src={getItemIcon(item.id, gameType)}
                alt=""
                style={{
                  height: 32,
                  width: 32,
                  borderRadius: "8px",
                  border: "2px solid",
                  borderColor: CONSTANTS.qualityColors[item.quality] || "#a73fee",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                  e.currentTarget.style.boxShadow = "0 0 8px rgba(255, 255, 255, 0.5)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </WowheadTooltip>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
