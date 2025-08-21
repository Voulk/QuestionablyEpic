import React, { useState } from "react";
import { styled } from "@mui/system";
import logo from "Images/QeAssets/QELogo.png";
import druidPanel from "Images/Classes/DruidPanel.jpg"
import hpriestPanel from "Images/Classes/PriestPanel.jpg";
import dpriestPanel from "Images/Classes/DiscPriestPanel.jpg";
import shamanPanel from "Images/Classes/ShamanPanel.jpg";
import paladinPanel from "Images/Classes/PaladinPanel.jpg";
import monkPanel from "Images/Classes/MonkPanel.jpg";
import evokerPanel from "Images/Classes/EvokerPanel.jpg";
import { CONSTANTS } from "General/Engine/CONSTANTS";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../SetupAndMenus/Header/LanguageButton";
import { classColours } from "General/Engine/ClassData";
import classIcons from "General/Modules/IconFunctions/ClassIcons";
import GameTypeSwitch from "../SetupAndMenus/GameTypeToggle";
import WelcomeGameTypeSwitch from "./WelcomeGameTypeToggle";

interface WelcomeDialogProps {
  welcomeOpen: boolean;
  finishWelcome: (gameType: gameTypes, playerClass: string) => void;
}

export default function WelcomeDialog({ welcomeOpen, finishWelcome }: WelcomeDialogProps) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [selectedClass, setSelectedClass] = useState("Restoration Druid");
  const [selectedGameType, setSelectedGameType] = useState<gameTypes>("Retail");

  const classNames = {"Retail": CONSTANTS.specs, "Classic": CONSTANTS.classicSpecs.filter(spec => (spec !== "Restoration Shaman Classic"))};

  const classList = selectedGameType === "Retail" ? classNames["Retail"] : classNames["Classic"];

  const getClassPanel = (playerClass: string) => {
    switch (playerClass) {
      case "Restoration Druid":
      case "Restoration Druid Classic":
        return druidPanel; // Replace with the correct image for each class
      case "Holy Priest":
      case "Holy Priest Classic":
        return hpriestPanel; // Replace with actual image path
      case "Discipline Priest":
      case "Discipline Priest Classic":
        return dpriestPanel; // Replace with actual image path
      case "Restoration Shaman":
      case "Restoration Shaman Classic":
        return shamanPanel; // Replace with actual image path
      case "Holy Paladin":
      case "Holy Paladin Classic":
        return paladinPanel; // Replace with actual image path
      case "Mistweaver Monk":
      case "Mistweaver Monk Classic":
        return monkPanel; // Replace with actual image path
      case "Preservation Evoker":
        return evokerPanel; // Replace with actual image path
      default:
        return druidPanel; // Fallback to Druid panel if not found
    }
  }

  const getShortClassName = (playerSpec: string) => {
    if (playerSpec.includes("Holy Priest")) return "H Priest";
    else if (playerSpec.includes("Discipline Priest")) return "D Priest";
    else return playerSpec.split(" ")[1]
  }


  const handleCreate = () => {
    // They've locked in their selections. 
    if (selectedClass) {
      finishWelcome(selectedGameType, selectedClass);
    }
  };

  const handleGameTypeChange = (newGameType : gameTypes) => {
    setSelectedGameType(newGameType);
    setSelectedClass(classNames[newGameType][0]); // Reset to the first class of the new game type
  }

  return (
    <Dialog open={welcomeOpen} maxWidth="md" fullWidth>
      <DialogContent>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <img src={logo} alt="QE Live" />
          </Grid>
          <Grid item>
            <Typography variant="h6" align="center">
              {"Welcome to QE Live! Select an era:"}
            </Typography>
          </Grid>
          <Grid item>
            <WelcomeGameTypeSwitch gameType={selectedGameType} handleGameTypeChange={handleGameTypeChange} />
          </Grid>
          
          <Grid item>
            <hr></hr>
            <Typography variant="h6" align="center">
              {"Next, pick a class. You can change this at any time."}
            </Typography>
          </Grid>
          <Grid item container spacing={0} justifyContent="center" style={{ gap: 0 }}>
            {classList.map((playerClass) => (
              <Grid item key={playerClass} style={{ padding: 0, margin: 0, textAlign: "center" }}>
                <Button
                  onClick={() => setSelectedClass(playerClass)}
                  variant={selectedClass === playerClass ? "contained" : "outlined"}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: selectedClass === playerClass ? "rgba(80, 160, 160, 0.4)" : "transparent",
                    minWidth: 0,
                    padding: 0,
                    margin: 0,
                    border: selectedClass === playerClass
                      ? "2px solid " + classColours(playerClass)
                      : "1px solid " + classColours(playerClass),
                  }}
                >
                  <img
                    src={getClassPanel(playerClass)} // Replace with the correct image for each class
                    alt={playerClass}
                    style={{
                      display: "block",
                      height: 300,
                      width: 100,
                    }}
                  />
                  <Typography variant="caption" style={{ color: classColours(playerClass), marginTop: 4 }}>
                    {getShortClassName(playerClass)}
                  </Typography>
                </Button>
              </Grid>
            ))}
          </Grid>

        </Grid>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center", padding: "24px" }}>
        <Button
          onClick={handleCreate}
          color="primary"
          variant="contained"
          disabled={!selectedClass}
          style={{
            padding: "12px 30px",
            fontSize: "1.25rem",
          }}
        >
          {"Begin!"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
