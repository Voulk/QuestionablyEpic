import React, { useState, useEffect } from "react";
import "./App.css";
import CustomRoute from "./CustomRoute";
import ReportRoute from "./ReportRoute";
import FightAnalysis from "General/Modules/FightAnalysis/FightAnalysis";
import QEMainMenu from "General/Modules/SetupAndMenus/QEMainMenu";
import SequenceGen from "General/Modules/SequenceGenerator/SequenceGenerator.js";
import TrinketAnalysis from "General/Modules/TrinketAnalysis/TrinketAnalysis";
import EmbellishmentAnalysis from "General/Modules/EmbellishmentAnalysis/EmbellishmentAnalysis";
import CircletAnalysis from "General/Modules/CircletAnalysis/CircletAnalysis";
import QuickCompare from "General/Modules/QuickCompare/QuickCompare";
import QEHeader from "General/Modules/SetupAndMenus/Header/QEHeader";
import TopGearReport from "General/Modules/TopGear/Report/TopGearReport";
import UpgradeFinderReport from "General/Modules/UpgradeFinder/UpgradeFinderReport";
import QEProfile from "General/Modules/SetupAndMenus/QEProfile";
import { createPlayerChars } from "General/Modules/Player/PlayerChars";
import TierSets from "./Classic/Modules/TierSets/TierSets";
import { ConfirmLogin, QELogin } from "General/Modules/SetupAndMenus/Header/QELogin";
import { withTranslation } from "react-i18next";
import i18n from "./i18n";
import TopGear from "General/Modules/TopGear/TopGear";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import * as ls from "local-storage";
import QESnackbar from "General/Modules/BasicComponents/QESnackBar";
// import { createBrowserHistory } from "history"; // not used TODO: remove?
import { dbCheckPatron, dbGetArticleList } from "General/Modules/SetupAndMenus/ConnectionUtilities.js";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { theme } from "./theme";
import ReactGA from "react-ga";
import TopGearResult from "General/Modules/TopGear/Engine/TopGearResult";
import Player from "General/Modules/Player/Player";
import UpgradeFinderFront from "General/Modules/UpgradeFinder/UpgradeFinderFront";

process.env.NODE_ENV !== "production" ? "" : ReactGA.initialize("UA-90234903-1");

const App = () => {
    /* ---------------- Here we bind functions to this component ---------------- */
    /* ---------- This is so they can be used as props in other modules --------- */
    /* -------------------- And they will change states here -------------------- */

    const [characters, setCharacters] = React.useState(createPlayerChars());
    const [email, setEmail] = useState<string>("");
    const [client_id, setClient_id] = useState<string>("1be64387daf6494da2de568527ad82cc");
    const [playerLoginID, setPlayerLoginID] = useState("");
    const [playerRegion, setPlayerRegion] = useState<string>("us");
    const [playerBattleTag, setPlayerBattleTag] = useState<string>("");
    const [accessToken, setAccessToken] = useState<string>("");
    const [patronStatus, setPatronStatus] = useState<string>("Standard");
    const [topSet, setTopSet] = useState<TopGearResult | null>(null);
    const [upgradeFinderSet, setUpgradeFinderSet] = useState<any>(null);

    const [articleList, setArticleList] = useState<any[]>([]);
    const [lang, setLang] = useState<string>("en");

    const [charSnackState, setCharSnackState] = useState<boolean>(false);
    const [charUpdateState, setCharUpdateState] = useState<boolean>(false);
    const [loginSnackState, setLoginSnackState] = useState<boolean>(false);
    const [simcSnackState, setSimcSnackState] = useState<boolean>(false);
    const [logImportSnackState, setLogImportSnackState] = useState<boolean>(false);
    const [emailSnackState, setEmailSnackState] = useState<boolean>(false);
    const [emailSnackErrorState, setEmailSnackErrorState] = useState<boolean>(false);

    const [isPTR, setIsPTR] = useState<boolean>(window.location.href.includes("localhost") || window.location.href.includes("ptr"));


    //setEmail = setEmail.bind(this);
    /*
    setPatron = setPatron.bind(this);
    checkPatron = checkPatron.bind(this);
    //setArticleList = setArticleList.bind(this);
    langSet = langSet.bind(this);
    userLogout = userLogout.bind(this); */
    /*state = {
      //characters: new PlayerChars(),
      playerRegion: "us",
      //client_id: "1be64387daf6494da2de568527ad82cc",
      //email: "",
      playerLoginID: "",
      playerBattleTag: "",
      accessToken: "",
      patronStatus: "Standard",
      charSnackState: false,
      charUpdateState: false,
      loginSnackState: false,
      simcSnackState: false,
      logImportSnackState: false,
      emailSnackState: false,
      emailSnackErrorState: false,
      topSet: null,
      ufSet: null,
      articleList: [],
    };
  }*/

  const setTopResult = (set: TopGearResult) => {
    setTopSet(set);
  };

  
  const setUFResult = (set: any) => {
    setUpgradeFinderSet(set);
  };

  /* -------------------------------------------------------------------------- */
  /*                             Snack Bar Handlers                             */
  /* -------------------------------------------------------------------------- */

  /* ----------------------------- Character Added ---------------------------- */

  
  const handleCharSnackOpen = () => {
    setCharSnackState(true);

  };
  const handleCharSnackClose = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setCharSnackState(false);
  };

  /* ---------------------------- Character Updated --------------------------- */
  const handleCharUpdateSnackOpen = () => {
    setCharUpdateState(true);
  };
  const handleCharUpdateSnackClose = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setCharUpdateState(false);
  };

  /* ---------------------------------- Login --------------------------------- */
  const handleLoginSnackOpen = () => {
    setLoginSnackState(true);
  };
  const handleLoginClose = (event : any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setLogImportSnackState(false);

  };

  /* ------------------------------- SimC Added ------------------------------- */
  const handleSimCSnackOpen = () => {
    setSimcSnackState(true);
  };
  const handleSimCSnackClose = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSimcSnackState(false);
  };

  /* ---------------------------- Log Import Snack ---------------------------- */
  const handleLogSnackOpen = () => {
    setLogImportSnackState(true);
  };
  const handleLogSnackClose = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setLogImportSnackState(false);
  };

  /* ---------------------------- Log Import Snack ---------------------------- */
  const handleEmailSnackOpen = () => {
    setEmailSnackState(true);
  };
  const handleEmailSnackClose = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setEmailSnackState(false);
  };

  /* ---------------------------- Log Import Snack ---------------------------- */
  const handleEmailErrorSnackOpen = () => {
    setEmailSnackErrorState(true);
  };
  const handleEmailErrorSnackClose = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setEmailSnackErrorState(false);
  };

  /* -------------------------------------------------------------------------- 
  /*                              Function Handlers                             
  /* -------------------------------------------------------------------------- 

  /* ---------------------------- Language Handler ---------------------------- */
  const updateLang = (newLang: string) => {
    setLang(newLang)
    ls.set("lang", newLang);
  };

  const updatePlayerChars = (allChars: PlayerChars): void => {
    setCharacters({ ...allChars });
  };

  /* -------------------- Update Character Information Handler ------------------- */
  const updatePlayerChar = (player: Player) => {
    let allChars = characters;
    allChars.updatePlayerChar(player);
    setCharacters(allChars);
    allChars.saveAllChar();
    
    
  };

    /* -------------------------- Patron Status Handler ------------------------- */
  const updatePatron = (status: string) => {
    setPatronStatus(status);

    //dispatch(togglePatronStatus(response)); // TODO: Check the response is good.
  };

  /* ------------------ Checks Patron Status from Users Email ----------------- */
  const checkPatron = (email: string) => {
    if (email) {
      dbCheckPatron(email, setPatronStatus);
    }
  };


  /* ------------------- Get Article List ------------------------------------- */
  const getArticleList = () => {
    //dbGetArticleList(setArticleList);
  };

  /* -------------- Sets the Users Email to state & Local Storage ------------- */
  const updateEmail = (emailAdd: string) => {
    //setState({ email: emailAdd });
    setEmail(emailAdd);
    ls.set("email", emailAdd);
    checkPatron(emailAdd);
  };



  /* ---------------------------- Delete Character ---------------------------- */
  const deletePlayerChar = (unique: string) => {
    let allChars = characters;
    allChars.delSpecificChar(unique);
    setCharacters(allChars);
    allChars.saveAllChar();
  };


  /* ---------------------------- Battletag Handler --------------------------- */
  const updatePlayerID = (id: string, battletag: string) => {

    setPlayerLoginID(id);
    setPlayerBattleTag(battletag);

    ls.set("id", id);
    ls.set("btag", battletag);
  };

  /* ----------------------------- Logout Handler ----------------------------- */
  const userLogout = () => {
    // Do other stuff later.

    setPlayerLoginID("");
    setPlayerBattleTag("");

    ls.remove("id");
    ls.remove("btag");
  }

  /* ---------------------------- Login URL Handler --------------------------- */
  const buildLoginURL = () => {
    // China is a little different from the other regions and uses its own URL.
    if (playerRegion === "cn") {
      return "https://www.battlenet.com.cn/oauth/authorize?client_id=" + client_id + "&redirect_uri=http://questionablyepic.com/live/confirmlogin/&response_type=code&scope=openid";
    }
    return (
      "https://" +
      playerRegion +
      ".battle.net/oauth/authorize?client_id=" +
      client_id +
      "&redirect_uri=http://questionablyepic.com/live/confirmlogin/&response_type=code&scope=openid"
    );
  };

  // When component mounts, check local storage for battle tag or ID
  useEffect(() => {

    //characters.setupChars(); // Do any post-mount processing like Disc ramps, player pictures etc. 
    if (ls.get("lang") === "undefined" || ls.get("lang") === undefined || ls.get("lang") === null) {
      ls.set("lang", "en");
    }
    console.log("QE Live Initialised");
    /*
    setState({
      playerLoginID: ls.get("id") || "",
      playerBattleTag: ls.get("btag") || "",
      lang: ls.get("lang") || "en",
      email: ls.get("email") || "",
    }); */
    checkPatron(ls.get("email"));
    getArticleList();
  }, [])

  let activePlayer = characters.getActiveChar();
  let allChars = characters;

  const vertical = "bottom";
  const horizontal = "left";
 
  return (
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Router basename={process.env.REACT_APP_HOMEPAGE}>
              <div className={`App ${isPTR ? 'special-bg' : 'default-bg'}`}
              // style={{ marginTop: 96 }}
              >
                <QEHeader
                  logFunc={userLogout}
                  patronStatus={patronStatus}
                  playerTag={playerBattleTag}
                  setRegion={setPlayerRegion}
                  player={activePlayer}
                  simcSnack={handleSimCSnackOpen}
                  logImportSnack={handleLogSnackOpen}
                  allChars={allChars}
                  isPTR={isPTR}
                />

                {/* --------------------------- Char Added Snackbar -------------------------- */}
                <QESnackbar open={charSnackState} onClose={handleCharSnackClose} severity="success" message="Snackbars.CharAddSuccess" />
                {/* -------------------------- Char Updated Snackbar ------------------------- */}
                <QESnackbar open={charUpdateState} onClose={handleCharUpdateSnackClose} severity="success" message="Snackbars.CharUpdateSuccess" />
                {/* ------------------------- Login Success Snackbar ------------------------- */}
                <QESnackbar open={loginSnackState} onClose={handleLoginClose} severity="success" message="Snackbars.LoginSuccess" />
                {/* -------------------------- SimC Success Snackbar ------------------------- */}
                <QESnackbar open={simcSnackState} onClose={handleSimCSnackClose} severity="success" anchorOrigin={{ vertical, horizontal }} message="Snackbars.SimCImportSuccess" />
                {/* ----------------------- Log Import Success Snackbar ---------------------- */}
                <QESnackbar open={logImportSnackState} onClose={handleLogSnackClose} severity="success" message="Snackbars.LogImportSuccess" />
                {/* ---------------------- Email Import Success Snackbar --------------------- */}
                <QESnackbar open={emailSnackState} onClose={handleEmailSnackClose} severity="success" message="Snackbars.EmailUpdateSuccess" />
                {/* ------------------- Email Error Import Success Snackbar ------------------ */}
                <QESnackbar open={emailSnackErrorState} onClose={handleEmailErrorSnackClose} severity="error" message="Snackbars.EmailError" />

                {/* -------------------------------------------------------------------------- */
                /*                               Module Routing                               */
                /* -------------------------------------------------------------------------- */}
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <QEMainMenu
                        allChars={allChars}
                        charUpdate={updatePlayerChars}
                        singleUpdate={updatePlayerChar}
                        player={activePlayer}
                        charAddedSnack={handleCharSnackOpen}
                        charUpdatedSnack={handleCharUpdateSnackOpen}
                        patronStatus={patronStatus}
                        delChar={deletePlayerChar}
                        articleList={articleList}
                      />
                    )}
                  />
                  <Route path="/sequenceGen" render={() => <SequenceGen player={activePlayer} />} />


                  <CustomRoute 
                    player={activePlayer} 
                    path="/quickcompare" 
                    render={() => (
                      <QuickCompare player={activePlayer} allChars={allChars} simcSnack={handleSimCSnackOpen} singleUpdate={updatePlayerChar} patronStatus={patronStatus} />
                      )} />

                  <CustomRoute 
                    player={activePlayer} 
                    path="/upgradefinder/" 
                    render={() => 
                      <UpgradeFinderFront 
                        player={activePlayer} 
                        setUFResult={setUFResult} 
                        simcSnack={handleSimCSnackOpen} 
                        allChars={allChars} 
                        singleUpdate={updatePlayerChar} 
                        />} 
                  />

                  <CustomRoute
                    path="/topgear"
                    player={activePlayer}
                    render={() => (
                      <TopGear
                        player={activePlayer}
                        setTopResult={setTopResult}
                        allChars={allChars}
                        simcSnack={handleSimCSnackOpen}
                        singleUpdate={updatePlayerChar}
                        patronStatus={patronStatus}
                      />
                    )}
                  />
                  <CustomRoute
                    path="/trinkets"
                    player={activePlayer}
                    render={() => (
                      <TrinketAnalysis
                        player={activePlayer}
                        updatePlayerChar={updatePlayerChar}
                        singleUpdate={updatePlayerChar}
                        allChars={allChars}
                        simcSnack={handleSimCSnackOpen}
                        patronStatus={patronStatus}
                      />
                    )}
                  />
                  <CustomRoute
                    path="/embellishments"
                    player={activePlayer}
                    render={() => (
                      <EmbellishmentAnalysis
                        player={activePlayer}
                        updatePlayerChar={updatePlayerChar}
                        singleUpdate={updatePlayerChar}
                        allChars={allChars}
                        simcSnack={handleSimCSnackOpen}
                        patronStatus={patronStatus}
                      />
                    )}
                  />
                  <CustomRoute
                    path="/circlet"
                    player={activePlayer}
                    render={() => (
                      <CircletAnalysis
                        player={activePlayer}
                        updatePlayerChar={updatePlayerChar}
                        singleUpdate={updatePlayerChar}
                        allChars={allChars}
                        simcSnack={handleSimCSnackOpen}
                        patronStatus={patronStatus}
                      />
                    )}
                  />
                  
                  <ReportRoute 
                    report={topSet} 
                    player={activePlayer}
                    path="/report" 
                    render={() => <TopGearReport player={activePlayer || null} result={topSet || null} />} />
                  <Route 
                    path="/upgradereport" 
                    render={() => 
                        <UpgradeFinderReport 
                          player={activePlayer || null} 
                          result={upgradeFinderSet || null} />} 
                          />
                  <Route path="/login" render={() => <QELogin setRegion={this.setRegion} />} />
                  <Route path="/attemptlogin" component={() => (window.location = this.buildLoginURL())} />
                  <Route path="/confirmlogin/" render={() => <ConfirmLogin loginSnackOpen={this.handleLoginSnackOpen} updatePlayerID={this.updatePlayerID} />} />


                  {/* ---------------------------------------------------------------------------------------------- */
                  /*                                         Classic Routes                                          */
                  /* ----------------------------------------------------------------------------------------------  */}
                  <Route path="/TierSets/" render={() => <TierSets player={activePlayer} />} />
                  <Route
                    path="/profile/"
                    render={() => (
                      <QEProfile
                        setEmail={updateEmail}
                        playerTag={playerBattleTag}
                        patronStatus={patronStatus}
                        emailSnack={handleEmailSnackOpen}
                        emailSnackError={handleEmailErrorSnackOpen}
                      />
                    )}
                  />
                  <Route render={() => <Redirect to={{pathname: "/"}} />} />
                </Switch>
              </div>
            </Router>
          </ThemeProvider>
        </StyledEngineProvider>

  );
}

export default withTranslation()(App);


