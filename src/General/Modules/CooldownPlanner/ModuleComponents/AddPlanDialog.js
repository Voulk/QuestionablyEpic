import React, { useState } from "react";
import { Button, TextField, DialogContent, DialogTitle, Dialog, DialogActions, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function AddPlanDialog(props) {
  const { handleAddPlanDialogClose, handleAddPlanDialogClickOpen, openAddPlanDialog, cooldownObject, currentBoss, loadPlanData } = props;
  const [planName, setPlanName] = useState("");
  const bossPlans = Object.keys(cooldownObject.getCooldowns(currentBoss));
  const duplicatePlanNameCheck = bossPlans.includes(planName) ? true : false;
  const { t, i18n } = useTranslation();

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
    <div>
      <Tooltip title={t("CooldownPlanner.AddPlanDialog.ButtonTooltip")} arrow>
        <Button key={8} variant="outlined" color="primary" onClick={handleAddPlanDialogClickOpen}>
          {t("CooldownPlanner.AddPlanDialog.ButtonLabel")}
        </Button>
      </Tooltip>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openAddPlanDialog} maxWidth="xs" fullWidth>
        <DialogTitle id="simple-dialog-title">{t("CooldownPlanner.AddPlanDialog.HeaderTitle")}</DialogTitle>
        <DialogContent>
          <TextField
            error={duplicatePlanNameCheck}
            helperText={duplicatePlanNameCheck ? t("CooldownPlanner.DuplicatePlanError") : ""}
            fullWidth
            variant="outlined"
            defaultValue=""
            value={planName}
            onChange={onChangeNewPlanName}
            sx={{ marginTop: "4px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button key={8} variant="contained" color="primary" onClick={(e) => addPlan(planName, currentBoss)} size="small" disabled={duplicatePlanNameCheck || planName === ""}>
            {t("CooldownPlanner.AddPlanDialog.ButtonLabel")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
