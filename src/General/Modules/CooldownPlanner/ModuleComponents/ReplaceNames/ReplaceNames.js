import React, { useState, useEffect } from "react";
import { MenuItem, Grid, FormControl, Select, Typography, AccordionSummary, AccordionDetails } from "@mui/material";
import { useTranslation } from "react-i18next";
import { fightDuration, warcraftLogReportID, logDifficulty, wclClassConverter } from "../../../CooldownPlanner/Functions/Functions";
import NameChanger from "./NameChanger";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordion from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 4,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

export default function ReplaceNames(props) {
  const { logData, nameObject, setNameObject, disabled } = props;
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [name0, setName0] = useState({});
  const [name1, setName1] = useState({});
  const [name2, setName2] = useState({});
  const [name3, setName3] = useState({});
  const [name4, setName4] = useState({});
  const [name5, setName5] = useState({});
  const [name6, setName6] = useState({});
  const [name7, setName7] = useState({});
  const [name8, setName8] = useState({});
  const [name9, setName9] = useState({});
  const [name10, setName10] = useState({});
  const [name11, setName11] = useState({});
  const [name12, setName12] = useState({});
  const [name13, setName13] = useState({});
  const [name14, setName14] = useState({});
  const [name15, setName15] = useState({});
  const [name16, setName16] = useState({});
  const [name17, setName17] = useState({});
  const [name18, setName18] = useState({});
  const [name19, setName19] = useState({});
  const [name20, setName20] = useState({});

  useEffect(() => {
    if (logData.healers.length > 0) {
      logData.healers.length > 0 ? setName0({ [logData.healers[0].name]: logData.healers[0].name }) : "";
      logData.healers.length > 1 ? setName1({ [logData.healers[1].name]: logData.healers[1].name }) : "";
      logData.healers.length > 2 ? setName2({ [logData.healers[2].name]: logData.healers[2].name }) : "";
      logData.healers.length > 3 ? setName3({ [logData.healers[3].name]: logData.healers[3].name }) : "";
      logData.healers.length > 4 ? setName4({ [logData.healers[4].name]: logData.healers[4].name }) : "";
      logData.healers.length > 5 ? setName5({ [logData.healers[5].name]: logData.healers[5].name }) : "";
      logData.healers.length > 6 ? setName6({ [logData.healers[6].name]: logData.healers[6].name }) : "";
      logData.healers.length > 7 ? setName7({ [logData.healers[7].name]: logData.healers[7].name }) : "";
      logData.healers.length > 8 ? setName8({ [logData.healers[8].name]: logData.healers[8].name }) : "";
      logData.healers.length > 9 ? setName9({ [logData.healers[9].name]: logData.healers[9].name }) : "";
      logData.healers.length > 10 ? setName10({ [logData.healers[10].name]: logData.healers[10].name }) : "";
      logData.healers.length > 11 ? setName11({ [logData.healers[11].name]: logData.healers[11].name }) : "";
      logData.healers.length > 12 ? setName12({ [logData.healers[12].name]: logData.healers[12].name }) : "";
      logData.healers.length > 13 ? setName13({ [logData.healers[13].name]: logData.healers[13].name }) : "";
      logData.healers.length > 14 ? setName14({ [logData.healers[14].name]: logData.healers[14].name }) : "";
      logData.healers.length > 15 ? setName15({ [logData.healers[15].name]: logData.healers[15].name }) : "";
      logData.healers.length > 16 ? setName16({ [logData.healers[16].name]: logData.healers[16].name }) : "";
      logData.healers.length > 17 ? setName17({ [logData.healers[17].name]: logData.healers[17].name }) : "";
      logData.healers.length > 18 ? setName18({ [logData.healers[18].name]: logData.healers[18].name }) : "";
      logData.healers.length > 19 ? setName19({ [logData.healers[19].name]: logData.healers[19].name }) : "";
      logData.healers.length > 20 ? setName20({ [logData.healers[20].name]: logData.healers[20].name }) : "";
    }
  }, [logData.healers]);

  const setNameState = (name, newName, originalName) => {
    if (name === "name0") {
      setName0({ [originalName]: newName });
    }
    if (name === "name1") {
      setName1({ [originalName]: newName });
    }
    if (name === "name2") {
      setName2({ [originalName]: newName });
    }
    if (name === "name3") {
      setName3({ [originalName]: newName });
    }
    if (name === "name4") {
      setName4({ [originalName]: newName });
    }
    if (name === "name5") {
      setName5({ [originalName]: newName });
    }
    if (name === "name6") {
      setName6({ [originalName]: newName });
    }
    if (name === "name7") {
      setName7({ [originalName]: newName });
    }
    if (name === "name8") {
      setName8({ [originalName]: newName });
    }
    if (name === "name9") {
      setName9({ [originalName]: newName });
    }
    if (name === "name10") {
      setName10({ [originalName]: newName });
    }
    if (name === "name11") {
      setName11({ [originalName]: newName });
    }
    if (name === "name12") {
      setName12({ [originalName]: newName });
    }
    if (name === "name13") {
      setName13({ [originalName]: newName });
    }
    if (name === "name14") {
      setName14({ [originalName]: newName });
    }
    if (name === "name15") {
      setName15({ [originalName]: newName });
    }
    if (name === "name16") {
      setName16({ [originalName]: newName });
    }
    if (name === "name17") {
      setName17({ [originalName]: newName });
    }
    if (name === "name18") {
      setName18({ [originalName]: newName });
    }
    if (name === "name19") {
      setName19({ [originalName]: newName });
    }
    if (name === "name20") {
      setName20({ [originalName]: newName });
    }
  };

  useEffect(() => {
    let newObjectArray = [];
    name0 === {} ? "" : newObjectArray.push(name0);
    name1 === {} ? "" : newObjectArray.push(name1);
    name2 === {} ? "" : newObjectArray.push(name2);
    name3 === {} ? "" : newObjectArray.push(name3);
    name4 === {} ? "" : newObjectArray.push(name4);
    name5 === {} ? "" : newObjectArray.push(name5);
    name6 === {} ? "" : newObjectArray.push(name6);
    name7 === {} ? "" : newObjectArray.push(name7);
    name8 === {} ? "" : newObjectArray.push(name8);
    name9 === {} ? "" : newObjectArray.push(name9);
    name10 === {} ? "" : newObjectArray.push(name10);
    name11 === {} ? "" : newObjectArray.push(name11);
    name12 === {} ? "" : newObjectArray.push(name12);
    name13 === {} ? "" : newObjectArray.push(name13);
    name14 === {} ? "" : newObjectArray.push(name14);
    name15 === {} ? "" : newObjectArray.push(name15);
    name16 === {} ? "" : newObjectArray.push(name16);
    name17 === {} ? "" : newObjectArray.push(name17);
    name18 === {} ? "" : newObjectArray.push(name18);
    name19 === {} ? "" : newObjectArray.push(name19);
    name20 === {} ? "" : newObjectArray.push(name20);
    setNameObject(newObjectArray);
  }, [name0, name1, name2, name3, name4, name5, name6, name7, name8, name9, name10, name11, name12, name13, name14, name15, name16, name17, name18, name19, name20]);

  return (
    <Grid item xl={12}>
      <Accordion disabled={disabled}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography align="center">Replace Healers?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container xl={12} spacing={1}>
            <Grid item container xl={6} direction="row" spacing={1}>
              {logData.healers.map((key, i) => (
                <Grid item xl={12}>
                  <NameChanger name={key.name} className={wclClassConverter(key.icon)} type="original" />
                </Grid>
              ))}
            </Grid>
            <Grid item container xl={6} direction="row" spacing={1}>
              {logData.healers.map((key, i) => (
                <Grid item xl={12}>
                  <NameChanger classLock={wclClassConverter(key.icon)} setNameState={setNameState} originalName={key.name} nameState={"name" + i} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
}
