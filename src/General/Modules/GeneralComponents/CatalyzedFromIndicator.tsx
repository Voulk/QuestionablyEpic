import React from "react";
import Tooltip from "@mui/material/Tooltip";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import { getItemProp } from "General/Engine/ItemUtilities";

interface CatalyzedFromIndicatorProps {
  catalyzedID?: number | string | null;
  gameType?: gameTypes;
}

const tooltipSlotProps = {
  tooltip: {
    sx: {
      bgcolor: "#2b2b2b",
      color: "#f1f1f1",
      border: "1px solid #DAA520",
      borderRadius: "4px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.35)",
      px: 1,
      py: 0.75,
    },
  },
  arrow: {
    sx: {
      color: "#2b2b2b",
      "&:before": {
        border: "1px solid #DAA520",
      },
    },
  },
};

export const CatalyzedFromIndicator: React.FC<CatalyzedFromIndicatorProps> = ({ catalyzedID, gameType = "Retail" }) => {
  if (catalyzedID === undefined || catalyzedID === null || catalyzedID === "" || catalyzedID === 0) return null;

  const originalName = getItemProp(Number(catalyzedID), "name", gameType) || "Unknown Item";

  return (
    <Tooltip
      title={
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <div style={{ fontSize: 10, color: "#b0b0b0" }}>Catalyzed From</div>
          <div style={{ fontSize: 12 }}>{originalName}</div>
          <div style={{ fontSize: 11, color: "goldenrod" }}>ID: {catalyzedID}</div>
        </div>
      }
      arrow
      componentsProps={tooltipSlotProps}
    >
      <span style={{ display: "inline-flex", alignItems: "center", lineHeight: 0 }}>
        <UnarchiveIcon sx={{ fontSize: "18px", color: "goldenrod", cursor: "help" }} />
      </span>
    </Tooltip>
  );
};

export default CatalyzedFromIndicator;
