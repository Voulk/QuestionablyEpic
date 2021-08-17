import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Divider, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import "../SetupAndMenus/QEMainMenu.css";
import "./QuickCompare.css";
import { buildWepCombos } from "../../Engine/ItemUtilities";
import ItemCard from "./ItemCard";
import HelpText from "../SetupAndMenus/HelpText";
import UpgradeFinderSimC from "../UpgradeFinder/UpgradeFinderSimCImport";
import { useSelector } from "react-redux";
import Settings from "../Settings/Settings";
import userSettings from "../Settings/SettingsObject";
import ItemBar from "../ItemBar/ItemBar";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0.5),
    minWidth: 120,
    whiteSpace: "noWrap",
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
    [theme.breakpoints.down("xs")]: {
      margin: "auto",
      width: "85%",
      justifyContent: "center",
      display: "block",
      marginTop: 120,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "auto",
      width: "80%",
      justifyContent: "center",
      display: "block",
      marginTop: 140,
    },
    [theme.breakpoints.up("md")]: {
      margin: "auto",
      width: "65%",
      justifyContent: "center",
      display: "block",
      marginTop: 120,
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: 32,
      margin: "auto",
      width: "57%",
      display: "block",
    },
  },
  option: {
    borderBottom: "1px solid rgba(255, 255, 255, 0.23)",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// Consider moving to somewhere more globally accessible.
// These are value : label pairs that automatically pull the translated version of the slot name.
// TODO: Add the remaining slots.
function getSlots() {
  const { t } = useTranslation();
  let slots = [
    { value: "Head", activeItem: "Head", label: t("slotNames.head") },
    { value: "Neck", activeItem: "Neck", label: t("slotNames.neck") },
    { value: "Shoulder", activeItem: "Shoulder", label: t("slotNames.shoulder") },
    { value: "Back", activeItem: "Back", label: t("slotNames.back") },
    { value: "Chest", activeItem: "Chest", label: t("slotNames.chest") },
    { value: "Wrist", activeItem: "Wrist", label: t("slotNames.wrists") },
    { value: "Hands", activeItem: "Hands", label: t("slotNames.hands") },
    { value: "Waist", activeItem: "Waist", label: t("slotNames.waist") },
    { value: "Legs", activeItem: "Legs", label: t("slotNames.legs") },
    { value: "Feet", activeItem: "Feet", label: t("slotNames.feet") },
    { value: "Finger", activeItem: "Finger", label: t("slotNames.finger") },
    { value: "Trinket", activeItem: "Trinket", label: t("slotNames.trinket") },
    { value: "Weapons", activeItem: "1H Weapon", label: t("slotNames.weapons") },
    { value: "Offhands", activeItem: "Offhands", label: t("slotNames.offhands") },
    { value: "Relics & Wands", activeItem: "Relics & Wands", label: t("slotNames.relics") },
  ];

  return slots;
}

export default function QuickCompare(props) {
  const contentType = useSelector((state) => state.contentType);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, props.player.scoreActiveItems(contentType));

  const { t, i18n } = useTranslation();
  // const currentLanguage = i18n.language;
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

  /* ---------------------------------------------------------------------------------------------- */
  /*                                       Settings Functions                                       */
  /* ---------------------------------------------------------------------------------------------- */

  const editSettings = (setting, newValue) => {
    userSettings[setting] = newValue;
  };

  // TODO. Calculate the score for a given item.
  // Score is calculated by multiplying out stat weights and then adding any special effects.
  // const calculateScore = (item) => {};

  const wepCombos = buildWepCombos(props.player);

  return (
    <div className={classes.header}>
      <Grid container spacing={1} justify="center">
        {/* -------------------------------------------------------------------------- */
        /*                         Quick Compare Title Header                         */
        /* -------------------------------------------------------------------------- */}

        <Grid item xs={12}>
          <Typography variant="h4" align="center" style={{ padding: "10px 10px 5px 10px" }} color="primary">
            {t("QuickCompare.Title")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <HelpText text={helpText} blurb={helpBlurb} />
        </Grid>
        <Grid item xs={12}>
          <UpgradeFinderSimC quickCompare={true} player={props.player} simcSnack={props.simcSnack} allChars={props.allChars} />
        </Grid>

        {/*<Grid item xs={12}>
          <Settings player={props.player} userSettings={userSettings} editSettings={editSettings} />
        </Grid> */}

        <ItemBar player={props.player} setItemList={setItemList} />

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
                    {[...props.player.getActiveItems(key.activeItem)].map((item, index) => (
                      <ItemCard key={index} item={item} delete={deleteItem} />
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}

        {/* Combos */}
        {wepCombos.length > 0 ? (
          <Grid item xs={12}>
            <Typography color="primary" variant="h5">
              {t("slotNames.weaponCombos")}
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
        <Alert onClose={handleCloseDelete} severity="error">
          {t("QuickCompare.ItemDeleted")}
        </Alert>
      </Snackbar>
    </div>
  );
}
