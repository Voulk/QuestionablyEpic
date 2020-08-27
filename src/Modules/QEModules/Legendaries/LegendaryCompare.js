import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import '../QEMainMenu.css';

import Player from '../Player/Player';
import QEHeader from '../QEHeader';
import LegendaryObject from './LegendaryObject';
import getLegendaryInfo from '../Classes/LegendaryFormulas';
import './Legendaries.css';


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

const createLegendary = (legendaryName, container, spec, pl) => {
    let lego = new Legendary(legendaryName)
    getLegendaryInfo(lego, spec, pl)

    container.push(lego)

}

const fillLegendaries = (container, spec, pl) => {
    //container = [];
    if (spec === "Druid") {
        createLegendary("Rejuv Spreader", container, spec, pl);
        createLegendary("Swiftmend Extension", container, spec, pl);
        createLegendary("The Dark Titans Lesson", container, spec, pl);

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

export default class LegendaryCompare extends Component {
    constructor(props) {
      super(props)

      this.state = {
        legendaryList: []
      }

      fillLegendaries(this.state.legendaryList, props.pl.spec);
      sortLegendaries(this.state.legendaryList);

    }
    
    render() {

      return (
        
        <div style={{backgroundColor: "#353535"}}>

        <QEHeader />

          <div style={{margin: "auto", width: "55%", justifyContent: "space-between", display: "block" }}>
            <p className="headers">Legendary Compare</p>

                {this.state.legendaryList.map((item, index) => (
                    <LegendaryObject key={index} name={item.name} hps={item.expectedHPS}/>

                ))}

          </div>
        </div>

      );
    }
  }