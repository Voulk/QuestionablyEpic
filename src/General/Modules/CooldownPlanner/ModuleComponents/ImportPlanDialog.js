import React from "react";
import { useTranslation } from "react-i18next";
import ls from "local-storage";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip, Typography, Link, Switch, FormControlLabel } from "@mui/material";

export default function ImportPlanDialog(props) {
  const { t } = useTranslation();
  const { cooldownObject, loadPlanData } = props;
  const [open, setOpen] = React.useState(false);
  const [importedPlanString, setImportedPlanString] = React.useState("");
  const [error, setError] = React.useState(false);
  const [disableButton, setDisableButton] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const [checked, setChecked] = React.useState(false);

  const handleRosterImportSwitch = (event) => {
    setChecked(event.target.checked);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setError(false);
    setOpen(false);
  };

  /* --------------- Check that the pasted string is compatible (Needs further work) -------------- */
  const checkForQEString = (importedString) => {
    var lines = importedString.split("\n");
    if (lines[0] !== "# QE Cooldown Planner") {
      // if header line is missing set error message
      setError(true);
      setErrorMessage(t("CooldownPlanner.ImportPlanDialog.Errors.HeaderError"));
      setDisableButton(true);
    } else {
      // If header line is there set no errors
      lines[0] === "# QE Cooldown Planner" ? setError(false) : setError(true);
      // Generic error handling set error as string error
      error ? setErrorMessage(t("CooldownPlanner.ImportPlanDialog.Errors.StringError")) : "";
      // if no error check for duplicate plan names
      error ? "" : checkForDuplicatePlan(importedString);
      error ? setDisableButton(true) : setDisableButton(false);
    }
  };

  /* --- Check and warn for Duplicate Plan Names as it will be overwritten by the imported plan --- */
  const checkForDuplicatePlan = (importedString) => {
    let importedBoss = "";
    let importPlanName = "";
    let importDifficulty = "";

    var lines = importedString.split("\n");

    for (var i = 0; i < lines.length; i++) {
      let line = lines[i];
      /* ------------------------- If line includes "Boss=" then process line ------------------------- */
      if (line.includes("Boss=")) {
        importedBoss = parseInt(line.split("Boss=")[1]);
      }
      /* ------------------------ If line includes "PlanName" then process line ----------------------- */
      if (line.includes("PlanName=")) {
        importPlanName = line.split("PlanName=")[1];
      }

      if (line.includes("Difficulty=")) {
        importDifficulty = line.split("Difficulty=")[1];
      }
    }

    /* ---------------------- Retreive the list of plans for the imported boss ---------------------- */
    const bossPlans = Object.keys(cooldownObject.getCooldowns(importedBoss, importDifficulty));
    /* ---------------------------- Check if the plan name exists already --------------------------- */
    const duplicatePlanNameCheck = bossPlans.includes(importPlanName) ? true : false;
    // Set Warning if duplicate detected
    duplicatePlanNameCheck ? setErrorMessage(t("CooldownPlanner.ImportPlanDialog.Errors.DuplicatePlanWarning")) : "";
    setError(duplicatePlanNameCheck);
    setImportedPlanString(importedString);
  };

  /* -------------------------- process the imported string into the app -------------------------- */
  const processplan = (importedString, cooldownObject) => {
    let importedPlan = "";
    let importedBoss = "";
    let importPlanName = "";
    let importDifficulty = "";
    let importedRoster = "";
    let currentRoster = ls.get("healerInfo");

    var lines = importedString.split("\n");

    for (var i = 0; i < lines.length; i++) {
      let line = lines[i];
      /* ------------------------- If line includes "Boss=" then process line ------------------------- */
      if (line.includes("Boss=")) {
        importedBoss = parseInt(line.split("Boss=")[1]);
      }

      /* ------------------------ If line includes "PlanName" then process line ----------------------- */
      if (line.includes("PlanName=")) {
        importPlanName = line.split("PlanName=")[1];
      }

      if (line.includes("Difficulty=")) {
        importDifficulty = line.split("Difficulty=")[1];
      }
    }

    /* ---------------- Split the imported plan object from the string and parse it. ---------------- */
    const planStringPosition = importedString.split("Plan=")[1].search("# Roster");
    importedPlan = JSON.parse(importedString.split("Plan=")[1].slice(0, planStringPosition));

    if (checked === true) {
      importedRoster = JSON.parse(importedString.split("Roster=")[1]);

      var names = new Set(currentRoster.map((d) => d.name));
      var merged = [...currentRoster, ...importedRoster.filter((d) => !names.has(d.name))];

      ls.set("healerInfo", merged);
    }

    cooldownObject.importPlan(importedBoss, importPlanName, importedPlan, importDifficulty);

    loadPlanData(importedBoss, importPlanName, importDifficulty);
  };

  const handleSubmit = () => {
    processplan(importedPlanString, cooldownObject);
    setError(false);
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title={""} arrow>
        <Button variant="outlined" disableElevation={true} color="primary" sx={{ fontSize: "14px", width: "100%" }} onClick={handleClickOpen} disabled={props.disabledCheck}>
          {t("CooldownPlanner.ImportPlanDialog.ButtonLabel")}
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} aria-labelledby="simc-dialog-title" maxWidth="md" fullWidth={true}>
        <DialogTitle color="primary" id="simc-dialog-title">
          {t("CooldownPlanner.ImportPlanDialog.HeaderTitle")}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            multiline={true}
            error={error}
            helperText={error ? errorMessage : ""}
            margin="dense"
            id="simcentry"
            fullWidth
            sx={{ height: "100%" }}
            variant="outlined"
            onChange={(e) => checkForQEString(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <FormControlLabel
            sx={{ marginRight: 1 }}
            labelPlacement="start"
            control={<Switch checked={checked} onChange={handleRosterImportSwitch} inputProps={{ "aria-label": "controlled" }} />}
            label="Import Roster?"
          />
          <Button onClick={handleClose} color="primary" variant="outlined">
            {t("Cancel")}
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="outlined" disabled={disableButton || importedPlanString === ""}>
            {t("Submit")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
