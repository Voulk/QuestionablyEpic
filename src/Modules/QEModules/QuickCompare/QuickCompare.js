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

export default function QuickCompare(props) {
    const { t, i18n } = useTranslation();
    const classes = useStyles();
    
    const slots = ['Helm', 'Shoulders', 'Chest', 'Ring', 'Trinket'] // Probably store this somewhere more accessible. 
    const itemDropdown = [];

    const [age, setAge] = React.useState('');
    const [activeSlot, setSlot] = React.useState('Helm');
  

    const fillItems = (slotName) => {
      var i = 0;
      for (i = 0; i < itemDB.length; i++) {
          console.log(itemDB[i].name + itemDB[i].dropLoc);

      }


      if (slotName == "Helm") {
        itemDropdown.push("HelmItem1");
      }
      else {
        itemDropdown.push("Generic Item");
      }

    }

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    const changeSlot = (event) => {
      setSlot(event.target.value);
    }

    fillItems(activeSlot);

      return (
        
        <div style={{backgroundColor: "#353535"}}>

          <div style={{margin: "auto", width: "55%", justifyContent: "space-between", display: "block" }}>
            <p className="headers">{t("GearCompareTitle")}</p>

            <div className="itemEntry">
                <FormControl className={classes.formControl}> 
                <InputLabel id="slots">Slot</InputLabel>
                <NativeSelect
                  value={activeSlot}
                  onChange={changeSlot}
                  displayEmpty
                >
                  {slots.map((x, y) => <option key={y}>{x}</option>)}

                </NativeSelect>

                </FormControl>

                <FormControl className={classes.formControl}> 
                <InputLabel id="itemname">Item Name</InputLabel>
                <NativeSelect
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                >
                  <option aria-label="None" value="" />
                  {itemDropdown.map((x, y) => <option key={y} value={y}>{x}</option>)}

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