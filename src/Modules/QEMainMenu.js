import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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


      );
    }
  }