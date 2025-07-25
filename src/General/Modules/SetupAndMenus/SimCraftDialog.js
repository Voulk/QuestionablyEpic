import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { runSimC } from "General/Items/GearImport/SimCImportEngine";
import { runClassicGearImport } from "General/Items/GearImport/ClassicImportEngine";
import { useSelector } from "react-redux";
import { styled } from "@mui/system";

const StyledButton = styled(Button)(({ theme }) => ({
  color: "white",
  border: "1px solid #ffffff3b",
  "&:hover": {
    color: "white",
    border: "1px solid #ffffff3b",
    backgroundColor: "rgb(255, 255, 255, 0.08)",
  },
}));

export default function SimCraftInput(props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [simC, setSimC] = useState(props.player.savedPTRString || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [autoUpgradeVault, setAutoUpgradeVault] = useState(true); // State for checkbox
  const [autoUpgradeAll, setAutoUpgradeAll] = useState(false); // State for checkbox
  const [useChallengeMode, setChallengeMode] = useState(false); // State for checkbox
  const contentType = useSelector((state) => state.contentType);
  const playerSettings = useSelector((state) => state.playerSettings);
  const characterCount = props.allChars.getAllChar().length || 0;
  const buttonVariant = props.variant;
  const gameType = useSelector((state) => state.gameType);
  const addonLink =
    gameType === "Classic"
      ? "https://www.curseforge.com/wow/addons/qe-live-gear-importer-Classic"
      : "https://www.curseforge.com/wow/addons/simulationcraft";

  const handleClickOpen = () => {
    setSimC(props.player.savedPTRString || "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
      if (gameType === "Retail") runSimC(simC, props.player, contentType, setErrorMessage, props.simcSnack, handleClose, setSimC, playerSettings, props.allChars, autoUpgradeVault, autoUpgradeAll); // Add autoUpgradeVault here.
      else runClassicGearImport(simC, props.player, contentType, setErrorMessage, props.simcSnack, handleClose, setSimC, props.allChars, useChallengeMode);
  };

  return (
    <div>
      <Tooltip title={t("QeHeader.Tooltip." + gameType + "SimC")} arrow>
        {props.charPanel ? (
          <StyledButton
            //disableElevation={props.disableElevation}
            color={"secondary"}
            style={{ fontSize: "14px", whiteSpace: "nowrap", border: "2px solid gold", borderRadius: "4px" }}      // optional for visual clarity }}
            onClick={handleClickOpen}
            disabled={characterCount === 0}
            variant={buttonVariant}
            fullWidth
          >
            {props.buttonLabel}
          </StyledButton>
        ) : (
          <StyledButton
            //disableElevation={props.disableElevation}
            color={"secondary"}
            style={{ fontSize: "14px", whiteSpace: "nowrap" }}      // optional for visual clarity }}
            onClick={handleClickOpen}
            disabled={characterCount === 0}
            variant={buttonVariant}
            fullWidth
          >
            {props.buttonLabel}
          </StyledButton>
        )}

      </Tooltip>
      <Dialog open={open} onClose={handleClose} aria-labelledby="simc-dialog-title" maxWidth="md" fullWidth={true}>
        <DialogTitle id="simc-dialog-title">{t("SimCInput.SimCDialogueTitle" + gameType)}</DialogTitle>
        <DialogContent style={{ height: 400 }}>
          <Link target="_blank" href={addonLink}>
            Click here to download the addon from Curse.
          </Link>
          <TextField
            autoFocus
            multiline={true}
            margin="dense"
            id="simcentry"
            label={t("SimCInput.SimCStringLabel")}
            fullWidth
            style={{ height: "100%" }}
            value={simC}
            variant="outlined"
            onChange={(e) => setSimC(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
            onFocus={(e) => e.target.select()} // Automatically selects text on focus
          />

        </DialogContent>
        <DialogActions>
        {gameType === "Retail" ? <FormControlLabel
            control={<Checkbox checked={autoUpgradeAll} onChange={() => setAutoUpgradeAll(!autoUpgradeAll)} />}
            label="Upgrade ALL to Max Level"
          /> : null}
          {/*<FormControlLabel
            control={<Checkbox checked={useChallengeMode} onChange={() => setChallengeMode(!useChallengeMode)} />}
            label="Import at 463"
          />
          */}
        {gameType === "Retail" ? <FormControlLabel
            control={<Checkbox checked={autoUpgradeVault} onChange={() => setAutoUpgradeVault(!autoUpgradeVault)} />}
            label="Upgrade Vault to Max Level"
          /> : ""}


          <p id="SimCError">{errorMessage}</p>
          <Button onClick={handleClose} color="primary" variant="outlined">
            {t("Cancel")}
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="outlined">
            {t("Submit")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
