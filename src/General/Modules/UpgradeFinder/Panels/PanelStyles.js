import makeStyles from "@mui/styles/makeStyles";

const commonStyles = {
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center 60%",
  backgroundSize: "101%",
  borderRadius: "4px 0px 0px 4px",
  height: 45,
  whiteSpace: "nowrap",
  textShadow: "3px 3px 4px black",
  color: "#fff",
  fontSize: "0.9rem",
};

// Basic Root Style
export const rootStyles = makeStyles((theme) => {
  return {
    root: {
      width: "100%",
      marginTop: 4,
      padding: 4,
    },
  };
});

// Raid Tab Styles
export const raidStyles = makeStyles((theme) => {
  return {
    root: {
      width: "100%",
      marginTop: 4,
      padding: 4,
    },
    header: {
      [theme.breakpoints.down("lg")]: {
        justifyContent: "center",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        flexGrow: 1,
        maxWidth: "100%",
      },
      [theme.breakpoints.up("md")]: {
        justifyContent: "center",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        flexGrow: 1,
        maxWidth: "100%",
      },
    },
    naxxramasHeaderStyle: {
      ...commonStyles,
      backgroundImage: `url(${require("../../../../Images/Classic/Raid/Naxxramas.jpg").default})`,
    },
    malygosHeaderStyle: {
      backgroundImage: `url(${require("../../../../Images/Classic/Raid/Malygos.jpg").default})`,
      ...commonStyles,
    },
    argentRaidHeaderStyle: {
      backgroundImage: `url(${require("../../../../Images/Classic/Raid/ArgentRaid.jpg").default})`,
      ...commonStyles,
    },
    magtheridonHeaderStyle: {
      backgroundImage: `url(${require("../../../../Images/Classic/Raid/MagtheridonsLair.jpg").default})`,
      ...commonStyles,
    },
    ulduarHeaderStyle: {
      backgroundImage: `url(${require("../../../../Images/Classic/Raid/Ulduar.jpg").default})`,
      ...commonStyles,
    },
    vaultOfArchavonHeaderStyle: {
      backgroundImage: `url(${require("../../../../Images/Classic/Raid/VaultOfArchavon.jpg").default})`,
      ...commonStyles,
    },
    obsidianSanctumHeaderStyle: {
      backgroundImage: `url(${require("../../../../Images/Classic/Raid/ObsidianSanctum.jpg").default})`,
      ...commonStyles,
    },
    onyxiaLairHeaderStyle: {
      backgroundImage: `url(${require("../../../../Images/Classic/Raid/OnyxiaLair.jpg").default})`,
      ...commonStyles,
    },
    icecrownCitadelHeaderStyle: {
      backgroundImage: `url(${require("../../../../Images/Classic/Raid/IcecrownCitadel.jpg").default})`,
      ...commonStyles,
    },
    nathriaHeader: {
      backgroundImage: `url(${require("../../../../Images/Bosses/Aberrus/AberrusRaidLong.png").default})`,
      ...commonStyles,
    },
    sepulcherHeader: {
      backgroundImage: `url(${require("Images/Bosses/SepulcherOfTheFirstOnes/SepulcherOfTheFirstOnesHeader.png").default})`,
      ...commonStyles,
    },
    sanctumHeader: {
      backgroundImage: `url(${require("Images/Bosses/SanctumOfDomination/SanctumArt.png").default})`,
      ...commonStyles,
    },
  };
});

/// Styles for the Mythic Plus / Dungeon Tabs
export const dungeonStyles = makeStyles((theme) => {
  return {
    root: {
      width: "100%",
      marginTop: 4,
      padding: 4,
    },
    mythicHeader: {
      backgroundImage: `url(${require("Images/Bosses/MythicLong.png").default})`,
      ...commonStyles,
    },
    mythicPlusHeader: {
      backgroundImage: `url(${require("Images/Bosses/MythicPlusLong.png").default})`,
      ...commonStyles,
    },
  };
});
