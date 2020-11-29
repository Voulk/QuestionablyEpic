import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../SetupAndMenus/QEMainMenu.css";
import ReactGA from "react-ga";
import Item from "../Player/Item";
import "./QuickCompare.css";
import { useTranslation } from "react-i18next";
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
import ItemCard from "./ItemCard";
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

export default function QuickCompare(props) {
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
  const [itemLevel, setItemLevel] = useState("");
  const [itemID, setItemID] = useState("");
  const [itemName, setItemName] = useState("");
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

    let i = 0;
    for (i = 0; i < itemDB.length; i++) {
      //console.log(itemDB[i].name + itemDB[i].dropLoc );
      let item = itemDB[i];

      /*
      if (
        (slotName === item.slot &&
          (slotName !== "Weapons" || slotName !== "Off-Hands") &&
          item.itemClass === 4 &&
          acceptableArmorTypes.includes(item.itemSubClass)) ||
        (slotName === "Weapons" &&
          item.itemClass === 2 &&
          acceptableWeaponTypes.includes(item.itemSubClass) &&
          (item.slot === "Weapon" || item.slot === "2HWeapon")) ||
        (slotName === "Off-Hands" &&
          item.itemClass === 4 &&
          acceptableWeaponTypes.includes(item.itemSubClass) &&
          (item.slot === "Holdable" || item.slot === "Shield")) ||
        (slotName === item.slot && slotName === "Back")
      ) {
        */
      if (
        (slotName === item.slot && item.slot === "Back") ||
        (slotName === item.slot &&
          item.itemClass === 4 &&
          acceptableArmorTypes.includes(item.itemSubClass)) ||
        (slotName === "Offhands" &&
          (item.slot === "Holdable" ||
            item.slot === "Offhand" ||
            item.slot === "Shield")) ||
        (slotName === "Weapons" &&
          item.itemClass === 2 &&
          acceptableWeaponTypes.includes(item.itemSubClass))
      ) {
        // If the selected slot is "Weapons & Offhands" then our checks involve:
        // - Ensuring the item is a weapon (item class 2)
        // - Ensuring the player can wield that weapon type.

        // If it's not a weapon then we are checking for:
        // - Ensuring the item isn't a weapon (item class 4 covers us here).
        // - Ensuring the players spec is able to wear the armor type (Shamans shouldn't show plate, nor leather items for example).

        // If item is valid, add to our selection.
        //console.log(item.name + item.dropLoc);
        itemDropdown.push({
          value: item.id,
          label: item.names[currentLanguage],
        });
      }
    }

    itemDropdown.sort((a, b) => (a.label > b.label ? 1 : -1));
  };

  // Add an item to our "Active Items" array.
  const addItem = (event) => {
    if (itemLevel > 300) {
      setAnchorEl(anchorEl ? null : event.currentTarget);
      return null;
    }
    let player = props.pl;
    let item = new Item(
      itemID,
      itemName,
      getItemSlot(itemID),
      itemSocket,
      itemTertiary,
      0,
      itemLevel
    );

    item.level = itemLevel;
    item.stats = calcStatsAtLevel(
      itemLevel,
      getItemSlot(itemID),
      getItemAllocations(itemID),
      itemTertiary
    );

    item.effect = getItemEffect(itemID);
    item.softScore = scoreItem(item, player, props.contentType);

    player.addActiveItem(item);

    //player.getActiveItems(activeSlot)
    //console.log(item);
    setItemList([...player.getActiveItems(activeSlot)]);
    setOpen(true);
    // setItemSocket("");
    // setItemTertiary("");
  };

  const deleteItem = (unique) => {
    let player = props.pl;
    //console.log("AHHHHHHHH DELETING");

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
    // removed parse int here, was missing radix parameter
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
    setItemList([...props.pl.getActiveItems(e.target.value)]);
  };

  // TODO. Calculate the score for a given item.
  // Score is calculated by multiplying out stat weights and then adding any special effects.
  const calculateScore = (item) => {};

  fillItems(activeSlot, props.pl.spec);
  let wepCombos = buildWepCombos(props.pl);

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
          width: "65%",
          display: "block",
        }}
      >
        <Grid item xs={12}>
          <Paper elevation={0}>
            <Typography
              variant="h4"
              align="center"
              style={{ padding: "10px 10px 5px 10px" }}
              color="primary"
            >
              {t("ModuleTitles.QuickCompare")}
            </Typography>
            <Divider variant="middle" />

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
                <FormControl
                  className={classes.formControl}
                  variant="outlined"
                  size="small"
                >
                  <InputLabel id="slots">{t("QuickCompare.Slot")}</InputLabel>
                  <Select
                    labelId="slots"
                    value={activeSlot}
                    onChange={(e, v) => changeSlot(e, v)}
                    MenuProps={menuStyle}
                    label={t("QuickCompare.Slot")}
                  >
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
                <FormControl
                  className={classes.formControl}
                  variant="outlined"
                  size="small"
                  style={{ minWidth: 350 }}
                  disabled={activeSlot === "" ? true : false}
                >
                  <Autocomplete
                    size="small"
                    disabled={activeSlot === "" ? true : false}
                    id="item-select"
                    value={AutoValue}
                    onChange={(e, v) => itemNameChanged(e, v)}
                    options={itemDropdown}
                    openOnFocus={true}
                    getOptionLabel={(option) => option.label}
                    getOptionSelected={(option, value) =>
                      option.label === value.label
                    }
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
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t("QuickCompare.ItemName")}
                        variant="outlined"
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item>
                <TextField
                  error={itemLevel > 300 ? true : false}
                  className={classes.formControl}
                  id="Ilvl-select"
                  onChange={(e) => itemLevelChanged(e.target.value)}
                  value={itemLevel}
                  label={t("QuickCompare.ItemLevel")}
                  disabled={itemID === "" ? true : false}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 3);
                  }}
                  variant="outlined"
                  size="small"
                  type="number"
                  inputProps={{
                    min: "50",
                    max: "300",
                  }}
                />
              </Grid>

              <Grid item>
                <FormControl
                  className={classes.formControl}
                  variant="outlined"
                  size="small"
                  disabled={itemLevel === "" ? true : false}
                >
                  <InputLabel id="itemsocket">
                    {t("QuickCompare.Socket")}
                  </InputLabel>
                  <Select
                    // key={1}
                    labelId="itemsocket"
                    value={itemSocket}
                    onChange={itemSocketChanged}
                    MenuProps={menuStyle}
                    label={t("QuickCompare.Socket")}
                  >
                    {[
                      <MenuItem key={1} label="Yes" value={true}>
                        Yes
                      </MenuItem>,
                      <Divider key={2} />,
                    ]}
                    ,
                    {[
                      <MenuItem key={3} label="No" value={false}>
                        No
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
                  disabled={itemLevel === "" ? true : false}
                >
                  <InputLabel id="itemtertiary">
                    {t("QuickCompare.Tertiary")}
                  </InputLabel>
                  <Select
                    key={"TertiarySelect"}
                    labelId="itemtertiary"
                    value={itemTertiary}
                    onChange={itemTertiaryChanged}
                    MenuProps={menuStyle}
                    label={t("QuickCompare.Tertiary")}
                  >
                    {[
                      <MenuItem key={"LeechItem"} label="Leech" value={"Leech"}>
                        Leech
                      </MenuItem>,
                      <Divider key={1} />,
                    ]}
                    ,
                    {[
                      <MenuItem
                        key={"AvoidanceItem"}
                        label="Avoidance"
                        value={"Avoidance"}
                      >
                        Avoidance
                      </MenuItem>,
                      <Divider key={2} />,
                    ]}
                    ,
                    {[
                      <MenuItem
                        key={"NoneItem"}
                        label="None"
                        value={"None"}
                        onClick={""}
                      >
                        None
                      </MenuItem>,
                      <Divider key={3} />,
                    ]}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item>
                <Button
                  key={8}
                  variant="contained"
                  color="primary"
                  onClick={addItem}
                  size="small"
                  disabled={itemLevel === "" ? true : false}
                >
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
                  <Typography className={classes.typography}>
                    Item Not Added. Ilvl Cap is 300
                  </Typography>
                </Popover>
              </Grid>
              {/*item added snackbar */}
              <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="success">
                  Item Added!
                </Alert>
              </Snackbar>
              {/*item deleted snackbar */}
              <Snackbar
                open={openDelete}
                autoHideDuration={3000}
                onClose={handleCloseDelete}
              >
                <Alert onClose={handleCloseDelete} severity="error">
                  Item Deleted!
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
                {[...props.pl.getActiveItems("Head")].map((item, index) => (
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
                {[...props.pl.getActiveItems("Neck")].map((item, index) => (
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
                {[...props.pl.getActiveItems("Shoulder")].map((item, index) => (
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
                {[...props.pl.getActiveItems("Back")].map((item, index) => (
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
                {[...props.pl.getActiveItems("Chest")].map((item, index) => (
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
                {[...props.pl.getActiveItems("Wrist")].map((item, index) => (
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
                {[...props.pl.getActiveItems("Hands")].map((item, index) => (
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
                {[...props.pl.getActiveItems("Waist")].map((item, index) => (
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
                {[...props.pl.getActiveItems("Legs")].map((item, index) => (
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
                {[...props.pl.getActiveItems("Feet")].map((item, index) => (
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
                {[...props.pl.getActiveItems("Finger")].map((item, index) => (
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
                {[...props.pl.getActiveItems("Trinket")].map((item, index) => (
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
                {[...props.pl.getActiveItems("1H Weapon")].map(
                  (item, index) => (
                    <ItemCard key={index} item={item} delete={deleteItem} />
                  )
                )}
              </Grid>
            </Grid>

            {/* Trinket */}
            <Grid item xs={12}>
              <Typography color="primary" variant="h5">
                {t("slotNames.offhands")}
              </Typography>
              <Divider style={{ marginBottom: 10 }} />
              <Grid container spacing={1}>
                {[...props.pl.getActiveItems("Offhands")].map((item, index) => (
                  <ItemCard key={index} item={item} delete={deleteItem} />
                ))}
              </Grid>
            </Grid>

            {/* Trinket */}
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
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
