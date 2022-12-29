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

  const playerSettings = useSelector((state) => state.playerSettings);

  const dispatch = useDispatch();

  //const settingsCategories = [...new Set(playerSettings.map(o => o.category))];

  /* ---------------------------------------------------------------------------------------------- */
  /*                                             States                                             */
  /* ---------------------------------------------------------------------------------------------- */

  /* ----------------------------------- Paladin Playstyle State ---------------------------------- */
  const [specBuild, setSpecBuild] = useState(props.player.activeModelID[props.contentType]);


  const specBuilds = props.player.getAllModels(props.contentType);

  const updateValue = (setting, value) => {
    const newPlayerSettings = {...playerSettings}
    newPlayerSettings[setting]['value'] = value;
    dispatch(togglePlayerSettings(newPlayerSettings));
  }


  const updateSpecBuild = (value) => {
    //props.editSettings("vaultDomGem", value)
    props.player.setModelID(parseInt(value), props.contentType);
    setSpecBuild(value);
    props.singleUpdate(props.player);
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

      {Object.keys(playerSettings).map((key, i) => {
        return (
          <Grid item xs={12} sm={4} md={4} lg={3} xl={"auto"}>
          <Tooltip
            title={
              <Typography align="center" variant="body2">
                {t("Settings.Retail." + key + ".tooltip")}
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
              value={playerSettings[key]['value']}
              onChange={(e) => updateValue(key, e.target.value)}
              label={t("Settings.Retail." + key + ".title")}
              style={{ textAlign: "center", minWidth: 120 }}
            >
              {playerSettings[key]['options'].map((option, i) => {
                return (
                  <MenuItem divider value={option} style={{ justifyContent: "center" }}>
                    {t(option.toString())}
                  </MenuItem>
                )
              })}
            </TextField>
          </Tooltip>
        </Grid>
        )

      })}
    </Grid>
  );
}
