import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import HelpText from "../SetupAndMenus/HelpText";
import makeStyles from "@mui/styles/makeStyles";
import CharacterPanel from "../CharacterPanel/CharacterPanel";
import { loadBottomBannerAd, loadBannerAd } from "General/Ads/AllAds";
import { trackPageView } from "Analytics";
import TrinketChart from "./TrinketChart";
import { useSelector } from "react-redux";
import GenericDialog from "General/Modules/TopGear/Report/GenericDialog";
import { CONSTANTS } from "General/Engine/CONSTANTS";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      margin: "auto",
      width: "85%",
      justifyContent: "space-between",
      display: "block",
      marginTop: 24,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "auto",
      width: "80%",
      justifyContent: "space-between",
      display: "block",
      marginTop: 44,
    },
    [theme.breakpoints.up("md")]: {
      margin: "auto",
      width: "65%",
      justifyContent: "space-between",
      display: "block",
      marginTop: 24,
    },
    [theme.breakpoints.up("lg")]: {
      margin: "auto",
      width: "55%",
      display: "block",
    },
  },
}));

const handleDownload = () => {
  // Compile trinket data
  const allTrinketData = getAllTrinketData();
  const toPrint = {}

  console.log(allTrinketData.length)
  allTrinketData.forEach((trinketX => {

    toPrint[trinketX.name] = {description: trinketX.addonDescription || ""};
    if ('effects' in trinketX && 'ppm' in trinketX.effects[0]) {
      toPrint[trinketX.name].ppm = trinketX.effects[0].ppm;
    }
  }))
  /*const toPrint = allTrinketData.map((trinketX => {
    return {
      id: trinketX.id,
      name: trinketX.name,
      description: trinketX.addonDescription || "",
    }
  }))*/

  const jsonString = JSON.stringify(toPrint);

  // Download them
  downloadJson(jsonString, 'QE-trinket-data.json');
};

export const TRINKET_SOURCES = {
  raid: CONSTANTS.currentRaidIDs,
  dungeon: [-1],
  delves: [-69],
  crafted: [-4],
  timewalking: [-67],
  other: [
    1192, // World Bosses
    1205, // DF World Bosses
    -18, // PVP
    -17, // PVP
    -85, // Also PVP
  ],
};

export default function TrinketAnalysis(props) {
  useEffect(() => {
    trackPageView(window.location.pathname + window.location.search);
    loadBannerAd(props.patronStatus);
    loadBottomBannerAd(props.patronStatus);
  }, []);

  const { t } = useTranslation();
  const contentType = useSelector((state) => state.contentType);
  const classes = useStyles();
  const [dialogText, setDialogText] = React.useState(""); 
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const helpBlurb = [t("TrinketAnalysis.HelpText")];
  const helpText = [
    "The graph is generic to your spec and content type. Use it as general guidance. You can get results accurate to your character in the Top Gear module.",
    "This is a sampling of available trinkets only. You can add ones that aren't on the list in Top Gear.",
  ];

  return (
    <div className={classes.root}>
      <div style={{ height: 96 }} />
      <div id="banner2"></div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <HelpText blurb={helpBlurb} text={helpText} expanded={false} />
        </Grid>
        <Grid item xs={12}>
          <CharacterPanel
            player={props.player}
            simcSnack={props.simcSnack}
            allChars={props.allChars}
            contentType={contentType}
            singleUpdate={props.singleUpdate}
            hymnalShow={true}
            groupBuffShow={true}
            autoSocket={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TrinketChart player={props.player} />
        </Grid>
      </Grid>
      <div id="qelivead2"></div>
      <div style={{ height: 300 }} />
      <GenericDialog
        dialogText={dialogText}
        isDialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </div>
  );
}
