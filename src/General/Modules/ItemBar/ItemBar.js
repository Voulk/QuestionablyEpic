import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import makeStyles from "@mui/styles/makeStyles";
import { InputLabel, MenuItem, FormControl, Select, Button, Grid, Paper, Typography, Divider, Snackbar, TextField, Popover, Box } from "@mui/material";
import { Autocomplete } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import "../SetupAndMenus/QEMainMenu.css";
import Item from "../Player/Item";
import ClassicItem from "../Player/ClassicItem";
import {
  checkDefaultSocket,
  getTranslatedItemName,
  getItemDB,
  getValidArmorTypes,
  getValidWeaponTypesBySpec,
  getItemProp,
  scoreItem,
  getItemAllocations,
  calcStatsAtLevel,
  autoAddItems,
} from "../../Engine/ItemUtilities";
import { CONSTRAINTS } from "../../Engine/CONSTRAINTS";
import { useSelector } from "react-redux";
import { getTranslatedStats } from "locale/statsLocale";
import WowheadTooltip from "General/Modules/1. GeneralComponents/WHTooltips.tsx";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(0.5),
    minWidth: 120,
    whiteSpace: "noWrap",
  },
  title: {
    // padding: "8px 8px",
    paddingLeft: 16,
    fontSize: theme.typography.pxToRem(15),
  },
  typography: {
    padding: theme.spacing(2),
  },
  option: {
    borderBottom: "1px solid rgba(255, 255, 255, 0.23)",
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


// Create and return an item. Could maybe be merged with the SimC createItem function?
export const createItem = (itemID, itemName, itemLevel, itemSocket, itemTertiary, missives = "", gameType) => {

  //let player = props.player;
  let item = "";

  const itemSlot = getItemProp(itemID, "slot", gameType);
  const isCrafted = getItemProp(itemID, "crafted", gameType);

  if (isCrafted) {
    // Item is a legendary and gets special handling.
    const missiveStats = missives.toLowerCase().replace(" (engineering)", "").replace(/ /g, "").split("/");
    let itemAllocations = getItemAllocations(itemID, missiveStats);
    let craftedSocket = itemSocket || checkDefaultSocket(itemID);
    item = new Item(itemID, itemName, itemSlot, craftedSocket, itemTertiary, 0, itemLevel, "");
    item.stats = calcStatsAtLevel(item.level, itemSlot, itemAllocations, "");
    if (item.slot === "Neck") item.socket = 3;

    let bonusString = "";
    if (missives.includes("Haste")) bonusString += ":6649";
    if (missives.includes("Mastery")) bonusString += ":6648";
    if (missives.includes("Crit")) bonusString += ":6647";
    if (missives.includes("Versatility")) bonusString += ":6650";

    item.bonusIDS = bonusString;
    item.guessItemQuality();
  } else {
    item = new Item(itemID, itemName, getItemProp(itemID, "slot", gameType), itemSocket, itemTertiary, 0, itemLevel, "", gameType);
    //item.guessItemQuality();
    item.quality = getItemProp(itemID, "quality", gameType);
  }
  //item.softScore = scoreItem(item, player, contentType, gameType, playerSettings);

  return item;

};

export default function ItemBar(props) {
  const contentType = useSelector((state) => state.contentType);
  const playerSettings = useSelector((state) => state.playerSettings);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const classes = useStyles();
  /* ------------------------------ Popover Props ----------------------------- */
  const [anchorEl, setAnchorEl] = useState(null);
  const openPop = Boolean(anchorEl);
  const idPop = openPop ? "simple-popover" : undefined;
  const gameType = useSelector((state) => state.gameType);

  const autoFillItems = (itemLevel, player, gameType, source = "") => {

    autoAddItems(player, gameType, itemLevel, source);
    props.setItemList([...player.getActiveItems(activeSlot)]);
  }

  const fillItems = (slotName, spec) => {
    const acceptableArmorTypes = getValidArmorTypes(spec);
    const acceptableWeaponTypes = getValidWeaponTypesBySpec(spec);

    let newItemList = [];
    const db = getItemDB(gameType);

    db.filter(
      (key) =>
        (!("classReq" in key) || key.classReq.includes(spec)) &&
        (key.slot === "Back" ||
          (key.itemClass === 4 && acceptableArmorTypes.includes(key.itemSubClass)) ||
          key.slot === "Holdable" ||
          key.slot === "Offhand" ||
          key.slot === "Shield" ||
          (key.itemClass === 2 && acceptableWeaponTypes.includes(key.itemSubClass)) ||
          (key.itemClass === 2 && spec === "Holy Priest Classic")), // Wands
          ).map((key) => newItemList.push({ value: key.id, label: getTranslatedItemName(key.id, currentLanguage, {}, gameType) + (gameType === "Classic" ? " (" + key.itemLevel + ")" : "")}));
    
      
      newItemList = newItemList.reduceRight((unique, o) => {
        if (!unique.some((obj) => obj.label === o.label)) {
          unique.push(o);
        }
        return unique;
      }, []);
    newItemList.sort((a, b) => (a.label > b.label ? 1 : -1));
    return newItemList;
  };


  const [itemDropdown, setItemDropdown] = useState(fillItems("", props.player.spec)); // Filled later based on item slot and armor type.
  /* ------------------------------ Define State ----------------------------- */
  const [itemLevel, setItemLevel] = useState("");
  const [itemID, setItemID] = useState("");
  const [itemName, setItemName] = useState("");
  const [activeSlot, setSlot] = useState("");
  const [itemSocket, setItemSocket] = useState(false);
  const [itemTertiary, setItemTertiary] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [missives, setMissives] = useState("Haste / Versatility");

  /* ------------------------ End Simc Module Functions ----------------------- */

  /* ----------------------------- Snackbar State ----------------------------- */
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleClosePop = () => {
    setAnchorEl(null);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  /* ---------------- Add an item to our "Active Items" array. ---------------- */
  const addItem = (event) => {
    if (itemLevel > CONSTRAINTS.Retail.maxItemLevel) {
      setAnchorEl(anchorEl ? null : event.currentTarget);
      return null;
    }
    let player = props.player;
    //let item = "";

    if (true) { // Formerly Retail check. TODO.
      const item = createItem(itemID, itemName, itemLevel, itemSocket, itemTertiary, missives, gameType);

      if (item) {
        item.softScore = scoreItem(item, player, contentType, gameType, playerSettings);
        item.active = true;
        player.addActiveItem(item);
        props.setItemList([...player.getActiveItems(activeSlot)]);
        
        setOpen(true);
        setInputValue("");
        setItemLevel("");
        setItemSocket(false);
        setItemTertiary("");
      }
          
    };

  };

  const itemNameChanged = (event, val) => {
    if (val === null) {
      setItemID("");
      setItemName("");
    } else {
      setItemID(val.value);
      setItemName(val.name);
      if (gameType === "Classic") setItemLevel(getItemProp(val.value, "itemLevel", gameType));
    }
  };

  const itemLevelChanged = (val) => {
    setItemLevel(val);
    //setItemSocket(false);
    //setItemTertiary("");
  };

  const itemSocketChanged = (event) => {
    setItemSocket(event.target.value);
  };

  const itemTertiaryChanged = (event) => {
    setItemTertiary(event.target.value);
  };

  const itemMissivesChanged = (event) => {
    setMissives(event.target.value);
  };

  const [openAuto, setOpenAuto] = React.useState(false);
  const handleOpen = () => {
    if (inputValue.length > 0) {
      setOpenAuto(true);
    }
  };
  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue.length > 2) {
      setOpenAuto(true);
    } else {
      setOpenAuto(false);
    }
  };
  /* ---------------------------------------- Missive Array --------------------------------------- */
  const craftedStatPossibilities = [
    "Haste / Versatility",
    "Haste / Mastery",
    "Haste / Crit",
    "Crit / Mastery",
    "Crit / Versatility",
    "Mastery / Versatility",
    "Haste (engineering)",
    "Crit (engineering)",
    "Mastery (engineering)",
    "Versatility (engineering)",
  ];

  /*const getCraftedMissives = (itemID) => {
    const itemSources = getItemDB("Retail").filter((key) => key.id === itemID)[0];
    if ()

  }*/

  const isItemCrafted = (getItemDB("Retail")
    .filter((key) => key.id === itemID)
    .map((key) => key.crafted)[0]) || false; // Change this to crafted.

  const availableFields = {
    name: true,
    itemLevel: true,
    socket: gameType === "Retail",
    tertiaries: !(isItemCrafted) && gameType === "Retail",
    missives: isItemCrafted,
  }

  return (
    <Paper
      id="itemBarPaper"
      elevation={0}
      style={{
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: 8,
        
        border: "1px", 
        borderStyle: "solid",
        borderColor: "goldenrod",

        backgroundColor: "#47433B",
      }}
    >
      <Grid
        id="itemBarMainGridContainer"
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        style={{
          // paddingTop: 4,
          paddingBottom: 4,
          // display: "inline-flex",
        }}
      >
        <Grid id="itemBarTitleGrid" item xs={12}>
          <Typography id="itembarTitleTypography" className={classes.title}>
            {t("QuickCompare.ItemBarTitle")}
          </Typography>
          <Divider id="itemBarTitleDivider" variant="middle" />
        </Grid>
        {/* -------------------------------------------------------------------------- */
        /*                               Item Selection                               */
        /* -------------------------------------------------------------------------- */}

        <Grid item xs={11} sm={11} md={6} lg={6} xl={5}>
          <FormControl className={classes.formControl} variant="outlined" size="small" fullWidth>
            <Autocomplete
              size="small"
              classes={{
                option: classes.option,
              }}
              id="item-select"
              // value={AutoValue}
              onChange={(e, v) => itemNameChanged(e, v)}
              options={itemDropdown}
              openOnFocus={true}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              inputValue={inputValue}
              onInputChange={handleInputChange}
              freeSolo
              style={{ width: "100%" }}
              renderInput={(params) => <TextField {...params} label={t("QuickCompare.ItemName")} variant="outlined" />}
              // TODO: Fix option key error
              // renderOption={(props, option) => {
              //   return (
              //     <Box component="li" {...props} key={option.id}>
              //       {option.name}
              //     </Box>
              //   );
              // }}
              ListboxProps={{ style: { border: "1px solid rgba(255, 255, 255, 0.23)", borderRadius: 4, paddingTop: 0, paddingBottom: 0 } }}
              open={openAuto}
              onOpen={handleOpen}
              onClose={() => setOpenAuto(false)}
            />
          </FormControl>
        </Grid>

        {/* -------------------------------------------------------------------------- */
        /*                                 Item Level                                 */
        /* -------------------------------------------------------------------------- */}

        <Grid item>
          {availableFields.itemLevel ? (
            <FormControl className={classes.formControl} variant="outlined" size="small" style={{ width: t("QuickCompare.ItemLevel").length > 10 ? 160 : 120 }}>
              <TextField
                error={itemLevel > CONSTRAINTS.Retail.maxItemLevel ? true : false}
                id="Ilvl-select"
                onChange={(e) => itemLevelChanged(e.target.value)}
                value={itemLevel}
                label={t("QuickCompare.ItemLevel")}
                disabled={(itemID === "" || gameType === "Classic") ? true : false}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 3);
                }}
                variant="outlined"
                size="small"
                type="number"
                inputProps={{
                  min: CONSTRAINTS.Retail.minItemLevel,
                  max: CONSTRAINTS.Retail.maxItemLevel,
                }}
              />
            </FormControl>
          ) : ""}
        </Grid>

        {
          /* ---------------------------------------------------------------------------------------------- */
          /*                                        Missive Selection                                       */
          /* ---------------------------------------------------------------------------------------------- */
          availableFields.missives ? (
            <Grid item>
              <FormControl className={classes.formControl} variant="outlined" size="small" disabled={itemLevel === "" ? true : false}>
                <InputLabel id="missiveSelection">{t("QuickCompare.Missives")}</InputLabel>
                <Select key={"missiveSelection"} labelId="missiveSelection" value={missives} onChange={itemMissivesChanged} label={t("QuickCompare.Missives")}>
                  {craftedStatPossibilities.map((key, i, arr) => {
                    let lastItem = i + 1 === arr.length ? false : true;
                    return (
                      <MenuItem divider={lastItem} key={key} label={t(key)} value={key}>
                        {t(key)}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          ) : ""}
          {
          /* ---------------------------------------------------------------------------------------------- */
          /*                                             Sockets                                             */
          /* ----------------------------------------------------------------------------------------------  */
          availableFields.socket ? (
            <Grid item>
              <FormControl className={classes.formControl} variant="outlined" size="small" disabled={itemLevel === "" ? true : false}>
                <InputLabel id="itemsocket">{t("QuickCompare.Socket")}</InputLabel>
                <Select key={"sockets"} labelId="itemsocket" value={itemSocket} onChange={itemSocketChanged} label={t("QuickCompare.Socket")}>
                  <MenuItem divider key={1} label={t("Yes")} value={true}>
                    {t("Yes")}
                  </MenuItem>
                  <MenuItem key={3} label={t("No")} value={false}>
                    {t("No")}
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          ) : (
            ""
          )
        }

        {/* -------------------------------------------------------------------------- */
        /*                              Tertiary Dropdown                             */
        /* -------------------------------------------------------------------------- */}

        {availableFields.tertiaries ? (
          <Grid item>
            <FormControl
              className={classes.formControl}
              variant="outlined"
              size="small"
              style={{ width: t("QuickCompare.ItemLevel").length > 10 ? 160 : 120 }}
              disabled={itemLevel === "" || isItemCrafted === true ? true : false}
            >
              <InputLabel id="itemtertiary">{t("QuickCompare.Tertiary")}</InputLabel>
              <Select key={"TertiarySelect"} labelId="itemtertiary" value={itemTertiary} onChange={itemTertiaryChanged} label={t("QuickCompare.Tertiary")}>
                <MenuItem divider key={"LeechItem"} label={getTranslatedStats("Leech", currentLanguage)} value={"Leech"}>
                  {getTranslatedStats("Leech", currentLanguage)}
                </MenuItem>
                <MenuItem divider key={"AvoidanceItem"} label={getTranslatedStats("Avoidance", currentLanguage)} value={"Avoidance"}>
                  {getTranslatedStats("Avoidance", currentLanguage)}
                </MenuItem>
                <MenuItem key={"NoneItem"} label={t("None")} value={"None"} onClick={""}>
                  {t("None")}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        ) : (
          ""
        )}

        {/* -------------------------------------------------------------------------- */
        /*                                 Add Button                                 */
        /* -------------------------------------------------------------------------- */}

        <Grid item>
          <Button key={8} variant="contained" color="primary" onClick={addItem} size="small" disabled={itemLevel === "" ? true : false}>
            {t("QuickCompare.AddButton")}
          </Button>
          <Popover
            id={idPop}
            open={openPop}
            anchorEl={anchorEl}
            onClose={handleClosePop}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Typography className={classes.typography}>{t("QuickCompare.ItemErrorMsg")}</Typography>
          </Popover>
        </Grid>
        {/* Item added snackbar */}
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            {t("QuickCompare.ItemAdded")}
          </Alert>
        </Snackbar>
      </Grid>
      {gameType === "Classic" ? <Grid 
        container
        justifyContent="center"
        alignItems="center"
        direction="column"

        spacing={1}
        sx={{
          paddingTop: "30px",
          paddingBottom: "10px",
      }}>
        <Grid item><Typography>{"Or auto add all pieces in a category!"}</Typography></Grid>
        <Grid item>
          <Button variant="contained" sx={{width: 150, marginRight: 1}} color="primary" onClick={() => autoFillItems(346, props.player, "Classic")}>{"346 Gear"}</Button>
          <Button variant="contained" sx={{width: 150, marginRight: 1}} color="primary" onClick={() => autoFillItems(353, props.player, "Classic")}>{"353 Gear"}</Button>
          <Button variant="contained" sx={{width: 150, marginRight: 1}} color="primary" onClick={() => autoFillItems(359, props.player, "Classic")}>{"359 Gear"}</Button>
          <Button variant="contained" sx={{width: 150}} color="primary" onClick={() => autoFillItems(372, props.player, "Classic")}>{"372 Gear"}</Button>
        </Grid>
      </Grid> : 
       <Grid 
       container
       justifyContent="center"
       alignItems="center"
       direction="column"

       spacing={1}
       sx={{
         paddingTop: "30px",
         paddingBottom: "10px",
     }}>
       <Grid item><Typography>{"Or auto add all pieces in a category!"}</Typography></Grid>
       <Grid item>
         <Button variant="contained" sx={{width: 150, marginRight: 1}} color="primary" onClick={() => autoFillItems(626, props.player, "Retail", "Palace")}>{"Palace Heroic"}</Button>
         <Button variant="contained" sx={{width: 150, marginRight: 1}} color="primary" onClick={() => autoFillItems(639, props.player, "Retail", "Palace")}>{"Palace Mythic"}</Button>
         <Button variant="contained" sx={{width: 150}} color="primary" onClick={() => autoFillItems(639, props.player, "Retail", "S1 Dungeons")}>{"S1 Dungeons"}</Button>

       </Grid>
     </Grid>}
    </Paper>
  );
}
