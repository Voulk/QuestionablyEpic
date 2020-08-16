import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const theme = createMuiTheme({
  overrides: {
    // Style sheet name :atom:
    MuiTableCell: {
      root: {
        fontSize: '0.875rem',
      },
      body: {
        fontSize: '0.875rem',
      }, 
    },
    MuiSelect:{
      root: {
        color: '#fff'
      },
    },
    MuiToolbar: {
      regular: {
        minHeight: '64px'
      }
    },
    //  MuiIconButton: {
    //   root: {
    //     padding: '0px'
    //   },
    // },
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#d3bc47',
    },
    secondary: {
      main: '#ff9100',
    },
  },
});

export default function DenseAppBar(props) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static" style={{ borderRadius: '4px 4px 0px 0px'}} >
          <Toolbar variant="dense">
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={props.onClick}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              {props.title}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}