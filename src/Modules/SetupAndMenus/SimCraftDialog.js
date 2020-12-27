import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@material-ui/core";
import { runSimC } from "../Engine/SimCImport/SimCImportEngine";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";

export default function SimCraftInput(props) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [simC, setSimC] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const characterCount = props.allChars.getAllChar().length || 0;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    runSimC(
      simC,
      props.pl,
      props.contentType,
      setErrorMessage,
      props.simcSnack,
      handleClose,
      setSimC
    );
  };

  return (
    <div>
      <Tooltip title={t("QeHeader.Tooltip.SimC")} arrow>
        <Button
          style={{ whiteSpace: "nowrap" }}
          onClick={handleClickOpen}
          disabled={characterCount === 0}
        >
          {t("SimCInput.SimCHeaderButtonLabel")}
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">
          {t("SimCInput.SimCDialogueTitle")}
        </DialogTitle>
        <DialogContent style={{ height: 400 }}>
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
                // Do code here
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <p id="SimCError">{errorMessage}</p>
          <Button onClick={handleClose} color="primary">
            {t("Cancel")}
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {t("Submit")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
