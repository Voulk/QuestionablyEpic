import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Divider } from "@mui/material";

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

  return (
    <Grid item xs={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={() => openURL(url)}>
          <CardMedia sx={{ height: 86 }} image={image} title={title}>
            <CardContent sx={{ paddingTop: 12, paddingBottom: 12 }}>
              {/* ------------------------------ Article Date ------------------------------  */}
              <Typography align="center" variant="caption" sx={{ textShadow: "black -1px 1px 1px" }} component="h2">
                {date}
              </Typography>
              <Divider sx={{ height: 1, backgroundColor: "#fff", boxShadow: "-1px 1px 20px 1px black" }} />
              {/* ------------------------------ Article Title -----------------------------  */}
              <Typography align="center" sx={{ textShadow: "black -1px 1px 1px", fontSize: 16 }} variant="h6" component="h2">
                {title}
              </Typography>
              {/* ------------------------------- Extra Info -------------------------------  */}
              <Typography align="center" sx={{ fontSize: 14, textShadow: "black -1px 1px 1px" }} variant="body2" component="p">
                {extrainfo.length > 0 ? " - " + extrainfo + " - " : ""}
              </Typography>
            </CardContent>
          </CardMedia>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ArticleCard;
