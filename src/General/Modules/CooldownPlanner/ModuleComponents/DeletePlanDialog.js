import React, { useState } from "react";
import { Button, TextField, DialogContent, DialogTitle, Dialog, DialogActions } from "@mui/material";
import { red } from "@mui/material/colors";
import { createTheme, ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const deleteTheme = createTheme({
  palette: {
    primary: red,
  },
});

export default function AddPlanDialog(props) {
  const { handleDeletePlanDialogClose, handleDeletePlanDialogClickOpen, currentPlan, openDeletePlanDialog, cooldownObject, currentBoss, setCurrentPlan, setData, currentDifficulty } = props;
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
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={deleteTheme}>
          <Button key={8} variant="outlined" color="primary" onClick={handleDeletePlanDialogClickOpen} disabled={currentPlan === "default" ? true : false}>
            {t("CooldownPlanner.DeletePlanDialog.ButtonLabel")}
          </Button>
        </ThemeProvider>
      </StyledEngineProvider>

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
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={deleteTheme}>
              <Button
                key={"deletePlanButton"}
                variant="contained"
                color="primary"
                onClick={(e) => deletePlan(currentPlan, currentBoss, currentDifficulty)}
                size="small"
                disabled={deleteChecker === "Delete" || deleteChecker === "delete" ? false : true}
              >
                {t("CooldownPlanner.DeletePlanDialog.ButtonLabel")}
              </Button>
            </ThemeProvider>
          </StyledEngineProvider>
        </DialogActions>
      </Dialog>
    </div>
  );
}
