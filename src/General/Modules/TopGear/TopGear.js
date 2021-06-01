import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../SetupAndMenus/QEMainMenu.css";
import ReactGA from "react-ga";
import "./../QuickCompare/QuickCompare.css";
import { useTranslation } from "react-i18next";
// import { testTrinkets } from "../Engine/EffectFormulas/Generic/TrinketEffectFormulas";
import { apiSendTopGearSet } from "../SetupAndMenus/ConnectionUtilities";
import { Button, Grid, Typography, Divider } from "@material-ui/core";
import { buildWepCombos } from "../../Engine/ItemUtilities";
import MiniItemCard from "./MiniItemCard";
//import worker from "workerize-loader!./TopGearEngine"; // eslint-disable-line import/no-webpack-loader-syntax
import { useHistory } from "react-router-dom";
import HelpText from "../SetupAndMenus/HelpText";
import Settings from "../Settings/Settings";
import { CONSTRAINTS } from "../../Engine/CONSTRAINTS";
import UpgradeFinderSimC from "../UpgradeFinder/UpgradeFinderSimCImport";
import userSettings from "../Settings/SettingsObject";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0.5),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    border: "1px solid",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  typography: {
    padding: theme.spacing(2),
  },
  header: {
    [theme.breakpoints.down("sm")]: {
      marginTop: 120,
    },
    [theme.breakpoints.up("md")]: {
      marginTop: 32,
    },
  },
}));

const TOPGEARCAP = 34; // TODO

export default function TopGear(props) {
  const { t, i18n } = useTranslation();
  // const currentLanguage = i18n.language;
  const contentType = useSelector((state) => state.contentType);
  const classes = useStyles();
  const gameType = useSelector((state) => state.gameType);

  /* ---------------------------------------- Popover Props --------------------------------------- */
  const [anchorEl, setAnchorEl] = useState(null);

  const [activeSlot, setSlot] = useState("");
  const [itemList, setItemList] = useState(props.player.getActiveItems(activeSlot));
  const [btnActive, setBtnActive] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  // Right now the available item levels are static, but given the removal of titanforging each item could hypothetically share
  // a list of available ilvls and the player could select from a smaller list instead.
  // This is left as a TODO until key functionality is completed but is a moderate priority.
  // const itemTertiaries = [{"Avoidance", "Avoidance"},{"Leech", "Leech"}, {"None", ""}];
  //testTrinkets(props.player, "Raid", 184)

  // Fill Items fills the ItemNames box with items appropriate to the given slot and spec.  };

  let history = useHistory();

  const checkTopGearValid = () => {
    /* ------------------ Check that the player has selected an item in every slot. ----------------- */
    let topgearOk = true;
    let itemList = props.player.getSelectedItems();
    //console.log(props.player.getSelectedItems());
    let errorMessage = "";
    let slotLengths = {
      Head: 0,
      Neck: 0,
      Shoulder: 0,
      Back: 0,
      Chest: 0,
      Wrist: 0,
      Hands: 0,
      Waist: 0,
      Legs: 0,
      Feet: 0,
      Finger: 0,
      Trinket: 0,
      /*
      "2H Weapon" : 0,
      "1H Weapon" : 0,
      "Offhand" : 0, */
    };

    for (var i = 0; i < itemList.length; i++) {
      let slot = itemList[i].slot;
      if (slot in slotLengths) {
        if (!itemList[i].vaultItem) slotLengths[slot] += 1;
      }
    }
    for (const key in slotLengths) {
      if ((key === "Finger" || key === "Trinket") && slotLengths[key] < 2) {
        topgearOk = false;
        errorMessage = t("TopGear.itemMissingError") + t("slotNames." + key.toLowerCase());
      } else if (slotLengths[key] === 0) {
        topgearOk = false;
        errorMessage = t("TopGear.itemMissingError") + t("slotNames." + key.toLowerCase());
      }
    }
    setErrorMessage(errorMessage);
    console.log(slotLengths);
    return topgearOk;
  };

  const unleashTopGear = () => {
    /* ----------------------- Call to the Top Gear Engine. Lock the app down. ---------------------- */
    if (checkTopGearValid) {
      setBtnActive(false);
      const currentLanguage = i18n.language;
      let itemList = props.player.getSelectedItems();
      let wepCombos = buildWepCombos(props.player, true);
      let baseHPS = props.player.getHPS(contentType);
      let strippedPlayer = JSON.parse(JSON.stringify(props.player));
      let strippedCastModel = JSON.parse(JSON.stringify(props.player.castModel[contentType]));

      if (gameType === "Retail") {
        const worker = require("workerize-loader!./TopGearEngine"); // eslint-disable-line import/no-webpack-loader-syntax
        let instance = new worker();
        instance.runTopGear(itemList, wepCombos, strippedPlayer, contentType, baseHPS, currentLanguage, userSettings, strippedCastModel).then((result) => {
          apiSendTopGearSet(props.player, contentType, result.itemSet.hardScore, result.itemsCompared);
          props.setTopResult(result);
          history.push("/report/");
        });
      }
      else {
        const worker = require("workerize-loader!./TopGearEngineBC"); // eslint-disable-line import/no-webpack-loader-syntax
        let instance = new worker();
        instance.runTopGearBC(itemList, wepCombos, strippedPlayer, contentType, baseHPS, currentLanguage, userSettings, strippedCastModel).then((result) => {
          //apiSendTopGearSet(props.player, contentType, result.itemSet.hardScore, result.itemsCompared);
          props.setTopResult(result);
          history.push("/report/");
      });
    }


    } else {
      /* ---------------------------------------- Return error. --------------------------------------- */
    }
  };

  const selectedItemCount = props.player.getSelectedItems().length;
  const helpText = t("TopGear.HelpText");

  const activateItem = (unique, active) => {
    if (selectedItemCount < CONSTRAINTS.Shared.topGearMaxItems || active) {
      let player = props.player;
      player.activateItem(unique);
      setItemList([...player.getActiveItems(activeSlot)]);
      setBtnActive(checkTopGearValid());
    }
  };

  const editSettings = (setting, newValue) => {
    userSettings[setting] = newValue;
  };

  const slotList = [
    { label: t("slotNames.head"), slotName: "Head" },
    { label: t("slotNames.neck"), slotName: "Neck" },
    { label: t("slotNames.shoulder"), slotName: "Shoulder" },
    { label: t("slotNames.back"), slotName: "Back" },
    { label: t("slotNames.chest"), slotName: "Chest" },
    { label: t("slotNames.wrists"), slotName: "Wrist" },
    { label: t("slotNames.hands"), slotName: "Hands" },
    { label: t("slotNames.waist"), slotName: "Waist" },
    { label: t("slotNames.legs"), slotName: "Legs" },
    { label: t("slotNames.feet"), slotName: "Feet" },
    { label: t("slotNames.finger"), slotName: "Finger" },
    { label: t("slotNames.trinket"), slotName: "Trinket" },
    { label: t("slotNames.weapons"), slotName: "AllMainhands" },
    { label: t("slotNames.offhands"), slotName: "Offhands" },
  ];
  if (gameType === "BurningCrusade") slotList.push({ label: t("slotNames.relics"), slotName: "Relics & Wands" })

  return (
    <div className={classes.header}>
      <Grid
        container
        spacing={1}
        justify="center"
        style={{
          margin: "auto",
          width: "55%",
          display: "block",
        }}
      >
        {
          <Grid item xs={12}>
            <Typography variant="h4" align="center" style={{ padding: "10px 10px 5px 10px" }} color="primary">
              {t("TopGear.Title")}
            </Typography>
          </Grid>
        }
        <Grid item xs={12}>
          <HelpText text={helpText} />
        </Grid>
        <Grid item xs={12}>
          {<UpgradeFinderSimC player={props.player} simcSnack={props.simcSnack} allChars={props.allChars} />}
        </Grid>
        <Grid item xs={12}>
          {/* -------------------------------- Trinket / Buff / Etc Settings ------------------------------- */}
          <Settings player={props.player} userSettings={userSettings} editSettings={editSettings} hymnalShow={true} groupBuffShow={true} autoSocket={true} />
        </Grid>

        {props.player.activeItems.length > 0 ? (
          slotList.map((key, index) => {
            return (
              <Grid item xs={12} key={index}>
                <Typography color="primary" variant="h5">
                  {key.label}
                </Typography>
                <Divider style={{ marginBottom: 10, width: "42%" }} />
                <Grid container spacing={1}>
                  {[...props.player.getActiveItems(key.slotName)].map((item, index) => (
                    <MiniItemCard key={index} item={item} activateItem={activateItem} />
                  ))}
                </Grid>
              </Grid>
            );
          })
        ) : (
          <Typography style={{ color: "white", fontStyle: "italic", marginLeft: "10px" }} variant="h6">
            {t("TopGear.ItemsHereMessage")}
          </Typography>
        )}
        <Grid item style={{ height: 100 }} xs={12} />
      </Grid>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50px",
          backgroundColor: "#424242",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "90%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Typography align="center" style={{ padding: "10px 10px 5px 10px" }} color="primary">
            {t("TopGear.SelectedItems") + ":" + " " + selectedItemCount + "/" + TOPGEARCAP}
          </Typography>
          <div>
            <Typography variant="subtitle2" align="center" style={{ padding: "10px 10px 5px 10px", marginRight: "5px" }} color="primary">
              {errorMessage}
            </Typography>
            <Button variant="contained" color="secondary" align="center" style={{ height: "68%", width: "180px" }} disabled={!btnActive} onClick={unleashTopGear}>
              {t("TopGear.GoMsg")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
