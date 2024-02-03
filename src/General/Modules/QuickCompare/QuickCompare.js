import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, Typography, Divider, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import "../SetupAndMenus/QEMainMenu.css";
import "./QuickCompare.css";
import { buildNewWepCombos } from "../../Engine/ItemUtilities";
import ItemCard from "./ItemCard";
import HelpText from "../SetupAndMenus/HelpText";
import { useSelector } from "react-redux";
import Settings from "../Settings/Settings";
import ItemBar from "../ItemBar/ItemBar";
import CharacterPanel from "../CharacterPanel/CharacterPanel";
import { getTranslatedSlotName } from "locale/slotsLocale";
import { loadBottomBannerAd, loadBannerAd } from "General/Ads/AllAds";
import { Item } from "General/Modules/Player/Item"

const useStyles = makeStyles((theme) => ({
  header: {
    [theme.breakpoints.down("md")]: {
      margin: "auto",
      width: "90%",
      justifyContent: "center",
      display: "block",
      marginTop: 24,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "auto",
      width: "80%",
      justifyContent: "center",
      display: "block",
      marginTop: 44,
    },
    [theme.breakpoints.up("md")]: {
      margin: "auto",
      width: "70%",
      justifyContent: "center",
      display: "block",
      marginTop: 24,
    },
    [theme.breakpoints.up("lg")]: {
      // marginTop: 32,
      margin: "auto",
      width: "60%",
      display: "block",
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// Consider moving to somewhere more globally accessible.
// These are value : label pairs that automatically pull the translated version of the slot name.
// TODO: Add the remaining slots.
function getSlots() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  let slots = [
    { value: "Head", activeItem: "Head", label: getTranslatedSlotName("head", currentLanguage) },
    { value: "Neck", activeItem: "Neck", label: getTranslatedSlotName("neck", currentLanguage) },
    { value: "Shoulder", activeItem: "Shoulder", label: getTranslatedSlotName("shoulder", currentLanguage) },
    { value: "Back", activeItem: "Back", label: getTranslatedSlotName("back", currentLanguage) },
    { value: "Chest", activeItem: "Chest", label: getTranslatedSlotName("chest", currentLanguage) },
    { value: "Wrist", activeItem: "Wrist", label: getTranslatedSlotName("wrists", currentLanguage) },
    { value: "Hands", activeItem: "Hands", label: getTranslatedSlotName("hands", currentLanguage) },
    { value: "Waist", activeItem: "Waist", label: getTranslatedSlotName("waist", currentLanguage) },
    { value: "Legs", activeItem: "Legs", label: getTranslatedSlotName("legs", currentLanguage) },
    { value: "Feet", activeItem: "Feet", label: getTranslatedSlotName("feet", currentLanguage) },
    { value: "Finger", activeItem: "Finger", label: getTranslatedSlotName("finger", currentLanguage) },
    { value: "Trinket", activeItem: "Trinket", label: getTranslatedSlotName("trinket", currentLanguage) },
    { value: "Weapons", activeItem: "1H Weapon", label: getTranslatedSlotName("weapons", currentLanguage) },
    { value: "Offhands", activeItem: "Offhands", label: getTranslatedSlotName("offhands", currentLanguage) },
    { value: "Relics & Wands", activeItem: "Relics & Wands", label: getTranslatedSlotName("relics", currentLanguage) },
  ];

  return slots;
}

function sumObjectsByKey(...objs) {
  return objs.reduce((a, b) => {
    for (let k in b) {
      if (b.hasOwnProperty(k)) a[k] = (a[k] || 0) + b[k];
    }
    return a;
  }, {});
} 

export function buildWepCombos(player, active = false, equipped = false) {
  let wep_list = [];
  let main_hands = player.getActiveItems("1H Weapon", active, equipped);
  let off_hands = player.getActiveItems("Offhands", active, equipped);
  let two_handers = player.getActiveItems("2H Weapon", active, equipped);

  for (let i = 0; i < main_hands.length; i++) {
    // Some say j is the best variable for a nested loop, but are they right?
    let main_hand = main_hands[i];
    for (let k = 0; k < off_hands.length; k++) {
      let off_hand = off_hands[k];

      if (main_hand.vaultItem && off_hand.vaultItem) {
        // If both main hand and off hand are vault items, then we can't make a combination out of them.
        continue;
      } else {
        let item = new Item(
          main_hand.id,
          "Combined Weapon", // TODO
          "CombinedWeapon",
          0, //main_hand.socket + off_hand.socket, // Socket - Weapons can't actually get sockets so this is always false.
          "", // Tertiary
          0,
          Math.round((main_hand.level + off_hand.level) / 2),
          "", // Bonus Ids
        );
        item.stats = sumObjectsByKey(main_hand.stats, off_hand.stats);
        item.stats.bonus_stats = {};
        item.vaultItem = main_hand.vaultItem || off_hand.vaultItem;
        item.uniqueEquip = item.vaultItem ? "vault" : (main_hand.uniqueEquip || off_hand.uniqueEquip);
        item.softScore = main_hand.softScore + off_hand.softScore;
        item.offhandID = off_hand.id;
        item.mainHandLevel = main_hand.level;
        item.offHandLevel = off_hand.level;
        item.mainHandTertiary = main_hand.tertiary;
        item.offHandTertiary = off_hand.tertiary;
        item.mainHandUniqueHash = main_hand.uniqueHash;
        item.offHandUniqueHash = off_hand.uniqueHash;

        // For future perhaps
        // item.mainHandSocket = main_Hand.socket
        // item.offHandSocket = off_Hand.socket
        wep_list.push(item);
      }
    }
  }

  for (let j = 0; j < two_handers.length; j++) {
    wep_list.push(two_handers[j]);
  }

  wep_list.sort((a, b) => (a.softScore < b.softScore ? 1 : -1));
  return wep_list.slice(0, 9);
} 

export default function QuickCompare(props) {
  const contentType = useSelector((state) => state.contentType);
  const playerSettings = useSelector((state) => state.playerSettings);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    loadBannerAd(props.patronStatus);
    loadBottomBannerAd(props.patronStatus);
  }, props.player.scoreActiveItems(contentType, playerSettings));

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const classes = useStyles();
  /* ----------------------------- Snackbar State ----------------------------- */
  const [openDelete, setOpenDelete] = useState(false);
  /* ------------------------------ Define State ----------------------------- */
  const [activeSlot, setSlot] = useState("");
  /* ------------ itemList isn't used for anything here other than to trigger rerenders ----------- */
  const [itemList, setItemList] = useState(props.player.getActiveItems(activeSlot));
  const slots = getSlots();
  const helpBlurb = [t("QuickCompare.HelpText")];
  const helpText = [
    "(Optional) Add your SimC or QE Import String to auto-import your entire set of items.",
    "(Optional) Manually add items using the slot drop down below.",
    "Item scores are shown in the top right corner in yellow.",
    "Top Gear is always more accurate when building a full set of gear",
  ];
  const gameType = useSelector((state) => state.gameType);

  const handleClickDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenDelete(false);
  };

  const deleteItem = (unique) => {
    let player = props.player;
    player.deleteActiveItem(unique);
    setItemList([...player.getActiveItems(activeSlot)]);
    handleClickDelete();
  };

  const catalyzeItem = (unique) => {
    let player = props.player;
    player.catalyzeItem(unique);
    setItemList([...player.getActiveItems(activeSlot)]);
  };

  const upgradeItem = (item, newItemLevel, socketFlag = false, vaultFlag = false) => {
    let player = props.player;
    player.upgradeItem(item, newItemLevel, socketFlag, vaultFlag);
    setItemList([...player.getActiveItems(activeSlot)]);
  }

  /* ---------------------------------------------------------------------------------------------- */
  /*                                       Settings Functions                                       */
  /* ---------------------------------------------------------------------------------------------- */

  // TODO. Calculate the score for a given item.
  // Score is calculated by multiplying out stat weights and then adding any special effects.
  // const calculateScore = (item) => {};

  const wepCombos = buildWepCombos(props.player);

  return (
    <div className={classes.header}>
      <div style={{ height: 96 }} />
      <div id="banner2"></div>
      <Grid container spacing={1} justifyContent="center">
        {/* -------------------------------------------------------------------------- */
        /*                         Quick Compare Title Header                         */
        /* -------------------------------------------------------------------------- */}
        <Grid item xs={12}>
          <Typography variant="h4" align="center" style={{ padding: "10px 10px 5px 10px" }} color="primary">
            {t("QuickCompare.Title")}
          </Typography>
        </Grid>
        {/* ---------------------------------------------------------------------------------------------- */
        /*                                            Help Text                                            */
        /* ---------------------------------------------------------------------------------------------- */}
        <Grid item xs={12}>
          <HelpText text={helpText} blurb={helpBlurb} expanded={true} />
        </Grid>

        {/* ---------------------------------------------------------------------------------------------- */
        /*                                         Character Panel                                         */
        /* ----------------------------------------------------------------------------------------------  */}
        <Grid item xs={12}>
          <CharacterPanel
            quickCompare={true}
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
        {/* ---------------------------------------------------------------------------------------------- */
        /*                                          Item Add Bar                                           */
        /* ----------------------------------------------------------------------------------------------  */}
        <Grid item xs={12}>
          <ItemBar player={props.player} setItemList={setItemList} />
        </Grid>

        {/* -------------------------------------------------------------------------- */
        /*                             Header/Item Mapping                            */
        /* -------------------------------------------------------------------------- */}
        {slots
          .filter((filter) => [...props.player.getActiveItems(filter.activeItem)].length > 0)
          .map((key, i) => (
            <Grid item xs={12} key={i}>
              <Grid container spacing={1}>
                {/* Helm */}
                <Grid item xs={12}>
                  <Typography color="primary" variant="h5">
                    {t(key.label)}
                  </Typography>
                  <Divider style={{ marginBottom: 10 }} />
                  <Grid container spacing={1}>
                    {[...props.player.getActiveItems(key.activeItem)].map((item, index) => 
                      <ItemCard key={index} item={item} delete={deleteItem} catalyze={catalyzeItem} upgradeItem={upgradeItem} primGems={props.player.getBestPrimordialIDs(playerSettings, contentType)} />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}

        {/* Combos */}
        {wepCombos.length > 0 ? (
          <Grid item xs={12}>
            <Typography color="primary" variant="h5">
              {getTranslatedSlotName("weaponCombos", currentLanguage)}
            </Typography>
            <Divider style={{ marginBottom: 10 }} />
            <Grid container spacing={1}>
              {wepCombos.map((item, index) => (
                <ItemCard key={index} item={item} delete={deleteItem} />
              ))}
            </Grid>
          </Grid>
        ) : (
          ""
        )}
        <Grid item style={{ height: 100 }} xs={12} />
      </Grid>

      {/*item deleted snackbar */}
      <Snackbar open={openDelete} autoHideDuration={3000} onClose={handleCloseDelete}>
        <div>
          <Alert onClose={handleCloseDelete} severity="error">
            {t("QuickCompare.ItemDeleted")}
          </Alert>
        </div>
      </Snackbar>
      <div id="qelivead2"></div>
    </div>
  );
}
