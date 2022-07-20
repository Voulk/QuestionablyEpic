import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import { Grid, Button, Typography, Tooltip } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { getSpellRaw, runCastSequence } from "Retail/Engine/EffectFormulas/Evoker/PresEvokerRamps.js";

import { EVOKERSPELLDB, baseTalents } from "Retail/Engine/EffectFormulas/Evoker/PresEvokerSpellDB"

const useStyles = makeStyles((theme) => ({
    root: {
      [theme.breakpoints.down("md")]: {
        margin: "auto",
        width: "100%",
        justifyContent: "center",
        display: "block",
        marginTop: 140,
      },
      [theme.breakpoints.up("sm")]: {
        margin: "auto",
        width: "80%",
        justifyContent: "center",
        display: "block",
        marginTop: 120,
      },
      [theme.breakpoints.up("md")]: {
        margin: "auto",
        width: "65%",
        justifyContent: "center",
        display: "block",
      },
      [theme.breakpoints.up("lg")]: {
        margin: "auto",
        width: "45%",
        justifyContent: "center",
        display: "block",
      },
    },
  }));

const spellList = Object.keys(EVOKERSPELLDB);


const imgs = {
    default: require("Images/Legendaries/TheDarkTitansLesson.jpg").default,
    "Spiritbloom": require("Images/Spells/ability_evoker_spiritbloom2.jpg").default,
    "Living Flame": require("Images/Spells/ability_evoker_livingflame.jpg").default,
    "Emerald Blossom": require("Images/Spells/ability_evoker_emeraldblossom.jpg").default,
    "Rescue": require("Images/Spells/ability_evoker_rescue.jpg").default,
    "Reversion": require("Images/Spells/ability_evoker_reversion.jpg").default,
    "Echo": require("Images/Spells/ability_evoker_echo.jpg").default,
    "Living Flame D": require("Images/Spells/ability_evoker_livingflame.jpg").default,
    "Dream Breath": require("Images/Spells/ability_evoker_dreambreath.jpg").default,
    "Fire Breath": require("Images/Spells/ability_evoker_firebreath.jpg").default,
    "Dream Flight": require("Images/Spells/ability_evoker_dreamflight.jpg").default,
    "Azure Strike": require("Images/Spells/ability_evoker_azurestrike.jpg").default,
    "Temporal Anomaly": require("Images/Spells/ability_evoker_temporalanomaly.jpg").default, 
    "Blessing of the Bronze": require("Images/Spells/ability_evoker_blessingofthebronze.jpg").default,
}


export default function SequenceGenerator(props) {

    const classes = useStyles();
    const [seq, setSeq] = useState([]);
    const [talents, settalents] = useState({...baseTalents});
    const [result, setResult] = useState({totalHealing: 0, hpm: 0})


    const stats = {
        intellect: 2000,
        haste: 600,
        crit: 600,
        mastery: 600,
        versatility: 600,
        stamina: 2800,

        critMult: 1,
}

    const addSpell = (ind) => {

        setSeq([...seq, spellList[ind]]);
        console.log(seq);
    }

    const clearSeq = () => {
        setSeq([]);
    }

    const runSeq = () => {
        const sim = runCastSequence(seq, stats, {}, {});
        setResult(sim)
        console.log(sim);
    }

    return (
        <div style={{ backgroundColor: "#313131" }}>
            <div className={classes.root}>
            <Grid container spacing={1}>
            <Typography variant="subtitle2" align="left" style={{ width: "100%", padding: "25px 10px 5px 10px" }} color="primary">
                {"Seq 1: " + seq.toString().replace(",", ", ")}
            </Typography>

            <Typography variant="h6" align="left" style={{ width: "100%", padding: "25px 10px 5px 10px" }} color="primary">
                {"Spells"}
            </Typography>

            {spellList.map((spell, index) => (
                <Grid item xs={12} sm={12} md={1} lg={1} xl={1} key={index}>
                <a data-wowhead={"spell=" + 364342}>
                <img
                    height={40}
                    width={40}
                    src={imgs[spell]}
                    alt=""
                    onClick={(e) => addSpell(index, e)}
                    style={{
                      borderRadius: 4,
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: "#ff8000",
                      marginRight: 0,
                    }}
                    />
                    </a>
                </Grid>
            ))}

            <Typography variant="h6" align="left" style={{ width: "100%", padding: "25px 10px 5px 10px" }} color="primary">
                {"Talents"}
            </Typography>

            <Grid item xs={12}>
            <Button
              key={321}
              variant="contained"
              onClick={() => runSeq()}
              color="secondary"
              style={{
                width: "100%",
                height: "35px",
                whiteSpace: "nowrap",
                justifyContent: "center",
                textTransform: "none",
                paddingLeft: "32px",
                color: "#F2BF59",
              }}
            >
              {"Run Sequence"}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              key={321}
              variant="contained"
              onClick={() => clearSeq()}
              color="secondary"
              style={{
                width: "100%",
                height: "35px",
                whiteSpace: "nowrap",
                justifyContent: "center",
                textTransform: "none",
                paddingLeft: "32px",
                color: "#F2BF59",
              }}
            >
              {"Clear"}
            </Button>
          </Grid>

        <p style={{ color: "whitesmoke", paddingTop: "10px" }}>{"Healing: " + result.totalHealing + ". HPM: " + Math.round(100*result.hpm)/100}</p>

        </Grid>
            </div>
        </div>
    )


}