
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, TextField, DialogContent, DialogTitle, Dialog, DialogActions, Divider, Paper, Select, Grid, Typography } from "@material-ui/core";

AddPlanDialog.propTypes = {
  handleAddPlanDialogClose: PropTypes.func.isRequired,
  openAddPlanDialog: PropTypes.bool.isRequired,
};

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
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openAddPlanDialog} maxWidth="sm" fullWidth style={{ padding: 30 }}>
      <DialogTitle id="simple-dialog-title">Enter Plan Name</DialogTitle>
      <DialogContent>
        <TextField
          error={duplicatePlanNameCheck}
          helperText={duplicatePlanNameCheck ? "Duplicate plan name detected, please choose another." : ""}
          fullWidth
          variant="outlined"
          label="Enter Plan Name"
          defaultValue=""
          value={planName}
          onChange={onChangeNewPlanName}
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
