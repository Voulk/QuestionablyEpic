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
    throneOfFourWindsHeaderStyle: {
      ...commonStyles,
      backgroundImage: `url(${require("../../../../Images/Classic/Raid/RaidThroneOfFourWinds.jpg")})`,
    },
    blackwingDescentHeaderStyle: {
      ...commonStyles,
      backgroundImage: `url(${require("../../../../Images/Classic/Raid/RaidBlackwingDescent.jpg")})`,
    },
    bastionHeaderStyle: {
      ...commonStyles,
      backgroundImage: `url(${require("../../../../Images/Classic/Raid/RaidBastionOfTwilight.png")})`,
    },
    naxxramasHeaderStyle: {
      ...commonStyles,
      backgroundImage: `url(${require("../../../../Images/Classic/Raid/Naxxramas.jpg")})`,
    },
    malygosHeaderStyle: {
      backgroundImage: `url(${require("../../../../Images/Classic/Raid/Malygos.jpg")})`,
      ...commonStyles,
    },
    argentRaidHeaderStyle: {
      backgroundImage: `url(${require("../../../../Images/Classic/Raid/ArgentRaid.jpg")})`,
      ...commonStyles,
    },
    magtheridonHeaderStyle: {
      backgroundImage: `url(${require("../../../../Images/Classic/Raid/MagtheridonsLair.jpg")})`,
      ...commonStyles,
    },
    ulduarHeaderStyle: {
      backgroundImage: `url(${require("../../../../Images/Classic/Raid/Ulduar.jpg")})`,
      ...commonStyles,
    },
    vaultOfArchavonHeaderStyle: {
      backgroundImage: `url(${require("../../../../Images/Classic/Raid/VaultOfArchavon.jpg")})`,
      ...commonStyles,
    },
    obsidianSanctumHeaderStyle: {
      backgroundImage: `url(${require("../../../../Images/Classic/Raid/ObsidianSanctum.jpg")})`,
      ...commonStyles,
    },
    onyxiaLairHeaderStyle: {
      backgroundImage: `url(${require("../../../../Images/Classic/Raid/OnyxiaLair.jpg")})`,
      ...commonStyles,
    },
    icecrownCitadelHeaderStyle: {
      backgroundImage: `url(${require("../../../../Images/Classic/Raid/IcecrownCitadel.jpg")})`,
      ...commonStyles,
    },
    nathriaHeader: {
      backgroundImage: `url(${require("../../../../Images/Bosses/Amirdrassil/AmirdrassilRaidLong.png")})`,
      ...commonStyles,
    },
    sepulcherHeader: {
      backgroundImage: `url(${require("Images/Bosses/SepulcherOfTheFirstOnes/SepulcherOfTheFirstOnesHeader.png")})`,
      ...commonStyles,
    },
    vaultHeader: {
      backgroundImage: `url(${require("Images/Bosses/VaultOfTheIncarnates/VaultOfTheIncarnates.png")})`,
      ...commonStyles,
    },
    aberrusHeader: {
      backgroundImage: `url(${require("Images/Bosses/Aberrus/AberrusRaid.png")})`,
      ...commonStyles,
    },
    amirdrassilHeader: {
      backgroundImage: `url(${require("../../../../Images/Bosses/Amirdrassil/AmirdrassilRaid.png")})`,
      ...commonStyles,
    },
    nerubarPalaceHeader: {
      backgroundImage: `url(${require("../../../../Images/Bosses/NerubarPalace/NerubarPalaceLong.png")})`,
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
      backgroundImage: `url(${require("Images/Bosses/DawnLong.png")})`,
      ...commonStyles,
    },
    mythicPlusHeader: {
      backgroundImage: `url(${require("Images/Bosses/MythicPlusLong.png")})`,
      ...commonStyles,
    },
  };
});
