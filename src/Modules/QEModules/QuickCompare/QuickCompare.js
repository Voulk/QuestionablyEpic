import React, { useState } from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";

import MenuIcon from "@material-ui/icons/Menu";
import "../SetupAndMenus/QEMainMenu.css";

import Player from "../Player/Player";
import Item from "../Player/Item";
import QEHeader from "../SetupAndMenus/QEHeader";
import "./QuickCompare.css";
import { useTranslation } from "react-i18next";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import { itemDB } from "../Player/ItemDB";
import {
  getValidArmorTypes,
  getValidWeaponTypes,
} from "../Player/PlayerUtilities";
import Button from "@material-ui/core/Button";
import QCTile from "./QCTile";
import ItemCard from "./ItemCard";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

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
  container.sort((a, b) => (a.expectedHPS < b.expectedHPS ? 1 : -1));
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
    { value: "Shoulder", label: t("slotNames.shoulder") },
    { value: "Back", label: t("slotNames.back") },
    { value: "Chest", label: t("slotNames.chest") },
    { value: "Wrist", label: t("slotNames.wrist") },
    { value: "Hands", label: t("slotNames.hands") },
    { value: "Waist", label: t("slotNames.waist") },
  ];

  return slots;
}

export default function QuickCompare(props) {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  const slots = getSlots();
  const itemDropdown = []; // Filled later based on item slot and armor type.

  // Right now the available item levels are static, but given the removal of titanforging each item could hypothetically share
  // a list of available ilvls and the player could select from a smaller list instead.
  // This is left as a TODO until key functionality is completed but is a moderate priority.
  const itemLevels = [226, 220, 214, 208, 202];
  const itemTertiaries = ["Leech", "Avoidance"];

  // Define State.
  const [itemLevel, setItemLevel] = React.useState(0);
  const [itemID, setItemID] = React.useState(0);
  const [itemName, setItemName] = React.useState("");
  const [activeSlot, setSlot] = React.useState("Head");
  const [itemSocket, setItemSocket] = React.useState("");
  const [itemTertiary, setItemTertiary] = React.useState("");
  const [itemList, setItemList] = React.useState(
    props.pl.getActiveItems(activeSlot)
  );

  // Fill Items fills the ItemNames box with items appropriate to the given slot and spec.
  const fillItems = (slotName, spec) => {
    const acceptableArmorTypes = getValidArmorTypes(spec);
    const acceptableWeaponTypes = getValidWeaponTypes(spec);

    var i = 0;
    for (i = 0; i < itemDB.length; i++) {
      console.log(itemDB[i].name + itemDB[i].dropLoc);
      let item = itemDB[i];

      if (
        (slotName === item.itemSlot &&
          slotName !== "Weapons & Offhands" &&
          item.itemClass == 4 &&
          acceptableArmorTypes.includes(item.itemSubClass)) ||
        (slotName === "Weapons & Offhands" &&
          item.itemClass == 2 &&
          acceptableWeaponTypes.includes(item.itemSubClass))
      ) {
        // If the selected slot is "Weapons & Offhands" then our checks involve:
        // - Ensuring the item is a weapon (item class 2)
        // - Ensuring the player can wield that weapon type.

        // If it's not a weapon then we are checking for:
        // - Ensuring the item isn't a weapon (item class 4 covers us here).
        // - Ensuring the players spec is able to wear the armor type (Shamans shouldn't show plate, nor leather items for example).

        // If item is valid, add to our selection.
        console.log(item.name + item.dropLoc);
        itemDropdown.push({ value: item.id, label: item.names[props.curLang] });
      }
    }
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
    player.addActiveItem(item);

    //player.getActiveItems(activeSlot)
    console.log(item)
    setItemList([...player.getActiveItems(activeSlot)]);
  };

  const itemNameChanged = (event) => {
    setItemID(parseInt(event.target.value));
    setItemName(event.target.name);
  };

  const itemLevelChanged = (event) => {
    setItemLevel(parseInt(event.target.value));
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
    <div style={{ backgroundColor: "#353535" }}>
      <div style={{ margin: "auto", width: "55%", display: "block" }}>
        <Grid container spacing={2} justify="center" style={{ marginTop: 32 }}>
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h4" align="center">
                {t("ModuleTitles.QuickCompare")}
              </Typography>

              <div className="itemEntry">
                <FormControl className={classes.formControl}>
                  <InputLabel id="slots">{t("QuickCompare.Slot")}</InputLabel>
                  <NativeSelect
                    value={activeSlot}
                    onChange={changeSlot}
                    displayEmpty
                  >
                    {slots.map((x, y) => (
                      <option key={y} value={x.value}>
                        {x.label}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel id="itemname">
                    {t("QuickCompare.ItemName")}
                  </InputLabel>
                  <NativeSelect
                    value={itemID}
                    onChange={itemNameChanged}
                    displayEmpty
                  >
                    <option aria-label="None" value="" />
                    {itemDropdown.map((x, y) => (
                      <option key={y} value={x.value} name={x.label}>
                        {x.label}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel id="itemlevel">
                    {t("QuickCompare.ItemLevel")}
                  </InputLabel>
                  <NativeSelect
                    value={itemLevel}
                    onChange={itemLevelChanged}
                    displayEmpty
                  >
                    <option aria-label="None" value="" />
                    {itemLevels.map((x, y) => (
                      <option key={y} value={x}>
                        {x}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel id="itemsocket">
                    {t("QuickCompare.Socket")}
                  </InputLabel>
                  <NativeSelect
                    value={itemSocket}
                    onChange={itemSocketChanged}
                    displayEmpty
                  >
                    <option aria-label="None" value="" />
                    <option label="Yes" value="Yes" />
                  </NativeSelect>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel id="itemtertiary">
                    {t("QuickCompare.Tertiary")}
                  </InputLabel>
                  <NativeSelect
                    value={itemTertiary}
                    onChange={itemTertiaryChanged}
                    displayEmpty
                  >
                    <option aria-label="None" value="" />
                    {itemTertiaries.map((x, y) => (
                      <option key={y} value={x}>
                        {x}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>

                <Button
                  key={8}
                  variant="contained"
                  color="primary"
                  onClick={addItem}
                  style={{
                    width: "70px",
                    height: "30px",
                    marginTop: "15px",
                    marginLeft: "5px",
                    backgroundColor: "#c8b054",
                  }}
                >
                  {t("QuickCompare.AddButton")}
                </Button>
              </div>
            </Paper>
          </Grid>

          <Grid container item spacing={1}>
            {itemList.map((item, index) => (
              // <QCTile key={index} item={item} lang={props.curLang}/>
              // scuffed card, need proper item to test
              <ItemCard key={index} item={item} lang={props.curLang} />
            ))}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}