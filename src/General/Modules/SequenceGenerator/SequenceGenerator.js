import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import { Grid, Button, Typography, Tooltip } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { runCastSequence as evokerSequence } from "Retail/Engine/EffectFormulas/Evoker/PresEvokerRamps";
import { runCastSequence as discSequence } from "General/Modules/Player/DiscPriest/DiscPriestRamps";

import { EVOKERSPELLDB, baseTalents } from "Retail/Engine/EffectFormulas/Evoker/PresEvokerSpellDB"
import { DISCSPELLS } from "General/Modules/Player/DiscPriest/DiscSpellDB";


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

const getSpellDB = (spec) => {
    if (spec === "Preservation Evoker") return EVOKERSPELLDB;
    if (spec === "Discipline Priest") return DISCSPELLS;

}

const getSequence = (spec) => {
    if (spec === "Preservation Evoker") return evokerSequence;
    else if (spec === "Discipline Priest") return discSequence;
}




export default function SequenceGenerator(props) {

    const selectedSpec = "Discipline Priest";
    const spellDB = getSpellDB(selectedSpec);

    const spellCategories = ["Healing", "Damage", "Cooldowns & Other"]

    const classes = useStyles();
    const [seq, setSeq] = useState([]);
    const [talents, settalents] = useState({...baseTalents});
    const [result, setResult] = useState({totalDamage: 0, totalHealing: 0, hpm: 0})

    const spellList = {"Damage":  Object.keys(spellDB).filter(spell => spellDB[spell][0].type === "damage"|| spell === "Penance"),
                    "Healing": Object.keys(spellDB).filter(spell => spellDB[spell][0].type === "heal" ),
                    "Cooldowns & Other": []}
    const dpsSpells = []
    const healSpells = []

    console.log(healSpells);

    const stats = {
        intellect: 2000,
        haste: 600,
        crit: 600,
        mastery: 600,
        versatility: 600,
        stamina: 2800,

        critMult: 1,
}

    const addSpell = (spell) => {

        setSeq([...seq, spell]);
        console.log(seq);
    }

    const clearSeq = () => {
        setSeq([]);
    }

    const runSeq = () => {
        const simFunc = getSequence(selectedSpec);
        const sim = simFunc(seq, stats, {}, {});
        setResult(sim)
        console.log(sim);
    }

    return (
        <div style={{ backgroundColor: "#313131" }}>
            <div className={classes.root}>
            <Grid container spacing={1}>
            <Typography variant="subtitle2" align="left" style={{ width: "100%", padding: "25px 10px 5px 10px" }} color="primary">
                {"Seq 1"}
            </Typography>

            {seq.map((spell, index) => (
                <Grid item xs={12} sm={12} md={1} lg={1} xl={1} key={index}>
                <a data-wowhead={"spell=" + spellDB[spell][0].spellData.id}>
                <img
                    height={40}
                    width={40}
                    src={ require("Images/Spells/" + spellDB[spell][0].spellData.icon + ".jpg").default || "" }
                    alt=""
                    style={{
                      borderRadius: 4,
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: "#008CFF",
                      marginRight: 0,
                    }}
                    />
                    </a>
                </Grid>
            ))}

            {spellCategories.map((cat, index) => 
                <>
                <Typography variant="h6" align="left" style={{ width: "100%", padding: "25px 10px 5px 10px" }} color="primary">
                    {cat + " Spells"}
                </Typography>

                {spellList[cat].map((spell, i) => 
                    <Grid item xs={12} sm={12} md={1} lg={1} xl={1} key={i}>
                    <a data-wowhead={"spell=" + spellDB[spell][0].spellData.id}>
                    <img
                        height={40}
                        width={40}
                        src={ require("Images/Spells/" + spellDB[spell][0].spellData.icon + ".jpg").default || "" }
                        alt=""
                        onClick={(e) => addSpell(spell, e)}
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
                )}
                </>
            )};

    {/*}
            <Typography variant="h6" align="left" style={{ width: "100%", padding: "25px 10px 5px 10px" }} color="primary">
                {"Healing Spells"}
            </Typography>

            {healSpells.map((spell, index) => (
                <Grid item xs={12} sm={12} md={1} lg={1} xl={1} key={index}>
                <a data-wowhead={"spell=" + spellDB[spell][0].spellData.id}>
                <img
                    height={40}
                    width={40}
                    src={ require("Images/Spells/" + spellDB[spell][0].spellData.icon + ".jpg").default || "" }
                    alt=""
                    onClick={(e) => addSpell(spell, e)}
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
                {"DPS Spells"}
            </Typography>

            {dpsSpells.map((spell, index) => (
                <Grid item xs={12} sm={12} md={1} lg={1} xl={1} key={index}>
                <a data-wowhead={"spell=" + spellDB[spell][0].spellData.id}>
                <img
                    height={40}
                    width={40}
                    src={ require("Images/Spells/" + spellDB[spell][0].spellData.icon + ".jpg").default || "" }
                    alt=""
                    onClick={(e) => addSpell(spell, e)}
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
                ))} */}

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

        <p style={{ color: "whitesmoke", paddingTop: "10px" }}>{"Damage: " + result.totalDamage + ". Healing: " + result.totalHealing + ". HPM: " + Math.round(100*result.hpm)/100}</p>

        </Grid>
            </div>
        </div>
    )


}