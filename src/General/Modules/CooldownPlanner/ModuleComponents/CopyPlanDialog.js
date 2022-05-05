import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, TextField, DialogContent, DialogTitle, Dialog, DialogActions, Typography, Grid, MenuItem, Tooltip } from "@mui/material";

export default function CopyPlanDialog(props) {
  const { handleCopyPlanDialogClose, handleCopyPlanDialogClickOpen, openCopyPlanDialog, cooldownObject, currentBoss, loadPlanData, currentPlan, currentDifficulty, disabledCheck } = props;
  const [planName, setPlanName] = useState(currentPlan);
  const [newPlanName, setNewPlanName] = useState("");
  const bossPlans = Object.keys(cooldownObject.getCooldowns(currentBoss, currentDifficulty));
  const duplicatePlanNameCheck = bossPlans.includes(newPlanName) ? true : false;
  const { t, i18n } = useTranslation();

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

  const copyPlan = (planName, boss, newPlan, currentDif) => {
    cooldownObject.copyNewPlan(planName, boss, newPlan, currentDif);
    loadPlanData(boss, newPlan, currentDif);
    handleCopyPlanDialogClose(true);
    setPlanName("");
    setNewPlanName("");
  };

  return (
    <div>
      <Tooltip title={t("CooldownPlanner.CopyPlanDialog.ButtonTooltip")} arrow>
        <span>
          <Button key={8} variant="outlined" color="primary" onClick={handleCopyPlanDialogClickOpen} disabled={disabledCheck || currentPlan === ""} sx={{ width: "100%" }}>
            {t("CooldownPlanner.CopyPlanDialog.ButtonLabel")}
          </Button>
        </span>
      </Tooltip>

      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openCopyPlanDialog} maxWidth="xs" fullWidth>
        <DialogTitle id="simple-dialog-title">Copy Plan</DialogTitle>
        <DialogContent>
          <Grid container spacing={1} sx={{ marginTop: "4px" }}>
            <Grid item xs={12}>
              <Typography variant="subtitle2">{t("CooldownPlanner.CopyPlanDialog.NewPlanTitle")}</Typography>
              <TextField
                error={duplicatePlanNameCheck}
                helperText={duplicatePlanNameCheck ? t("CooldownPlanner.DuplicatePlanError") : ""}
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
          <Button
            key={8}
            variant="contained"
            color="primary"
            onClick={(e) => copyPlan(planName, currentBoss, newPlanName, currentDifficulty)}
            size="small"
            disabled={duplicatePlanNameCheck || newPlanName === ""}
          >
            {t("CooldownPlanner.CopyPlanDialog.ButtonLabel")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
