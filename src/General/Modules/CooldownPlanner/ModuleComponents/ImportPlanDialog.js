import React from "react";
import { useTranslation } from "react-i18next";
import ls from "local-storage";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip, Switch, FormControlLabel } from "@mui/material";

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
      lines[0] === "# QE Cooldown Planner" ? setError(false) : setError(true); // If header line is there set no errors
      error ? setErrorMessage(t("CooldownPlanner.ImportPlanDialog.Errors.StringError")) : ""; // Generic error handling set error as string error
      error ? "" : checkForDuplicatePlan(importedString); // if no error check for duplicate plan names
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

    const bossPlans = Object.keys(cooldownObject.getCooldowns(importedBoss, importDifficulty)); // Retreive the list of plans for the imported boss
    const duplicatePlanNameCheck = bossPlans.includes(importPlanName) ? true : false; // Check if the plan name exists already
    // Set Warning if duplicate detected
    duplicatePlanNameCheck ? setErrorMessage(t("CooldownPlanner.ImportPlanDialog.Errors.DuplicatePlanWarning")) : "";
    setError(duplicatePlanNameCheck);
    setImportedPlanString(importedString);
  };

  const findAndReplace = (data, findVal, replaceVal) => {
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        if (typeof data[i] === "object") {
          data[i] = findAndReplace(data[i], findVal, replaceVal);
        } else if (data[i] === findVal) {
          data[i] = replaceVal;
        }
      }
    } else if (typeof data === "object") {
      const keys = Object.keys(data);
      for (let i = 0; i < keys.length; i++) {
        if (data[keys[i]] === findVal) {
          data[keys[i]] = replaceVal;
        } else if (typeof data[keys[i]] === "object") {
          data[keys[i]] = findAndReplace(data[keys[i]], findVal, replaceVal);
        }
      }
    }
    return data;
  };

  /* -------------------------- process the imported string into the app -------------------------- */
  const processplan = (importedString, cooldownObject) => {
    let importedPlan = "";
    let importedBoss = "";
    let importPlanName = "";
    let importDifficulty = "";
    let importedRoster = "";
    let currentRoster = ls.get("healerInfo");
    let lines = importedString.split("\n");

    // Replace old classes with new classes
    let classes = {
      HolyPriest: "Priest",
      DisciplinePriest: "Priest",
      RestorationDruid: "Druid",
      HolyPaladin: "Paladin",
      MistweaverMonk: "Monk",
      RestorationShaman: "Shaman",
      ShamanDPS: "Shaman",
      ShadowPriest: "Priest",
      HavocDemonHunter: "DemonHunter",
      PreservationEvoker: "Evoker",
      DevastationEvoker: "Evoker",
    };

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

    Object.entries(classes).forEach(([originalClass, newClass]) => {
      importedPlan = findAndReplace(importedPlan, originalClass, newClass);
    });

    if (checked === true) {
      importedRoster = JSON.parse(importedString.split("Roster=")[1]);

      let names = new Set(currentRoster.map((d) => d.name));
      let merged = [...currentRoster, ...importedRoster.filter((d) => !names.has(d.name))];
      Object.entries(classes).forEach(([originalClass, newClass]) => {
        merged = findAndReplace(merged, originalClass, newClass);
      });
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
