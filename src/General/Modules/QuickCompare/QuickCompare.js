import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel, MenuItem, FormControl, Select, Button, Grid, Paper, Typography, Divider, Snackbar, TextField, Popover } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import MuiAlert from "@material-ui/lab/Alert";
import "../SetupAndMenus/QEMainMenu.css";
import Item from "../Player/Item";
import BCItem from "../Player/BCItem";
import "./QuickCompare.css";
//import { itemDB } from "../../Databases/ItemDB";
import { itemDB } from "../../../Databases/ItemDB";
import { getItemDB, getValidArmorTypes, getValidWeaponTypes, getItemProp, scoreItem, buildWepCombos } from "../../Engine/ItemUtilities";
import ItemCard from "./ItemCard";
import HelpText from "../SetupAndMenus/HelpText";
import { CONSTRAINTS } from "../../Engine/CONSTRAINTS";
import UpgradeFinderSimC from "../UpgradeFinder/UpgradeFinderSimCImport";
import { useSelector } from "react-redux";
import Settings from "../Settings/Settings";
import userSettings from "../Settings/SettingsObject";
import { dominationGemDB } from "../../../Databases/DominationGemDB";

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
  const [dominationSocket, setDominationSocket] = useState("");
  const openPop = Boolean(anchorEl);
  const idPop = openPop ? "simple-popover" : undefined;
  const slots = getSlots();
  const helpBlurb = [t("QuickCompare.HelpText")];
  const helpText = [
    "(Optional) Add your SimC or QE Import String to auto-import your entire set of items.",
    "(Optional) Manually add items using the slot drop down below.",
    "Item scores are shown in the top right corner in yellow.",
  ];
  const gameType = useSelector((state) => state.gameType);

  console.log(
    getItemDB("Retail")
      .filter((key) => key.id === itemID)
      .map((key) => key.socketType),
  );

  /* ------------------------ End Simc Module Functions ----------------------- */

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
    const db = getItemDB(gameType);

    db.filter(
      (key) =>
        (slotName === key.slot && key.slot === "Back") ||
        (slotName === key.slot && key.itemClass === 4 && acceptableArmorTypes.includes(key.itemSubClass)) ||
        (slotName === "Offhands" && (key.slot === "Holdable" || key.slot === "Offhand" || key.slot === "Shield")) ||
        (slotName === "Weapons" && key.itemClass === 2 && acceptableWeaponTypes.includes(key.itemSubClass)) ||
        (slotName == "Relics & Wands" && key.itemClass === 2 && spec === "Holy Priest BC"), // Wands
    ).map((key) => newItemList.push({ value: key.id, label: key.names[currentLanguage] }));

    newItemList.sort((a, b) => (a.label > b.label ? 1 : -1));
    setItemDropdown(newItemList);
  };

  /* ---------------- Add an item to our "Active Items" array. ---------------- */
  const addItem = (event) => {
    if (itemLevel > CONSTRAINTS.Retail.maxItemLevel) {
      setAnchorEl(anchorEl ? null : event.currentTarget);
      return null;
    }
    let player = props.player;
    let item = "";

    if (gameType === "Retail") {
      item = new Item(itemID, itemName, getItemProp(itemID, "slot", gameType), itemSocket, itemTertiary, 0, itemLevel, "");
      item.setDominationGem(dominationSocket);

    } else {
      item = new BCItem(itemID, itemName, getItemProp(itemID, "slot", gameType), "");
    }

    item.softScore = scoreItem(item, player, contentType, gameType);

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
      if (gameType === "BurningCrusade") setItemLevel(getItemProp(val.value, "itemLevel", gameType));
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

  const itemDominationChanged = (event) => {
    setDominationSocket(event.target.value);
  };

  const changeSlot = (e, v) => {
    if (v === null) {
      return;
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

  /* ---------------------------------------------------------------------------------------------- */
  /*                                       Settings Functions                                       */
  /* ---------------------------------------------------------------------------------------------- */

  const editSettings = (setting, newValue) => {
    //console.log("Updating Settings" + setting + ". " + newValue);
    userSettings[setting] = newValue;
    //console.log("Settings: " + JSON.stringify(userSettings));
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
              {/* -------------------------------------------------------------------------- */
              /*                             Item Slot Selection                            */
              /* -------------------------------------------------------------------------- */}

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
                      .map((key, i) => [key, <Divider key={"menuItem" + i} />])}
                  </Select>
                </FormControl>
              </Grid>

              {/* -------------------------------------------------------------------------- */
              /*                               Item Selection                               */
              /* -------------------------------------------------------------------------- */}

              <Grid item>
                <FormControl className={classes.formControl} variant="outlined" size="small" style={{ minWidth: 350 }} disabled={activeSlot === "" ? true : false}>
                  <Autocomplete
                    size="small"
                    classes={{
                      option: classes.option,
                    }}
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
                    // ListboxProps={{
                    //   style: {
                    //     border: "1px solid rgba(255, 255, 255, 0.23)",
                    //     padding: 0,
                    //   },
                    // }}
                    style={{ width: "100%" }}
                    renderInput={(params) => <TextField {...params} label={t("QuickCompare.ItemName")} variant="outlined" />}
                    ListboxProps={{ style: { border: "1px solid rgba(255, 255, 255, 0.23)", borderRadius: 4, paddingTop: 0, paddingBottom: 0 } }}
                  />
                </FormControl>
              </Grid>

              {/* -------------------------------------------------------------------------- */
              /*                                 Item Level                                 */
              /* -------------------------------------------------------------------------- */}

              <Grid item>
                <FormControl className={classes.formControl} variant="outlined" size="small" style={{ width: t("QuickCompare.ItemLevel").length > 10 ? 160 : 120 }}>
                  <TextField
                    error={itemLevel > CONSTRAINTS.Retail.maxItemLevel ? true : false}
                    id="Ilvl-select"
                    onChange={(e) => itemLevelChanged(e.target.value)}
                    value={itemLevel}
                    label={t("QuickCompare.ItemLevel")}
                    disabled={itemID === "" || gameType !== "Retail" ? true : false}
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
              </Grid>

              {/* ---------------------------------------------------------------------------------------------- */
              /*                                             Sockets                                            */
              /* ----------------------------------------------------------------------------------------------  */}

              {gameType === "Retail" ? (
                <Grid item>
                  <FormControl className={classes.formControl} variant="outlined" size="small" disabled={itemLevel === "" ? true : false}>
                    <InputLabel id="itemsocket">{t("QuickCompare.Socket")}</InputLabel>
                    <Select key={"sockets"} labelId="itemsocket" value={itemSocket} onChange={itemSocketChanged} MenuProps={menuStyle} label={t("QuickCompare.Socket")}>
                      {[
                        <MenuItem key={1} label={t("Yes")} value={true}>
                          {t("Yes")}
                        </MenuItem>,
                        <Divider key={2} />,
                        ,
                        <MenuItem key={3} label={t("No")} value={false}>
                          {t("No")}
                        </MenuItem>,
                        <Divider key={4} />,
                      ]}
                    </Select>
                  </FormControl>
                </Grid>
              ) : (
                ""
              )}

              {/* ---------------------------------------------------------------------------------------------- */
              /*                                        Domination Socket                                       */
              /* ----------------------------------------------------------------------------------------------  */}

              {gameType === "Retail" ? (
                <Grid item>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                    size="small"
                    style={{ width: t("QuickCompare.DominationSocket").length > 10 ? 160 : 140 }}
                    disabled={
                      itemLevel !== "" &&
                      getItemDB("Retail")
                        .filter((key) => key.id === itemID)
                        .map((key) => key.socketType)[0] === "Domination"
                        ? false
                        : true
                    }
                  >
                    <InputLabel id="itemtertiary">{t("QuickCompare.DominationSocket")}</InputLabel>
                    <Select
                      key={"DominationSocket"}
                      labelId="DominationSocket"
                      value={dominationSocket}
                      onChange={itemDominationChanged}
                      MenuProps={menuStyle}
                      label={t("QuickCompare.DominationSocket")}
                    >
                      {dominationGemDB
                        .filter((filter) => filter.type !== "Set Bonus")
                        .map((key, i) => [
                          <MenuItem key={key.gemID} label={key.name[currentLanguage]} value={key.gemID}>
                            <a data-wowhead={"item=" + key.gemID}>
                              <img
                                style={{
                                  height: 20,
                                  width: 20,
                                  margin: "0px 5px 0px 0px",
                                  verticalAlign: "middle",
                                  borderRadius: 4,
                                  border: "1px solid rgba(255, 255, 255, 0.12)",
                                }}
                                src={process.env.PUBLIC_URL + "/Images/Icons/" + key.icon + ".jpg"}
                                alt={key.name[currentLanguage]}
                              />
                            </a>
                            {key.name[currentLanguage] + " " + "[" + (key.effect.rank + 1) + "]"}
                          </MenuItem>,
                          <Divider key={i} />,
                        ])}
                    </Select>
                  </FormControl>
                </Grid>
              ) : (
                ""
              )}

              {/* -------------------------------------------------------------------------- */
              /*                              Tertiary Dropdown                             */
              /* -------------------------------------------------------------------------- */}

              {gameType === "Retail" ? (
                <Grid item>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                    size="small"
                    style={{ width: t("QuickCompare.ItemLevel").length > 10 ? 160 : 120 }}
                    disabled={itemLevel === "" ? true : false}
                  >
                    <InputLabel id="itemtertiary">{t("QuickCompare.Tertiary")}</InputLabel>
                    <Select key={"TertiarySelect"} labelId="itemtertiary" value={itemTertiary} onChange={itemTertiaryChanged} MenuProps={menuStyle} label={t("QuickCompare.Tertiary")}>
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
    </div>
  );
}
