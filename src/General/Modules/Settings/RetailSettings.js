import React, { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { MenuItem, Grid, Typography, TextField, Tooltip, FormControl, InputLabel } from "@mui/material";
import { useTranslation } from "react-i18next";
import { setBounds } from "General/Engine/CONSTRAINTS";

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
  const gameType = useSelector((state) => state.gameType);

  const dispatch = useDispatch();

  const categories = gameType === "Retail" ? ["trinkets", "embellishments", "topGear", "upgradeFinder"] : ["topGear"];

  //const settingsCategories = [...new Set(playerSettings.map(o => o.category))];
  /* ---------------------------------------------------------------------------------------------- */
  /*                                             States                                             */
  /* ---------------------------------------------------------------------------------------------- */

  /* ----------------------------------- Paladin Playstyle State ---------------------------------- */
  const [specBuild, setSpecBuild] = useState(props.player.activeModelID[props.contentType]);

  const specBuilds = props.player.getAllModels(props.contentType);

  const updateValue = (setting, value) => {
    const newPlayerSettings = { ...playerSettings };
    newPlayerSettings[setting]["value"] = value;
    dispatch(togglePlayerSettings(newPlayerSettings));
  };

  const updateSpecBuild = (value) => {
    props.player.setModelID(parseInt(value), props.contentType);
    setSpecBuild(value);
    props.singleUpdate(props.player);
  };

  const mapByCategory = (data, gameType) => {
    // Initialize an empty object to store the result
    const result = {};

    // Iterate over the keys in the data object
    for (const key in data) {
      // Extract the category from the current key's object
      const { category } = data[key];

      // If the category doesn't exist in the result object yet, create an empty array for it
      if (!result[category]) {
        result[category] = [];
      }

      // Push the current key into the array corresponding to its category in the result object
      console.log(data[key].gameType, gameType)
      if (data[key].gameType === gameType) result[category].push(key);
      
    }

    // Return the result object with keys grouped by category
    return result;
  };

  // map the playerSettings into categories for mapping
  const mappedKeys = mapByCategory(playerSettings, gameType);

  return (
    <Grid container spacing={1} direction="row">
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

      {categories.map((category) => {
        return (
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
                  {t("Settings.Retail." + category)}
                </Typography>
              </Grid>
              {mappedKeys[category].map((key, i) => {
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

                      {playerSettings[key].type === "selector" ? (
                        <TextField
                          className={classes.select}
                          InputProps={{ variant: "outlined" }}
                          select
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={playerSettings[key]["value"]}
                          onChange={(e) => updateValue(key, e.target.value)}
                          label={t("Settings.Retail." + key + ".title")}
                          style={{ textAlign: "center", minWidth: 160 }}
                        >
                          {playerSettings[key]["options"].map((option, i) => {
                            return (
                              <MenuItem divider value={option} style={{ justifyContent: "center" }}>
                                {option.toString()}
                              </MenuItem>
                            );
                          })}
                        </TextField>
                      ) : (
                        <TextField
                          className={classes.select}
                          InputProps={{ variant: "outlined", inputProps: {
                            style: { textAlign: "center" },
                          } }}
                          variant="outlined"
                          size="small"
                          fullWidth
                          type="number"
                          value={playerSettings[key]["value"]}
                          onChange={(e) => updateValue(key, e.target.value)}
                          label={t("Settings.Retail." + key + ".title")}
                          style={{ textAlign: "center", minWidth: 120, maxWidth: 160 }}
                        />
                      )}

                    </Tooltip>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}
