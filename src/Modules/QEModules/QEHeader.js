import React, { Component } from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import logo from "../../Images/QeAssets/QELogo.png";
import MenuIcon from "@material-ui/icons/Menu";
import "./QEMainMenu.css";
import Avatar from "@material-ui/core/Avatar";

import Box from "@material-ui/core/Box";
import LanguageSelector from "./LanguageButton";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


export default function QEMainMenu(props) {
  const { t, i18n } = useTranslation();
  return (
    <div style={{ backgroundColor: "#353535" }}>
      <AppBar position="static" color="Black">
        <Toolbar style={{ marginLeft: "20%", marginRight: "20%" }}>
          <Box display="flex" flexGrow={1}>
            <img src={logo} alt="QE Live" />
          </Box>
          <div></div>

          <Button color="inherit">{t("Insert Log")}</Button>
          <Button color="inherit">SimC</Button>
          <Button color="inherit">{t("Raid")}</Button>
          <Button color="inherit" component={Link} to="/login">{t("Login")}</Button>
          <LanguageSelector langSet={props.langSet} curLang={props.curLang} />
        </Toolbar>
      </AppBar>
    </div>
  );
}