import React, { useState } from "react";
import { Button, TextField, DialogContent, DialogTitle, Dialog, DialogActions } from "@mui/material";
import { red } from "@mui/material/colors";
import { createTheme, ThemeProvider, StyledEngineProvider } from "@mui/material/styles";

const deleteTheme = createTheme({
  palette: {
    primary: red,
  },
});

export default function AddPlanDialog(props) {
  const { handleDeletePlanDialogClose, currentPlan, openDeletePlanDialog, cooldownObject, currentBoss, setCurrentPlan, setData } = props;
  const [deleteChecker, setdeleteChecker] = useState("");

  const handleClose = () => {
    handleDeletePlanDialogClose(true);
  };

  const deleteCheck = (event) => {
    setdeleteChecker(event.target.value);
  };

  const deletePlan = (planName, boss) => {
    cooldownObject.deletePlan(planName, boss);
    setCurrentPlan("");
    handleDeletePlanDialogClose(true);
    setdeleteChecker("");
    setData([]);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openDeletePlanDialog}>
      <DialogTitle id="simple-dialog-title">Are you sure you want to delete the current plan?</DialogTitle>
      <DialogContent>
        <TextField variant="outlined" fullWidth id="standard-required" label="Type 'Delete' to confirm" defaultValue="" value={deleteChecker} onChange={deleteCheck} />
      </DialogContent>
      <DialogActions>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={deleteTheme}>
            <Button
              key={"deletePlanButton"}
              variant="contained"
              color="primary"
              onClick={(e) => deletePlan(currentPlan, currentBoss)}
              size="small"
              disabled={deleteChecker === "Delete" || deleteChecker === "delete" ? false : true}
            >
              Delete Plan
            </Button>
          </ThemeProvider>
        </StyledEngineProvider>
      </DialogActions>
    </Dialog>
  );
}
