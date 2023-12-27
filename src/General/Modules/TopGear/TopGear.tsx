import React, { useState, useEffect, SyntheticEvent } from "react";
import makeStyles from "@mui/styles/makeStyles";
import "../SetupAndMenus/QEMainMenu.css";
import ReactGA from "react-ga";
import "./../QuickCompare/QuickCompare.css";
import { useTranslation } from "react-i18next";
// import { testTrinkets } from "../Engine/EffectFormulas/Generic/TrinketEffectFormulas";
import { apiSendTopGearSet } from "../SetupAndMenus/ConnectionUtilities";
import { Button, Grid, Typography, Divider, Snackbar, SnackbarCloseReason } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { buildNewWepCombos } from "../../Engine/ItemUtilities";
import MiniItemCard from "./MiniItemCard";
//import worker from "workerize-loader!./TopGearEngine"; // eslint-disable-line import/no-webpack-loader-syntax
import { useHistory } from "react-router-dom";
import HelpText from "../SetupAndMenus/HelpText";
import { CONSTRAINTS } from "../../Engine/CONSTRAINTS";
import { useSelector } from "react-redux";
import ItemBar from "../ItemBar/ItemBar";
import CharacterPanel from "../CharacterPanel/CharacterPanel";
import { reportError } from "General/SystemTools/ErrorLogging/ErrorReporting";
import { getTranslatedSlotName } from "locale/slotsLocale";
import { patronColor, patronCaps } from "General/Modules/SetupAndMenus/Header/PatronColors";
import { RootState } from "Redux/Reducers/RootReducer";
import { Item } from "General/Modules/Player/Item";
import {Player } from "General/Modules/Player/Player";
import { TopGearResult } from "General/Modules/TopGear/Engine/TopGearResult";
import ListedInformationBox from "General/Modules/1. GeneralComponents/ListedInformationBox";

type ShortReport = {
  id: string;
  new: boolean; 
  effectList: any[]; // TODO: Replace with proper Effect array.
  differentials: any[]; // TODO: Replace with Differentials.
  contentType: string; // TODO: Replace with contentTypes
  itemSet: {
    itemList: any[]; // TODO: Replace with Item
    setStats: any; // TODO: Replace with nice stat object.
    primGems: string[];
    enchantBreakdown: any; // TODO: Replace with some form of enchant object. 
    firstSocket: string;
  };
  player: {
    name: string;
    realm: string;
    region: string;
    spec: string;
    model: string;
  }
}

interface ReportItem {
  id: number;
  level: number;
  isEquipped: boolean;
  stats: any;
  leech?: number; // Could just be folded into stats.
  socket?: number;
  vaultItem?: boolean;
  quality?: number;
  effect?: any;
}

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const useStyles = makeStyles((theme?: any) => ({
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
    [theme.breakpoints.down("lg")]: {},
    [theme.breakpoints.up("md")]: {},
  },
  root: {
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

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const sendReport = (shortReport: ShortReport) => {
  const requestOptions: RequestInit = {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(shortReport)
  };
  
  fetch('https://questionablyepic.com/api/addReport.php', requestOptions)
  //.then(response => response.text())
  .then(response => console.log(response));
  //.then(data => this.setState({ postId: data.id }));
}


export default function TopGear(props: any) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const classes = useStyles();

  const contentType = useSelector((state: RootState) => state.contentType);
  const gameType = useSelector((state: RootState) => state.gameType);
  const playerSettings = useSelector((state: RootState) => state.playerSettings);

  /* ----------------------------- Snackbar State ----------------------------- */
  const [openDelete, setOpenDelete] = useState(false);

  const [activeSlot, setSlot] = useState("");
  /* ------------ itemList isn't used for anything here other than to trigger rerenders ----------- */
  const [itemList, setItemList] = useState(props.player.getActiveItems(activeSlot));
  const [btnActive, setBtnActive] = useState<boolean>(true);
  
  const [errorMessage, setErrorMessage] = useState("");
  const patronStatus: string = props.patronStatus;

  const topGearCap = patronCaps[patronStatus] ? patronCaps[patronStatus] : 30; // TODO
  const selectedItemsColor = patronColor[patronStatus];

  const upgradeItem = (item: Item, newItemLevel: number, socketFlag: boolean = false, vaultFlag: boolean = false) => {
    let player = props.player;
    player.upgradeItem(item, newItemLevel, socketFlag, vaultFlag);
    setItemList([...player.getActiveItems(activeSlot)]);
  }

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
    let errorMessage = "";
    let slotLengths: { [key: string]: number } = {
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
        errorMessage = t("TopGear.itemMissingError") + getTranslatedSlotName(key.toLowerCase(), currentLanguage);
      } else if (slotLengths[key] === 0) {
        topgearOk = false;
        errorMessage = t("TopGear.itemMissingError") + getTranslatedSlotName(key.toLowerCase(), currentLanguage);
      }
    }
    //setErrorMessage(errorMessage);
    //setBtnActive(topgearOk);
    return topgearOk;
  };

  const checkSlots = (): string[] => {
       /* ------------------ Check that the player has selected an item in every slot. ----------------- */
       let itemList = props.player.getSelectedItems();
       let missingSlots = [];
       let errorMessage = "";
       let slotLengths: { [key: string]: number } = {
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
         "2H Weapon" : 0,
         "1H Weapon" : 0,
         "Offhand" : 0,
       };
   
       for (var i = 0; i < itemList.length; i++) {
         let slot = itemList[i].slot;
         if (slot in slotLengths || slot === "Shield") {
           if (!itemList[i].vaultItem) {
              if (slot === "Shield") slotLengths["Offhand"] += 1;
              else slotLengths[slot] += 1;
           }
         }
       }
       if (slotLengths["2H Weapon"] > 0) {
        // If we have a two handed weapon, then we don't need to complain about how many main hands and offhands we have.
        slotLengths["1H Weapon"] = slotLengths["Offhand"] = slotLengths["2H Weapon"];
       }
       if (slotLengths["1H Weapon"] > 0 && (slotLengths["Offhand"] > 0 || slotLengths["Shield"] > 0)) {
        // If we have a two handed weapon, then we don't need to complain about how many main hands and offhands we have.
        slotLengths["2H Weapon"] = slotLengths["1H Weapon"];
       }

       for (const key in slotLengths) {
         if ((key === "Finger" || key === "Trinket") && slotLengths[key] < 2) {
           missingSlots.push(key);
           errorMessage = t("TopGear.itemMissingError") + getTranslatedSlotName(key.toLowerCase(), currentLanguage);
         } 
         else if (slotLengths[key] === 0) {
            missingSlots.push(key);
           errorMessage = t("TopGear.itemMissingError") + getTranslatedSlotName(key.toLowerCase(), currentLanguage);
         }
       }



       //setErrorMessage(errorMessage);
       //setBtnActive(topgearOk);

       return missingSlots;
  }

  const getErrorMessage = () => {
    const missingSlots = checkSlots();

    let errorMessage = "Add ";
    if (missingSlots.length > 10) {
      return "Add SimC String"
    }
    else if (missingSlots.length > 0) {
      missingSlots.forEach((slot) => {
        if (!(["2H Weapon", "1H Weapon", "Offhand", "Shield"].includes(slot))) errorMessage += slot + ", ";
        
      })

      if ((missingSlots.includes("2H Weapon") && (missingSlots.includes("1H Weapon") || (missingSlots.includes("Offhand") || missingSlots.includes("Shield"))))) {

        errorMessage += " Weapon, " 
      }

      return errorMessage.slice(0, -2);
    }
    else {
      return "";
    }
  }

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    checkTopGearValid();
  }, []);


  const handleClickDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = (event: Event | React.SyntheticEvent<any>, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenDelete(false);
  };

  const deleteItem = (unique: string) => {
    let player = props.player;
    player.deleteActiveItem(unique);
    setItemList([...player.getActiveItems(activeSlot)]);
    handleClickDelete();
  };

  const catalyzeItem = (item: Item) => {
    let player = props.player;
    player.catalyzeItem(item);
    setItemList([...player.getActiveItems(activeSlot)]);
    // handleClickDelete();
  };

  const shortenReport = (report: TopGearResult, player: Player) => {

    if (report) {
      const shortReport: ShortReport = {id: report.id, 
        differentials: report.differentials, 
        new: false,
        contentType: report.contentType,
        effectList: report.itemSet.effectList, 
        itemSet: {itemList: [],
                  setStats: report.itemSet.setStats,
                  primGems: report.itemSet.primGems,
                  enchantBreakdown: report.itemSet.enchantBreakdown,
                  firstSocket: report.itemSet.firstSocket
                },
        player: {name: player.charName, realm: player.realm, region: player.region, spec: player.spec, model: player.getActiveModel(report.contentType).modelName}
      
      };
    
      
      const addItem = (item: any) => {
        let newItem: ReportItem = {id: item.id, level: item.level, isEquipped: item.isEquipped, stats: item.stats};
        if ('leech' in item.stats && item.stats.leech > 0) newItem.leech = item.stats.leech;
        if (item.socket) newItem.socket = item.socket;
        if (item.vaultItem) newItem.vaultItem = item.vaultItem;
        if (item.quality) newItem.quality = item.quality;
        if (item.effect) newItem.effect = item.effect;
  
        shortReport.itemSet.itemList.push(newItem)
        }
        
        
      for (var i = 0; i < report.itemSet.itemList.length; i++) {
        const item = report.itemSet.itemList[i];
        if (item.slot === "CombinedWeapon") {
          // Unfold weapons so that we send both.
          if (item.offhandID > 0) {
            const mainhandItem = player.getItemByHash(item.mainHandUniqueHash)[0];
            const offhandItem = player.getItemByHash(item.offHandUniqueHash)[0];
            addItem(mainhandItem);
            addItem(offhandItem)
  
          } else {
            const mainhandItem = player.getItemByHash(item.uniqueHash)[0];
            addItem(mainhandItem);
          }
        }
        else {
          addItem(item);
        }
      }
  
      sendReport(shortReport);
      return shortReport;

    }
    else {
      reportError(null, "ShortenReport", "No report found", "");
      return null;
    }

  }

  const unleashWorker = () => {
    const currentLanguage = i18n.language;
    const itemList = props.player.getSelectedItems();
    let wepCombos = buildNewWepCombos(props.player, true);
    const baseHPS = props.player.getHPS(contentType);
    const strippedPlayer = JSON.parse(JSON.stringify(props.player));
    const strippedCastModel = JSON.parse(JSON.stringify(props.player.getActiveModel(contentType)));

    if (gameType === "Retail") {
      const worker = require("workerize-loader!./Engine/TopGearEngine"); // eslint-disable-line import/no-webpack-loader-syntax
      let instance = new worker();
      //console.log(instance);

      instance
        .runTopGear(itemList, wepCombos, strippedPlayer, contentType, baseHPS, playerSettings, strippedCastModel)
        .then((result: TopGearResult | null) => { // 
          if (result) {
            // If top gear completes successfully, log a successful run, terminate the worker and then press on to the Report.
            apiSendTopGearSet(props.player, contentType, result.itemSet.hardScore, result.itemsCompared);
            //props.setTopResult(result);
            const shortResult = shortenReport(result, props.player);
            if (shortResult) shortResult.new = true; // Check that shortReport didn't return null.
            props.setTopResult(shortResult);

            instance.terminate();
            history.push("/report/");
          }
          else { // A valid set was not returned.
            setErrorMessage("Top Gear has crashed. So sorry! It's been automatically reported.");
            console.log("Null Set Returned");
            instance.terminate();
            setBtnActive(true);
          }
        })
        .catch((err: Error) => {
          // If top gear crashes for any reason, log the error and then terminate the worker.
          reportError("", "Top Gear Crash", err, strippedPlayer.spec);
          setErrorMessage("Top Gear has crashed. So sorry! It's been automatically reported.");
          console.log(err);
          instance.terminate();
          setBtnActive(true);
        });
    } else if (gameType === "Classic") {
      const worker = require("workerize-loader!./Engine/TopGearEngineBC"); // eslint-disable-line import/no-webpack-loader-syntax
      let instance = new worker();
      instance
        .runTopGearBC(itemList, wepCombos, strippedPlayer, contentType, baseHPS, currentLanguage, playerSettings, strippedCastModel)
        .then((result: TopGearResult) => {
          //apiSendTopGearSet(props.player, contentType, result.itemSet.hardScore, result.itemsCompared);
          props.setTopResult(result);
          instance.terminate();
          history.push("/report/");
        })
        .catch((err: Error) => {
          // If top gear crashes for any reason, log the error and then terminate the worker.
          reportError("", "Classic Top Gear Crash", err, strippedPlayer.spec);
          setErrorMessage("Top Gear has crashed. So sorry! It's been automatically reported.");
          instance.terminate();
          setBtnActive(true);
        });
    } else {
      /* ---------------------------------------- Return error. --------------------------------------- */
      reportError("", "Top Gear Invalid Game Type", "", gameType);
    }
  };

  const unleashTopGear = () => {
    /* ----------------------- Call to the Top Gear Engine. Lock the app down. ---------------------- */
    if (checkTopGearValid()) {
      setBtnActive(false);
      // Special Error Code
      try {
        unleashWorker();
      } catch (err) {
        setErrorMessage("Top Gear has crashed. Sorry! It's been automatically reported.");
        reportError("", "Top Gear Full Crash", err, JSON.stringify(props.player) || "");
        console.log(err);
        setBtnActive(true);
      }
    }
  };

  const selectedItemCount = props.player.getSelectedItems().length || 0;

  const helpBlurb = t("TopGear.HelpText" + gameType);
  const helpText =
    gameType === "Retail"
      ? [
          "Add your SimC string to automatically import your entire set of items into the app.",
          "Select any items you want included in the comparison. We'll automatically add anything you're currently wearing.",
          "When you're all set, hit the big Go button at the bottom of the page to run the module.",
        ]
      : [
          "Add your QE Import String to automatically import your entire set of items into the app.",
          "Select any items you want included in the comparison. We'll automatically add anything you're currently wearing.",
          "When you're all set, hit the big Go button at the bottom of the page to run the module.",
        ];

  const activateItem = (unique: string, active: boolean) => {
    if (selectedItemCount < topGearCap || active) {
      let player = props.player;
      player.activateItem(unique);
      setItemList([...player.getActiveItems(activeSlot)]);
      setBtnActive(checkTopGearValid());
    }
  };


  const slotList = [
    { label: getTranslatedSlotName("head", currentLanguage), slotName: "Head" },
    { label: getTranslatedSlotName("neck", currentLanguage), slotName: "Neck" },
    { label: getTranslatedSlotName("shoulder", currentLanguage), slotName: "Shoulder" },
    { label: getTranslatedSlotName("back", currentLanguage), slotName: "Back" },
    { label: getTranslatedSlotName("chest", currentLanguage), slotName: "Chest" },
    { label: getTranslatedSlotName("wrists", currentLanguage), slotName: "Wrist" },
    { label: getTranslatedSlotName("hands", currentLanguage), slotName: "Hands" },
    { label: getTranslatedSlotName("waist", currentLanguage), slotName: "Waist" },
    { label: getTranslatedSlotName("legs", currentLanguage), slotName: "Legs" },
    { label: getTranslatedSlotName("feet", currentLanguage), slotName: "Feet" },
    { label: getTranslatedSlotName("finger", currentLanguage), slotName: "Finger" },
    { label: getTranslatedSlotName("trinket", currentLanguage), slotName: "Trinket" },
    { label: getTranslatedSlotName("weapons", currentLanguage), slotName: "AllMainhands" },
    { label: getTranslatedSlotName("offhands", currentLanguage), slotName: "Offhands" },
  ];
  if (gameType === "Classic") slotList.push({ label: getTranslatedSlotName("relics", currentLanguage), slotName: "Relics & Wands" });
  return (
    <div className={classes.root}>
      <div style={{ height: 96 }} />
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center" style={{ padding: "10px 10px 5px 10px" }} color="primary">
            {t("TopGear.Title")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <HelpText blurb={helpBlurb} text={helpText} expanded={true} />
        </Grid>
        <Grid item xs={12}>
          <CharacterPanel
            player={props.player}
            simcSnack={props.simcSnack}
            allChars={props.allChars}
            contentType={contentType}
            singleUpdate={props.singleUpdate}
          />
        </Grid>

        <Grid item xs={12}>
          <ItemBar player={props.player} setItemList={setItemList} />
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
                    <MiniItemCard key={index} itemKey={item} upgradeItem={upgradeItem} activateItem={activateItem} delete={deleteItem} catalyze={catalyzeItem} /*primGems={props.player.getBestPrimordialIDs(playerSettings, contentType)}*/ />
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
          height: "60px",
          backgroundColor: "#424242",
          borderTopColor: "Goldenrod",
          borderTopWidth: "1px",
          borderTopStyle: "solid",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
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
          <Typography align="center" style={{ padding: "2px 2px 2px 2px" }} color={selectedItemsColor}>
            {t("TopGear.SelectedItems") + ":" + " " + selectedItemCount + "/" + topGearCap}
          </Typography>
          <div>
            <Typography variant="subtitle2" align="center" style={{ padding: "2px 2px 2px 2px", marginRight: "5px" }} color="primary">
              {getErrorMessage()}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              style={{ height: "64%", width: "180px" }} 
              disabled={checkSlots().length > 0 || !btnActive}  //
              onClick={unleashTopGear}> 
              {t("TopGear.GoMsg")}
            </Button>
          </div>
        </div>
      </div>

      {/*item deleted snackbar */}
      <Snackbar open={openDelete} autoHideDuration={3000} onClose={handleCloseDelete}>
        <div>
          <Alert onClose={handleCloseDelete} severity="error">
            {t("QuickCompare.ItemDeleted")}
          </Alert>
        </div>
      </Snackbar>
    </div>
  );
}
