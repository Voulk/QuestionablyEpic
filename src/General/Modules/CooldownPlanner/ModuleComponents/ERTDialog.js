import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, TextField, Dialog, Grid, DialogContent, DialogTitle, Tooltip, Typography, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { getBossName } from "../Data/CooldownPlannerBossList";
import ertEngine from "../ModuleComponents/Engine/ERTEngine";

export default function ExportERTDialog(props) {
  const { t, i18n } = useTranslation();
  const { boss, currentPlan, disabledCheck, tableData } = props;
  const [open, setOpen] = React.useState(false);
  const [hideNoCooldownsChecked, setHideNoCooldownsChecked] = React.useState(false);
  const [ertData, setERTData] = React.useState([]);
  const currentLanguage = i18n.language;
  useEffect(() => {
    ertEngine(tableData, boss, currentLanguage, setERTData, hideNoCooldownsChecked);
  }, [tableData, hideNoCooldownsChecked]);

  const handleChangeNoCooldownsChecked = (event) => {
    setHideNoCooldownsChecked(event.target.checked);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ertFormat = () => {
    let data = "";
    let currentBoss = getBossName(boss, currentLanguage);
    let newString = `|cffffff00${currentBoss} - ${currentPlan}|r`;
    data = ertData;
    data.map((key) => (newString = newString.concat("\n", key.ert)));
    return newString;
  };

  return (
    <div>
      <Tooltip title={t("CooldownPlanner.NoteExportDialog.NoteExportTooltip")} arrow>
        <span>
          <Button
            variant="outlined"
            disableElevation={true}
            color="primary"
            style={{ fontSize: "14px", width: "100%" }}
            onClick={handleClickOpen}
            disabled={currentPlan === "" || disabledCheck ? true : false}
          >
            {t("CooldownPlanner.NoteExportDialog.ButtonLabel")}
          </Button>
        </span>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} aria-labelledby="simc-dialog-title" maxWidth="md" fullWidth={true}>
        <DialogTitle id="ert-dialog-title" sx={{ paddingBottom: 0 }}>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={12}>
              <Typography variant="h6" color="primary">
                {t("CooldownPlanner.NoteExportDialog.HeaderTitle")}
              </Typography>
            </Grid>
            <Grid item>
              <FormGroup row>
                <FormControlLabel control={<Checkbox size="small" checked={hideNoCooldownsChecked} onChange={handleChangeNoCooldownsChecked} />} label="Hide lines with no cooldowns?" />
              </FormGroup>
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
