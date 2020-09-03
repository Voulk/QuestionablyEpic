import React, { Component } from "react";
import "./App.css";
//import HolyDiver from "./Modules/HolyDiverModules/HolyDiverModule";
import QEMainMenu from "./Modules/QEModules/QEMainMenu.js";
import TrinketCompare from "./Modules/QEModules/TrinketCompare.js";
import LegendaryCompare from "./Modules/QEModules/Legendaries/LegendaryCompare.js";
import Player from "./Modules/QEModules/Player/Player";
import QEHeader from "./Modules/QEModules/QEHeader";
import PlayerChars from "./PlayerChars";

import { ConfirmLogin, QELogin } from "./Modules/QEModules/QELogin";
import { withTranslation, Trans, useTranslation } from "react-i18next";
import i18n from "./i18n";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect, useHistory } from "react-router-dom";
import ls from "local-storage";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: { main: "#d3bc47" },
    secondary: { main: "#e0e0e0" },
  },
});

class App extends Component {
  constructor() {
    super();
    this.langSet = this.langSet.bind(this);
    this.state = {
      characters: new PlayerChars(),
      playerRegion: "us",
      client_id: "1be64387daf6494da2de568527ad82cc",
      lang: "en",
      playerLoginID: "",
      playerBattleTag: "",
      accessToken: "",
    };

  }


  langSet = (props) => {
    this.setState({ lang: props });
    ls.set("lang", props);
  };

  setRegion = (props) => {
    this.setState({ playerRegion: props });
  };

  updatePlayerID = (id, battletag) => {
    this.setState({ playerLoginID: id });
    this.setState({ playerBattleTag: battletag });

    ls.set("id", id);
    ls.set("btag", battletag);
  };

  userLogout() {
    // Do other stuff later.
    this.setState({ playerLoginID: 0 });
    this.setState({ playerBattleTag: "" });

    ls.remove("id");
    ls.remove("btag");

  }


  buildLoginURL = () => {
    // China is a little different from the other regions and uses its own URL.
    if (this.state.playerRegion === "cn") {
      return (
        "https://www.battlenet.com.cn/oauth/authorize?client_id=" +
        this.state.client_id +
        "&redirect_uri=http://localhost:3000/confirmlogin/&response_type=code&scope=openid"
      );
    } else {
      return (
        "https://" +
        this.state.playerRegion +
        ".battle.net/oauth/authorize?client_id=" +
        this.state.client_id +
        "&redirect_uri=http://localhost:3000/confirmlogin/&response_type=code&scope=openid"
      );
    }
  };

  // When component mounts, check local storage for battle tag or ID.
  componentDidMount() {
    this.setState({
      playerLoginID: ls.get("id") || "",
      playerBattleTag: ls.get("btag") || "",
      lang: ls.get("lang") || "en",
    });
    
    i18n.changeLanguage(this.state.lang);
  }

  render() {

    let activePlayer = this.state.characters.getActiveChar();
    let allChars = this.state.characters.getAllChar();
    //alert(JSON.stringify(allChars[0]));

    return (
      
      <Router>
        
        {console.log(this.state)}
        <ThemeProvider theme={theme}>
          <div className="App">
            <QEHeader
              langSet={this.langSet}
              curLang={this.state.lang}
              playerTag={this.state.playerBattleTag}
            />
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <QEMainMenu
                    allChars={allChars}
                    pl={this.state.player}
                    langSet={this.langSet}
                    curLang={this.state.lang}
                  />
                )}
              />
              {/*<Route
                path="/holydiver"
                render={() => (
                  <HolyDiver langSet={this.langSet} curLang={this.state.lang} />
                )}
                /> */}
              <Route
                path="/trinkets"
                render={() => (
                  <TrinketCompare
                    pl={this.state.player}
                    langSet={this.langSet}
                    curLang={this.state.lang}
                  />
                )}
              />
              <Route
                path="/legendaries"
                render={() => (
                  <LegendaryCompare
                    pl={activePlayer}
                    langSet={this.langSet}
                    curLang={this.state.lang}
                  />
                )}
              />
              <Route
                path="/login"
                render={() => (
                  <QELogin
                    langSet={this.langSet}
                    curLang={this.state.lang}
                    setRegion={this.setRegion}
                  />
                )}
              />
              <Route
                path="/attemptlogin"
                component={() => (window.location = this.buildLoginURL())}
              />
              <Route
                path="/confirmlogin/"
                render={() => (
                  <ConfirmLogin updatePlayerID={this.updatePlayerID} />
                )}
              />
            </Switch>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

export default withTranslation()(App);