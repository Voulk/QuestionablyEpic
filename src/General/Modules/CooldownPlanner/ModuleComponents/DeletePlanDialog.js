import React, { useState } from "react";
import { Button, TextField, DialogContent, DialogTitle, Dialog, DialogActions } from "@mui/material";
import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

export default function AddPlanDialog(props) {
  const {
    handleDeletePlanDialogClose,
    handleDeletePlanDialogClickOpen,
    currentPlan,
    openDeletePlanDialog,
    cooldownObject,
    currentBoss,
    setCurrentPlan,
    setData,
    currentDifficulty,
    disabledCheck,
  } = props;
  const [deleteChecker, setdeleteChecker] = useState("");
  const { t, i18n } = useTranslation();

  const handleClose = () => {
    handleDeletePlanDialogClose(true);
  };

  const deleteCheck = (event) => {
    setdeleteChecker(event.target.value);
  };

  const deletePlan = (planName, boss, currentDif) => {
    cooldownObject.deletePlan(planName, boss, currentDif);
    setCurrentPlan("");
    handleDeletePlanDialogClose(true);
    setdeleteChecker("");
    setData([]);
  };

  return (
    <div>
      <Button
        key={8}
        variant="outlined"
        color="delete"
        onClick={handleDeletePlanDialogClickOpen}
        disabled={currentPlan === "default" || disabledCheck ? true : false || currentPlan === ""}
        sx={{ width: "100%" }}
      >
        {t("CooldownPlanner.DeletePlanDialog.ButtonLabel")}
      </Button>

      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openDeletePlanDialog}>
        <DialogTitle id="simple-dialog-title">{t("CooldownPlanner.DeletePlanDialog.HeaderTitle")}</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ paddingTop: "4px" }}
            variant="outlined"
            fullWidth
            id="standard-required"
            placeholder={t("CooldownPlanner.DeletePlanDialog.PlaceholderText")}
            defaultValue=""
            value={deleteChecker}
            onChange={deleteCheck}
          />
        </DialogContent>
        <DialogActions>
          <Button
            key={"deletePlanButton"}
            variant="contained"
            color="delete"
            onClick={(e) => deletePlan(currentPlan, currentBoss, currentDifficulty)}
            size="small"
            disabled={deleteChecker === "Delete" || deleteChecker === "delete" ? false : true}
          >
            {t("CooldownPlanner.DeletePlanDialog.ButtonLabel")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
