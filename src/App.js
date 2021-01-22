import React, { Component, useEffect } from "react";
import "./App.css";
import HolyDiver from "./Modules/CooldownPlanner/CooldownPlannerModule";
import QEMainMenu from "./Modules/SetupAndMenus/QEMainMenu";
import LegendaryCompare from "./Modules/Legendaries/LegendaryCompare";
import TrinketAnalysis from "./Modules/TrinketAnalysis/TrinketAnalysis";
import QuickCompare from "./Modules/QuickCompare/QuickCompare";
import QEHeader from "./Modules/SetupAndMenus/QEHeader";
import TopGearReport from "./Modules/TopGear/TopGearReport";
import QEProfile from "./Modules/SetupAndMenus/QEProfile";
import PlayerChars from "./Modules/Player/PlayerChars";
import CovenantExploration from "./Modules/Covenants/Components/CovenantExploration";
import { UpgradeFinder } from "./Modules/UpgradeFinder/UpgradeFinder";
import { ConfirmLogin, QELogin } from "./Modules/SetupAndMenus/QELogin";
import { withTranslation } from "react-i18next";
import i18n from "./i18n";
import TopGear from "./Modules/TopGear/TopGear";
import ErrorBoundary from "./Modules/ErrorLogging/ErrorBoundary.js";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ls from "local-storage";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { createBrowserHistory } from "history";
import { dbCheckPatron } from "./Modules/SetupAndMenus/ConnectionUtilities";

import ReactGA from "react-ga";


const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: { main: "#F2BF59" },
    secondary: { main: "#525252" },
  },

  // just messing around with themes here. Yellow colour is different in the below.

  // palette: {
  //   common: { black: "#000", white: "#fff" },
  //   background: { paper: "#424242", default: "#333" },
  //   primary: {
  //     light: "#6d6d6d",
  //     main: "#424242",
  //     dark: "#1b1b1b",
  //     contrastText: "#fff",
  //   },
  //   secondary: {
  //     light: "#ffee77",
  //     main: "#d3bc47",
  //     dark: "rgba(198, 167, 0, 1)",
  //     contrastText: "rgba(0, 0, 0, 1)",
  //   },
  //   error: {
  //     light: "#e57373",
  //     main: "#f44336",
  //     dark: "#d32f2f",
  //     contrastText: "#fff",
  //   },
  //   text: {
  //     primary: "rgba(0, 0, 0, 0.87)",
  //     secondary: "rgba(0, 0, 0, 0.54)",
  //     disabled: "rgba(0, 0, 0, 0.38)",
  //     hint: "rgba(0, 0, 0, 0.38)",
  //   },
  // },
});

process.env.NODE_ENV !== "production"
  ? ""
  : ReactGA.initialize("UA-90234903-1");

class App extends Component {
  constructor() {
    super();

    // binds the snack open handlers to this component so we can send it down to where we can trigger them in the relevant component
    this.handleCharSnackOpen = this.handleCharSnackOpen.bind(this);
    this.handleCharUpdateSnackOpen = this.handleCharUpdateSnackOpen.bind(this);
    this.handleLoginSnackOpen = this.handleLoginSnackOpen.bind(this);
    this.handleSimCSnackOpen = this.handleSimCSnackOpen.bind(this);
    this.handleLogSnackOpen = this.handleLogSnackOpen.bind(this);
    this.handleEmailSnackOpen = this.handleEmailSnackOpen.bind(this);
    this.handleEmailErrorSnackOpen = this.handleEmailErrorSnackOpen.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPatron = this.setPatron.bind(this);
    this.checkPatron = this.checkPatron.bind(this);

    this.langSet = this.langSet.bind(this);
    this.userLogout = this.userLogout.bind(this);
    this.state = {
      characters: new PlayerChars(),
      playerRegion: "us",
      client_id: "1be64387daf6494da2de568527ad82cc",
      email: "",
      // lang: "en",
      playerLoginID: "",
      playerBattleTag: "",
      accessToken: "",
      contentType: "Raid",
      patronStatus: "",
      charSnackState: false,
      charUpdateState: false,
      loginSnackState: false,
      simcSnackState: false,
      logImportSnackState: false,
      emailSnackState: false,
      emailSnackErrorState: false,
      topSet: null,
    };
  }

  setTopResult = (set) => {
    this.setState({ topSet: set });
  };

  // --Snack Bar Handlers--
  // Character Added
  handleCharSnackOpen = () => {
    this.setState({ charSnackState: true });
  };
  handleCharSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ charSnackState: false });
  };
  // Character Updated
  handleCharUpdateSnackOpen = () => {
    this.setState({ charUpdateState: true });
  };
  handleCharUpdateSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ charUpdateState: false });
  };

  // Login
  handleLoginSnackOpen = () => {
    this.setState({ loginSnackState: true });
  };
  handleLoginClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ loginSnackState: false });
  };

  // SimC Added
  handleSimCSnackOpen = () => {
    this.setState({ simcSnackState: true });
  };
  handleSimCSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ simcSnackState: false });
  };

  // Log Import Snack
  handleLogSnackOpen = () => {
    this.setState({ logImportSnackState: true });
  };
  handleLogSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ logImportSnackState: false });
  };

  // Log Import Snack
  handleEmailSnackOpen = () => {
    this.setState({ emailSnackState: true });
  };
  handleEmailSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ emailSnackState: false });
  };

  // Log Import Snack
  handleEmailErrorSnackOpen = () => {
    this.setState({ emailSnackErrorState: true });
  };
  handleEmailErrorSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ emailSnackErrorState: false });
  };

  // ////////////////////////////////////////

  langSet = (props) => {
    this.setState({ lang: props });
    ls.set("lang", props);
  };

  updatePlayerChars = (allChars) => {
    this.setState({ characters: allChars });
  };

  setPatron = (status) => {
    //console.log("ST: " + status);
    this.setState({ patronStatus: status });
  };

  checkPatron = (email) => {
    if (email !== "") {
      dbCheckPatron(email, this.setPatron);
    }
  };

  setEmail = (emailAdd) => {
    this.setState({ email: emailAdd });
    ls.set("email", emailAdd);
    this.checkPatron(emailAdd);
  };

  updatePlayerChar = (player) => {
    let allChars = this.state.characters;
    allChars.updatePlayerChar(player);
    this.setState({ characters: allChars });
    allChars.saveAllChar();
  };

  deletePlayerChar = (unique) => {
    let allChars = this.state.characters;
    allChars.delSpecificChar(unique);
    this.setState({ characters: allChars });
    allChars.saveAllChar();
  };

  setRegion = (props) => {
    this.setState({ playerRegion: props });
  };

  toggleContentType = () => {
    let newType = this.state.contentType === "Raid" ? "Dungeon" : "Raid";
    this.setState({ contentType: newType });
    console.log(this.state.contentType);
    ls.set("contentType", newType);
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
        "&redirect_uri=http://questionablyepic.com/live/confirmlogin/&response_type=code&scope=openid"
      );
    }
    return (
      "https://" +
      this.state.playerRegion +
      ".battle.net/oauth/authorize?client_id=" +
      this.state.client_id +
      "&redirect_uri=http://questionablyepic.com/live/confirmlogin/&response_type=code&scope=openid"
    );
  };

  // When component mounts, check local storage for battle tag or ID.
  componentDidMount() {
    //console.log("COMPONENT MOUNTED" + window.location.pathname + window.location.search);

    this.setState({
      playerLoginID: ls.get("id") || "",
      playerBattleTag: ls.get("btag") || "",
      lang: ls.get("lang") || "en",
      contentType: ls.get("contentType") || "Raid",
      email: ls.get("email") || "",
    });
    this.checkPatron(ls.get("email"));

    i18n.changeLanguage(ls.get("lang") || "en");
  }

  usePageViews() {
    let location = useLocation();

    useEffect(() => {
      ReactGA.send(["pageview", location.pathname]);
    }, [location]);
  }

  render() {
    let activePlayer = this.state.characters.getActiveChar();
    let allChars = this.state.characters;
    //

    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const vertical = "bottom";
    const horizontal = "left";

    return (
      <ErrorBoundary>
        <Router basename={process.env.REACT_APP_HOMEPAGE}>
          <ThemeProvider theme={theme}>
            <div className="App" style={{ marginTop: 96 }}>
              <QEHeader
                logFunc={this.userLogout}
                patronStatus={this.state.patronStatus}
                playerTag={this.state.playerBattleTag}
                setRegion={this.setRegion}
                toggleContentType={this.toggleContentType}
                contentType={this.state.contentType}
                pl={activePlayer}
                simcSnack={this.handleSimCSnackOpen}
                logImportSnack={this.handleLogSnackOpen}
                allChars={allChars}
              />

              {/* // Char Added Snackbar */}
              <Snackbar
                open={this.state.charSnackState}
                autoHideDuration={3000}
                onClose={this.handleCharSnackClose}
              >
                <Alert onClose={this.handleCharSnackClose} severity="success">
                  Character Added!
                </Alert>
              </Snackbar>

              {/* // Char Updated Snackbar */}
              <Snackbar
                open={this.state.charUpdateState}
                autoHideDuration={3000}
                onClose={this.handleCharUpdateSnackClose}
              >
                <Alert
                  onClose={this.handleCharUpdateSnackClose}
                  severity="success"
                >
                  Character Updated!
                </Alert>
              </Snackbar>

              {/* // Login Success Snackbar */}
              <Snackbar
                open={this.state.loginSnackState}
                autoHideDuration={3000}
                onClose={this.handleLoginClose}
              >
                <Alert onClose={this.handleLoginClose} severity="success">
                  Logged in Successfully!
                </Alert>
              </Snackbar>

              {/* // SimC Success Snackbar */}
              <Snackbar
                open={this.state.simcSnackState}
                autoHideDuration={3000}
                onClose={this.handleSimCSnackClose}
                anchorOrigin={{ vertical, horizontal }}
              >
                <Alert onClose={this.handleSimCSnackClose} severity="success">
                  SimC String Imported Successfully!
                </Alert>
              </Snackbar>

              {/* Log Import Success Snackbar */}
              <Snackbar
                open={this.state.logImportSnackState}
                autoHideDuration={3000}
                onClose={this.handleLogSnackClose}
              >
                <Alert onClose={this.handleLogSnackClose} severity="success">
                  Log Imported Successfully!
                </Alert>
              </Snackbar>

              {/* Email Import Success Snackbar */}
              <Snackbar
                open={this.state.emailSnackState}
                autoHideDuration={3000}
                onClose={this.handleEmailSnackClose}
              >
                <Alert onClose={this.handleEmailSnackClose} severity="success">
                  Email Updated!
                </Alert>
              </Snackbar>

              {/* Email Error Import Success Snackbar */}
              <Snackbar
                open={this.state.emailSnackErrorState}
                autoHideDuration={3000}
                onClose={this.handleEmailErrorSnackClose}
              >
                <Alert
                  onClose={this.handleEmailErrorSnackClose}
                  severity="error"
                >
                  Please check the Email and try again
                </Alert>
              </Snackbar>

              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <QEMainMenu
                      allChars={allChars}
                      charUpdate={this.updatePlayerChars}
                      singleUpdate={this.updatePlayerChar}
                      pl={this.state.player}
                      charAddedSnack={this.handleCharSnackOpen}
                      charUpdatedSnack={this.handleCharUpdateSnackOpen}
                      contentType={this.state.contentType}
                      patronStatus={this.state.patronStatus}
                      delChar={this.deletePlayerChar}
                    />
                  )}
                />
                <Route path="/holydiver" render={() => <HolyDiver />} />
                <Route
                  path="/report"
                  render={() => (
                    <TopGearReport
                      pl={activePlayer}
                      result={this.state.topSet}
                      contentType={this.state.contentType}
                    />
                  )}
                />
                <Route
                  path="/quickcompare"
                  render={() => (
                    <QuickCompare
                      pl={activePlayer}
                      contentType={this.state.contentType}
                    />
                  )}
                />
                <Route
                  path="/topgear"
                  render={() => (
                    <TopGear
                      pl={activePlayer}
                      contentType={this.state.contentType}
                      setTopResult={this.setTopResult}
                    />
                  )}
                />
                <Route
                  path="/legendaries"
                  render={() => (
                    <LegendaryCompare
                      pl={activePlayer}
                      contentType={this.state.contentType}
                    />
                  )}
                />
                <Route
                  path="/trinkets"
                  render={() => (
                    <TrinketAnalysis
                      player={activePlayer}
                      contentType={this.state.contentType}
                    />
                  )}
                />

                <Route
                  path="/soulbinds"
                  render={() => (
                    <CovenantExploration
                      pl={activePlayer}
                      contentType={this.state.contentType}
                      updatePlayerChar={this.updatePlayerChar}
                    />
                  )}
                />
                <Route
                  path="/login"
                  render={() => <QELogin setRegion={this.setRegion} />}
                />
                <Route
                  path="/attemptlogin"
                  component={() => (window.location = this.buildLoginURL())}
                />
                <Route
                  path="/confirmlogin/"
                  render={() => (
                    <ConfirmLogin
                      loginSnackOpen={this.handleLoginSnackOpen}
                      updatePlayerID={this.updatePlayerID}
                    />
                  )}
                />
                <Route
                  path="/UpgradeFinder/"
                  render={() => (
                    <UpgradeFinder
                      player={activePlayer}
                      contentType={this.state.contentType}
                      simcSnack={this.handleSimCSnackOpen}
                      allChars={allChars}
                    />
                  )}
                />
                <Route
                  path="/profile/"
                  render={() => (
                    <QEProfile
                      setEmail={this.setEmail}
                      playerTag={this.state.playerBattleTag}
                      patronStatus={this.state.patronStatus}
                      emailSnack={this.handleEmailSnackOpen}
                      emailSnackError={this.handleEmailErrorSnackOpen}
                    />
                  )}
                />
              </Switch>
            </div>
          </ThemeProvider>
        </Router>
      </ErrorBoundary>
    );
  }
}

export default withTranslation()(App);
