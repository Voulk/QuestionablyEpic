import React, { useState } from "react";
import { styled } from "@mui/system";
import logo from "Images/QeAssets/QELogo.png";
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
  onClose: () => void;
  finishWelcome: (gameType: gameTypes, playerClass: string) => void;
}

export default function WelcomeDialog({ welcomeOpen, onClose, onCreate , finishWelcome }: WelcomeDialogProps) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedGameType, setSelectedGameType] = useState<gameTypes>("Retail");

  const classList = selectedGameType === "Retail" ? [
    "Restoration Druid",
    "Holy Priest",
    "Restoration Shaman",
    "Holy Paladin",
    "Mistweaver Monk",
    "Preservation Evoker",
  ] : 
  [
    "Restoration Druid Classic",
    "Holy Priest Classic",
    "Discipline Priest Classic",
    "Restoration Shaman Classic",
    "Holy Paladin Classic",
    "Mistweaver Monk Classic",

  ];

  const handleCreate = () => {
    // They've locked in their selections. 
    if (selectedClass) {
      finishWelcome(selectedGameType, selectedClass);
      onClose();
    }
  };

  const handleGameTypeChange = (newGameType : gameTypes) => {
    setSelectedGameType(newGameType)
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
            <Typography variant="h6" align="center">
              {"Next, pick a class. You can change this at any time."}
            </Typography>
          </Grid>
          <Grid item container spacing={1} justifyContent="center">
            {classList.map((playerClass) => (
              <Grid item key={playerClass}>
                <Button
                  onClick={() => setSelectedClass(playerClass)}
                  variant={selectedClass === playerClass ? "contained" : "outlined"}
                  style={{
                    borderColor: classColours(playerClass),
                    color: classColours(playerClass),
                  }}
                >
                  {classIcons(playerClass, {
                    height: 20,
                    width: 20,
                    marginRight: 4,
                  })}
                  {playerClass}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{ justifyContent: "space-between" }}>
        <LanguageSelector />
        <Button
          onClick={handleCreate}
          color="primary"
          variant="outlined"
          disabled={!selectedClass}
        >
          {"Go!"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
