import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel, MenuItem, FormControl, Select, Button, Grid, Paper, Typography, Divider, Snackbar, TextField, Popover } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import MuiAlert from "@material-ui/lab/Alert";
import "../SetupAndMenus/QEMainMenu.css";
import Item from "../Player/Item";
import "./QuickCompare.css";
import { itemDB } from "../../Databases/ItemDB";
import { getValidArmorTypes, getValidWeaponTypes, calcStatsAtLevel, getItemAllocations, scoreItem, getItemEffect, buildWepCombos, getItemSlot } from "../Engine/ItemUtilities";
import ItemCard from "./ItemCard";
import HelpText from "../SetupAndMenus/HelpText";
import { CONSTRAINTS } from "../Engine/CONSTRAINTS";
import UpgradeFinderSimC from "../UpgradeFinder/UpgradeFinderSimCImport";

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
    [theme.breakpoints.down("sm")]: {
      marginTop: 120,
    },
    [theme.breakpoints.up("md")]: {
      marginTop: 32,
    },
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

export default function QuickCompare(props) {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, props.player.scoreActiveItems(props.contentType));

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const classes = useStyles();

  /* ----------------------------- Snackbar State ----------------------------- */
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  /* ------------------------------ Popover Props ----------------------------- */
  const [anchorEl, setAnchorEl] = useState(null);
  /* ------------------------------ Define State ----------------------------- */
  const [itemLevel, setItemLevel] = useState("");
  const [itemID, setItemID] = useState("");
  const [itemName, setItemName] = useState("");
  const [activeSlot, setSlot] = useState("");
  const [itemSocket, setItemSocket] = useState("");
  const [itemTertiary, setItemTertiary] = useState("");
  const [itemList, setItemList] = useState(props.player.getActiveItems(activeSlot));
  const [itemDropdown, setItemDropdown] = useState([]); // Filled later based on item slot and armor type.
  const [AutoValue, setAutoValue] = useState(itemDropdown[0]);
  const [inputValue, setInputValue] = useState("");
  const openPop = Boolean(anchorEl);
  const idPop = openPop ? "simple-popover" : undefined;
  const slots = getSlots();
  const helpText = t("QuickCompare.HelpText");

  /* -------------------------- SimC Module Functions ------------------------- */
  const checkCharacterValid = (player) => {
    const weaponSet = player.getActiveItems("AllMainhands", false, true);
    const weapon = weaponSet.length > 0 ? weaponSet[0] : "";

    return (weapon.slot === "2H Weapon" && player.getEquippedItems().length === 15) || (weapon.slot === "1H Weapon" && player.getEquippedItems().length === 16);
  };

  const getSimCStatus = () => {
    if (props.player.activeItems.length === 0) return "Missing";
    else if (checkCharacterValid(props.player) === false) return "Invalid";
    else return "Good";
  };
  /* ------------------------ End Simc Module Functions ----------------------- */

  const handleClick = () => {
    setOpen(true);
  };

  const handleClickDelete = () => {
    setOpenDelete(true);
  };

  const handleClosePop = () => {
    setAnchorEl(null);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleCloseDelete = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenDelete(false);
  };

  // Fill Items fills the ItemNames box with items appropriate to the given slot and spec.
  const fillItems = (slotName, spec) => {
    const acceptableArmorTypes = getValidArmorTypes(spec);
    const acceptableWeaponTypes = getValidWeaponTypes(spec, slotName);
    let newItemList = [];

    itemDB
      .filter(
        (key) =>
          (slotName === key.slot && key.slot === "Back") ||
          (slotName === key.slot && key.itemClass === 4 && acceptableArmorTypes.includes(key.itemSubClass)) ||
          (slotName === "Offhands" && (key.slot === "Holdable" || key.slot === "Offhand" || key.slot === "Shield")) ||
          (slotName === "Weapons" && key.itemClass === 2 && acceptableWeaponTypes.includes(key.itemSubClass)),
      )
      .map((key) => newItemList.push({ value: key.id, label: key.names[currentLanguage] }));

    newItemList.sort((a, b) => (a.label > b.label ? 1 : -1));
    setItemDropdown(newItemList);
  };

  /* ---------------- Add an item to our "Active Items" array. ---------------- */
  const addItem = (event) => {
    if (itemLevel > CONSTRAINTS.maxItemLevel) {
      setAnchorEl(anchorEl ? null : event.currentTarget);
      return null;
    }
    let player = props.player;
    let item = new Item(itemID, itemName, getItemSlot(itemID), itemSocket, itemTertiary, 0, itemLevel, "");
    item.softScore = scoreItem(item, player, props.contentType);

    player.addActiveItem(item);
    setItemList([...player.getActiveItems(activeSlot)]);
    setOpen(true);
  };

  const deleteItem = (unique) => {
    let player = props.player;
    player.deleteActiveItem(unique);
    setItemList([...player.getActiveItems(activeSlot)]);
    handleClickDelete();
  };

  const itemNameChanged = (event, val) => {
    if (val === null) {
      setItemID("");
      setItemName("");
    } else {
      setItemID(val.value);
      setItemName(val.name);
    }
  };

  const itemLevelChanged = (val) => {
    setItemLevel(val);
    setItemSocket("");
    setItemTertiary("");
  };

  const itemSocketChanged = (event) => {
    setItemSocket(event.target.value);
  };

  const itemTertiaryChanged = (event) => {
    setItemTertiary(event.target.value);
  };

  const changeSlot = (e, v) => {
    if (v === null) {
    } else {
      setItemDropdown([]);
      setAutoValue(v.value);
      setInputValue("");
      setItemLevel("");
      setItemSocket("");
      setItemTertiary("");
    }

    setSlot(e.target.value);
    setItemList([...props.player.getActiveItems(e.target.value)]);
    fillItems(e.target.value, props.player.spec);
  };

  // TODO. Calculate the score for a given item.
  // Score is calculated by multiplying out stat weights and then adding any special effects.
  const calculateScore = (item) => {};

  const wepCombos = buildWepCombos(props.player);

  return (
    <div className={classes.header}>
      <Grid
        container
        spacing={1}
        justify="center"
        style={{
          margin: "auto",
          width: "65%",
          display: "block",
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" align="center" style={{ padding: "10px 10px 5px 10px" }} color="primary">
            {t("QuickCompare.Title")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <HelpText text={helpText} />
        </Grid>
        <Grid item xs={12}>
          {/*<UpgradeFinderSimC player={props.player} contentType={props.contentType} simcSnack={props.simcSnack} allChars={props.allChars} /> */}
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={0}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{
                paddingTop: 4,
                paddingBottom: 4,
                display: "inline-flex",
              }}
            >
              <Grid item>
                <FormControl className={classes.formControl} variant="outlined" size="small">
                  <InputLabel id="slots">{t("QuickCompare.Slot")}</InputLabel>
                  <Select labelId="slots" value={activeSlot} onChange={(e, v) => changeSlot(e, v)} MenuProps={menuStyle} label={t("QuickCompare.Slot")}>
                    {slots
                      .map((x, y) => (
                        <MenuItem key={y} value={x.value}>
                          {x.label}
                        </MenuItem>
                      ))
                      .map((key) => [key, <Divider />])}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item>
                <FormControl className={classes.formControl} variant="outlined" size="small" style={{ minWidth: 350 }} disabled={activeSlot === "" ? true : false}>
                  <Autocomplete
                    size="small"
                    disabled={activeSlot === "" ? true : false}
                    id="item-select"
                    value={AutoValue}
                    onChange={(e, v) => itemNameChanged(e, v)}
                    options={itemDropdown}
                    openOnFocus={true}
                    getOptionLabel={(option) => option.label}
                    getOptionSelected={(option, value) => option.label === value.label}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    ListboxProps={{
                      style: {
                        border: "1px solid rgba(255, 255, 255, 0.23)",
                        padding: 0,
                      },
                    }}
                    style={{ width: "100%" }}
                    renderInput={(params) => <TextField {...params} label={t("QuickCompare.ItemName")} variant="outlined" />}
                  />
                </FormControl>
              </Grid>

              <Grid item>
                <FormControl className={classes.formControl} variant="outlined" size="small" style={{ width: t("QuickCompare.ItemLevel").length > 10 ? 160 : 120 }}>
                  <TextField
                    error={itemLevel > CONSTRAINTS.maxItemLevel ? true : false}
                    id="Ilvl-select"
                    onChange={(e) => itemLevelChanged(e.target.value)}
                    value={itemLevel}
                    label={t("QuickCompare.ItemLevel")}
                    disabled={itemID === "" ? true : false}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 3);
                    }}
                    variant="outlined"
                    size="small"
                    type="number"
                    inputProps={{
                      min: CONSTRAINTS.minItemLevel,
                      max: CONSTRAINTS.maxItemLevel,
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item>
                <FormControl className={classes.formControl} variant="outlined" size="small" disabled={itemLevel === "" ? true : false}>
                  <InputLabel id="itemsocket">{t("QuickCompare.Socket")}</InputLabel>
                  <Select
                    // key={1}
                    labelId="itemsocket"
                    value={itemSocket}
                    onChange={itemSocketChanged}
                    MenuProps={menuStyle}
                    label={t("QuickCompare.Socket")}
                  >
                    {[
                      <MenuItem key={1} label={t("Yes")} value={true}>
                        {t("Yes")}
                      </MenuItem>,
                      <Divider key={2} />,
                    ]}
                    ,
                    {[
                      <MenuItem key={3} label={t("No")} value={false}>
                        {t("No")}
                      </MenuItem>,
                      <Divider key={4} />,
                    ]}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item>
                <FormControl
                  className={classes.formControl}
                  variant="outlined"
                  size="small"
                  style={{ width: t("QuickCompare.ItemLevel").length > 10 ? 160 : 120 }}
                  disabled={itemLevel === "" ? true : false}
                >
                  <InputLabel id="itemtertiary">{t("QuickCompare.Tertiary")}</InputLabel>
                  <Select
                    key={"TertiarySelect"}
                    labelId="itemtertiary"
                    value={itemTertiary}
                    onChange={itemTertiaryChanged}
                    MenuProps={menuStyle}
                    label={t("QuickCompare.Tertiary")}
                  >
                    {[
                      <MenuItem key={"LeechItem"} label={t("Leech")} value={"Leech"}>
                        {t("Leech")}
                      </MenuItem>,
                      <Divider key={1} />,
                    ]}
                    ,
                    {[
                      <MenuItem key={"AvoidanceItem"} label={t("Avoidance")} value={"Avoidance"}>
                        {t("Avoidance")}
                      </MenuItem>,
                      <Divider key={2} />,
                    ]}
                    ,
                    {[
                      <MenuItem key={"NoneItem"} label={t("None")} value={"None"} onClick={""}>
                        {t("None")}
                      </MenuItem>,
                      <Divider key={3} />,
                    ]}
                  </Select>
                </FormControl>
              </Grid>

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
              {/*item added snackbar */}
              <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                  {t("QuickCompare.ItemAdded")}
                </Alert>
              </Snackbar>
              {/*item deleted snackbar */}
              <Snackbar open={openDelete} autoHideDuration={3000} onClose={handleCloseDelete}>
                <Alert onClose={handleCloseDelete} severity="error">
                  {t("QuickCompare.ItemDeleted")}
                </Alert>
              </Snackbar>
            </Grid>
          </Paper>
        </Grid>

        {/* this can be simplified into a map at some stage */}

        <Grid item xs={12}>
          <Grid container spacing={1}>
            {/* Helm */}
            <Grid item xs={12}>
              <Typography color="primary" variant="h5">
                {t("slotNames.head")}
              </Typography>
              <Divider style={{ marginBottom: 10 }} />
              <Grid container spacing={1}>
                {[...props.player.getActiveItems("Head")].map((item, index) => (
                  <ItemCard key={index} item={item} delete={deleteItem} />
                ))}
              </Grid>
            </Grid>

            {/* Neck */}
            <Grid item xs={12}>
              <Typography color="primary" variant="h5">
                {t("slotNames.neck")}
              </Typography>
              <Divider style={{ marginBottom: 10 }} />
              <Grid container spacing={1}>
                {[...props.player.getActiveItems("Neck")].map((item, index) => (
                  <ItemCard key={index} item={item} delete={deleteItem} />
                ))}
              </Grid>
            </Grid>

            {/* Shoulder */}
            <Grid item xs={12}>
              <Typography color="primary" variant="h5">
                {t("slotNames.shoulder")}
              </Typography>
              <Divider style={{ marginBottom: 10 }} />
              <Grid container spacing={1}>
                {[...props.player.getActiveItems("Shoulder")].map((item, index) => (
                  <ItemCard key={index} item={item} delete={deleteItem} />
                ))}
              </Grid>
            </Grid>
            {/* Back */}
            <Grid item xs={12}>
              <Typography color="primary" variant="h5">
                {t("slotNames.back")}
              </Typography>
              <Divider style={{ marginBottom: 10 }} />
              <Grid container spacing={1}>
                {[...props.player.getActiveItems("Back")].map((item, index) => (
                  <ItemCard key={index} item={item} delete={deleteItem} />
                ))}
              </Grid>
            </Grid>

            {/* Chest */}
            <Grid item xs={12}>
              <Typography color="primary" variant="h5">
                {t("slotNames.chest")}
              </Typography>
              <Divider style={{ marginBottom: 10 }} />
              <Grid container spacing={1}>
                {[...props.player.getActiveItems("Chest")].map((item, index) => (
                  <ItemCard key={index} item={item} delete={deleteItem} />
                ))}
              </Grid>
            </Grid>

            {/* Wrist */}
            <Grid item xs={12}>
              <Typography color="primary" variant="h5">
                {t("slotNames.wrists")}
              </Typography>
              <Divider style={{ marginBottom: 10 }} />
              <Grid container spacing={1}>
                {[...props.player.getActiveItems("Wrist")].map((item, index) => (
                  <ItemCard key={index} item={item} delete={deleteItem} />
                ))}
              </Grid>
            </Grid>

            {/* Hands */}
            <Grid item xs={12}>
              <Typography color="primary" variant="h5">
                {t("slotNames.hands")}
              </Typography>
              <Divider style={{ marginBottom: 10 }} />
              <Grid container spacing={1}>
                {[...props.player.getActiveItems("Hands")].map((item, index) => (
                  <ItemCard key={index} item={item} delete={deleteItem} />
                ))}
              </Grid>
            </Grid>

            {/* Waist */}
            <Grid item xs={12}>
              <Typography color="primary" variant="h5">
                {t("slotNames.waist")}
              </Typography>
              <Divider style={{ marginBottom: 10 }} />
              <Grid container spacing={1}>
                {[...props.player.getActiveItems("Waist")].map((item, index) => (
                  <ItemCard key={index} item={item} delete={deleteItem} />
                ))}
              </Grid>
            </Grid>

            {/* Legs */}
            <Grid item xs={12}>
              <Typography color="primary" variant="h5">
                {t("slotNames.legs")}
              </Typography>
              <Divider style={{ marginBottom: 10 }} />
              <Grid container spacing={1}>
                {[...props.player.getActiveItems("Legs")].map((item, index) => (
                  <ItemCard key={index} item={item} delete={deleteItem} />
                ))}
              </Grid>
            </Grid>

            {/* Feet */}
            <Grid item xs={12}>
              <Typography color="primary" variant="h5">
                {t("slotNames.feet")}
              </Typography>
              <Divider style={{ marginBottom: 10 }} />
              <Grid container spacing={1}>
                {[...props.player.getActiveItems("Feet")].map((item, index) => (
                  <ItemCard key={index} item={item} delete={deleteItem} />
                ))}
              </Grid>
            </Grid>

            {/* Finger */}
            <Grid item xs={12}>
              <Typography color="primary" variant="h5">
                {t("slotNames.finger")}
              </Typography>
              <Divider style={{ marginBottom: 10 }} />
              <Grid container spacing={1}>
                {[...props.player.getActiveItems("Finger")].map((item, index) => (
                  <ItemCard key={index} item={item} delete={deleteItem} />
                ))}
              </Grid>
            </Grid>

            {/* Trinket */}
            <Grid item xs={12}>
              <Typography color="primary" variant="h5">
                {t("slotNames.trinket")}
              </Typography>
              <Divider style={{ marginBottom: 10 }} />
              <Grid container spacing={1}>
                {[...props.player.getActiveItems("Trinket")].map((item, index) => (
                  <ItemCard key={index} item={item} delete={deleteItem} />
                ))}
              </Grid>
            </Grid>

            {/* Trinket */}
            <Grid item xs={12}>
              <Typography color="primary" variant="h5">
                {t("slotNames.mainHands")}
              </Typography>
              <Divider style={{ marginBottom: 10 }} />
              <Grid container spacing={1}>
                {[...props.player.getActiveItems("1H Weapon")].map((item, index) => (
                  <ItemCard key={index} item={item} delete={deleteItem} />
                ))}
              </Grid>
            </Grid>

            {/* Trinket */}
            <Grid item xs={12}>
              <Typography color="primary" variant="h5">
                {t("slotNames.offhands")}
              </Typography>
              <Divider style={{ marginBottom: 10 }} />
              <Grid container spacing={1}>
                {[...props.player.getActiveItems("Offhands")].map((item, index) => (
                  <ItemCard key={index} item={item} delete={deleteItem} />
                ))}
              </Grid>
            </Grid>

            {/* Combos */}
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
            <Grid item style={{ height: 100 }} xs={12} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
