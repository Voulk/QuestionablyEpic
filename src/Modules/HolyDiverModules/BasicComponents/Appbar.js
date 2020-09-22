import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //     "& .MuiIconButton-root": {
    //   padding: "0px 12px 0px 12px"
    // }
  },
  menuButton: {
    marginRight: theme.spacing(2),


  },
}));

export default function DenseAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ borderRadius: 4 }}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={props.onClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}