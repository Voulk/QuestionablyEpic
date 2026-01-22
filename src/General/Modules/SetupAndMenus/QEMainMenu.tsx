import { useEffect, useState } from "react";
import "./QEMainMenu.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CharCards from "./CharacterModules/CharacterCards";
import AddNewChar from "./CharacterModules/CharacterCreator";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { Grid, Button, Typography, Tooltip, Divider, Box } from "@mui/material";
import MessageOfTheDay from "./MessageOftheDay";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useSelector } from "react-redux";
import * as ls from "local-storage";
import QEFooter from "./Footer/QEFooter";
import Player from "../Player/Player";
import { RootState } from "Redux/Reducers/RootReducer";
import { styled } from "@mui/system";
import GameTypeSwitch from "./GameTypeToggle";
import { trackPageView } from "Analytics";
import WelcomeDialog from "../Welcome/Welcome";
import { useDispatch } from "react-redux";
import { toggleGameType } from "Redux/Actions";
import ArticleCard from "../ArticleCards/ArcticleCard";

const Root = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    margin: "auto",
    width: "85%",
    justifyContent: "center",
    display: "block",
    marginTop: 44,
  },
  [theme.breakpoints.up("sm")]: {
    margin: "auto",
    width: "80%",
    justifyContent: "center",
    display: "block",
    marginTop: 24,
  },
  [theme.breakpoints.up("md")]: {
    margin: "auto",
    width: "65%",
    justifyContent: "center",
    display: "block",
  },
  [theme.breakpoints.up("lg")]: {
    margin: "auto",
    width: "45%",
    justifyContent: "center",
    display: "block",
  },
}));

interface Props {
  allChars: any;
  charUpdate: (allChars: any) => void;
  singleUpdate: (char: Player) => void;
  player: Player;
  charAddedSnack: () => void;
  charUpdatedSnack: () => void;
  patronStatus: string;
  delChar: (unique: string) => void;
  articleList: any[];
}

export default function QEMainMenu(props: Props) {
  useEffect(() => {
    trackPageView(window.location.pathname + window.location.search);
  }, []);

  const gameType = useSelector((state: any) => state.gameType);

  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Warning                                            */
  /*                 If a button name has to change, do it in the translation files.                */
  /*                    Consider the titles here to be ID's rather than strings                     */
  /* ---------------------------------------------------------------------------------------------- */
  // [route, show button?, tooltip]
  interface MainMenuOption {
    route: string;
    disabled: boolean;
    tooltip: string;
    type: string;
    localization: string;
    glow: boolean;
  }



  const mainMenuOptions: MainMenuOption[] =
    gameType === "Retail"
      ? [
          // Gearing
          { route: "/topgear", disabled: false, tooltip: "TopGear", type: "Gearing", localization: "MainMenu.TopGear", glow: true },
          { route: "/upgradefinder", disabled: false, tooltip: "UpgradeFinder", type: "Gearing", localization: "MainMenu.UpgradeFinder", glow: false },
          { route: "/trinkets", disabled: false, tooltip: "TrinketAnalysis", type: "Gearing", localization: "MainMenu.TrinketAnalysis", glow: false },
          { route: "/embellishments", disabled: false, tooltip: "EmbellishmentAnalysis", type: "Gearing", localization: "MainMenu.EmbellishmentAnalysis", glow: false },
          //{ route: "/circlet", disabled: false, tooltip: "CircletAnalysis", type: "Gearing", localization: "MainMenu.CyrcesCirclet", glow: false },
          //{ route: "/quickcompare", disabled: false, tooltip: "QuickCompare", type: "Gearing", order: 4, localization: "MainMenu.QuickCompare", glow: false },
          // Tools
          //{ route: "/cooldownplanner", disabled: true, tooltip: "CooldownPlanner", type: "Tools", order: 0, localization: "MainMenu.CooldownPlanner", glow: false },
          //{ route: "/oneshot", disabled: true, tooltip: "OneShot", type: "Tools", order: 1, localization: "MainMenu.OneShot", glow: false },
          //{ route: "/fightAnalysis", disabled: true, tooltip: "FightAnalysis", type: "Tools", order: 2, localization: "MainMenu.FightAnalysis", glow: false },
          { route: "/spelldata", disabled: false, tooltip: "SequenceSandbox", type: "Tools", localization: "MainMenu.SequenceSandbox", glow: false },
          { route: "/profile", disabled: false, tooltip: "Profile", type: "Tools", localization: "MainMenu.Profile", glow: false },
        ]
      : [ // Classic
          // Gearing
          { route: "/topgear", disabled: false, tooltip: "TopGear", type: "Gearing", localization: "MainMenu.TopGear", glow: true },
          { route: "/upgradefinder", disabled: true, /*props.player.spec === "Restoration Druid Classic" ? true : false*/ tooltip: "UpgradeFinder", type: "Gearing", localization: "MainMenu.UpgradeFinder", glow: false },
          { route: "/trinkets", disabled: false, tooltip: "TrinketAnalysis", type: "Gearing", localization: "MainMenu.TrinketAnalysis", glow: false },
          { route: "/TierSets", disabled: false, tooltip: "TierSets", type: "Gearing", localization: "MainMenu.TierSets", glow: false },
          //{ route: "/quickcompare", disabled: false, tooltip: "QuickCompare", type: "Gearing", localization: "MainMenu.QuickCompare", glow: false },
          { route: "/spelldata", disabled: false, tooltip: "SequenceSandbox", type: "Tools", localization: "MainMenu.SequenceSandbox", glow: false },
          // Tools
          { route: "/profile", disabled: false, tooltip: "Profile", type: "Tools", localization: "MainMenu.Profile", glow: false },
        ];

  const filterByType = (type: string) => mainMenuOptions.filter((item) => item.type === type);

  const gearItems = filterByType("Gearing");
  const toolItems = filterByType("Tools");

  const generateButtons = (items: MainMenuOption[]) =>
    items
      //.sort((a, b) => a.order - b.order)
      .map((key, index) => (
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={index}>
          <Button
            key={index}
            variant="contained"
            disabled={key.disabled || characterCount === 0}
            color="secondary"
            style={{
              width: "100%",
              height: "60px",
              // whiteSpace: "nowrap",
              // justifyContent: "left",
              paddingLeft: "20px",
              textTransform: "none",
              color: !key.disabled && characterCount > 0 ? "#F2BF59" : "#9c9c9c",
              border: key.glow ? "2px solid #F2BF59" : "",
            }}
            component={Link}
            to={key.route}
          >
            <Grid container spacing={1.5} alignItems="center">
              <Grid item xs="auto">
                <ArrowForward
                  style={{
                    verticalAlign: "middle",
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                <div style={{ display: "block", left: "10px", position: "relative" }}>
                  <div style={{ lineHeight: 1.4 }}>{t(key.localization).toUpperCase()}</div>
                  <Typography color="white.main" sx={{ fontSize: 10.5, lineHeight: 1.1 }}>
                    {t("MainMenu.Tooltips." + key.tooltip)}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Button>
        </Grid>
      ));

  const { t } = useTranslation();
  const characterCount = props.allChars.getAllChar(gameType).length;
  const characterCountAll = props.allChars.getAllChar("All").length;
  const patron = ["Diamond", "Gold", "Rolls Royce", "Sapphire"].includes(props.patronStatus);
  const [welcomeOpen, setWelcomeOpen] = useState(ls.get("welcomeMessage") === null);
  //const welcomeOpen = ls.get("welcomeMessage") === null /* && characterCountAll === 0 */ ? true : false;
  const dispatch = useDispatch();

  let articles = [];
  if (props.allChars.allChar.length > 0 && props.articleList.length > 0) {
    articles = props.articleList.filter((article) => article.specs.includes(props.player.getSpec()) || article.specs === "All");
    articles.sort((a, b) => (a.date < b.date ? 1 : -1));
    articles = articles.slice(0, 3);
  }
  const oddEven = (number: number) => {
    if (number % 2 == 0) {
      return "left";
    }
    return "right";
  };

  const finishWelcome = (selectedGameType : gameTypes, selectedSpec : string) => {
    /*
    props.allChars.pickPlayerClass(selectedGameType, selectedSpec);
    dispatch(toggleGameType(selectedGameType));
    setWelcomeOpen(false);
    ls.set("welcomeMessage", "true");
    */

    const newID = props.allChars.getCharOfClass(selectedSpec.includes("Classic") ? "Classic" : "Retail", selectedSpec);
    props.allChars.setActiveChar(newID);
    props.charUpdate(props.allChars);
    dispatch(toggleGameType(selectedGameType));
    setWelcomeOpen(false);
    ls.set("welcomeMessage", "true");

  }

  /* -------------------- Character Creation Dialog States -------------------- */
  
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  return (
    <div style={{ height: "100%" }}>
      <Root>
        <div style={{ height: 96 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <GameTypeSwitch charUpdate={props.charUpdate} allChars={props.allChars} />
      </Grid> 
          <Grid item xs={12}>
            <Button
              key={321}
              variant="contained"
              onClick={() => window.open("https://patreon.com/questionablyepic", "_blank")}
              color="secondary"
              disabled={patron}
              style={{
                width: "100%",
                height: "46px",
                whiteSpace: "nowrap",
                justifyContent: "center",
                textTransform: "none",
                paddingLeft: "32px",
                color: "#F2C160",
                backgroundColor: "#7F6738",
              }}
            >
              {patron ? t("MainMenu.PatronThanks") : t("MainMenu.PatronInvite")}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <MessageOfTheDay gameType={gameType}/>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
                <Box borderBottom={1} borderColor="divider" pb={0} mb={1}>
                  <Typography variant="h5" color="primary">
                    Gearing
                  </Typography>
                </Box>
                <Grid container spacing={1}>
                  {generateButtons(gearItems)}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Box borderBottom={1} borderColor="divider" pb={0} mb={1}>
                  <Typography variant="h5" color="primary">
                    Tools
                  </Typography>
                </Box>
                <Grid container spacing={1}>
                  {generateButtons(toolItems)}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Typography variant="h5" align="center" style={{ padding: "25px 10px 5px 10px" }} color="primary">
          {t("MainMenu.CharHeader")}
          <Tooltip title={t("MainMenu.CharHelpText")} placement="top-start">
            <InfoOutlinedIcon style={{ color: "white", marginLeft: 4 }} fontSize="small" />
          </Tooltip>
        </Typography>

        <Grid container spacing={2}>
          {props.allChars.getAllChar(gameType).length > 0
            ? props.allChars
                .getAllChar(gameType)
                .map((char: Player, index: number) => (
                  <CharCards
                    key={index}
                    name={char.charName}
                    char={char}
                    cardType="Char"
                    allChars={props.allChars}
                    charUpdate={props.charUpdate}
                    singleUpdate={props.singleUpdate}
                    isActive={char.charID === props.allChars.activeChar}
                    charUpdatedSnack={props.charUpdatedSnack}
                    delChar={props.delChar}
                  />
                ))
            : ""}
          {props.allChars.getAllChar(gameType).length < 9 ? <AddNewChar allChars={props.allChars} charUpdate={props.charUpdate} charAddedSnack={props.charAddedSnack} /> : ""}
        </Grid>

        {articles.length > 0 ? (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center" style={{ padding: "25px 10px 5px 10px" }} color="primary">
                {t("MainMenu.Articles.Header")}
                {/* TODO: Voulk to Add Help Text */}
        {/* Help Text for Articles */}
        {<Tooltip title={t("MainMenu.Articles.HelpText")} placement="top-start">
                  <InfoOutlinedIcon style={{ color: "white", marginLeft: 4 }} fontSize="small" />
                </Tooltip> }
              </Typography>
            </Grid>
            {articles.map((key, i) => (
              <ArticleCard key={i} url={key.url} title={key.title} image={key.image} date={key.date} extrainfo={key.extrainfo} />
            ))}
          </Grid>
        ) : (
          ""
        )}

        {<WelcomeDialog welcomeOpen={welcomeOpen} finishWelcome={finishWelcome} />}
      </Root>

      {/* ---------------------------------------------------------------------------------------------- */
      /*                                             Footer                                             */
      /* ----------------------------------------------------------------------------------------------  */}
      <QEFooter gameType={gameType} />
    </div>
  );
}
