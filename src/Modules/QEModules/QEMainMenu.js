import React, { Component } from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import logo from "../../Images/QeAssets/QELogo.png";
import MenuIcon from "@material-ui/icons/Menu";
import "./QEMainMenu.css";
import Avatar from "@material-ui/core/Avatar";

import Box from "@material-ui/core/Box";
import Player from "./Player/Player";
import QEHeader from "./QEHeader";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CharComponent from "./CharComponent";


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

const btnStyle = makeStyles((theme) => ({
  btn: {
    width: "95%",
    margin: "7px", 
    backgroundColor: "Gold",
  }

}));
//            <p>{props.pl.getSpec()}</p>

export default function QEMainMenu(props) {
  const { t, i18n } = useTranslation();
    
      return (
        <div style={{backgroundColor: "#353535"}}>
          <div style={{margin: "auto", width: "20%", justifyContent: "center", display: "block"}}>
            <p className="headers">{t("MenuItemsH")}</p>
 
            
            <Button variant="contained" color="primary" style={{width: "95%", margin: "7px"}}>{t("Top Gear")}</Button>
            <Button variant="contained" color="primary" style={{width: "95%", margin: "7px"}}>Gear Quick Compare</Button>
            <Button variant="contained" color="primary" style={{width: "95%", margin: "7px"}} component={Link} to="/trinkets">Trinket Quick Compare</Button>
            <Button variant="contained" color="primary" style={{width: "95%", margin: "7px"}} component={Link} to="/legendaries">Legendary Analysis</Button>
            <Button variant="contained" color="primary" style={{width: "95%", margin: "7px"}}>Explore Conduits</Button>
            

            <p className="headers">Raid Tools</p>
            <Button variant="contained" color="primary" style={{width: "95%", margin: "7px"}} component={Link} to="/holydiver">Cooldown Planner</Button>

            <p className="headers">Settings</p>
            <Button variant="contained" color="primary" style={{width: "95%", margin: "7px"}} component={Link} to="/addchar">Add Char (Temp)</Button>
            <Button variant="contained" color="primary" style={{width: "95%", margin: "7px"}}>Settings</Button>

            <p className="headers">Characters (Temp)</p>

            {/*props.allChars.map((char, index) => (
                    
                    <CharComponent key={index} name={char.charName} spec={char.spec}/>

            )) */}

          </div>

      </div>
      
      );
  }