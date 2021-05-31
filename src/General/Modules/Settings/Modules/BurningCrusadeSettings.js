import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, Grid, FormControl, Select, Typography, Divider, TextField, Tooltip } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { setBounds } from "../../../Engine/CONSTRAINTS";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

const menuStyle = {
  style: { marginTop: 5 },
  MenuListProps: {
    style: { paddingTop: 0, paddingBottom: 0 },
  },
  PaperProps: {
    style: {
      border: "1px solid rgba(255, 255, 255, 0.23)",
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  getContentAnchorEl: null,
};

export default function BurningCrusadeSettings(props) {
  const { t } = useTranslation();
  // const playerSpec = props.player.getSpec();

  /* ------------------------------------------ Setting 0 ----------------------------------------- */
  const [manaProfile, setManaProfile] = useState("Standard");
  /* ------------------------------------------ Setting 1 ----------------------------------------- */
  const [raidBuffs, setRaidBuffs] = useState(false);
  /* ------------------------------------------ Setting 2 ----------------------------------------- */
  const [metaGem, setMetaGem] = useState("Bracing Earthstorm Diamond");
  /* ------------------------------------------ Setting 3 ----------------------------------------- */
  const [autoEnchantItems, setAutoEnchantItems] = useState(true);
  /* ------------------------------------------ Setting 4 ----------------------------------------- */
  const [gemRarity, setGemRarity] = useState("Rare");
  /* ------------------------------------------ Setting 5 ----------------------------------------- */
  const [settingValue5, setSettingValue5] = useState("");

  /* -------------------------------------- Auto-Socket State ------------------------------------- */
  const [autoSocketValue, setAutoSocketValue] = useState(props.userSettings.autoSocket);

  const updateManaProfile = (value) => {
    props.editSettings("manaProfile", value);
    setManaProfile(value);
  };
  const updateRaidBuffs = (value) => {
    props.editSettings("raidBuffs", value);
    setRaidBuffs(value);
  };
  const updateMetaGem = (value) => {
    props.editSettings("metaGem", value);
    setMetaGem(value);
  };
  const updateAutoEnchantItems = (value) => {
    props.editSettings("autoEnchant", value);
    setAutoEnchantItems(value);

  };
  const updateGemRarity = (value) => {
    props.editSettings("gemRarity", value);
    setGemRarity(value);
  };
  const updateSetting5 = (value) => {
    setSettingValue5();
  };

  // const options = [
  //   { value: true, label: "Yes" },
  //   { value: false, label: "No" },
  // ];

  /* ----------------------------------------- Free State ----------------------------------------- */
  // const [value3, setValue3] = useState(5);
  /* ----------------------------------------- Free State ----------------------------------------- */
  // const [value4, setValue4] = useState(5);
  /* ----------------------------------------- Free State ----------------------------------------- */
  // const [value5, setValue5] = useState(5);

  return (
    <Grid container spacing={1} direction="row">
      {/* ---------------------------------------------------------------------------------------------- */
      /*                                            Setting 0                                            */
      /* ---------------------------------------------------------------------------------------------- */}
      <Grid item xs={12} sm={4} md={4} lg={3} xl={2}>
        <Grid container spacing={0} style={{ padding: "0px 8px" }}>
          <Grid item xs={12}>
            <div style={{ display: "inline-flex" }}>
              <Typography color="primary" style={{ marginRight: 4 }} noWrap>
                {t("Settings.BurningCrusade.Setting0Title")}
              </Typography>
              <Tooltip title={t("Settings.BurningCrusade.Setting0Tooltip")} placement="top-start">
                <InfoOutlinedIcon style={{ height: 15, width: 15 }} fontSize="small" />
              </Tooltip>
            </div>
          </Grid>
          <Grid item xs={12}>
          <FormControl variant="outlined" size="small" fullWidth>
              <Select labelId="slots" value={manaProfile} onChange={(e) => updateManaProfile(e.target.value)} MenuProps={menuStyle}>
                <MenuItem id="spiritShell" value={"Max Healing"} style={{ justifyContent: "center" }}>
                  {"Max Healing"}
                </MenuItem>
                <MenuItem id="evangelism" value={"Standard"} style={{ justifyContent: "center" }}>
                  {"Standard"}
                </MenuItem>
                <MenuItem id="evangelism" value={"Conservative"} style={{ justifyContent: "center" }}>
                  {"Conservative"}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      {/*<Divider orientation="vertical" flexItem /> */ }
      {/* ---------------------------------------------------------------------------------------------- */
      /*                                            Setting 1                                            */
      /* ---------------------------------------------------------------------------------------------- */}
      <Grid item xs={12} sm={4} md={4} lg={3} xl={2}>
        <Grid container spacing={0} style={{ padding: "0px 8px" }}>
          <Grid item xs={12}>
            <div style={{ display: "inline-flex" }}>
              <Typography color="primary" style={{ marginRight: 4 }} noWrap>
                {t("Settings.BurningCrusade.Setting1Title")}
              </Typography>
              <Tooltip title={t("Settings.BurningCrusade.Setting1Tooltip")} placement="top-start">
                <InfoOutlinedIcon style={{ height: 15, width: 15 }} fontSize="small" />
              </Tooltip>
            </div>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" size="small" fullWidth style={{ textAlign: "center" }}>
              <Select labelId="groupValue" value={raidBuffs} onChange={(e) => updateRaidBuffs(e.target.value)} MenuProps={menuStyle}>
                <MenuItem value={true} style={{ justifyContent: "center" }}>
                  {t("Yes")}
                </MenuItem>
                <MenuItem value={false} style={{ justifyContent: "center" }}>
                  {t("No")}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      {/*<Divider orientation="vertical" flexItem /> */ }
      {/* ---------------------------------------------------------------------------------------------- */
      /*                                            Setting 2                                            */
      /* ---------------------------------------------------------------------------------------------- */}
      <Grid item xs={12} sm={4} md={4} lg={3} xl={2}>
        <Grid container spacing={0} style={{ padding: "0px 8px" }}>
          <Grid item xs={12}>
            <div style={{ display: "inline-flex" }}>
              <Typography color="primary" style={{ marginRight: 4 }} noWrap>
                {t("Settings.BurningCrusade.Setting2Title")}
              </Typography>
              <Tooltip title={t("Settings.BurningCrusade.Setting2Tooltip")} placement="top-start">
                <InfoOutlinedIcon style={{ height: 15, width: 15 }} fontSize="small" />
              </Tooltip>
            </div>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" size="small" fullWidth>
              <Select labelId="slots" value={metaGem} onChange={(e) => updateMetaGem(e.target.value)} MenuProps={menuStyle}>
                <MenuItem id="spiritShell" value={"Bracing Earthstorm Diamond"} style={{ justifyContent: "center" }}>
                  {"Bracing Earthstorm Diamond"}
                </MenuItem>
                <MenuItem id="evangelism" value={"Insightful Earthstorm Diamond"} style={{ justifyContent: "center" }}>
                  {"Insightful Earthstorm Diamond"}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      {/*<Divider orientation="vertical" flexItem /> */ }
      {/* ---------------------------------------------------------------------------------------------- */
      /*                                            Setting 3                                            */
      /* ---------------------------------------------------------------------------------------------- */}
      <Grid item xs={12} sm={4} md={4} lg={3} xl={2}>
        <Grid container spacing={0} style={{ padding: "0px 8px" }}>
          <Grid item xs={12}>
            <div style={{ display: "inline-flex" }}>
              <Typography color="primary" style={{ marginRight: 4 }} noWrap>
                {t("Settings.BurningCrusade.Setting3Title")}
              </Typography>
              <Tooltip title={t("Settings.BurningCrusade.Setting3Tooltip")} placement="top-start">
                <InfoOutlinedIcon style={{ height: 15, width: 15 }} fontSize="small" />
              </Tooltip>
            </div>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" size="small" fullWidth style={{ textAlign: "center" }}>
              <Select labelId="groupValue" value={autoEnchantItems} onChange={(e) => updateAutoEnchantItems(e.target.value)} MenuProps={menuStyle}>
                <MenuItem value={true} style={{ justifyContent: "center" }}>
                  {"Yes"}
                </MenuItem>
                <MenuItem value={false} style={{ justifyContent: "center" }}>
                  {"No"}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      {/*<Divider orientation="vertical" flexItem /> */ }
      {/* ---------------------------------------------------------------------------------------------- */
      /*                                            Setting 4                                           */
      /* ---------------------------------------------------------------------------------------------- */}
      <Grid item xs={12} sm={4} md={4} lg={3} xl={2}>
        <Grid container spacing={0} style={{ padding: "0px 8px" }}>
          <Grid item xs={12}>
          <div style={{ display: "inline-flex" }}>
            <Tooltip title={t("Settings.BurningCrusade.Setting4Tooltip")} placement="top-start">
              <Typography color="primary">{t("Settings.BurningCrusade.Setting4Title")}</Typography>
            </Tooltip>
            <Tooltip title={t("Settings.BurningCrusade.Setting4Tooltip")} placement="top-start">
                <InfoOutlinedIcon style={{ height: 15, width: 15 }} fontSize="small" />
              </Tooltip>
          </div>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" size="small" fullWidth style={{ textAlign: "center" }}>
                <Select labelId="groupValue" value={gemRarity} onChange={(e) => updateGemRarity(e.target.value)} MenuProps={menuStyle}>
                  <MenuItem value={"Rare"} style={{ justifyContent: "center" }}>
                    {"Rare (Blue)"}
                  </MenuItem>
                  <MenuItem value={"Epic"} style={{ justifyContent: "center" }}>
                    {"Epic (Purple)"}
                  </MenuItem>
                </Select>
              </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Divider orientation="vertical" flexItem />
      {/* ---------------------------------------------------------------------------------------------- */
      /*                                            Setting 5                                            */
      /* ---------------------------------------------------------------------------------------------- */}

      {/*}
      <Grid item xs={12} sm={4} md={4} lg={3} xl={2}>
        <Grid container spacing={1} style={{ paddingLeft: 8 }}>
          <Grid item xs={12}>
            <Tooltip title={t("Settings.BurningCrusade.Setting5Tooltip")} placement="top-start">
              <Typography color="primary">{t("Settings.BurningCrusade.Setting5Title")}</Typography>
            </Tooltip>
            <Tooltip title={t("Settings.BurningCrusade.Setting5Tooltip")} placement="top-start">
                <InfoOutlinedIcon style={{ height: 15, width: 15 }} fontSize="small" />
              </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="AlliesNumber"
              value={settingValue5}
              onChange={(e) => setSettingValue5(e.target.value)}
              variant="outlined"
              size="small"
              type="number"
            />
          </Grid>
        </Grid>
      </Grid>*/}
      </Grid> 
  );
}
