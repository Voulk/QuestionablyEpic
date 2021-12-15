import React, { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { MenuItem, Grid, Typography, TextField, Tooltip,  } from "@mui/material";
import { useTranslation } from "react-i18next";


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

  /* ---------------------------------------------------------------------------------------------- */
  /*                                             States                                             */
  /* ---------------------------------------------------------------------------------------------- */

  // TODO: Delete hymnal?
  /* ---------------------------------------- Hymnal State ---------------------------------------- */
  // const [hymnalValue, setHymnalValue] = useState(props.userSettings.hymnalAllies);

  /* -------------------------------------- Group Value State ------------------------------------- */
  const [groupValue, setgroupValue] = useState(props.userSettings.includeGroupBenefits);

  /* ----------------------------------- Paladin Playstyle State ---------------------------------- */
  const [specBuild, setSpecBuild] = useState(props.player.activeModelID[props.contentType]);

  /* -------------------------------------- Auto-Socket State ------------------------------------- */
  const [autoSocketValue, setAutoSocketValue] = useState(props.userSettings.autoSocket);

  /* ----------------------------------- Domination Socket State ---------------------------------- */
  const [replaceDomGems, setReplaceDomGems] = useState(props.userSettings.replaceDomGems);

  const specBuilds = props.player.getAllModels(props.contentType);

  // TODO: Delete hymnal?
  // const updateHymnal = (value) => {
  //   props.editSettings("hymnalAllies", setBounds(value, 0, 4));
  //   setHymnalValue(setBounds(value, 0, 4));
  // };

  const updateGroupValue = (value) => {
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

  const updateSpecBuild = (value) => {
    //props.editSettings("vaultDomGem", value)
    props.player.setModelID(parseInt(value), props.contentType);
    setSpecBuild(value);
    props.singleUpdate(props.player);
  };

  return (
    <Grid container spacing={2} direction="row">
      {/* TODO: Delete hymnal? */}
      {/* ------------------------- Cabalist's Hymnal Item ------------------------- */}

      {/* {props.hymnalShow === true ? (
        <Grid item xs={12} sm={4} md={4} lg={3} xl={"auto"}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <div style={{ display: "inline-flex" }}>
                <Typography className={classes.heading} color="primary" noWrap>
                  {t("Settings.Retail.Setting0Title")}
                </Typography>
                <Tooltip
                  title={
                    <Typography align="center" variant="body2">
                      {t("Settings.Retail.Setting0Tooltip")}
                    </Typography>
                  }
                  placement="top-start"
                >
                  <InfoOutlinedIcon style={{ height: 15, width: 15 }} fontSize="medium" />
                </Tooltip>
              </div>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" size="small" label={t("Settings.Retail.Setting0Title")} fullWidth style={{ textAlign: "center", width: 120 }}>
                <InputLabel id="NewCovSelector">{t("Settings.Retail.Setting0Title")}</InputLabel>
                <TextField
                  id="AlliesNumber"
                  label={t("Settings.Retail.Setting0Title")}
                  value={hymnalValue}
                  onChange={(e) => updateHymnal(e.target.value)}
                  variant="outlined"
                  size="small"
                  type="number"
                  // fullWidth
                  inputProps={{
                    style: { textAlign: "center" },
                    className: classes.select,
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        ""
      )}  */}

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
      {/* --------------------------- Domination Socket for Great Vault Items --------------------------  */}
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
      </Grid>
    </Grid>
  );
}
