import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
 
// ─── Types ────────────────────────────────────────────────────────────────────
 
export interface PanelProps {
  title: string;
  children: React.ReactNode;
  /** Optional action element rendered on the right side of the title bar (e.g. a dropdown or icon button) */
  action?: React.ReactNode;
}

// ─── Design tokens ────────────────────────────────────────────────────────────
// Shared with SpellBreakdown / ControlPanel / ModelInformationTabs / StatScalingChart:
// cool slate base, Space Grotesk for the title, gold as the neutral chrome accent.

const FONT_DISPLAY = "'Space Grotesk', 'Segoe UI', system-ui, sans-serif";

const COLORS = {
  bg: "#15171c",
  border: "rgba(255,255,255,0.06)",
};

const PRIMARY = "#e3b341";
 
// ─── Component ────────────────────────────────────────────────────────────────
 
const TCPanel: React.FC<PanelProps> = ({ title, children, action }) => {
  return (
    <Box
      sx={{
        background: COLORS.bg,
        border: `1px solid ${COLORS.border}`,
        borderRadius: "8px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Title bar */}
      {title && (
        <Box
          sx={{
            px: "16px",
            py: "12px",
            borderBottom: `1px solid ${COLORS.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "11px",
              fontFamily: FONT_DISPLAY,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: PRIMARY,
            }}
          >
            {title}
          </Typography>
          {action && <Box>{action}</Box>}
        </Box>
      )}
 
      {/* Content */}
      <Box sx={{ flex: 1 }}>
        {children}
      </Box>
    </Box>
  );
};
 
export default TCPanel;
 
// ─── Usage ────────────────────────────────────────────────────────────────────
//
// Wrap any chart or table in <Panel title="..."> to get consistent chrome.
// The optional `action` prop lets you slot in a control (e.g. a view toggle)
// into the title bar without modifying Panel itself.
//
// <Panel title="Spell Breakdown">
//   <SpellBreakdown rows={rows} />
// </Panel>
//
// <Panel title="HPS Over Time" action={<MyDropdown />}>
//   <MyLineChart data={data} />
// </Panel>