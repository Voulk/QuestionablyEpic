import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, Grid, FormControl, Select, Typography, Divider, TextField, Tooltip, InputLabel } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { setBounds } from "General/Engine/CONSTRAINTS";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { dominationGemDB } from "Databases/DominationGemDB";
import { getGemIcon } from "General/Engine/ItemUtilities";

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

export default function DominationGemSelection(props) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  /* ---------------------------------------------------------------------------------------------- */
  /*                                             States                                             */
  /* ---------------------------------------------------------------------------------------------- */

  /* ----------------------------------------- Blood Gems ----------------------------------------- */
  // Bek
  const [bekLevel, setBekLevel] = useState(0);
  // Jas
  const [jasLevel, setJasLevel] = useState(0);
  // Rev
  const [revLevel, setRevLevel] = useState(0);

  /* ----------------------------------------- Frost Gems ----------------------------------------- */
  // Cor
  const [corLevel, setCorLevel] = useState(0);
  // Tel
  const [telLevel, setTelLevel] = useState(0);
  // Kyr
  const [kyrLevel, setKyrLevel] = useState(0);

  /* ----------------------------------------- Unholy Gems ---------------------------------------- */
  // Dyz
  const [dyzLevel, setDyzLevel] = useState(0);
  // Zed
  const [zedLevel, setZedLevel] = useState(0);
  // Oth
  const [othLevel, setOthLevel] = useState(0);

  const dominationGems = [
    /* ------------------------------------------- Unholy ------------------------------------------- */
    "Shard of Zed",
    "Shard of Dyz",
    "Shard of Oth",
    /* -------------------------------------------- Blood ------------------------------------------- */
    "Shard of Bek",
    "Shard of Jas",
    "Shard of Rev",
    /* -------------------------------------------- Frost ------------------------------------------- */
    "Shard of Cor",
    "Shard of Tel",
    "Shard of Kyr",
  ];

  const setDomGemState = (gem, rank) => {
    switch (gem) {
      /* ------------------------------------------- Unholy ------------------------------------------- */
      case "Shard of Zed":
        setZedLevel(rank);
        break;
      case "Shard of Dyz":
        setDyzLevel(rank);
        break;
      case "Shard of Oth":
        setOthLevel(rank);
        break;
      /* -------------------------------------------- Blood ------------------------------------------- */
      case "Shard of Bek":
        setBekLevel(rank);
        break;
      case "Shard of Jas":
        setJasLevel(rank);
        break;
      case "Shard of Rev":
        setRevLevel(rank);
        break;
      /* -------------------------------------------- Frost ------------------------------------------- */
      case "Shard of Cor":
        setCorLevel(rank);
        break;
      case "Shard of Tel":
        setTelLevel(rank);
        break;
      case "Shard of Kyr":
        setKyrLevel(rank);
        break;
      default:
        break;
    }
  };

  const getDomGemvalue = (gem) => {
    switch (gem) {
      /* ------------------------------------------- Unholy ------------------------------------------- */
      case "Shard of Zed":
        return zedLevel;
      case "Shard of Dyz":
        return dyzLevel;
      case "Shard of Oth":
        return othLevel;
      /* -------------------------------------------- Blood ------------------------------------------- */
      case "Shard of Bek":
        return bekLevel;
      case "Shard of Jas":
        return jasLevel;
      case "Shard of Rev":
        return revLevel;
      /* -------------------------------------------- Frost ------------------------------------------- */
      case "Shard of Cor":
        return corLevel;
      case "Shard of Tel":
        return telLevel;
      case "Shard of Kyr":
        return kyrLevel;
      default:
        break;
    }
  };

  return (
    <Grid container spacing={1} direction="row">
      {dominationGems.map((key) => (
        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
          <Grid container spacing={0} style={{ padding: "0px 8px" }}>
            {/* <Grid item xs={12}>
              <div style={{ display: "inline-flex" }}>
                <Typography color="primary" style={{ marginRight: 4 }} noWrap>
                  {dominationGemDB.filter((filter) => filter.effect.name === key && filter.effect.rank === 0).map((key) => key.name[currentLanguage])}
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
            </Grid> */}
            <Grid item xs={12}>
              <FormControl variant="outlined" size="small" fullWidth style={{ textAlign: "center" }}>
                <Select labelId="groupValue" value={getDomGemvalue(key)} onChange={(e) => setDomGemState(key, e.target.value)} MenuProps={menuStyle}>
                  {dominationGemDB
                    .filter((filter) => filter.effect.name === key)
                    .map((key) => (
                      <MenuItem value={key.effect.rank} style={{ justifyContent: "left" }}>
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
                            src={getGemIcon(key.gemID)}
                            alt={key.name[currentLanguage]}
                          />
                        </a>
                        {key.name[currentLanguage] + " " + "(" + (key.effect.rank + 1) + ")"}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
