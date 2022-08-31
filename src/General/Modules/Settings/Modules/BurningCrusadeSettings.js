import React, { useState } from "react";
import { MenuItem, Grid, Typography, TextField, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function BurningCrusadeSettings(props) {
  const { t } = useTranslation();

  /* ------------------------------------------ Setting 0 ----------------------------------------- */
  const [manaProfile, setManaProfile] = useState("Standard");
  /* ------------------------------------------ Setting 1 ----------------------------------------- */
  const [raidBuffs, setRaidBuffs] = useState(false);
  /* ------------------------------------------ Setting 2 ----------------------------------------- */
  const [metaGem, setMetaGem] = useState("Bracing Earthstorm Diamond");
  /* ------------------------------------------ Setting 3 ----------------------------------------- */
  const [autoEnchantItems, setAutoEnchantItems] = useState(true);
  /* ------------------------------------------ Setting 4 ----------------------------------------- */
  const [gemRarity, setGemRarity] = useState("rare");

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

  return (
    <Grid container spacing={2} direction="row">
      {/* ---------------------------------------------------------------------------------------------- */
      /*                                            Setting 0                                            */
      /* ---------------------------------------------------------------------------------------------- */}
      <Grid item xs={12} sm={4} md={4} lg={3} xl={"auto"}>
        <Tooltip
          title={
            <Typography align="center" variant="body2">
              {t("Settings.Classic.Setting0Tooltip")}
            </Typography>
          }
          placement="top-start"
        >
          <TextField
            label={t("Settings.Classic.Setting0Title")}
            labelId="slots"
            variant="outlined"
            size="small"
            InputProps={{ variant: "outlined" }}
            fullWidth
            select
            value={manaProfile}
            onChange={(e) => updateManaProfile(e.target.value)}
            style={{ textAlign: "center", minWidth: 140 }}
          >
            <MenuItem divider id="spiritShell" value={"Max Healing"} style={{ justifyContent: "center" }}>
              {"Max Healing"}
            </MenuItem>
            <MenuItem divider id="evangelism" value={"Standard"} style={{ justifyContent: "center" }}>
              {"Standard"}
            </MenuItem>
            <MenuItem id="evangelism" value={"Conservative"} style={{ justifyContent: "center" }}>
              {"Conservative"}
            </MenuItem>
          </TextField>
        </Tooltip>
      </Grid>
      {/* ---------------------------------------------------------------------------------------------- */
      /*                                            Setting 1                                            */
      /* ---------------------------------------------------------------------------------------------- */}
      <Grid item xs={12} sm={4} md={4} lg={3} xl={"auto"}>
        <Tooltip
          title={
            <Typography align="center" variant="body2">
              {t("Settings.Classic.Setting1Tooltip")}
            </Typography>
          }
          placement="top-start"
        >
          <TextField
            label={t("Settings.Classic.Setting1Title")}
            InputProps={{ variant: "outlined" }}
            select
            variant="outlined"
            size="small"
            fullWidth
            labelId="groupValue"
            value={raidBuffs}
            onChange={(e) => updateRaidBuffs(e.target.value)}
            style={{ textAlign: "center", minWidth: 140 }}
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
      {/*<Divider orientation="vertical" flexItem /> */}
      {/* ---------------------------------------------------------------------------------------------- */
      /*                                            Setting 2                                            */
      /* ---------------------------------------------------------------------------------------------- */}
      <Grid item xs={12} sm={4} md={4} lg={3} xl={"auto"}>
        <Tooltip
          title={
            <Typography align="center" variant="body2">
              {t("Settings.Classic.Setting2Tooltip")}
            </Typography>
          }
          placement="top-start"
        >
          <TextField
            label={t("Settings.Classic.Setting2Title")}
            labelId="slots"
            InputProps={{ variant: "outlined" }}
            select
            variant="outlined"
            size="small"
            fullWidth
            value={metaGem}
            onChange={(e) => updateMetaGem(e.target.value)}
          >
            <MenuItem divider id="spiritShell" value={"Bracing Earthstorm Diamond"} style={{ justifyContent: "center" }}>
              {"Bracing Earthstorm Diamond"}
            </MenuItem>
            <MenuItem id="evangelism" value={"Insightful Earthstorm Diamond"} style={{ justifyContent: "center" }}>
              {"Insightful Earthstorm Diamond"}
            </MenuItem>
          </TextField>
        </Tooltip>
      </Grid>
      {/* ---------------------------------------------------------------------------------------------- */
      /*                                            Setting 3                                            */
      /* ---------------------------------------------------------------------------------------------- */}
      <Grid item xs={12} sm={4} md={4} lg={3} xl={"auto"}>
        <TextField
          label={t("Settings.Classic.Setting3Title")}
          labelId="groupValue"
          InputProps={{ variant: "outlined" }}
          select
          variant="outlined"
          size="small"
          fullWidth
          value={autoEnchantItems}
          onChange={(e) => updateAutoEnchantItems(e.target.value)}
          style={{ textAlign: "center", minWidth: 160 }}
        >
          <MenuItem divider value={true} style={{ justifyContent: "center" }}>
            {"Yes"}
          </MenuItem>
          <MenuItem value={false} style={{ justifyContent: "center" }}>
            {"No"}
          </MenuItem>
        </TextField>
      </Grid>
      {/* ---------------------------------------------------------------------------------------------- */
      /*                                            Setting 4                                           */
      /* ---------------------------------------------------------------------------------------------- */}
      <Grid item xs={12} sm={4} md={4} lg={3} xl={"auto"}>
        <Tooltip
          title={
            <Typography align="center" variant="body2">
              {t("Settings.Classic.Setting4Tooltip")}
            </Typography>
          }
          placement="top-start"
        >
          <TextField
            label={t("Settings.Classic.Setting4Title")}
            labelId="groupValue"
            InputProps={{ variant: "outlined" }}
            select
            variant="outlined"
            size="small"
            fullWidth
            value={gemRarity}
            onChange={(e) => updateGemRarity(e.target.value)}
            style={{ textAlign: "center", minWidth: 140 }}
          >
            <MenuItem divider value={"none"} style={{ justifyContent: "center" }}>
              {"No Gems"}
            </MenuItem>
            <MenuItem divider value={"basic"} style={{ justifyContent: "center" }}>
              {"Honor Hold"}
            </MenuItem>
            <MenuItem divider value={"rare"} style={{ justifyContent: "center" }}>
              {"Rare (Blue)"}
            </MenuItem>
            <MenuItem value={"epic"} style={{ justifyContent: "center" }}>
              {"Epic (Purple)"}
            </MenuItem>
          </TextField>
        </Tooltip>
      </Grid>
    </Grid>
  );
}
