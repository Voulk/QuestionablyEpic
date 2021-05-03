import React from "react";
import { useTranslation } from "react-i18next";
import "../Covenants.css";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActionArea, Typography, Grid, Divider } from "@material-ui/core";
import { conduitDB } from "Databases/ConduitDB";

const useStyles = makeStyles({ root: { padding: 0, height: 26 } });

export default function ConduitObject(props) {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const conduit = props.conduit;
  const classes = useStyles();

  /* --------- Arrow Function to Increase Conduits Ilvl on left click --------- */
  const conduitClicked = () => {
    let oldLevel = props.conduit.itemLevel;
    let newLevel = oldLevel === 226 ? 145 : oldLevel === 184 ? 200 : oldLevel + 13;
    props.updateConduitLevel(props.conduit.id, newLevel);
  };

  /* --------- Arrow Function to Decrease Conduits Ilvl on Right Click -------- */
  const conduitRightClicked = (e) => {
    e.preventDefault();
    let oldLevel = props.conduit.itemLevel;
    let newLevel = oldLevel === 145 ? 226 : oldLevel === 200 ? 184 : oldLevel - 13;
    props.updateConduitLevel(props.conduit.id, newLevel);
  };

  /* ------------ Returns Appropriate Colour for the Ilvl Provided ------------ */
  // Todo Make this an external Function to make this easier to update across modules
  const itemQuality = (itemLevel) => {
    if (itemLevel >= 226) {
      return "#ff8000"; // Legendary
    } else if (itemLevel >= 200) {
      return "#a335ee"; // Epic
    } else if (itemLevel >= 171) {
      return "#0070dd"; // Rare
    } else if (itemLevel >= 158) {
      return "#1eff00"; // Uncommon
    } else {
      return "#9d9d9d"; // Grey
    }
  };

  /* ------------------------ Returns Appropriate Colour for Item Upgrades ------------------------ */
  /* ------------------- (Currently Red Unused as we don't show Scores below 0) ------------------- */
  const upgradeColor = (num) => {
    if (num > 0) {
      return "#4CBB17";
    } else if (num < 0) {
      return "#ad2c34";
    } else {
      return "#fff";
    }
  };

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <Card className={classes.root} variant="outlined">
        <CardActionArea disabled={false} onClick={conduitClicked} onContextMenu={(e) => conduitRightClicked(e)}>
          <Grid container display="inline-flex" wrap="nowrap" justify="space-between" style={{ maxHeight: 26 }}>
            <Grid item xs="auto">
              {/* -------------------------------- Image for the Conduit + Ilvl + WHTooltip --------------------------------  */}
              <div className="container">
                <a data-wowhead={"spell=" + conduit.id + "&domain=" + currentLanguage}>
                  <img
                    alt=""
                    width={24}
                    height={24}
                    src={conduit.icon}
                    style={{
                      borderRadius: "3px 0px 0px 3px",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: itemQuality(conduit.itemLevel),
                      padding: 0,
                      margin: 0,
                    }}
                  />
                  <div className="bottom-right-covenants">{conduit.itemLevel}</div>
                </a>
              </div>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid container wrap="nowrap" justify="space-between" alignItems="center" style={{ width: "100%" }}>
              <Grid item xs={10} display="inline">
                <Typography
                  wrap="nowrap"
                  display="inline"
                  align="left"
                  style={{
                    color: "Goldenrod",
                    fontSize: "12px",
                    paddingLeft: "4px",
                  }}
                >
                  {/* -------------- Filter & Map the ConduitDB to return the localized name of the conduit --------------  */}
                  {conduitDB
                    .filter((obj) => {
                      return obj.guid === conduit.id;
                    })
                    .map((obj) => obj.name[currentLanguage])
                    .toString()}
                </Typography>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid
                item
                xs={2}
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                }}
              >
                {/* ---------------------------------- HPS score of the Conduit ----------------------------------  */}
                <Typography
                  variant="subtitle1"
                  wrap="nowrap"
                  display="inline"
                  align="center"
                  style={{
                    color: upgradeColor(conduit.hps),
                    paddingLeft: "2px",
                    paddingRight: "2px",
                    fontSize: "12px",
                  }}
                >
                  {conduit.hps}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
