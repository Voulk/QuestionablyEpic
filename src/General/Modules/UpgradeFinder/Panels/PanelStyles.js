import makeStyles from "@mui/styles/makeStyles";

const commonStyles = {
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center 60%",
  backgroundSize: "101%",
  borderRadius: "4px 0px 0px 4px",
  height: 42,
  whiteSpace: "nowrap",
  textShadow: "0px 0px 6px black, 1px 1px 2px black, -1px -1px 2px black",
  color: "#fff",
  fontSize: "0.9rem",
};

export const sharedAccordionStyles = {
  background: "linear-gradient(180deg, rgba(18, 22, 30, 0.96) 0%, rgba(12, 15, 20, 0.98) 100%)",
  border: "1px solid rgba(242, 191, 89, 0.12)",
  borderRadius: 10,
  overflow: "hidden",
};

export const sharedAccordionSummaryStyles = {
  verticalAlign: "middle",
  minHeight: 58,
  paddingLeft: 8,
  paddingRight: 12,
  background: "linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0) 100%)",
};

export const sharedAccordionDetailsStyles = {
  background: "linear-gradient(180deg, rgba(22, 25, 32, 0.98) 0%, rgba(17, 19, 24, 0.98) 100%)",
  borderTop: "1px solid rgba(255, 255, 255, 0.06)",
};

// Basic Root Style
export const rootStyles = makeStyles((theme) => {
  return {
    root: {
      width: "100%",
      marginTop: 4,
      padding: 4,
    },
    sourceBar: {
      boxSizing: "border-box",
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 12,
      flexWrap: "wrap",
      marginBottom: 8,
      padding: "6px 10px",
      background: "linear-gradient(180deg, rgba(28, 31, 38, 0.96) 0%, rgba(20, 23, 29, 0.98) 100%)",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      borderRadius: 8,
    },
    sourceButtonRow: {
      display: "flex",
      flex: 1,
      minWidth: 0,
      gap: 6,
    },
    sourceToggle: {
      flex: 1,
      height: 32,
      borderRadius: 4,
      border: "1px solid rgba(255, 255, 255, 0.16)",
      background: "rgba(18, 20, 26, 0.9)",
      color: "rgba(255, 255, 255, 0.88)",
      textTransform: "none",
      fontWeight: 600,
      fontSize: "0.82rem",
      "&:hover": {
        background: "rgba(40, 45, 56, 0.96)",
        borderColor: "rgba(242, 191, 89, 0.3)",
      },
    },
    sourceToggleSelected: {
      "&$sourceToggle": {
        color: "#000",
        background: "linear-gradient(180deg, rgba(242, 191, 89, 0.98) 0%, rgba(214, 165, 71, 0.98) 100%)",
        borderColor: "rgba(242, 191, 89, 0.95)",
      },
      "&$sourceToggle:hover": {
        color: "#000",
        background: "linear-gradient(180deg, rgba(235, 182, 77, 0.98) 0%, rgba(202, 153, 61, 0.98) 100%)",
      },
    },
  };
});

// Raid Tab Styles
export const raidStyles = makeStyles((theme) => {
  return {
    root: {
      width: "100%",
      marginTop: 4,
      padding: 0,
      objectFit: "cover",
    },
    header: {
      [theme.breakpoints.down("lg")]: {
        justifyContent: "center",
        display: "block",
        //marginLeft: "auto",
        //marginRight: "auto",
        //flexGrow: 1,
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
    defaultHeader: {
      ...commonStyles,
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
    mogushanVaultsHeaderStyle: {
      ...commonStyles,
      backgroundImage: `url(${require("../../../../Images/Classic/Raid/RaidMogushanVaults.jpg")})`,
    },
    heartOfFearHeaderStyle: {
      ...commonStyles,
      backgroundImage: `url(${require("../../../../Images/Classic/Raid/RaidHeartOfFear.jpg")})`,
    },
    terraceOfEndlessSpringHeaderStyle: {
      ...commonStyles,
      backgroundImage: `url(${require("../../../../Images/Classic/Raid/RaidTerraceOfEndlessSpring.jpg")})`,
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
    liberationOfUndermineHeader: {
      backgroundImage: `url(${require("../../../../Images/Bosses/Undermine/LiberationOfUndermineLong.png")})`,
      ...commonStyles,
    },
    manaforgeOmegaHeader: {
      backgroundImage: `url(${require("../../../../Images/Bosses/ManaforgeOmega/ManaforgeOmegaLong.png")})`,
      ...commonStyles,
    },
    dreamriftHeader: {
      backgroundImage: `url(${require("../../../../Images/Bosses/MidnightS1/DreamriftShort.png")})`,
      ...commonStyles,
    },
    marchOnQueldanasHeader: {
      backgroundImage: `url(${require("../../../../Images/Bosses/MidnightS1/MarchShort.png")})`,
      ...commonStyles,
    },
    venomousAbyssHeader: {
      background: "linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(10, 17, 12, 0.88) 62%, rgba(21, 38, 27, 0.8) 82%, #3da55d 100%)",
      ...commonStyles,
    },
    tideboundGrottoHeader: {
      background: "linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(9, 14, 24, 0.88) 62%, rgba(19, 30, 46, 0.8) 82%, #3e7bd1 100%)",
      ...commonStyles,
    },
    voidspireHeader: {
      backgroundImage: `url(${require("../../../../Images/Bosses/MidnightS1/VoidspireShort.png")})`,
      ...commonStyles,
    },
    sporefallHeader: {
      backgroundImage: `url(${require("../../../../Images/Bosses/MidnightS1/SporefallShort.png")})`,
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
