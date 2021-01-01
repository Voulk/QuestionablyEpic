import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Paper,
  Divider,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ItemUpgradeCard from "./ItemUpgradeCard";
import bossHeaders from "../CooldownPlanner/Functions/IconFunctions/BossHeaderIcons";
import DungeonHeaderIcons from "../CooldownPlanner/Functions/IconFunctions/DungeonHeaderIcons";
import "./GearContainer.css";
import { bossList, dungeonList } from "../CooldownPlanner/Data/Data";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 10,
    padding: 4,
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function RaidGearContainer(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {props.type === "raid"
          ? bossList
              .filter((key) => key.zoneID === 2296)
              .map((key) => (
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <div
                        style={{ width: 200, paddingLeft: 10 }}
                        className="container-UpgradeCards"
                      >
                        {bossHeaders(key.id)}
                        <Typography
                          variant="h6"
                          noWrap
                          className="centered-UpgradeCards"
                        >
                          {t("BossNames." + key.id)}
                        </Typography>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm container spacing={1}>
                      <Divider
                        orientation="vertical"
                        flexItem
                        style={{ marginRight: 4 }}
                      />
                      {[...props.pl.getActiveItems("1H Weapon")].map(
                        (item, index) => (
                          <ItemUpgradeCard key={index} item={item} />
                        )
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              ))
              .map((key) => [
                key,
                <Grid item xs={12}>
                  <Divider />
                </Grid>,
              ])
          : dungeonList
              .map((key) => (
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <div
                        style={{ width: 200, paddingLeft: 10 }}
                        className="container-UpgradeCards"
                      >
                        {DungeonHeaderIcons(key.zoneID, {
                          height: 64,
                          width: 128,
                          verticalAlign: "middle",
                          marginRight: "-25px",
                        })}
                        <Typography
                          variant="h6"
                          noWrap
                          className="centered-UpgradeCards"
                        >
                          {t("DungeonNames." + key.zoneID)}
                        </Typography>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm container spacing={1}>
                      <Divider
                        orientation="vertical"
                        flexItem
                        style={{ marginRight: 4 }}
                      />
                      {[...props.pl.getActiveItems("1H Weapon")].map(
                        (item, index) => (
                          <ItemUpgradeCard key={index} item={item} />
                        )
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              ))
              .map((key) => [
                key,
                <Grid item xs={12}>
                  <Divider />
                </Grid>,
              ])}
      </Grid>
    </div>
  );
}
s;
