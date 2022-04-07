import React, { useState } from "react";
import { Button, TextField, DialogContent, DialogTitle, Dialog, DialogActions, Tooltip, Grid, MenuItem, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { bossList } from "../Data/CooldownPlannerBossList";
import bossIcons from "../Functions/IconFunctions/BossIcons";

export default function AddPlanDialog(props) {
  const {
    handleAddPlanDialogClose,
    handleAddPlanDialogClickOpen,
    openAddPlanDialog,
    cooldownObject,
    currentBoss,
    loadPlanData,
    currentDifficulty,
    disabledCheck,
    changeDifficulty,
    changeBoss,
    currentRaid,
  } = props;
  const [planName, setPlanName] = useState("");
  const bossPlans = Object.keys(cooldownObject.getCooldowns(currentBoss, currentDifficulty));
  const duplicatePlanNameCheck = bossPlans.includes(planName) ? true : false;
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;

  const handleClose = () => {
    setPlanName("");
    handleAddPlanDialogClose(true);
  };

  const onChangeNewPlanName = (event) => {
    setPlanName(event.target.value);
  };

  const addPlan = (planName, boss, currentDif) => {
    cooldownObject.addNewPlan(planName, boss, currentDif);
    loadPlanData(boss, planName, currentDif);
    handleAddPlanDialogClose(true);
    setPlanName("");
  };

  const [planType, setPlanType] = React.useState("default");

  const newPlanType = (event, newPlanType) => {
    setPlanType(newPlanType);
  };

  return (
    <div>
      <Tooltip title={t("CooldownPlanner.AddPlanDialog.ButtonTooltip")} arrow>
        <Button key={8} variant="outlined" color="primary" onClick={handleAddPlanDialogClickOpen} disabled={disabledCheck}>
          {t("CooldownPlanner.AddPlanDialog.ButtonLabel")}
        </Button>
      </Tooltip>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openAddPlanDialog} maxWidth="xs" fullWidth>
        <DialogTitle id="simple-dialog-title">{t("CooldownPlanner.AddPlanDialog.HeaderTitle")}</DialogTitle>
        <DialogContent>
          <Grid item container spacing={1} xl={12} alignItems="center" sx={{ marginTop: "1px" }}>
            <Grid item xl={12}>
              <TextField sx={{ minWidth: 100, width: "100%" }} size="small" select value={currentBoss} onChange={(e) => changeBoss(e.target.value, currentDifficulty)}>
                {bossList
                  .filter((obj) => {
                    return obj.zoneID === currentRaid;
                  })
                  .map((key, i, arr) => {
                    let lastItem = i + 1 === arr.length ? false : true;
                    return (
                      <MenuItem divider={lastItem} key={"BS" + i} value={key.DungeonEncounterID}>
                        {bossIcons(key.DungeonEncounterID)}
                        {key.name[currentLanguage]}
                      </MenuItem>
                    );
                  })}
              </TextField>
            </Grid>
            <Grid item xl={12}>
              <Typography align="center">Difficulty</Typography>
            </Grid>

            <Grid item xl={12}>
              <ToggleButtonGroup value={currentDifficulty} exclusive onChange={(e) => changeDifficulty(currentBoss, e.target.value)} aria-label="text alignment" fullWidth>
                <ToggleButton value="Heroic" aria-label="Heroic">
                  Heroic
                </ToggleButton>
                <ToggleButton value="Mythic" aria-label="Mythic">
                  Mythic
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xl={12}>
              <Typography align="center">New Plan Type</Typography>
            </Grid>
            <Grid item xl={12}>
              <ToggleButtonGroup value={planType} exclusive onChange={newPlanType} aria-label="PlanTypeToggle" fullWidth>
                <ToggleButton value="BlankPlan" aria-label="BlankPlan">
                  Blank Plan
                </ToggleButton>

                <ToggleButton value="default" aria-label="Default">
                  Default
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xl={12}>
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
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button key={8} variant="contained" color="primary" onClick={(e) => addPlan(planName, currentBoss, currentDifficulty)} size="small" disabled={duplicatePlanNameCheck || planName === ""}>
            {t("CooldownPlanner.AddPlanDialog.ButtonLabel")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
