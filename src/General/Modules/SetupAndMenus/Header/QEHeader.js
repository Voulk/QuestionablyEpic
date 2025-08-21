import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tooltip,
  Grid,
  Drawer,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "Images/QeAssets/QELogo.png";
import "../QEMainMenu.css";
import LanguageSelector from "./LanguageButton";
import ProfileSelector from "./ProfileButton";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SimCraftInput from "../SimCraftDialog";
import QELogImport from "./QELogImport";
import makeStyles from "@mui/styles/makeStyles";
import CharacterHeaderButton from "./CharacterHeader";
import ContentSwitch from "./ContentToggle";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { patronColor } from "./PatronColors";
import { styled } from "@mui/system";
import HeaderClassSelect from "./QEHeaderClassSelector";

// import ReactGA from "react-ga";n

const StyledButton = styled(Button)(({ theme }) => ({
  color: "white",
  border: "1px solid #ffffff3b",
  "&:hover": {
    color: "white",
    border: "1px solid #ffffff3b",
    backgroundColor: "rgb(255, 255, 255, 0.08)",
  },
}));

const useStyles = makeStyles((theme) => ({
  qeLogo: {
    [theme.breakpoints.down("xl")]: {
      marginTop: "5px",
      marginBottom: "-5px",
    },
  },
  headerButtons: {
    [theme.breakpoints.down("lg")]: {
      marginBottom: "5px",
    },
  },
  headerMargins: {
    [theme.breakpoints.down("lg")]: {
      marginLeft: "4%",
      marginRight: "4%",
      minHeight: 56,
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: "8%",
      marginRight: "8%",
      minHeight: 56,
    },
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

export default function QEHeader(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const gameType = useSelector((state) => state.gameType);
  const bgColor = props.isPTR ? "#000065" : "#353535"; // Not functional yet.
  //const hasAccount = props.pl && props.allChar;
  //const patronStatus = useSelector((state) => state.patronStatus);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const drawerWidth = 240;

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // If the player isn't logged in, then show a login button and redirect to the login page on click.
  // If the player IS logged in, show their battle tag and redirect to profile on click.
  // TODO: Implement profile.
  let playerName = props.playerTag || t("QeHeader.Login");
  let linkTarget = props.playerTag === "" ? "/login" : "/profile";
  let patronStatus =
    props.patronStatus !== "" && props.patronStatus !== "Basic"
      ? props.patronStatus
      : "Standard";

// creates a drawer for the settings on mobile to prevent page bloat
  const drawer = (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
      wrap={matches && gameType === "Retail" ? "wrap" : "nowrap"}
      style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 2 }}
    >
      <Grid item xs={6} sm="auto">
        <HeaderClassSelect
          gameType={gameType}
          selectedSpec={props.allChars.allChar[props.allChars.activeChar].spec}
          setSelectedSpec={props.handlePickPlayerSpec}
        />
      </Grid>
      {/*(props.allChars && props.allChars.allChar.length) > 0 ? (
                  <Grid item xs={gameType === "Retail" ? 6 : "auto"} sm="auto">
                    <CharacterHeaderButton player={props.pl} allChars={props.allChars} />
                  </Grid>
                ) : (
                  ""
                )*/}
      {gameType === "Retail" ? (
        <Grid item xs={6} sm="auto">
          <ContentSwitch />
        </Grid>
      ) : (
        ""
      )}
      {gameType === "Retail" ? (
        <Grid item>
          <QELogImport
            logImportSnack={props.logImportSnack}
            player={props.player}
            allChars={props.allChars}
          />
        </Grid>
      ) : (
        ""
      )}
      <Grid item>
        <SimCraftInput
          colour="secondary"
          variant="contained"
          buttonLabel={t("SimCInput.SimCHeaderButtonLabel" + gameType)}
          player={props.player}
          simcSnack={props.simcSnack}
          allChars={props.allChars}
        />
      </Grid>
      <Grid item>
        <StyledButton
          color={"secondary"}
          variant="contained"
          onClick={() =>
            window.open(
              "https://www.wowhead.com/guide/how-to-use-qe-live-tool-guide",
              "_blank"
            )
          }
        >
          {"Help"}
        </StyledButton>
      </Grid>
      {/*<Grid item>
                  <ProfileSelector name={playerName} component={Link} to={linkTarget} logFunc={props.logFunc} setRegion={props.setRegion} />
                </Grid> */}
      <Grid item>
        <LanguageSelector />
      </Grid>
    </Grid>
  );

  // box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  return (
    <div style={{}}>
      <AppBar position="fixed" color="inherit">
        <Toolbar className={classes.headerMargins}>
          <Grid
            container
            direction="row"
            spacing={0}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4} align="center">
              {/* ---------------------------------------------------------------------------------------------- */
              /*                                         Logo Container                                          */
              /* ----------------------------------------------------------------------------------------------  */}
              <Grid container direction="row" alignItems="center" >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl="auto"
                  align="center"
                >
                  <Grid container direction={{xs: 'column', md: 'row'}} alignItems="center">
                    <Grid item xs={6} sm={12} md={12} lg={12} xl="auto">
                      <Link to={"/"}>
                        <Tooltip title={t("QeHeader.Tooltip.Home")} arrow>
                          <img
                            className={classes.qeLogo}
                            src={logo}
                            alt="QE Live"
                          />
                        </Tooltip>
                      </Link>
                    </Grid>
                    <Grid item xs={6} sm={12} md={12} lg={12} xl="auto">
                      <Typography
                        style={{
                          color: patronColor[patronStatus],
                          paddingLeft: 10,
                          paddingRight: 10,
                        }}
                        variant="body1"
                        align="center"
                        noWrap
                      >
                        {patronStatus + " Edition"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {true ? (
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={8}
                xl={6}
                align="center"
                className={classes.headerButtons}
              >
                <IconButton
                  color="inherit"
                  width="100%"
                  
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{display: { sm: "none" }, margin: "auto" }}
                >
                  <MenuIcon />
                </IconButton>
                {/* ---------------------------------------------------------------------------------------------- */
                /*                                     Menu Buttons Container                                      */
                /* ----------------------------------------------------------------------------------------------  */}
                <Drawer
                  variant="temporary"
                  anchor="top"
                  open={mobileOpen}
                  onTransitionEnd={handleDrawerTransitionEnd}
                  onClose={handleDrawerClose}
                  sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                      boxSizing: "border-box",
                      width: "100%",
                      py: 2,
                    },
                  }}
                  slotProps={{
                    root: {
                      keepMounted: true, // Better open performance on mobile.
                    },
                  }}
                >
                  {drawer}
                </Drawer>
                {/* Desktop uses the drawer, but it's always visible like in original design*/}
                <Grid
                  anchor="top"
                  sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                      boxSizing: "border-box",
                      width: "100%",
                    },
                  }}
                >
                  {drawer}
                </Grid>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
