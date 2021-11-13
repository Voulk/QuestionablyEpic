import React from "react";
import { useTranslation } from "react-i18next";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip, Typography, Link } from "@mui/material";
import { runSimC } from "../../../Retail/Engine/SimCImport/SimCImportEngine";
import { runBCSimC } from "../../../BurningCrusade/Engine/SimCImport/SimCImportEngineBC";
// import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";
import { useSelector } from "react-redux";

export default function SimCraftInput(props) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [simC, setSimC] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const contentType = useSelector((state) => state.contentType);
  const characterCount = props.allChars.getAllChar().length || 0;
  const buttonVariant = props.variant;
  const gameType = useSelector((state) => state.gameType);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (gameType === "Retail") runSimC(simC, props.player, contentType, setErrorMessage, props.simcSnack, handleClose, setSimC);
    else runBCSimC(simC, props.player, contentType, setErrorMessage, props.simcSnack, handleClose, setSimC);
    
  };

  return (
    <div>
      <Tooltip title={t("QeHeader.Tooltip." + gameType + "SimC")} arrow>
        <Button
          disableElevation={props.disableElevation}
          // style={{ whiteSpace: "nowrap" }}
          color={props.color}
          style={{ fontSize: "14px" }}
          onClick={handleClickOpen}
          disabled={characterCount === 0}
          variant={buttonVariant}
          fullWidth
        >
          {props.buttonLabel}
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} aria-labelledby="simc-dialog-title" maxWidth="md" fullWidth={true}>
        <DialogTitle id="simc-dialog-title">{t("SimCInput.SimCDialogueTitle" + gameType)}</DialogTitle>
        <DialogContent style={{ height: 400 }}>
          {gameType === "BurningCrusade" ? <Link target="_blank" href="https://www.curseforge.com/wow/addons/qe-live-gear-importer-bc">Click here to download the addon from Curse.</Link> : ""}
          <TextField
            autoFocus
            multiline={true}
            margin="dense"
            id="simcentry"
            label={t("SimCInput.SimCStringLabel")}
            fullWidth
            style={{ height: "100%" }}
            variant="outlined"
            onChange={(e) => setSimC(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
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
