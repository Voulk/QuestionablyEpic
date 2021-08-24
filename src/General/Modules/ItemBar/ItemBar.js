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
import { getItemDB, getValidArmorTypes, getValidWeaponTypesBySpec, getItemProp, scoreItem } from "../../Engine/ItemUtilities";
import { CONSTRAINTS } from "../../Engine/CONSTRAINTS";
import { useSelector } from "react-redux";
import { dominationGemDB } from "../../../Databases/DominationGemDB";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0.5),
    minWidth: 120,
    whiteSpace: "noWrap",
  },
  title: {
    padding: theme.spacing(1),
    paddingLeft: 16,
  },
  typography: {
    padding: theme.spacing(2),
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

export default function ItemBar(props) {
  const contentType = useSelector((state) => state.contentType);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const classes = useStyles();
  /* ------------------------------ Popover Props ----------------------------- */
  const [anchorEl, setAnchorEl] = useState(null);
  const openPop = Boolean(anchorEl);
  const idPop = openPop ? "simple-popover" : undefined;
  const slots = getSlots();
  const gameType = useSelector((state) => state.gameType);

  /* ----------------------------- Snackbar State ----------------------------- */
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const fillItems = (slotName, spec) => {
    const acceptableArmorTypes = getValidArmorTypes(spec);
    const acceptableWeaponTypes = getValidWeaponTypesBySpec(spec);
    let newItemList = [];
    const db = getItemDB(gameType);

    db.filter(
      (key) =>
        key.slot === "Back" ||
        (key.itemClass === 4 && acceptableArmorTypes.includes(key.itemSubClass)) ||
        key.slot === "Holdable" ||
        key.slot === "Offhand" ||
        key.slot === "Shield" ||
        (key.itemClass === 2 && acceptableWeaponTypes.includes(key.itemSubClass)) ||
        (key.itemClass === 2 && spec === "Holy Priest BC"), // Wands
    ).map((key) => newItemList.push({ value: key.id, label: key.names[currentLanguage] }));

    newItemList.sort((a, b) => (a.label > b.label ? 1 : -1));
    return newItemList;
  };

  const [itemDropdown, setItemDropdown] = useState(fillItems("", props.player.spec)); // Filled later based on item slot and armor type.

  /* ------------------------------ Define State ----------------------------- */
  const [itemLevel, setItemLevel] = useState("");
  const [itemID, setItemID] = useState("");
  const [itemName, setItemName] = useState("");
  const [activeSlot, setSlot] = useState("");
  const [itemSocket, setItemSocket] = useState("");
  const [itemTertiary, setItemTertiary] = useState("");
  const [itemList, setItemList] = useState(props.player.getActiveItems(activeSlot));
  const [inputValue, setInputValue] = useState("");
  const [dominationSocket, setDominationSocket] = useState("");

  /* ------------------------ End Simc Module Functions ----------------------- */

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
    props.setItemList([...player.getActiveItems(activeSlot)]);
    setOpen(true);

    setInputValue("");
    setItemLevel("");
    setItemSocket("");
    setItemTertiary("");
    setDominationSocket("");
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

  return (
    <Grid item xs={12}>
      <Paper elevation={0}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
          style={{
            paddingTop: 4,
            paddingBottom: 4,
            display: "inline-flex",
          }}
        >
          <Grid item xs={12}>
            <Typography className={classes.title}>{t("QuickCompare.ItemBarTitle")}</Typography>
            <Divider variant="middle" />
          </Grid>
          {/* -------------------------------------------------------------------------- */
          /*                               Item Selection                               */
          /* -------------------------------------------------------------------------- */}

          <Grid item>
            <FormControl className={classes.formControl} variant="outlined" size="small" style={{ minWidth: 350 }}>
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
                getOptionSelected={(option, value) => option.label === value.label}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
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
                <Select key={"DominationSocket"} labelId="DominationSocket" value={dominationSocket} onChange={itemDominationChanged} MenuProps={menuStyle} label={t("QuickCompare.DominationSocket")}>
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
        </Grid>
      </Paper>
    </Grid>
  );
}
