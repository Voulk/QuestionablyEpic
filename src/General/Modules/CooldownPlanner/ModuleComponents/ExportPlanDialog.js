import React from "react";
import { useTranslation } from "react-i18next";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip, Typography } from "@material-ui/core";

export default function ExportPlanDialog(props) {
  // const { t } = useTranslation();
  const { variant, disableElevation, buttonLabel, data, color, planName, boss } = props;
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

    exportString = "# Boss=" + boss + "\n" + "# PlanName=" + planName + "\n" + "# " + "Plan=" + "\n" + stringifiedPLan;

    return exportString;
  }

  return (
    <div>
      <Tooltip title={""} arrow>
        <Button disableElevation={disableElevation} color={color} style={{ fontSize: "14px" }} onClick={handleClickOpen} variant={variant}>
          {buttonLabel}
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} aria-labelledby="simc-dialog-title" maxWidth="md" fullWidth={true}>
        <DialogTitle id="simc-dialog-title">{"Export Plan"}</DialogTitle>
        <DialogContent> Paste your cooldown string here</DialogContent>
        <DialogContent style={{ height: 300 }}>
          <TextField
            autoFocus
            multiline={true}
            margin="dense"
            id="exportPlanID"
            // label={"Paste your plan string here"}
            fullWidth
            style={{ height: "100%" }}
            variant="outlined"
            value={exportPlanEngine(planName, data, boss)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
