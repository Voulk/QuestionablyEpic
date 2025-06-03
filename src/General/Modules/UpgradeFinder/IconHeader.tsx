import { Typography } from "@mui/material";

interface PanelHeaderProps {
  text: string;
  icon: string;
  alt?: string;
}

export default function IconHeader({ text, icon, alt }: PanelHeaderProps) {
  return (
    <Typography
      color="primary"
      align="center"
      variant="h5"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}
    >
      <img
        src={icon}
        alt={alt || ""}
        style={{
          height: 32,
          width: 32,
          borderRadius: 4,
          border: "1px solid rgba(255, 255, 255, 0.3)",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        }}
      />
      {text}
    </Typography>
  );
}
