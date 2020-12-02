import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../SetupAndMenus/QEMainMenu.css";
import ReactGA from "react-ga";
import Item from "../Player/Item";
import "./../QuickCompare/QuickCompare.css";
import { useTranslation } from "react-i18next";
import {testTrinkets } from "../Engine/EffectFormulas/Generic/TrinketEffectFormulas"
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Grid,
  Paper,
  Typography,
  Divider,
  Snackbar,
  TextField,
  Popover,
} from "@material-ui/core";
import { itemDB } from "../Player/ItemDB";

import {
  getValidArmorTypes,
  getValidWeaponTypes,
  calcStatsAtLevel,
  getItemAllocations,
  scoreItem,
  getItemEffect,
  buildWepCombos,
  getItemSlot,
} from "../Engine/ItemUtilities";
import ItemCard from "./../QuickCompare/ItemCard";
import MiniItemCard from "./MiniItemCard";
import MuiAlert from "@material-ui/lab/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";

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
}));

const menuStyle = {
  style: { marginTop: 5 },
  MenuListProps: {
    style: { paddingTop: 0, paddingBottom: 0 },
  },
  PaperProps: {
    style: {
      border: "1px solid rgba(255, 255, 255, 0.23)",
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  getContentAnchorEl: null,
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// const createItem = (legendaryName, container, spec, pl, contentType) => {
//   //let lego = new Legendary(legendaryName)
//   //getLegendaryInfo(lego, spec, pl, contentType)
//   //container.push(lego)
// };

// const fillSlot = (container, spec, pl, contentType) => {
//   //container = [];
// };

// const sortItems = (container) => {
//   // Current default sorting is by HPS but we could get creative here in future.
//   container.sort((a, b) => (a.softScore < b.softScore ? 1 : -1));
// };

/*
class Legendary {
    constructor(name) {
        this.name = name;
        this.description = "Legendary Description";
        this.image = 0;
        this.expectedHps = 0;
        this.expectedDps = 0;
        this.singleTargetHPS = 0;
    }
     
} */

// Consider moving to somewhere more globally accessible.
// These are value : label pairs that automatically pull the translated version of the slot name.
// TODO: Add the remaining slots.
function getSlots() {
  const { t, i18n } = useTranslation();
  let slots = [
    { value: "Head", label: t("slotNames.head") },
    { value: "Neck", label: t("slotNames.neck") },
    { value: "Shoulder", label: t("slotNames.shoulder") },
    { value: "Back", label: t("slotNames.back") },
    { value: "Chest", label: t("slotNames.chest") },
    { value: "Wrist", label: t("slotNames.wrists") },
    { value: "Hands", label: t("slotNames.hands") },
    { value: "Waist", label: t("slotNames.waist") },
    { value: "Legs", label: t("slotNames.legs") },
    { value: "Feet", label: t("slotNames.feet") },
    { value: "Finger", label: t("slotNames.finger") },
    { value: "Trinket", label: t("slotNames.trinket") },
    { value: "Weapons", label: t("slotNames.weapons") },
    { value: "Offhands", label: t("slotNames.offhands") },
  ];

  return slots;
}

export default function TopGear(props) {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const classes = useStyles();
  // Snackbar State
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  // Popover Props
  const [anchorEl, setAnchorEl] = useState(null);
  // Define State.

  const [activeSlot, setSlot] = useState("");
  const [itemSocket, setItemSocket] = useState("");
  const [itemTertiary, setItemTertiary] = useState("");
  const [itemList, setItemList] = useState(props.pl.getActiveItems(activeSlot));

  const openPop = Boolean(anchorEl);
  const idPop = openPop ? "simple-popover" : undefined;
  const slots = getSlots();
  const [itemDropdown, setItemDropdown] = useState([]); // Filled later based on item slot and armor type.
  const [AutoValue, setAutoValue] = useState(itemDropdown[0]);
  const [inputValue, setInputValue] = useState("");

  // Right now the available item levels are static, but given the removal of titanforging each item could hypothetically share
  // a list of available ilvls and the player could select from a smaller list instead.
  // This is left as a TODO until key functionality is completed but is a moderate priority.
  // const itemTertiaries = [{"Avoidance", "Avoidance"},{"Leech", "Leech"}, {"None", ""}];
  //testTrinkets(props.pl, "Raid", 184)

  // Fill Items fills the ItemNames box with items appropriate to the given slot and spec.  };

  const unleashTopGear = () => {
    // Call to the Top Gear Engine. Lock the app down.


  }

  const activateItem = (unique) => {
    let player = props.pl;
    player.activateItem(unique);
    setItemList([...player.getActiveItems(activeSlot)]);
    
  }

  const slotList = ["Head", "Shoulder", "Back", "Chest", "Wrist", "Hands", "Waist", "Legs", "Feet", "Finger", "Trinkets"]

  // TODO. Calculate the score for a given item.
  // Score is calculated by multiplying out stat weights and then adding any special effects.
  const calculateScore = (item) => {};

  const wepCombos = buildWepCombos(props.pl);

  return (
    <div
      style={{
        // backgroundColor: "#313131",
        marginTop: 32,
      }}
    >
      <Grid
        container
        spacing={2}
        justify="center"
        style={{
          margin: "auto",
          width: "55%",
          display: "block",
        }}
      >
          {
        <Grid item xs={12}>
            <Paper elevation={0}>
                <Typography
                variant="h4"
                align="center"
                style={{ padding: "10px 10px 5px 10px" }}
                color="primary"
                >
                {("Top Gear")}
                </Typography>
                <Divider variant="middle" />

            </Paper>
        </Grid> }


         {/* this can be simplified into a map at some stage */}

            {slotList.map((key, index) => {

            
                return <Grid item xs={12}>
                    <Typography style={{color: "white"}} variant="h5">
                        {key}

                    </Typography>
                    <Divider style={{ marginBottom: 10, width: '42%' }} />
                    <Grid container spacing={1}>
                        {[...props.pl.getActiveItems(key)].map((item, index) => (
                            <MiniItemCard key={index} item={item} activateItem={activateItem} />
                        ))}
                    </Grid>
                </Grid>
                            
                })}
        </Grid>

        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50px',          
            backgroundColor: '#424242',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

        }}>

            <div style={{
                display: 'flex',
                width: '80%',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                
            }}>
            <Typography
                variant="Subtitle2"
                align="center"
                style={{ padding: "10px 10px 5px 10px"}}
                color="primary"
                >
                {("Selected Items: 2/32")}
                </Typography>
            <Button
                    variant="contained"
                    color="secondary"
                    align="center"
                    style={{height: '68%', width: '180px' }}
                    onClick={unleashTopGear}>
                    Go!
                </Button>
            </div>

        </div>
    </div>
  );
}
