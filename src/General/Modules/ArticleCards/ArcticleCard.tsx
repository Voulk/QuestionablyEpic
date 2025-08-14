import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Divider, Box } from "@mui/material";

interface ArticleCardProps {
  url: string;
  image: string;
  title: string;
  date: string;
  extrainfo: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ url, image, title, date, extrainfo }) => {
  const openURL = (url: string) => {
    let win = window.open(url);
    if (win) {
      /* ------------------- Browser has allowed it to be opened ------------------ */
      win.focus();
    } else {
      /* ------------------------- Browser has blocked it ------------------------- */
      // TODO: Translation Required here
      alert("Please allow popups for this website");
    }
  };

  console.log("ArticleCard Rendered", title, url, image, date, extrainfo);

  return (
    <Grid item xs={4}>
      <Card sx={{ maxWidth: 345 }}>
<CardActionArea onClick={() => openURL(url)}>
  <Box sx={{ position: "relative" }}>
    <CardMedia component="img" height="86" image={image} alt={title} />
    <Box sx={{
      position: "absolute", inset: 0, display: "flex", flexDirection: "column",
      justifyContent: "flex-end", p: 1.5, color: "#fff"
    }}>
      <Typography align="center" variant="h6" sx={{ textShadow: "black -1px 1px 1px", fontSize: 16 }}>
        {title}
      </Typography>
      <Typography align="center" variant="body2" sx={{ fontSize: 14, textShadow: "black -1px 1px 1px" }}>
        {extrainfo.length > 0 ? ` - ${extrainfo} - ` : ""}
      </Typography>
    </Box>
  </Box>
  </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ArticleCard;
