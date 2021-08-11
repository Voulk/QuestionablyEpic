import React from "react";
import { useTranslation } from "react-i18next";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip, Typography, Link } from "@material-ui/core";

export default function ImportPlanDialog(props) {
  const { t } = useTranslation();
  const { variant, disableElevation, buttonLabel, color, cooldownObject, loadPlanData } = props;
  const [open, setOpen] = React.useState(false);
  const [importedPlanString, setImportedPlanString] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /* -------------------------- process the imported string into the app -------------------------- */
  const processplan = (importedString, cooldownObject) => {
    let importedPlan = "";
    let importedBoss = "";
    let importPlanName = "";

    var lines = importedString.split("\n");

    for (var i = 0; i < lines.length; i++) {
      let line = lines[i];
      console.log();
      /* ------------------------- If line includes "Boss=" then process line ------------------------- */
      if (line.includes("Boss=")) {
        importedBoss = parseInt(line.split("Boss=")[1]);
      }

      /* ------------------------ If line includes "PlanName" then process line ----------------------- */
      if (line.includes("PlanName=")) {
        importPlanName = line.split("PlanName=")[1];
      }
    }
    /* ---------------- Split the imported plan object from the string and parse it. ---------------- */
    importedPlan = JSON.parse(importedString.split("Plan=")[1]);

    cooldownObject.importPlan(importedBoss, importPlanName, importedPlan);
    loadPlanData(importedBoss, importPlanName);
  };

  const handleSubmit = () => {
    processplan(importedPlanString, cooldownObject);
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title={""} arrow>
        <Button disableElevation={disableElevation} color={color} style={{ fontSize: "14px" }} onClick={handleClickOpen} variant={variant}>
          {buttonLabel}
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} aria-labelledby="simc-dialog-title" maxWidth="md" fullWidth={true}>
        <DialogTitle id="simc-dialog-title">Import Plan</DialogTitle>
        <DialogContent style={{ height: 400 }}>
          <TextField
            autoFocus
            multiline={true}
            margin="dense"
            id="simcentry"
            label={"Import"}
            fullWidth
            style={{ height: "100%" }}
            variant="outlined"
            onChange={(e) => setImportedPlanString(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
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
