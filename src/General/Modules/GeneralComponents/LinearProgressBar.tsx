import * as React from "react";
import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface LinearProgressWithLabelProps extends LinearProgressProps {
  value: number;
}

function LinearProgressWithLabel(props: LinearProgressWithLabelProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

interface LinearWithValueLabelProps {
  loadingProgress: number;
}

export default function LinearWithValueLabel(props: LinearWithValueLabelProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={props.loadingProgress} />
    </Box>
  );
}
