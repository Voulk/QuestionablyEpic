import { Box, Grid, Typography, Divider, Tooltip, IconButton } from "@mui/material";
import WowheadTooltip from "General/Modules/GeneralComponents/WHTooltips";
import HelpIcon from '@mui/icons-material/Help';

interface TopGearFolioEntryProps {
  icons?: React.ReactNode[];
}

export default function TopGearFolioEntry({ icons = [] }: TopGearFolioEntryProps) {
  //let slots = Array.from({ length: 1 }, (_, i) => icons[i] ?? null);
  const slots = [{id: 1279599, icon: "inv_summerfest_firespirit"},
                  {id: 1279603, icon: "spell_shadow_felmending"},
                  {id: 1287555, icon: "item_shadowcloth"}
  ];

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
          Omnium Folio
        </Typography>
 
        <Tooltip title="The Omnium Folio releases over 5 weeks. Click this to learn more about it.">
          <IconButton
            size="small"
            onClick={() => window.open("https://www.wowhead.com/guide/midnight/omnium-folio-unlock-buffs-rewards", "_blank", "noopener,noreferrer")}
            aria-label="Learn more about the Omnium Folio"
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
            <WowheadTooltip type="spell" id={slot.id} domain="retail" >
                <img
                alt="img"
                width={28}
                height={28}
                src={`https://wow.zamimg.com/images/wow/icons/large/${slot.icon}.jpg`}
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