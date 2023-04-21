import makeStyles from "@mui/styles/makeStyles";

const commonTabStyles = {
  textShadow: "3px 3px 4px black",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100%",
  color: "#fff",
  backgroundPosition: "center 60%",
  fontSize: "1.1rem",
};

const commonHeadertyles = {
  margin: "auto",
  display: "block",
  justifyContent: "center",
};

export const UpgradeFinderStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    flexGrow: 1,
    maxWidth: "70%",
  },
  panel: {
    flexGrow: 1,
    backgroundColor: "#323232",
    display: "flex",
    borderRadius: "0px 0px 4px 4px",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  raidHeaderStyle: {
    backgroundImage: `url(${require("Images/Bosses/Aberrus/AberrusRaid.png").default})`,
    ...commonTabStyles,
  },
  raidBCHeaderStyle: {
    backgroundImage: `url(${require("../../../Images/Classic/RaidHeader.jpg").default})`,
    ...commonTabStyles,
    borderRadius: "4px 0px 0px 4px",
  },
  mythicPlusHeaderStyle: {
    backgroundImage: `url(${require("../../../Images/Bosses/MythicPlus.png").default})`,
    ...commonTabStyles,
  },
  dungeonBCPlusHeaderStyle: {
    backgroundImage: `url(${require("../../../Images/Classic/DungeonHeader.jpg").default})`,
    ...commonTabStyles,
  },
  pvpHeaderStyle: {
    backgroundImage: `url(${require("../../../Images/Bosses/PVPHeader.png").default})`,
    ...commonTabStyles,
  },
  pvpBCHeaderStyle: {
    backgroundImage: `url(${require("../../../Images/Classic/PVP/PVPHeader.jpg").default})`,
    ...commonTabStyles,
  },
  worldBossHeaderStyle: {
    backgroundImage: `url(${require("../../../Images/Bosses/WorldBosses.png").default})`,
    ...commonTabStyles,
  },
  slotsHeaderStyle: {
    backgroundImage: `url(${require("../../../Images/Bosses/AllSlots.png").default})`,
    ...commonTabStyles,
    borderRadius: "0px 4px 4px 0px",
  },
  slotsBCHeaderStyle: {
    backgroundImage: `url(${require("../../../Images/Classic/SlotsHeader.jpg").default})`,
    ...commonTabStyles,
    borderRadius: "0px 4px 4px 0px",
  },

  header: {
    [theme.breakpoints.down("md")]: {
      ...commonHeadertyles,
      width: "90%",
      marginTop: 44,
    },
    [theme.breakpoints.up("sm")]: {
      ...commonHeadertyles,
      width: "85%",
      marginTop: 24,
    },
    [theme.breakpoints.up("md")]: {
      ...commonHeadertyles,
      // marginTop: 32,
      width: "85%",
    },
    [theme.breakpoints.up("lg")]: {
      ...commonHeadertyles,
      // marginTop: 32,
      width: "70%",
    },
  },
}));
