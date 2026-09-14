import { Box, Grid, Typography, Divider, Tooltip, IconButton } from "@mui/material";
import WowheadTooltip from "General/Modules/GeneralComponents/WHTooltips";
import HelpIcon from '@mui/icons-material/Help';
import { getFolioIcon } from "Retail/Engine/EffectFormulas/Generic/PatchEffectItems/OmniumFolioData";
import { getEnchantIcon } from "General/Engine/EnchantUtilities";

interface ConsumablesPanelProps {
  flask: number
}

export default function TopGearFolioEntry({ flask = 0 }: ConsumablesPanelProps) {

  const slots = [flask, 271884]

  return (
    <Grid
      item
      xs="auto"
      sx={{
        width: 260,
        border: 1,
        borderRadius: 2,
        marginTop: 2,
        borderStyle: "solid",
        borderColor: "yellow",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Title */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 1.25,
          pt: 0.5,
          pb: 0.5,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            letterSpacing: 0.4,
            color: "text.secondary",
            lineHeight: 1,
          }}
        >
          Consumables
        </Typography>
 
        <Tooltip title="Recommended Consumables. The difference between different flasks is often small.">
          <IconButton
            size="small"
            aria-label="Learn more about recommended consumables"
            sx={{ p: 0.25 }}
          >
            <HelpIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Divider sx={{ mx: 1.25 }} />

      {/* Icon row */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 0.75,
          px: 1.25,
          py: 1,
        }}
      >
        {slots.map((slot, i) => (
            <WowheadTooltip type="item" id={slot} domain="retail" >
                <img
                alt="img"
                width={28}
                height={28}
                src={`https://wow.zamimg.com/images/wow/icons/large/${getEnchantIcon(slot)}.jpg`}
                style={{
                    borderRadius: 4,
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "goldenrod",
                }}
                />
            </WowheadTooltip>
        ))}
      </Box>
    </Grid>
  );
}                         