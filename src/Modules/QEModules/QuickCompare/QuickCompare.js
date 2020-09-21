import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import '../SetupAndMenus/QEMainMenu.css';

import Player from '../Player/Player';
import QEHeader from '../SetupAndMenus/QEHeader';
import './QuickCompare.css';
import { useTranslation } from "react-i18next";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { itemDB } from '../Player/ItemDB'; 
import { getValidArmorTypes, getValidWeaponTypes } from '../Player/PlayerUtilities'; 

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

}

const fillSlot = (container, spec, pl, contentType) => {
    //container = [];


}

const sortItems = (container) => {
  // Current default sorting is by HPS but we could get creative here in future.
  container.sort((a, b) => (a.expectedHPS < b.expectedHPS ? 1 : -1))


}

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
function getSlots() {
  const { t, i18n } = useTranslation();
  let slots = [{value: 'Head', label: t("slotNames.head")},
              {value: 'Shoulder', label: t("slotNames.shoulder")},
              {value: 'Waist', label: t("slotNames.waist")},

              ]

  return slots;
}

export default function QuickCompare(props) {
    const { t, i18n } = useTranslation();
    const classes = useStyles();
    
    //const slots = ['Helm', 'Shoulders', 'Chest', 'Ring', 'Trinket', 'Belt'] // Probably store this somewhere more accessible. 

    const slots = getSlots();
    const itemDropdown = []; // Filled later based on item slot and armor type.

    // Right now the available item levels are static, but given the removal of titanforging each item could hypothetically share 
    // a list of available ilvls and the player could select from a smaller list instead. 
    // This is left as a TODO until key functionality is completed but is a moderate priority. 
    const itemLevels = [226, 220, 214, 208, 202]; 

    const [age, setAge] = React.useState('');
    const [activeSlot, setSlot] = React.useState('Helm');
  

    const fillItems = (slotName, spec) => {
      const acceptableArmorTypes = getValidArmorTypes(spec);
      const acceptableWeaponTypes = getValidWeaponTypes(spec);

      var i = 0;
      for (i = 0; i < itemDB.length; i++) {
          console.log(itemDB[i].name + itemDB[i].dropLoc);
          let item = itemDB[i];

          if (slotName === item.itemSlot &&
              (slotName !== "Weapons & Offhands" && item.itemClass == 4 && acceptableArmorTypes.includes(item.itemSubClass)) ||
              (slotName === "Weapons & Offhands" && item.itemClass == 2 && acceptableWeaponTypes.includes(item.itemSubClass))) {
            // If the selected slot is "Weapons & Offhands" then our checks involve:
            // - Ensuring the item is a weapon (item class 2)
            // - Ensuring the player can wield that weapon type.

            // If it's not a weapon then we are checking for:
            // - Ensuring the item isn't a weapon (item class 4 covers us here).
            // - Ensuring the players spec is able to wear the armor type (Shamans shouldn't show plate, nor leather items for example).

            // If item is valid, add to our selection.
            console.log(item.name + item.dropLoc);
            itemDropdown.push({value: item.id, label: item.names[props.curLang]});
 
          }



      }

      // Placeholders.
      if (slotName == "Helm") {
        itemDropdown.push("HelmItem1");
      }
      else {
        itemDropdown.push({value: "Generic Item", label: "Generic Label"});
      }

    }

    const handleChange = (event) => {
      console.log("New value: " + event.target.value);
      setAge(event.target.value);
    };

    const changeSlot = (event) => {
      setSlot(event.target.value);
    }
    
    fillItems(activeSlot, props.pl.spec);

      return (
        
        <div style={{backgroundColor: "#353535"}}>

          <div style={{margin: "auto", width: "55%", justifyContent: "space-between", display: "block" }}>
            <p className="headers">{t("ModuleTitles.QuickCompare")}</p>

            <div className="itemEntry">
                <FormControl className={classes.formControl}> 
                <InputLabel id="slots">{t("QuickCompare.Slot")}</InputLabel>
                <NativeSelect
                  value={activeSlot}
                  onChange={changeSlot}
                  displayEmpty
                >
                  {slots.map((x, y) => <option key={y} value={x.value}>{x.label}</option>)}

                </NativeSelect>

                </FormControl>

                <FormControl className={classes.formControl}> 
                <InputLabel id="itemname">{t("QuickCompare.ItemName")}</InputLabel>
                <NativeSelect
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                >
                  <option aria-label="None" value="" />
                  {itemDropdown.map((x, y) => <option key={y} value={x.value}>{x.label}</option>)}
                  
                </NativeSelect>

                </FormControl>

                <FormControl className={classes.formControl}> 
                <InputLabel id="itemlevel">{t("QuickCompare.ItemLevel")}</InputLabel>
                <NativeSelect
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                >
                  <option aria-label="None" value="" />
                  {itemLevels.map((x, y) => <option key={y} value={y}>{x}</option>)}

                </NativeSelect>

                </FormControl>

            </div>




            <div className="itemList">


            </div>

                {/*legendaryList.map((item, index) => (
                    
                    <LegendaryObject key={index} item={item}/>

                )) */}

          </div>
        </div>

      );
  }