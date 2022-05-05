import React from "react";
import { useTranslation } from "react-i18next";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip, Typography } from "@mui/material";

export default function ExportPlanDialog(props) {
  const { t } = useTranslation();
  const { data, planName, boss, currentDifficulty, disabledCheck, currentPlan } = props;
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const rosterReducer = (plan) => {
    let roster = [];
    plan.map((key) => {
      if (key.name0) {
        roster.push({ name: key.name0, class: key.class0 });
      }
      if (key.name1) {
        roster.push({ name: key.name1, class: key.class1 });
      }
      if (key.name2) {
        roster.push({ name: key.name2, class: key.class2 });
      }
      if (key.name3) {
        roster.push({ name: key.name3, class: key.class3 });
      }
      if (key.name4) {
        roster.push({ name: key.name4, class: key.class4 });
      }
    });

    roster = roster.filter((value, index, self) => index === self.findIndex((t) => t.name === value.name && t.class === value.class));

    return roster;
  };

  function exportPlanEngine(planName, plan, boss) {
    let exportString = "";
    let roster = JSON.stringify(rosterReducer(plan));
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
      "# Plan=" +
      stringifiedPLan +
      "\n" +
      "# Roster=" +
      roster;

    return exportString;
  }

  return (
    <div>
      <Tooltip title={""} arrow>
        <Button disableElevation={true} sx={{ fontSize: "14px", width: "100%" }} onClick={handleClickOpen} variant="outlined" color="primary" disabled={disabledCheck || currentPlan === ""}>
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
