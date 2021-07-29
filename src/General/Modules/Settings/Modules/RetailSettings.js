import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, Grid, FormControl, Select, Typography, Divider, TextField, Tooltip, InputLabel } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { setBounds } from "../../../Engine/CONSTRAINTS";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { dominationGemDB } from "../../../../Databases/DominationGemDB";

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

export default function RetailSettings(props) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const playerSpec = props.player.getSpec();

  /* ---------------------------------------------------------------------------------------------- */
  /*                                             States                                             */
  /* ---------------------------------------------------------------------------------------------- */

  /* ---------------------------------------- Hymnal State ---------------------------------------- */
  const [hymnalValue, setHymnalValue] = useState(props.userSettings.hymnalAllies);

  /* -------------------------------------- Group Value State ------------------------------------- */
  const [groupValue, setgroupValue] = useState(props.userSettings.includeGroupBenefits);

  /* -------------------------------------- Disc Talent State ------------------------------------- */
  // const [discTalent, setDiscTalent] = useState(109964);

  /* ----------------------------------- Paladin Playstyle State ---------------------------------- */
  const [specBuild, setSpecBuild] = useState(props.player.activeModelID[props.contentType]);

  /* -------------------------------------- Auto-Socket State ------------------------------------- */
  const [autoSocketValue, setAutoSocketValue] = useState(props.userSettings.autoSocket);

  /* ----------------------------------- Domination Socket State ---------------------------------- */
  const [dominationSocket, setDominationSocket] = useState(props.userSettings.vaultDomGem);


  const specBuilds = props.player.getAllModels()
  console.log(specBuilds);
  console.log("Currently selected: " + props.player.activeModelID[props.contentType])

  const updateHymnal = (value) => {
    props.editSettings("hymnalAllies", setBounds(value, 0, 4));
    setHymnalValue(setBounds(value, 0, 4));
  };

  const updateGroupValue = (value) => {
    props.editSettings("includeGroupBenefits", value);
    setgroupValue(value);
  };

  const updateAutoSocketValue = (value) => {
    props.editSettings("autoSocket", value);
    setAutoSocketValue(value);
  };

  const updateVaultDom = (value) => {
    props.editSettings("vaultDomGem", value)
    setDominationSocket(value);
  };

  const updateSpecBuild = (value) => {
    //props.editSettings("vaultDomGem", value)
    props.player.setModelID(value, props.contentType)
    setSpecBuild(value);
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
      {/* ------------------------- Cabalist's Hymnal Item ------------------------- */}
      {props.hymnalShow === true ? (
        <Grid item xs={12} sm={4} md={4} lg={3} xl={2}>
          <Grid container spacing={0} style={{ padding: "0px 8px" }}>
            <Grid item xs={12}>
              <div style={{ display: "inline-flex" }}>
                <Typography color="primary" style={{ marginRight: 4 }} noWrap>
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
              <TextField
                id="AlliesNumber"
                value={hymnalValue}
                onChange={(e) => updateHymnal(e.target.value)}
                variant="outlined"
                size="small"
                type="number"
                fullWidth
                inputProps={{
                  style: { textAlign: "center" },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        ""
      )}
      {/* ------------------------- Group Buff (Treat Buff as Personal Throughput) ------------------------- */}
      {props.groupBuffShow === true ? (
        <Grid item xs={12} sm={4} md={4} lg={3} xl={2}>
          <Grid container spacing={0} style={{ padding: "0px 8px" }}>
            <Grid item xs={12}>
              <div style={{ display: "inline-flex" }}>
                <Typography color="primary" style={{ marginRight: 4 }} noWrap>
                  {t("Settings.Retail.Setting1Title")}
                </Typography>
                <Tooltip
                  title={
                    <Typography align="center" variant="body2">
                      {t("Settings.Retail.Setting1Tooltip")}
                    </Typography>
                  }
                  placement="top-start"
                >
                  <InfoOutlinedIcon style={{ height: 15, width: 15 }} fontSize="medium" />
                </Tooltip>
              </div>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" size="small" fullWidth style={{ textAlign: "center" }}>
                <Select labelId="groupValue" value={groupValue} onChange={(e) => updateGroupValue(e.target.value)} MenuProps={menuStyle}>
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
      ) : (
        ""
      )}
      {/* ---------------- Discipline Priest Talent selector (Spirit Shell / Evangelism) --------------- */}
      {/* {playerSpec === "Discipline Priest" ? (
              <Grid item xs={12} sm={4} md={4} lg={3} xl={2}>
                <Grid container spacing={1} style={{ padding: "0px 8px" }} >
                  <Grid item xs={12}>
                    <div style={{ display: "inline-flex" }}>
                      <Typography color="primary" style={{ marginRight: 4 }} noWrap>
                        {t("Settings.Retail.Setting2Title")}
                      </Typography>
                      <Tooltip title={<Typography align="center"  variant="body2">{t("Settings.Retail.Setting2Tooltip")}</Typography>} placement="top-start">
                        <InfoOutlinedIcon style={{ height: 15, width: 15 }} fontSize="small" />
                      </Tooltip>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="outlined" size="small">
                      <Select labelId="slots" value={discTalent} onChange={(e) => setDiscTalent(e.target.value)} MenuProps={menuStyle}>
                        <MenuItem id="spiritShell" value={109964} style={{ justifyContent: "center" }} >
                          {t("CooldownPlanner.ClassAbilities.109964")}
                        </MenuItem>
                        <MenuItem id="evangelism" value={246287} style={{ justifyContent: "center" }} >
                          {t("CooldownPlanner.ClassAbilities.246287")}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              ""
            )} */}

      {/* --------------------------------- Playstyle / Build Selection --------------------------------  */}
        <Grid item xs={12} sm={4} md={4} lg={3} xl={2}>
          <Grid container spacing={0} style={{ padding: "0px 8px" }}>
            <Grid item xs={12}>
              <div style={{ display: "inline-flex" }}>
                <Typography color="primary" style={{ marginRight: 4 }} noWrap>
                  {t("Settings.Retail.Setting5Title")}
                </Typography>
                <Tooltip
                  title={
                    <Typography align="center" variant="body2">
                      {t("Settings.Retail.Setting5Tooltip")}
                    </Typography>
                  }
                  placement="top-start"
                >
                  <InfoOutlinedIcon style={{ height: 15, width: 15 }} fontSize="small" />
                </Tooltip>
              </div>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth size="small">
                <Select labelId="slots" value={props.player.activeModelID[props.contentType]} onChange={(e) => updateSpecBuild(e.target.value)} MenuProps={menuStyle}>
                  {specBuilds.map((key, i) => (
                    <MenuItem id={key.modelName} value={key.arrayID} style={{ justifyContent: "center" }}>
                      {key.modelName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      {/* ----------------------------------------- Auto Socket Items ---------------------------------------- */}
      {props.autoSocket === true ? (
        <Grid item xs={12} sm={4} md={4} lg={3} xl={2}>
          <Grid container spacing={0} style={{ padding: "0px 8px" }}>
            <Grid item xs={12}>
              <div style={{ display: "inline-flex" }}>
                <Typography color="primary" style={{ marginRight: 4 }} noWrap>
                  {t("Settings.Retail.Setting3Title")}
                </Typography>
                <Tooltip
                  title={
                    <Typography align="center" variant="body2">
                      {t("Settings.Retail.Setting3Tooltip")}
                    </Typography>
                  }
                  placement="top-start"
                >
                  <InfoOutlinedIcon style={{ height: 15, width: 15 }} fontSize="medium" />
                </Tooltip>
              </div>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" size="small" fullWidth style={{ textAlign: "center" }}>
                <Select labelId="groupValue" value={autoSocketValue} onChange={(e) => updateAutoSocketValue(e.target.value)} MenuProps={menuStyle}>
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
      ) : (
        ""
      )}
      {/* --------------------------- Domination Socket for Great Vault Items --------------------------  */}
      <Grid item xs={12} sm={4} md={4} lg={3} xl={2}>
        <Grid container spacing={0} style={{ padding: "0px 8px" }}>
          <Grid item xs={12}>
            <div style={{ display: "inline-flex" }}>
              <Typography color="primary" style={{ marginRight: 4 }} noWrap>
                {t("Settings.Retail.Setting4Title")}
              </Typography>
              <Tooltip
                title={
                  <Typography align="center" variant="body2">
                    {t("Settings.Retail.Setting4Tooltip")}
                  </Typography>
                }
                placement="top-start"
              >
                <InfoOutlinedIcon style={{ height: 15, width: 15 }} fontSize="medium" />
              </Tooltip>
            </div>
          </Grid>
          <FormControl variant="outlined" size="small" style={{ width: t("QuickCompare.DominationSocket").length > 10 ? 160 : 140 }}>
            <Select key={"DominationSocket"} labelId="DominationSocket" value={dominationSocket} onChange={(e) => updateVaultDom(e.target.value)} MenuProps={menuStyle}>
              {dominationGemDB
                .filter((filter) => filter.type !== "Set Bonus")
                .map((key, i) => [
                  <MenuItem key={key.gemID} label={key.name[currentLanguage]} value={key.gemID}>
                    <a data-wowhead={"item=" + key.gemID}>
                      <img
                        style={{
                          height: 20,
                          width: 20,
                          margin: "0px 5px 0px 0px",
                          verticalAlign: "middle",
                          borderRadius: 4,
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                        }}
                        src={process.env.PUBLIC_URL + "/Images/Icons/" + key.icon + ".jpg"}
                        alt={key.name[currentLanguage]}
                      />
                    </a>
                    {key.name[currentLanguage] + " " + "[" + (key.effect.rank + 1) + "]"}
                  </MenuItem>,
                  <Divider key={i} />,
                ])}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {/* ----------------------------------------- Free Option ---------------------------------------- */}
      {/*
            <Grid item xs={12} sm={4} md={4} lg={3} xl={2}>
              <Grid container spacing={1} style={{ paddingLeft: 8 }}>
                <Grid item xs={12}>
                  <Tooltip
                    title={<Typography align="center" variant="body2">{t("Settings.Retail.Setting5Tooltip")}</Typography>}
                    placement="top-start"
                  >
                    <Typography color="primary">
                      {t("Settings.Retail.Setting5Title")}
                    </Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="AlliesNumber"
                    value={value5}
                    style={{ maxWidth: 75 }}
                    onChange={(e) => setValue5(e.target.value)}
                    variant="outlined"
                    size="small"
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid> */}
    </Grid>
  );
}
