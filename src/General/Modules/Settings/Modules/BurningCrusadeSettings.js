import React, { useState } from "react";
import makeStyles from '@mui/styles/makeStyles';
import { MenuItem, Grid, FormControl, Select, Typography, Divider, TextField, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { setBounds } from "../../../Engine/CONSTRAINTS";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

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
  select: {
    fontSize: theme.typography.pxToRem(16),
  },
}));

export default function BurningCrusadeSettings(props) {
  const { t } = useTranslation();
  const classes = useStyles();
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
  const [gemRarity, setGemRarity] = useState("rare");
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

  return (
    <Grid container spacing={2} direction="row">
      {/* ---------------------------------------------------------------------------------------------- */
      /*                                            Setting 0                                            */
      /* ---------------------------------------------------------------------------------------------- */}
      <Grid item xs={12} sm={4} md={4} lg={3} xl={"auto"}>
        <Tooltip
          title={
            <Typography align="center" variant="body2">
              {t("Settings.BurningCrusade.Setting0Tooltip")}
            </Typography>
          }
          placement="top-start"
        >
          <TextField
            label={t("Settings.BurningCrusade.Setting0Title")}
            labelId="slots"
            variant="outlined"
            size="small"
            SelectProps={{ MenuProps: menuStyle, className: classes.select }}
            InputProps={{ variant: "outlined" }}
            fullWidth
            select
            value={manaProfile}
            onChange={(e) => updateManaProfile(e.target.value)}
            MenuProps={menuStyle}
            style={{ textAlign: "center", minWidth: 140 }}
          >
            <MenuItem id="spiritShell" value={"Max Healing"} style={{ justifyContent: "center" }}>
              {"Max Healing"}
            </MenuItem>
            <MenuItem id="evangelism" value={"Standard"} style={{ justifyContent: "center" }}>
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
              {t("Settings.BurningCrusade.Setting1Tooltip")}
            </Typography>
          }
          placement="top-start"
        >
          <TextField
            label={t("Settings.BurningCrusade.Setting1Title")}
            SelectProps={{ MenuProps: menuStyle, className: classes.select }}
            InputProps={{ variant: "outlined" }}
            select
            variant="outlined"
            size="small"
            fullWidth
            labelId="groupValue"
            value={raidBuffs}
            onChange={(e) => updateRaidBuffs(e.target.value)}
            MenuProps={menuStyle}
            style={{ textAlign: "center", minWidth: 140 }}
          >
            <MenuItem value={true} style={{ justifyContent: "center" }}>
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
              {t("Settings.BurningCrusade.Setting2Tooltip")}
            </Typography>
          }
          placement="top-start"
        >
          <TextField
            label={t("Settings.BurningCrusade.Setting2Title")}
            labelId="slots"
            SelectProps={{ MenuProps: menuStyle, className: classes.select }}
            InputProps={{ variant: "outlined" }}
            select
            variant="outlined"
            size="small"
            fullWidth
            value={metaGem}
            onChange={(e) => updateMetaGem(e.target.value)}
            MenuProps={menuStyle}
          >
            <MenuItem id="spiritShell" value={"Bracing Earthstorm Diamond"} style={{ justifyContent: "center" }}>
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
          label={t("Settings.BurningCrusade.Setting3Title")}
          labelId="groupValue"
          SelectProps={{ MenuProps: menuStyle, className: classes.select }}
          InputProps={{ variant: "outlined" }}
          select
          variant="outlined"
          size="small"
          fullWidth
          value={autoEnchantItems}
          onChange={(e) => updateAutoEnchantItems(e.target.value)}
          MenuProps={menuStyle}
          style={{ textAlign: "center", minWidth: 160 }}
        >
          <MenuItem value={true} style={{ justifyContent: "center" }}>
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
              {t("Settings.BurningCrusade.Setting4Tooltip")}
            </Typography>
          }
          placement="top-start"
        >
          <TextField
            label={t("Settings.BurningCrusade.Setting4Title")}
            labelId="groupValue"
            SelectProps={{ MenuProps: menuStyle, className: classes.select }}
            InputProps={{ variant: "outlined" }}
            select
            variant="outlined"
            size="small"
            fullWidth
            value={gemRarity}
            onChange={(e) => updateGemRarity(e.target.value)}
            MenuProps={menuStyle}
            style={{ textAlign: "center", minWidth: 140 }}
          >
            <MenuItem value={"none"} style={{ justifyContent: "center" }}>
              {"No Gems"}
            </MenuItem>
            <MenuItem value={"basic"} style={{ justifyContent: "center" }}>
              {"Honor Hold"}
            </MenuItem>
            <MenuItem value={"rare"} style={{ justifyContent: "center" }}>
              {"Rare (Blue)"}
            </MenuItem>
            <MenuItem value={"epic"} style={{ justifyContent: "center" }}>
              {"Epic (Purple)"}
            </MenuItem>
          </TextField>
        </Tooltip>
      </Grid>
      {/* ---------------------------------------------------------------------------------------------- */
      /*                                            Setting 5                                            */
      /* ---------------------------------------------------------------------------------------------- */}

      {/*}
      <Grid item xs={12} sm={4} md={4} lg={3} xl={2}>
        <Grid container spacing={1} style={{ paddingLeft: 8 }}>
          <Grid item xs={12}>
            <Tooltip title={<Typography align="center" variant="body2">{t("Settings.BurningCrusade.Setting5Tooltip")}</Typography>} placement="top-start">
              <Typography color="primary">{t("Settings.BurningCrusade.Setting5Title")}</Typography>
            </Tooltip>
            <Tooltip title={<Typography align="center" variant="body2">{t("Settings.BurningCrusade.Setting5Tooltip")}</Typography>} placement="top-start">
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
