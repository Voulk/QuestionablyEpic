import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import logo from "../../Images/QeAssets/QELogo.png";
import "./QEMainMenu.css";

import Box from "@material-ui/core/Box";
import LanguageSelector from "./LanguageButton";
import ProfileSelector from "./ProfileButton";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SimCraftInput from "./SimCraftDialog";

export default function QEHeader(props) {
  const { t } = useTranslation();

  // If the player isn't logged in, then show a login button and redirect to the login page on click.
  // If the player IS logged in, show their battle tag and redirect to profile on click.
  // TODO: Implement profile.
  let playerName = props.playerTag || t("HeaderLabels.Login");
  let linkTarget = props.playerTag === "" ? "/login" : "/profile";

  return (
    <div style={{ backgroundColor: "#353535" }}>
      <AppBar position="static" color="inherit">
        <Toolbar style={{ marginLeft: "20%", marginRight: "20%" }}>
          <Box display="flex" flexGrow={1}>
            <Link to={"/"}>
              <img src={logo} alt="QE Live" />
            </Link>
          </Box>
          <div />
          <Button style={{ color: "white" }}>
            {t("QeHeader.InsertLogLabel")}
          </Button>
          <SimCraftInput 
            pl={props.pl}
            contentType={props.contentType}
          />
          <Button style={{ color: "white" }} onClick={props.toggleContentType}>
            {t(props.contentType)}
          </Button>
          <ProfileSelector
            name={playerName}
            component={Link}
            to={linkTarget}
            logFunc={props.logFunc}
            setRegion={props.setRegion}
          />
          <LanguageSelector langSet={props.langSet} curLang={props.curLang} />
        </Toolbar>
      </AppBar>
    </div>
  );
}