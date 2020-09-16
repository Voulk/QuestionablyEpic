import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import '../SetupAndMenus/QEMainMenu.css';

import Player from '../Player/Player';
import QEHeader from '../SetupAndMenus/QEHeader';
import LegendaryObject from './LegendaryObject';
import getLegendaryInfo from '../Classes/LegendaryFormulas';
import './Legendaries.css';
import { useTranslation } from "react-i18next";


// This is all shitty boilerplate code that'll be replaced. Do not copy.
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 5,
    
  },
}));

const createLegendary = (legendaryName, container, spec, pl, contentType) => {
    let lego = new Legendary(legendaryName)
    getLegendaryInfo(lego, spec, pl, contentType)

    container.push(lego)

}

const fillLegendaries = (container, spec, pl, contentType) => {
    //container = [];
    if (spec === "Restoration Druid") {
        createLegendary("Rejuv Spreader", container, spec, pl, contentType);
        createLegendary("Swiftmend Extension", container, spec, pl, contentType);
        createLegendary("The Dark Titans Lesson", container, spec, pl, contentType);
        createLegendary("Free Wild Growth", container, spec, pl, contentType);

    }
}

const sortLegendaries = (container) => {
  // Current default sorting is by HPS but we could get creative here in future.
  container.sort((a, b) => (a.expectedHPS < b.expectedHPS ? 1 : -1))


}

class Legendary {
    constructor(name) {
        this.name = name;
        this.image = 0;
        this.expectedHps = 0;
        this.expectedDps = 0;
        this.singleTargetHPS = 0;
    }
     
}

export default function LegendaryCompare(props) {
    const { t, i18n } = useTranslation();

    let legendaryList = [];
    //const [legendaryList, setLegendaryList] = useState([]);

    fillLegendaries(legendaryList, props.pl.spec, props.pl, props.contentType);
    sortLegendaries(legendaryList);

      return (
        
        <div style={{backgroundColor: "#353535"}}>

          <div style={{margin: "auto", width: "55%", justifyContent: "space-between", display: "block" }}>
            <p className="headers">{t("LegendaryCompareTitle")}</p>

                {legendaryList.map((item, index) => (
                    
                    <LegendaryObject key={index} name={item.name} hps={item.expectedHPS}/>

                ))}

          </div>
        </div>

      );
  }