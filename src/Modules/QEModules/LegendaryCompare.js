import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import logo from '../../Images/QELogo.png'
import MenuIcon from '@material-ui/icons/Menu';
import './QEMainMenu.css';
import Avatar from "@material-ui/core/Avatar";

import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import Box from '@material-ui/core/Box';
import Player from './Player/Player';
import QEHeader from './QEHeader';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LegendaryObject from './LegendaryObject';


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

//TODO
const getLegendaryList = (spec) => {
    return ["Rejuv Spreader", "Swiftmend Extension", "Double Lifebloom"];
}

const getLegendaryInfo = (name, spec, infoType) => {
    return Math.round(Math.random(0, 1) * 100);


}

class Legendary {
    constructor() {
        this.name = "";
        this.expectedHps = 0;
        this.expectedDps = 0;
        this.singleTargetHPS = 0;
    }
  
    
  }


export default class QEMainMenu extends Component {
    render() {

      return (
        <div style={{backgroundColor: "#353535"}}>

        <QEHeader />

          <div style={{margin: "auto", width: "55%", justifyContent: "space-between", display: "block" }}>
            <p className="headers">Legendary Compare</p>

                {getLegendaryList().map((item, index) => (
                    <LegendaryObject key={index} name={item} hps={getLegendaryInfo(item, this.props.pl.spec, "HPS")}/>

                ))}

          </div>



        </div>

      
      );
    }
  }