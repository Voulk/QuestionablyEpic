import React, { useState } from "react";
import { Button, TextField, DialogContent, DialogTitle, Dialog, DialogActions } from "@mui/material";

export default function AddPlanDialog(props) {
  const { handleAddPlanDialogClose, openAddPlanDialog, cooldownObject, currentBoss, loadPlanData } = props;
  const [planName, setPlanName] = useState("");
  const bossPlans = Object.keys(cooldownObject.getCooldowns(currentBoss));
  const duplicatePlanNameCheck = bossPlans.includes(planName) ? true : false;

  const handleClose = () => {
    setPlanName("");
    handleAddPlanDialogClose(true);
  };

  const onChangeNewPlanName = (event) => {
    setPlanName(event.target.value);
  };

  const addPlan = (planName, boss) => {
    cooldownObject.addNewPlan(planName, boss);
    loadPlanData(boss, planName);
    handleAddPlanDialogClose(true);
    setPlanName("");
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openAddPlanDialog} maxWidth="sm" fullWidth>
      <DialogTitle id="simple-dialog-title">Enter Plan Name</DialogTitle>
      <DialogContent>
        <TextField
          error={duplicatePlanNameCheck}
          helperText={duplicatePlanNameCheck ? "Duplicate plan name detected, please choose another." : ""}
          fullWidth
          variant="outlined"
          defaultValue=""
          value={planName}
          onChange={onChangeNewPlanName}
          sx={{ marginTop: "4px" }}
        />
      </DialogContent>
      <DialogActions>
        <Button key={8} variant="contained" color="primary" onClick={(e) => addPlan(planName, currentBoss)} size="small" disabled={duplicatePlanNameCheck}>
          Add Plan
        </Button>
      </DialogActions>
    </Dialog>
  );
}
