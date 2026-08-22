import React from "react";
import { dungeonStyles, sharedAccordionStyles, sharedAccordionSummaryStyles, sharedAccordionDetailsStyles } from "./PanelStyles";
import { Typography, Grid, Divider } from "@mui/material";
import ItemUpgradeCard from "./ItemUpgradeCard";
import DungeonHeaderIcons from "General/Modules/IconFunctions/DungeonHeaderIcons";
import "./Panels.css";
import { useTranslation } from "react-i18next";
import { filterItemListByDropLoc, getDifferentialByID, getNumUpgrades } from "../../../Engine/ItemUtilities";
import { filterClassicItemListBySource } from "../../../Engine/ItemUtilitiesClassic";
import { encounterDB } from "../../../../Databases/InstanceDB";
import { getMPlusKeyReward, mplusEndAndVaultSameTrack, TRACK_CAPS } from "../../../../Databases/MPlusKeyRewards";
import { useSelector } from "react-redux";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UFAccordion from "./ufComponents/ufAccordian";
import UFAccordionSummary from "./ufComponents/ufAccordianSummary";

function sectionHeaderStyle(highlighted) {
  if (highlighted) {
    return {
      background: "linear-gradient(180deg, rgba(242, 191, 89, 0.16) 0%, rgba(242, 191, 89, 0.08) 100%)",
      borderRadius: 8,
      padding: "7px 12px",
      border: "1px solid rgba(242, 191, 89, 0.34)",
      boxShadow: "inset 0 0 0 1px rgba(242, 191, 89, 0.14)",
    };
  }
  return {
    background: "rgba(255, 255, 255, 0.06)",
    borderRadius: 8,
    padding: "6px 10px",
  };
}

export default function MythicPlusGearContainer(props) {
  const classes = dungeonStyles();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const itemDifferentials = props.itemDifferentials;
  const difficulty = props.playerSettings.dungeon;
  const gameType = useSelector((state) => state.gameType);
  const keyReward = getMPlusKeyReward(difficulty);
  const sameTrack = mplusEndAndVaultSameTrack(difficulty);
  const subpanelsEnabled = props.playerSettings.itemTypes || ["Drop", "Upgraded", "Bonus Roll"]

  const contentGenerator = (gameType) => {
    return (
      <Grid item xs={12}>
        <div className={classes.header}>
          <Grid item container spacing={1}>
            <Grid item xs={12}>
              <div className={classes.panel}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                      {encounterDB["-1"][gameType].bossOrderMythicPlus.map((key, i) => (
                        <UFAccordion
                          key={encounterDB["-1"][gameType][key] + "-accordian" + i}
                          elevation={0}
                          defaultExpanded={false}
                          style={sharedAccordionStyles}
                        >
                          <UFAccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={sharedAccordionSummaryStyles}
                          >
                            <Typography
                              variant="h6"
                              color="primary"
                              align="left"
                              style={{
                                borderRadius: "4px 4px 0px 0px",
                                display: "flex",
                              }}
                            >
                              <img style={{ height: 36, width: 56, verticalAlign: "middle" }} src={DungeonHeaderIcons(key)} alt={encounterDB["-1"][gameType][key]} />
                              <Divider flexItem orientation="vertical" style={{ margin: "0px 5px 0px 0px" }} />
                              {encounterDB["-1"][gameType][key]} {" "}
                              {/*getNumUpgrades(itemDifferentials, -1, key, difficulty, true)} Upgrades*/}
                            </Typography>
                          </UFAccordionSummary>
                          <AccordionDetails style={sharedAccordionDetailsStyles}>
                            <Grid item xs={12} sm container direction="row" spacing={1}>
                              {subpanelsEnabled.includes("Bonus Roll") ? <Grid item xs={12} container spacing={1}>
                                <Grid item xs={12}>
                                  <div style={sectionHeaderStyle(true)}>
                                    <Typography variant="h6" color="primary" align="left">
                                      {keyReward.label} - Upgraded Vault / Bonus Rolls ({TRACK_CAPS[keyReward.vaultTrack]} {keyReward.vaultTrack})
                                    </Typography>
                                  </div>
                                </Grid>
                                {[...filterItemListByDropLoc(itemDifferentials, -1, key, "Dungeon", difficulty, "bonus")].map((item, index) => (
                                  <ItemUpgradeCard key={"bonus-" + index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.item, item.level)} slotPanel={false} />
                                ))}
                              </Grid> : null}

                              {!sameTrack && subpanelsEnabled.includes("Upgraded") ? (
                                <Grid item xs={12} container spacing={1}>
                                  <Grid item xs={12}>
                                    <Typography variant="h6" color="primary" align="left" style={sectionHeaderStyle(false)}>
                                      {keyReward.label} - Upgraded End of Run ({TRACK_CAPS[keyReward.endTrack]} {keyReward.endTrack})
                                    </Typography>
                                  </Grid>
                                  {[...filterItemListByDropLoc(itemDifferentials, -1, key, "Dungeon", difficulty, "max")].map((item, index) => (
                                    <ItemUpgradeCard key={"max-" + index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.item, item.level)} slotPanel={false} />
                                  ))}
                                </Grid>
                              ) : null}

                              {subpanelsEnabled.includes("Drop") ?<Grid item xs={12} container spacing={1}>
                                <Grid item xs={12}>
                                  <Typography variant="h6" color="primary" align="left" style={sectionHeaderStyle(false)}>
                                    {keyReward.label} - End of Run ({keyReward.endIlvl} {keyReward.endTrack})
                                  </Typography>
                                </Grid>
                                {[...filterItemListByDropLoc(itemDifferentials, -1, key, "Dungeon", difficulty, "drop")].map((item, index) => (
                                  <ItemUpgradeCard key={"drop-" + index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.item, item.level)} slotPanel={false} />
                                ))}
                              </Grid> : null}
                            </Grid>
                          </AccordionDetails>
                        </UFAccordion>
                      ))}
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
    );
  };

  const contentGeneratorBC = () => {
    return encounterDB[-1][gameType].bossOrder.map((key, i) => (
      <UFAccordion
        key={encounterDB[-1][key].name + "-accordian" + i}
        elevation={0}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.12)",
        }}
      >
        <UFAccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{
            verticalAlign: "middle",
          }}
        >
          <Typography
            variant="h6"
            color="primary"
            align="left"
            style={{
              borderRadius: "4px 4px 0px 0px",
              display: "flex",
            }}
          >
            <img style={{ height: 36, verticalAlign: "middle" }} src={DungeonHeaderIcons(key)} alt={encounterDB[123][key].name[currentLanguage]} />
            <Divider flexItem orientation="vertical" style={{ margin: "0px 5px 0px 0px" }} />
            {encounterDB[-1][key].name[currentLanguage]} -{" "}
            {[...filterClassicItemListBySource(itemDifferentials, -1, key)].map((item) => getDifferentialByID(itemDifferentials, item.id, item.level)).filter((item) => item !== 0).length} Upgrades
          </Typography>
        </UFAccordionSummary>
        <AccordionDetails style={{ backgroundColor: "#191c23" }}>
          <Grid xs={12} container spacing={1}>
            {[...filterClassicItemListBySource(itemDifferentials, -1, key)].map((item, index) => (
              <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
            ))}
          </Grid>
        </AccordionDetails>
      </UFAccordion>
    ));
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {true ? contentGenerator(gameType) : contentGeneratorBC(gameType)}
        </Grid>
      </Grid>
    </div>
  );
}
