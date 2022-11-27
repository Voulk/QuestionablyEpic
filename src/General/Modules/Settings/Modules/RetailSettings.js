import React, { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { MenuItem, Grid, Typography, TextField, Tooltip, FormControl, InputLabel } from "@mui/material";
import { useTranslation } from "react-i18next";
import { setBounds } from "General/Engine/CONSTRAINTS"

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { togglePlayerSettings } from "Redux/Actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(14),
    marginRight: 4,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function RetailSettings(props) {
  const { t } = useTranslation();
  // const currentLanguage = i18n.language;
  const classes = useStyles();
  // const playerSpec = props.player.getSpec();

  const playerSettings = useSelector((state) => state.playerSettings);

  const dispatch = useDispatch();

  const availableSettings = {
    'groupBenefits': {value: playerSettings.groupBenefits, 'options': []},


  }
  /* ---------------------------------------------------------------------------------------------- */
  /*                                             States                                             */
  /* ---------------------------------------------------------------------------------------------- */

  // TODO: Delete hymnal?
  /* ---------------------------------------- Ignore Enchants ---------------------------------------- */
  const [enchantItems, setEnchantItems] = useState(props.userSettings.enchantItems);

  /* -------------------------------------- Group Value State ------------------------------------- */
  const [groupValue, setgroupValue] = useState(availableSettings.groupBenefits.value);
  console.log(groupValue);
  /* ----------------------------------- Paladin Playstyle State ---------------------------------- */
  const [specBuild, setSpecBuild] = useState(props.player.activeModelID[props.contentType]);

  /* -------------------------------------- Auto-Socket State ------------------------------------- */
  const [autoSocketValue, setAutoSocketValue] = useState(props.userSettings.autoSocket);

  /* ------------------------------- Upgrade Finder HPS Toggle --------------------------------- */
  const [upFinderToggle, setupFinderToggle] = useState(props.userSettings.upFinderToggle);

  /* ------------------------------- Upgrade Finder: Leech --------------------------------- */
  const [upFinderLeech, setupFinderLeech] = useState(props.userSettings.upFinderLeech);


  /* ----------------------------------- Catalyst Limit State ---------------------------------- */
  const [catalystLimit, setCatalystLimit] = useState(props.userSettings.catalystLimit);


  /* ----------------------------------- Domination Socket State ---------------------------------- */
  const [replaceDomGems, setReplaceDomGems] = useState(props.userSettings.replaceDomGems);

  const specBuilds = props.player.getAllModels(props.contentType);


  const updateEnchantItems = (value) => {
    dispatch(togglePlayerSettings(playerSettings));
    props.editSettings("enchantItems", value);
    setEnchantItems(value);
  };

  const updateGroupValue = (value) => {
    dispatch(togglePlayerSettings({...playerSettings, groupBenefit: value}));
    console.log("Post");
    console.log(playerSettings);
    props.editSettings("includeGroupBenefits", value);
    setgroupValue(value);
  };

  const updateAutoSocketValue = (value) => {
    props.editSettings("autoSocket", value);
    setAutoSocketValue(value);
  };

  const updateReplaceDomGems = (value) => {
    props.editSettings("replaceDomGems", value);
    setReplaceDomGems(value);
  };

  const updateCatalystLimit = (value) => {
    props.editSettings("catalystLimit", value);
    setCatalystLimit(value);
  };

  const updateSpecBuild = (value) => {
    //props.editSettings("vaultDomGem", value)
    props.player.setModelID(parseInt(value), props.contentType);
    setSpecBuild(value);
    props.singleUpdate(props.player);
  };

  const updateUpFinderToggle = (value) => {
    //props.editSettings("vaultDomGem", value)
    props.editSettings("upFinderToggle", value);
    setupFinderToggle(value);
  };

  const updateUpFinderLeech = (value) => {
    //props.editSettings("vaultDomGem", value)
    props.editSettings("upFinderLeech", value);
    setupFinderLeech(value);
  };

  

  return (
    <Grid container spacing={2} direction="row">

      {/* --------------------------------- Playstyle / Build Selection --------------------------------  */}
      <Grid item xs={12} sm={4} md={4} lg={3} xl={"auto"}>
        <Tooltip
          title={
            <Typography align="center" variant="body2">
              {t("Settings.Retail.Setting5Tooltip")}
            </Typography>
          }
          placement="top-start"
        >
          <TextField
            className={classes.select}
            InputProps={{ variant: "outlined" }}
            select
            variant="outlined"
            size="small"
            fullWidth
            value={props.player.activeModelID[props.contentType]}
            onChange={(e) => updateSpecBuild(e.target.value)}
            label={t("Settings.Retail.Setting5Title")}
            style={{ textAlign: "center", minWidth: 120 }}
          >
            {specBuilds.map((key, i, arr) => {
              let lastItem = i + 1 === arr.length ? false : true;
              return (
                <MenuItem divider={lastItem} key={"playstyle" + i} id={key.modelName} value={key.arrayID} style={{ justifyContent: "center" }}>
                  {key.modelName}
                </MenuItem>
              );
            })}
          </TextField>
        </Tooltip>
      </Grid>

      {/* ------------------------- Cabalist's Hymnal Item ------------------------- */}
      {props.hymnalShow === true ? (
        <Grid item xs={12} sm={4} md={4} lg={3} xl={"auto"}>
          <Tooltip
            title={
              <Typography align="center" variant="body2">
                {t("Settings.Retail.Setting0Tooltip")}
              </Typography>
            }
            placement="top-start"
          >
            <TextField
              label={t("Settings.Retail.Setting0Title")}
              value={enchantItems}
              onChange={(e) => updateEnchantItems(e.target.value)}
              InputProps={{ variant: "outlined" }}
              select
              variant="outlined"
              size="small"
              fullWidth
              style={{ textAlign: "center", minWidth: 120 }}
            >
              <MenuItem divider value={true} style={{ justifyContent: "center" }}>
                {'Yes'}
              </MenuItem>
              <MenuItem divider value={false} style={{ justifyContent: "center" }}>
                {'No'}
              </MenuItem>
            </TextField>
          </Tooltip>
        </Grid>
      ) : (
        ""
      )}

      {/* ------------------------- Group Buff (Treat Buff as Personal Throughput) ------------------------- */}
      {props.groupBuffShow === true ? (
        <Grid item xs={12} sm={4} md={4} lg={3} xl={"auto"}>
          <Tooltip
            title={
              <Typography align="center" variant="body2">
                {t("Settings.Retail.Setting1Tooltip")}
              </Typography>
            }
            placement="top-start"
          >
            <TextField
              label={t("Settings.Retail.Setting1Title")}
              value={groupValue}
              onChange={(e) => updateGroupValue(e.target.value)}
              InputProps={{ variant: "outlined" }}
              select
              variant="outlined"
              size="small"
              fullWidth
              style={{ textAlign: "center", minWidth: 120 }}
            >
              <MenuItem divider value={true} style={{ justifyContent: "center" }}>
                {t("Yes")}
              </MenuItem>
              <MenuItem value={false} style={{ justifyContent: "center" }}>
                {t("No")}
              </MenuItem>
            </TextField>
          </Tooltip>
        </Grid>
      ) : (
        ""
      )}

      {/* ----------------------------------------- Auto Socket Items ---------------------------------------- */}
      {props.autoSocket === true ? (
        <Grid item xs={12} sm={4} md={4} lg={3} xl={"auto"}>
          <Tooltip
            title={
              <Typography align="center" variant="body2">
                {t("Settings.Retail.Setting3Tooltip")}
              </Typography>
            }
            placement="top-start"
          >
            <TextField
              className={classes.select}
              value={autoSocketValue}
              InputProps={{ variant: "outlined" }}
              select
              variant="outlined"
              size="small"
              fullWidth
              onChange={(e) => updateAutoSocketValue(e.target.value)}
              label={t("Settings.Retail.Setting3Title")}
              style={{ textAlign: "center", minWidth: 120 }}
            >
              <MenuItem divider value={true} style={{ justifyContent: "center" }}>
                {t("Yes")}
              </MenuItem>
              <MenuItem value={false} style={{ justifyContent: "center" }}>
                {t("No")}
              </MenuItem>
            </TextField>
          </Tooltip>
        </Grid>
      ) : (
        ""
      )}
        {/* ------------------------------------- Upgrade Finder HPS ---------------------------------------- */}
        {props.autoSocket === true ? (
        <Grid item xs={12} sm={4} md={4} lg={3} xl={"auto"}>
          <Tooltip
            title={
              <Typography align="center" variant="body2">
                {t("Settings.Retail.Setting4Tooltip")}
              </Typography>
            }
            placement="top-start"
          >
            <TextField
              className={classes.select}
              value={upFinderToggle}
              InputProps={{ variant: "outlined" }}
              select
              variant="outlined"
              size="small"
              fullWidth
              onChange={(e) => updateUpFinderToggle(e.target.value)}
              label={t("Settings.Retail.Setting4Title")}
              style={{ textAlign: "center", minWidth: 120 }}
            >
              <MenuItem divider value={'percent'} style={{ justifyContent: "center" }}>
                {"Show % Upgrade"}
              </MenuItem>
              <MenuItem value={'hps'} style={{ justifyContent: "center" }}>
                {"Show HPS"}
              </MenuItem>
            </TextField>
          </Tooltip>
        </Grid>
      ) : (
        ""
      )}
      {/* ------------------------------------- Upgrade Finder: Leech ---------------------------------------- */}
      {props.autoSocket === true ? (
        <Grid item xs={12} sm={4} md={4} lg={3} xl={"auto"}>
          <Tooltip
            title={
              <Typography align="center" variant="body2">
                {t("Settings.Retail.Setting7Tooltip")}
              </Typography>
            }
            placement="top-start"
          >
            <TextField
              className={classes.select}
              value={upFinderLeech}
              InputProps={{ variant: "outlined" }}
              select
              variant="outlined"
              size="small"
              fullWidth
              onChange={(e) => updateUpFinderLeech(e.target.value)}
              label={t("Settings.Retail.Setting7Title")}
              style={{ textAlign: "center", minWidth: 120 }}
            >
              <MenuItem divider value={true} style={{ justifyContent: "center" }}>
                {t("Yes")}
              </MenuItem>
              <MenuItem value={false} style={{ justifyContent: "center" }}>
                {t("No")}
              </MenuItem>
            </TextField>
          </Tooltip>
        </Grid>
      ) : (
        ""
      )}
      {/* ------------------------------------- Catalyst Limit ---------------------------------------- */}
      {props.catalystLimit === true ? (
        <Grid item xs={12} sm={4} md={4} lg={3} xl={"auto"}>
          <Tooltip
            title={
              <Typography align="center" variant="body2">
                {t("Settings.Retail.Setting6Tooltip")}
              </Typography>
            }
            placement="top-start"
          >
            <TextField
              className={classes.select}
              value={catalystLimit}
              InputProps={{ variant: "outlined" }}
              select
              variant="outlined"
              size="small"
              fullWidth
              onChange={(e) => updateCatalystLimit(e.target.value)}
              label={t("Settings.Retail.Setting6Title")}
              style={{ textAlign: "center", minWidth: 120 }}
            >
              <MenuItem divider value={0} style={{ justifyContent: "center" }}>
                {'0'}
              </MenuItem>
              <MenuItem divider value={1} style={{ justifyContent: "center" }}>
                {'1'}
              </MenuItem>
              <MenuItem divider value={2} style={{ justifyContent: "center" }}>
                {'2'}
              </MenuItem>
              <MenuItem divider value={3} style={{ justifyContent: "center" }}>
                {'3'}
              </MenuItem>
              <MenuItem divider value={4} style={{ justifyContent: "center" }}>
                {'4'}
              </MenuItem>
              <MenuItem divider value={5} style={{ justifyContent: "center" }}>
                {'5'}
              </MenuItem>
            </TextField>
          </Tooltip>
        </Grid>
      ) : (
        ""
      )}
      {/* --------------------------- Domination Socket for Great Vault Items --------------------------  */}
      {/*<Grid item xs={12} sm={4} md={4} lg={3} xl={"auto"}>
        <Tooltip
          title={
            <Typography align="center" variant="body2">
              {t("Settings.Retail.Setting4Tooltip")}
            </Typography>
          }
          placement="top-start"
        >
          <TextField
            label={t("Settings.Retail.Setting4Title")}
            className={classes.select}
            key={"DominationSocket"}
            InputProps={{ variant: "outlined" }}
            select
            variant="outlined"
            size="small"
            fullWidth
            value={replaceDomGems}
            onChange={(e) => updateReplaceDomGems(e.target.value)}
            style={{ textAlign: "center", minWidth: 200 }}
          >
            <MenuItem divider value={true} style={{ justifyContent: "center" }}>
              {t("Yes")}
            </MenuItem>
            <MenuItem value={false} style={{ justifyContent: "center" }}>
              {t("No")}
            </MenuItem>
          </TextField>
        </Tooltip>
        </Grid>*/}
    </Grid>
  );
}
