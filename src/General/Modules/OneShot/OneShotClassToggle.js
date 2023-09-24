import * as React from "react";

import classIcons from "../CooldownPlanner/Functions/IconFunctions/ClassIcons";
import { Grid, ToggleButtonGroup, ToggleButton, Typography, Paper, Tooltip } from "@mui/material";
import { getClassIconCD, getTranslatedClassNameCD, getSpecIconCD, getTranslatedSpecNameCD } from "locale/ClassNames";
import { useTranslation } from "react-i18next";

export default function OneShotClassToggle(props) {
  const { setSelectedClass, selectedClass, selectedSpec, setSelectedSpec, updateSpec, setDefensives } = props;

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  // const classList = ["Evoker", "Druid", "Priest", "Shaman", "Monk", "Warrior", "DemonHunter", "DeathKnight", "Rogue", "Warlock", "Hunter", "Mage"];

  const newClassList = [
    { Class: "evoker", specs: ["preservation", "devastation", "augmentation"] },
    { Class: "paladin", specs: ["holy", "protection", "retribution"] },
    { Class: "druid", specs: ["restoration", "balance", "feral", "guardian"] },
    { Class: "priest", specs: ["discipline", "holy", "shadow"] },
    { Class: "shaman", specs: ["restoration", "enhancement", "elemental"] },
    { Class: "monk", specs: ["mistweaver", "windwalker", "brewmaster"] },
    { Class: "warrior", specs: ["protection", "arms", "fury"] },
    { Class: "demonhunter", specs: ["havoc", "vengeance"] },
    { Class: "deathknight", specs: ["unholy", "frost", "blood"] },
    { Class: "rogue", specs: ["assassination", "outlaw", "subtlety"] },
    { Class: "warlock", specs: ["affliction", "demonology", "destruction"] },
    { Class: "hunter", specs: ["beastmastery", "marksmanship", "survival"] },
    { Class: "mage", specs: ["arcane", "fire", "frost"] },
  ];

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      const defaultSpec = newClassList.filter((obj) => obj.Class === newAlignment)[0].specs[0];
      setSelectedSpec(defaultSpec);
      setSelectedClass(newAlignment);
      setDefensives(updateSpec(newAlignment, defaultSpec));
    }
  };

  const handleSpecAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setSelectedSpec(newAlignment);
    }
  };

  let specs = [];
  const specArray = newClassList.find((obj) => obj.Class === selectedClass);

  if (specArray) {
    specs = specArray.specs;
  } else {
  }

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <Paper
        style={{
          border: "1px solid rgba(255, 255, 255, 0.24)",
          padding: "0px 8px 8px 8px",
        }}
        elevation={0}
      >
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
              {"Classes"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <ToggleButtonGroup value={selectedClass} exclusive onChange={handleAlignment} aria-label="text alignment" fullWidth>
                  {newClassList.map((key) => (
                    <ToggleButton value={key.Class} aria-label={key.Class} style={{ padding: 8 }}>
                      <Tooltip title={getTranslatedClassNameCD(key.Class, currentLanguage)} arrow placement="top">
                        <img
                          src={getClassIconCD(key.Class)}
                          style={{
                            maxHeight: 36,
                            borderRadius: 4,
                            border: "1px solid rgb(89, 89, 89)",
                            //  filter: key.Class === selectedClass ? "" : "grayscale(100%)"
                          }}
                        />
                      </Tooltip>
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid container spacing={1} justifyContent="center">
                  <Grid item xs="auto">
                    <ToggleButtonGroup value={selectedSpec} exclusive onChange={handleSpecAlignment} aria-label="text alignment">
                      {specs.map((key) => (
                        <ToggleButton value={key} aria-label={key} style={{ padding: 8 }}>
                          <Tooltip title={getTranslatedSpecNameCD(key + " " + selectedClass, currentLanguage)} arrow placement="top">
                            <img
                              src={getSpecIconCD(key + " " + selectedClass)}
                              style={{
                                maxHeight: 36,
                                borderRadius: 4,
                                border: "1px solid rgb(89, 89, 89)",
                                //  filter: key === selectedSpec ? "" : "grayscale(100%)"
                              }}
                            />
                          </Tooltip>
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
