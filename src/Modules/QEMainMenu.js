import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './QEMainMenu.css';
import MenuButton from './QEModules/MenuButton.js';

// This is all shitty boilerplate code that'll be replaced. Do not copy.
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default class QEMainMenu extends Component {
    render() {

      return (

        <div>
        <AppBar position="static">
          <Toolbar>
          <IconButton edge="start"  className={useStyles.menuButton} color="inherit" aria-label="menu">
          
        </IconButton>
        <Typography variant="h6" className={useStyles.title}>
          QE Live
        </Typography>
        <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

          <div style={{margin: "auto", width: "15%"}}>
            <p className="headers">Item Comparisons</p>
            <Button variant="contained" color="primary" style={{width: "280px", margin: "7px"}}>Top Gear</Button>
            <Button variant="contained" color="primary" style={{width: "280px", margin: "7px"}}>Gear Quick Compare</Button>
            <Button variant="contained" color="primary" style={{width: "280px", margin: "7px"}}>Trinket Quick Compare</Button>
            <Button variant="contained" color="primary" style={{width: "280px", margin: "7px"}}>Upgrade Finder</Button>
            <Button variant="contained" color="primary" style={{width: "280px", margin: "7px"}}>Explore Conduits</Button>
            <Button variant="contained" color="primary" style={{width: "280px", margin: "7px"}}>Cooldown Assignments</Button>


          </div>

      </div>
      );
    }
  }