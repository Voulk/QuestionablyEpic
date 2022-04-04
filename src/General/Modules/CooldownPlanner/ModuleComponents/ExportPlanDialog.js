import React from "react";
import { useTranslation } from "react-i18next";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip, Typography } from "@mui/material";

export default function ExportPlanDialog(props) {
  const { t } = useTranslation();
  const { data, planName, boss, currentDifficulty, disabledCheck } = props;
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function exportPlanEngine(planName, plan, boss) {
    let exportString = "";

    let stringifiedPLan = JSON.stringify(plan);

    exportString =
      "# QE Cooldown Planner" +
      "\n" +
      "# Version=0.9" +
      "\n" +
      "# Boss=" +
      boss +
      "\n" +
      "# Difficulty=" +
      currentDifficulty +
      "\n" +
      "# PlanName=" +
      planName +
      "\n" +
      "# " +
      "Plan=" +
      "\n" +
      stringifiedPLan;

    return exportString;
  }

  return (
    <div>
      <Tooltip title={""} arrow>
        <Button disableElevation={true} sx={{ fontSize: "14px" }} onClick={handleClickOpen} variant="outlined" color="primary" disabled={disabledCheck}>
          {t("CooldownPlanner.ExportPlanDialog.ButtonLabel")}
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} aria-labelledby="simc-dialog-title" maxWidth="md" fullWidth={true}>
        <DialogTitle color="primary" id="simc-dialog-title">
          {t("CooldownPlanner.ExportPlanDialog.HeaderTitle")}
        </DialogTitle>
        <DialogContent>
          <TextField autoFocus multiline={true} margin="dense" id="exportPlanID" fullWidth sx={{ height: "100%" }} value={exportPlanEngine(planName, data, boss)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
