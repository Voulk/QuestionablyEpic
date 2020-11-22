import React, { useState } from "react";
// import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import "../SetupAndMenus/QEMainMenu.css";

// import Player from "../Player/Player";
import Item from "../Player/Item";
// import QEHeader from "../SetupAndMenus/QEHeader";
import "./QuickCompare.css";
import { useTranslation } from "react-i18next";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import NativeSelect from "@material-ui/core/NativeSelect";
import { itemDB } from "../Player/ItemDB";
import {
  getValidArmorTypes,
  getValidWeaponTypes,
  calcStatsAtLevel,
  getItemAllocations,
  scoreItem,
  getItemEffect,
} from "../Engine/ItemUtilities";
import Button from "@material-ui/core/Button";
import ItemCard from "./ItemCard";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0.5),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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

const createItem = (legendaryName, container, spec, pl, contentType) => {
  //let lego = new Legendary(legendaryName)
  //getLegendaryInfo(lego, spec, pl, contentType)
  //container.push(lego)
};

const fillSlot = (container, spec, pl, contentType) => {
  //container = [];
};

const sortItems = (container) => {
  // Current default sorting is by HPS but we could get creative here in future.
  container.sort((a, b) => (a.softScore < b.softScore ? 1 : -1));
};

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
    { value: "Feet", label: t("slotNames.feet") },
    { value: "Finger", label: t("slotNames.finger") },
    { value: "Trinket", label: t("slotNames.trinket") },
    { value: "Weapons", label: t("slotNames.weapons") },
    { value: "Offhands", label: t("slotNames.offhands") },
  ];

  return slots;
}

export default function QuickCompare(props) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const slots = getSlots();
  const itemDropdown = []; // Filled later based on item slot and armor type.

  // Right now the available item levels are static, but given the removal of titanforging each item could hypothetically share
  // a list of available ilvls and the player could select from a smaller list instead.
  // This is left as a TODO until key functionality is completed but is a moderate priority.
  const itemLevels = [226, 213, 200, 187, 174, 161, 148, 131];
  const itemTertiaries = ["Avoidance", "Leech", "None"];

  // Define State.
  const [itemLevel, setItemLevel] = useState("");
  const [itemID, setItemID] = useState("");
  const [itemName, setItemName] = useState("");
  const [activeSlot, setSlot] = useState("");
  const [itemSocket, setItemSocket] = useState("");
  const [itemTertiary, setItemTertiary] = useState("");
  const [itemList, setItemList] = useState(props.pl.getActiveItems(activeSlot));

  // Fill Items fills the ItemNames box with items appropriate to the given slot and spec.
  const fillItems = (slotName, spec) => {
    const acceptableArmorTypes = getValidArmorTypes(spec);
    const acceptableWeaponTypes = getValidWeaponTypes(spec, slotName);

    let i = 0;
    for (i = 0; i < itemDB.length; i++) {
      //console.log(itemDB[i].name + itemDB[i].dropLoc );
      let item = itemDB[i];

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
  const addItem = () => {
    let player = props.pl;
    let item = new Item(
      itemID,
      itemName,
      activeSlot,
      itemSocket,
      itemTertiary,
      0,
      itemLevel
    );

    item.level = itemLevel;
    item.stats = calcStatsAtLevel(
      itemLevel,
      activeSlot,
      getItemAllocations(itemID),
      itemTertiary
    );

    item.effect = getItemEffect(itemID);
    item.softScore = scoreItem(item, player, props.contentType);

    player.addActiveItem(item);

    //player.getActiveItems(activeSlot)
    //console.log(item);
    setItemList([...player.getActiveItems(activeSlot)]);
    handleClick();
  };

const deleteItem = (unique) => {
  let player = props.pl;
  console.log("AHHHHHHHH DELETING");

  player.deleteActiveItem(unique);
  
  setItemList([...player.getActiveItems(activeSlot)]);
  handleClick();
}

  const itemNameChanged = (event, val) => {
    if (val === null) {
      setItemID("");
      setItemName("");
    } else {
      setItemID(val.value);
      setItemName(val.name);
    }
  };

  const itemLevelChanged = (event, val) => {
    // removed parse int here, was missing radix parameter
    setItemLevel(val);
    setItemSocket("No");
    setItemTertiary("None");
  };

  const itemSocketChanged = (event) => {
    setItemSocket(event.target.value);
  };

  const itemTertiaryChanged = (event) => {
    setItemTertiary(event.target.value);
  };

  const changeSlot = (event) => {
    setSlot(event.target.value);
    setItemList([...props.pl.getActiveItems(event.target.value)]);
  };

  // TODO. Calculate the score for a given item.
  // Score is calculated by multiplying out stat weights and then adding any special effects.
  const calculateScore = (item) => {};

  fillItems(activeSlot, props.pl.spec);

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
                    onChange={changeSlot}
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
              {/* <Divider
                orientation="vertical"
                flexItem
                style={{ marginLeft: 4, marginRight: 4 }}
              /> */}

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
                    onChange={itemNameChanged}
                    options={itemDropdown}
                    openOnFocus={true}
                    getOptionLabel={(option) => option.label}
                    getOptionSelected={(option, value) =>
                      option.label === value.label
                    }
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
                <FormControl
                  className={classes.formControl}
                  variant="outlined"
                  size="small"
                  disabled={itemID === "" ? true : false}
                >
                  <Autocomplete
                    size="small"
                    disabled={itemID === "" ? true : false}
                    id="Ilvl-select"
                    onChange={itemLevelChanged}
                    options={itemLevels}
                    openOnFocus={true}
                    getOptionLabel={(option) => option.toString()}
                    getOptionSelected={(option, value) => option === value}
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
                        label={t("QuickCompare.ItemLevel")}
                        variant="outlined"
                      />
                    )}
                  />
                </FormControl>
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
                    key={itemSocket}
                    labelId="itemsocket"
                    value={itemSocket}
                    onChange={itemSocketChanged}
                    MenuProps={menuStyle}
                    label={t("QuickCompare.Socket")}
                  >
                    {[
                      <MenuItem key={"Yes"} label="Yes" value="Yes">
                        Yes
                      </MenuItem>,
                      <Divider key={1} />,
                    ]}
                    ,
                    {[
                      <MenuItem key={"No"} label="No" value="No">
                        No
                      </MenuItem>,
                      <Divider key={2} />,
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
                    key={itemTertiary}
                    labelId="itemtertiary"
                    value={itemTertiary}
                    onChange={itemTertiaryChanged}
                    MenuProps={menuStyle}
                    label={t("QuickCompare.Tertiary")}
                  >
                    {itemTertiaries.map((x, y) => (
                      <MenuItem key={y} value={x}>
                        {x}
                      </MenuItem>
                    ))}
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
              </Grid>
              <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="success">
                  Item Added!
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
                  <ItemCard key={index} item={item} delete={deleteItem}/>
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
                {t("Main Hands")}
              </Typography>
              <Divider style={{ marginBottom: 10 }} />
              <Grid container spacing={1}>
                {[...props.pl.getActiveItems("1H Weapon")].map((item, index) => (
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
                {[...props.pl.getActiveItems("Offhands")].map(
                  (item, index) => (
                    <ItemCard key={index} item={item} delete={deleteItem} />
                  )
                )}
              </Grid>
            </Grid>

            {/* Trinket */}
            <Grid item xs={12}>
              <Typography color="primary" variant="h5">
                {t("Weapon Combos")}
              </Typography>
              <Divider style={{ marginBottom: 10 }} />
              <Grid container spacing={1}>
                {[...props.pl.getActiveItems("CallFunction")].map(
                  (item, index) => (
                    <ItemCard key={index} item={item} delete={deleteItem} />
                  )
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
