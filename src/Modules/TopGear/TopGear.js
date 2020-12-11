import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../SetupAndMenus/QEMainMenu.css";
import ReactGA from "react-ga";
import Item from "../Player/Item";
import "./../QuickCompare/QuickCompare.css";
import { useTranslation } from "react-i18next";
import { testTrinkets } from "../Engine/EffectFormulas/Generic/TrinketEffectFormulas";
import {apiSendTopGearSet} from "../SetupAndMenus/ConnectionUtilities";
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
import topGearEngine from "./TopGearEngine";
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
//import worker from "workerize-loader!./TopGearEngine"; // eslint-disable-line import/no-webpack-loader-syntax
import { useHistory, useLocation } from "react-router-dom";
import HelpText from "../SetupAndMenus/HelpText";

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

const TOPGEARCAP = 34; // TODO

export default function TopGear(props) {


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
  const [btnActive, setBtnActive] = useState(true);

  const openPop = Boolean(anchorEl);
  const idPop = openPop ? "simple-popover" : undefined;
  const [itemDropdown, setItemDropdown] = useState([]); // Filled later based on item slot and armor type.
  
  
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  // Right now the available item levels are static, but given the removal of titanforging each item could hypothetically share
  // a list of available ilvls and the player could select from a smaller list instead.
  // This is left as a TODO until key functionality is completed but is a moderate priority.
  // const itemTertiaries = [{"Avoidance", "Avoidance"},{"Leech", "Leech"}, {"None", ""}];
  //testTrinkets(props.pl, "Raid", 184)

  // Fill Items fills the ItemNames box with items appropriate to the given slot and spec.  };

  let history = useHistory();
  
  const checkTopGearValid = () => {
    // Check that the player has selected an item in every slot. 
    let topgearOk = true;
    let itemList = props.pl.getSelectedItems();
    let slotLengths = {
      "Head": 0,
      "Neck": 0,
      "Shoulder": 0,
      "Back": 0,
      "Chest": 0,
      "Wrist": 0,
      "Hands": 0,
      "Waist": 0,
      "Legs": 0,
      "Feet": 0,
      "Finger": 0,
      "Trinket": 0,
      /*
      "2H Weapon" : 0,
      "1H Weapon" : 0,
      "Offhand" : 0, */
    }
    
    for (var i = 0; i < itemList.length; i++) {
      let slot = itemList[i].slot;
      if (slot in slotLengths) {
          slotLengths[slot] += 1;
      }
    } 
    for (const key in slotLengths) {
      if ((key === "Finger" || key === "Trinket") && slotLengths[key] < 2) topgearOk = false;
      else if (slotLengths[key] === 0) topgearOk = false;
      //console.log("Sloot Length: " + key + " " + slotLengths[key])
    }

    return topgearOk;

  }

  const unleashTopGear = () => {
    // Call to the Top Gear Engine. Lock the app down.
    if (checkTopGearValid) {
      setBtnActive(false);
      let itemList = props.pl.getSelectedItems();
      let wepCombos = buildWepCombos(props.pl, true)
      const worker =  require('workerize-loader!./TopGearEngine'); // eslint-disable-line import/no-webpack-loader-syntax
      let instance = new worker();
      let strippedPlayer = JSON.parse(JSON.stringify(props.pl));
      //console.log("Pl: " + JSON.stringify(props.pl));
      instance
        .runTopGear(itemList, wepCombos, strippedPlayer, props.contentType)
        .then((result) => {
          //console.log(`Loop returned`);
          apiSendTopGearSet(props.pl, props.contentType, result.itemSet.hardScore, result.itemsCompared);
          props.setTopResult(result);
          history.push("/report/");
        });
    }
    else {
      // Return error.
    }

  };

  const selectedItemCount = props.pl.getSelectedItems().length;
  const helpText = `Top Gear allows you to generate an entire gear set at once. Start by entering your SimC string above, then click to highlight any items you want included
  in the comparison. When you're all set, hit "Go" at the bottom of the page. To enter items manually, return to the main menu and include them in QE Quick
  Compare.`

  const activateItem = (unique) => {
    if (selectedItemCount < TOPGEARCAP) {
      let player = props.pl;
      player.activateItem(unique);
      setItemList([...player.getActiveItems(activeSlot)]);
      setBtnActive(checkTopGearValid());
    }

  };


  const slotList = [
    {label: "Head", slotName: "Head"},
    {label: "Neck", slotName: "Neck"},
    {label: "Shoulder", slotName: "Shoulder"},
    {label: "Back", slotName: "Back"},
    {label: "Chest", slotName: "Chest"},
    {label: "Wrist", slotName: "Wrist"},
    {label: "Hands", slotName: "Hands"},
    {label: "Waist", slotName: "Waist"},
    {label: "Legs", slotName: "Legs"},
    {label: "Feet", slotName: "Feet"},
    {label: "Finger", slotName: "Finger"},
    {label: "Trinket", slotName: "Trinket"}, 
    {label: "Main Hands & 2 Handers", slotName: "AllMainhands"},
    {label: "Offhands & Shields", slotName: "Offhands"},
  ];  

  //const slotList = [];



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
                {"Top Gear"}
              </Typography>
            </Paper>
          </Grid>
        }        
        <Grid item xs={12}>
        <HelpText text={helpText} />
      </Grid>
      
        {props.pl.activeItems.length > 0 ? slotList.map((key, index) => {
          return (
            <Grid item xs={12}>
              <Typography style={{ color: "white" }} variant="h5">
                {key.label}
              </Typography>
              <Divider style={{ marginBottom: 10, width: "42%" }} />
              <Grid container spacing={1}>
                {[...props.pl.getActiveItems(key.slotName)].map((item, index) => (
                  <MiniItemCard
                    key={index}
                    item={item}
                    activateItem={activateItem}
                  />
                )) }
              </Grid>
            </Grid>
          );
        }) : 
      <Typography style={{ color: "white", fontStyle:"italic", marginLeft: '10px'}} variant="h6">Your items will go here after you import.</Typography> }
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
          //backgroundImage: "../../Images/Ptolemy.jpg",
        }}
      >
        {/*<img src={"../../Images/Ptolemy.jpg"} /> */}
        <div
          style={{
            display: "flex",
            width: "80%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Typography
            variant="Subtitle2"
            align="center"
            style={{ padding: "10px 10px 5px 10px" }}
            color="primary"
          >
            {"Selected Items: " + selectedItemCount + "/" + TOPGEARCAP}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            align="center"
            style={{ height: "68%", width: "180px" }}
            disabled={!btnActive}
            onClick={unleashTopGear}
          >
            Go!
          </Button>
        </div>
      </div>
    </div>
  );
}
