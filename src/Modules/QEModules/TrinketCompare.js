import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import logo from '../../Images/QeAssets/QELogo.png'
import MenuIcon from '@material-ui/icons/Menu';
import './SetupAndMenus/QEMainMenu.css';
import Avatar from "@material-ui/core/Avatar";

import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import Box from '@material-ui/core/Box';
import Player from './Player/Player';
import QEHeader from './SetupAndMenus/QEHeader';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


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

// Demo list only.
const trinketList = ["Sea Star", "Music Box", "Conch", "Alchemist Stone", "Flat Stat Stick"]

export default class QEMainMenu extends Component {
    render() {
      return (
        <div style={{backgroundColor: "#353535"}}>

          <div style={{margin: "auto", width: "20%", justifyContent: "center", display: "block"}}>
            <p className="headers">Trinket Compare</p>
            <Autocomplete
              id="trinketSelection"
              options={trinketList}
              style={{width: 250}}
              renderInput={(params) => <TextField {...params} label="Select a Trinket" variant="outlined" />}
            />

            <Button variant="contained">Add</Button>


          </div>

      </div>
      
      );
    }
  }