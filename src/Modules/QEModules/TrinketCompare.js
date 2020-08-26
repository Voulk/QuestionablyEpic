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

export default class QEMainMenu extends Component {
    render() {
      return (
        <div style={{backgroundColor: "#353535"}}>
        <QEHeader />
          <div style={{margin: "auto", width: "20%", justifyContent: "center", display: "block"}}>
            <p className="headers">Trinket Compare</p>
            
            <Button variant="contained" color="primary" style={{width: "95%", margin: "7px"}}>Top Gear</Button>
            

            <p className="headers">Raid Tools</p>
            <Button variant="contained" color="primary" style={{width: "95%", margin: "7px"}}>Cooldown Assignments</Button>


            <p className="headers">Settings</p>
            <Button variant="contained" color="primary" style={{width: "95%", margin: "7px"}}>Add Char (Temp)</Button>
            <Button variant="contained" color="primary" style={{width: "95%", margin: "7px"}}>Settings</Button>
          </div>

      </div>
      
      );
    }
  }