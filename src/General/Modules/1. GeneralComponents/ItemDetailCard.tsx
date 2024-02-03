import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Divider, Typography, Paper, useMediaQuery, useTheme, Grid } from "@mui/material";
import { getItemIcon } from "General/Engine/ItemUtilities";
import WowheadTooltip from "General/Modules/1. GeneralComponents/WHTooltips";

interface Item {
  id: number;
  slot: string;
  name: string;
  description: string;
  metrics: string[];
}

interface ItemDetailCardProps {
  item: Item;
}

const ItemDetailCard: FC<ItemDetailCardProps> = ({ item }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const titleFontSize = isXs ? "0.8rem" : item.slot === "Trinket" ? "0.9rem" : "1rem";
  const metricPadding = isXs ? "2px" : "8px";

  const coloredDescription = item.description;
  const icon = item.icon ? process.env.PUBLIC_URL + "/Images/Icons/" + item.icon + ".jpg" : getItemIcon(item.id);
  return (
    <Paper
      sx={{
        minWidth: 275,
        borderColor: theme.palette.secondary.main,
        padding: "8px",
        height: 175,
      }}
      variant="outlined"
    >
      <div
        style={{
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          height: "100%",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <WowheadTooltip type="item" id={item.id} domain={currentLanguage}>
              <img height={40} width={40} src={icon} alt="" style={{ borderRadius: 4, borderWidth: "1px", borderStyle: "solid", borderColor: "#ff8000" }} />
            </WowheadTooltip>
            <div style={{ marginLeft: 8 }}>
              <Typography color="primary" variant="h6" component="h2" style={{ fontSize: titleFontSize, alignSelf: "center", lineHeight: 1 }}>
                {item.name}
              </Typography>
              {item.slot === "Trinket" ? <Typography variant="caption">{item.slot}</Typography> : ""}
            </div>
          </div>
          <Divider />
        </div>
        <div
          style={{
            maxHeight: "calc(100% - 10px)",
            overflowY: "auto",
          }}
        >
          <Typography variant="body2" color="text.secondary" component="div" dangerouslySetInnerHTML={{ __html: coloredDescription }} />
        </div>
        <div>
          <Divider />
          <div style={{ textAlign: "center", lineHeight: 1.1, fontSize: "16px", paddingTop: metricPadding }}>
            <Grid item xs={12} container spacing={1}>
              {item.metrics.map((metric, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={12} sm>
                    <Typography align="center" style={{ lineHeight: 1.1, fontSize: "16px" }}>
                      {metric}
                    </Typography>
                  </Grid>
                  {index !== item.metrics.length - 1 && (
                    <Grid item xs={12} sm="auto">
                      <Divider orientation="vertical" />
                    </Grid>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default ItemDetailCard;
