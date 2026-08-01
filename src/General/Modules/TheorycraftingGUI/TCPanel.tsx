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
 
// ─── Component ────────────────────────────────────────────────────────────────
 
const TCPanel: React.FC<PanelProps> = ({ title, children, action }) => {
  return (
    <Box
      sx={{
        background: "#1e1e1e",
        border: "1px solid #3a3a3a",
        borderRadius: "6px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Title bar */}
      <Box
        sx={{
          px: "16px",
          py: "12px",
          borderBottom: "1px solid #2e2e2e",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontSize: "11px",
            fontFamily: "'Cinzel', Georgia, serif",
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#DAA520",
          }}
        >
          {title}
        </Typography>
        {action && <Box>{action}</Box>}
      </Box>
 
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