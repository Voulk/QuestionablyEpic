import React from "react";
import { useTranslation } from "react-i18next";
import { Button, TextField, Dialog, Grid, Divider, DialogActions, DialogContent, DialogTitle, Tooltip, Typography, FormControl, InputLabel, Select, MenuItem, Paper } from "@mui/material";
import { bossList } from "../Data/CooldownPlannerBossList";

export default function ExportERTDialog(props) {
  const { t } = useTranslation();
  const { ertListTimeIcons, boss, currentPlan, disabledCheck } = props;
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ertFormat = () => {
    let data = "";
    const bossID = bossList
      .filter((obj) => {
        return obj.DungeonEncounterID === boss;
      })
      .map((key, i) => key.ID);
    let currentBoss = t("BossNames." + bossID);
    let newString = "|cffffff00" + currentBoss + " - " + currentPlan + "|r";

    data = ertListTimeIcons;
    data.map((key) => (newString = newString.concat("\n", key.ert)));
    return newString;
  };

  return (
    <div>
      <Tooltip title={t("CooldownPlanner.NoteExportDialog.NoteExportTooltip")} arrow>
        <Button variant="outlined" disableElevation={true} color="primary" style={{ fontSize: "14px" }} onClick={handleClickOpen} disabled={currentPlan === "" || disabledCheck ? true : false}>
          {t("CooldownPlanner.NoteExportDialog.ButtonLabel")}
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} aria-labelledby="simc-dialog-title" maxWidth="md" fullWidth={true}>
        <DialogTitle id="ert-dialog-title">
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography variant="h6" color="primary">
                {t("CooldownPlanner.NoteExportDialog.HeaderTitle")}
              </Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <TextField autoFocus multiline={true} margin="dense" id="exportPlanID" fullWidth style={{ height: "100%" }} variant="outlined" value={ertFormat()} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
