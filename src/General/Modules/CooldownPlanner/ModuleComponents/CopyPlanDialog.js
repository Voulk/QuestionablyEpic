import React, { useState, useEffect } from "react";
import { Button, TextField, DialogContent, DialogTitle, Dialog, DialogActions, Typography, Grid, MenuItem } from "@mui/material";

export default function AddPlanDialog(props) {
  const { handleCopyPlanDialogClose, openCopyPlanDialog, cooldownObject, currentBoss, loadPlanData, currentPlan } = props;
  const [planName, setPlanName] = useState(currentPlan);
  const [newPlanName, setNewPlanName] = useState("");
  const bossPlans = Object.keys(cooldownObject.getCooldowns(currentBoss));
  const duplicatePlanNameCheck = bossPlans.includes(newPlanName) ? true : false;

  // On open/close update the currently open plan
  useEffect(() => {
    setPlanName(currentPlan);
  }, [openCopyPlanDialog]);

  const handleClose = () => {
    setPlanName("");
    handleCopyPlanDialogClose(true);
  };

  const onChangeNewPlanName = (event) => {
    setNewPlanName(event.target.value);
  };

  const copyPlan = (planName, boss, newPlan) => {
    cooldownObject.copyNewPlan(planName, boss, newPlan);
    loadPlanData(boss, newPlan);
    handleCopyPlanDialogClose(true);
    setPlanName("");
    setNewPlanName("");
  };

  console.log(planName);

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openCopyPlanDialog} maxWidth="xs" fullWidth>
      <DialogTitle id="simple-dialog-title">Copy Plan</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} sx={{ marginTop: "4px" }}>
          <Grid item xs={12}>
            <Typography variant="subtitle2">Select plan to copy</Typography>
            <TextField key={currentPlan} select value={planName} onChange={(e) => setPlanName(e.target.value)} fullWidth variant="outlined" size="small">
              {cooldownObject.getBossPlanNames(currentBoss).map((key, i, arr) => {
                let lastItem = i + 1 === arr.length ? false : true;
                return (
                  <MenuItem divider={lastItem} value={key}>
                    {key}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">New Plan Name</Typography>
            <TextField
              error={duplicatePlanNameCheck}
              helperText={duplicatePlanNameCheck ? "Duplicate plan name detected, please choose another." : ""}
              fullWidth
              variant="outlined"
              defaultValue=""
              value={newPlanName}
              onChange={onChangeNewPlanName}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button key={8} variant="contained" color="primary" onClick={(e) => copyPlan(planName, currentBoss, newPlanName)} size="small" disabled={duplicatePlanNameCheck || newPlanName === ""}>
          Add Plan
        </Button>
      </DialogActions>
    </Dialog>
  );
}
