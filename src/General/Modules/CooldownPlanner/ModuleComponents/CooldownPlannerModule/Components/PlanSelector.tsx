import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";

interface PlanSelectorProps {
  currentPlan: string;
  currentBoss: number;
  currentDifficulty: string;
  loadPlanData: (bossId: number, planName: string, difficulty: string) => void;
  plans: string[];
  disabled: boolean;
}

const PlanSelector: React.FC<PlanSelectorProps> = ({ currentPlan, loadPlanData, currentBoss, currentDifficulty, plans, disabled }) => {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    loadPlanData(currentBoss, e.target.value, currentDifficulty);
  };

  return (
    <TextField sx={{ minWidth: 100, width: "100%" }} select label={t("Plan")} value={currentPlan} onChange={handleChange} disabled={disabled} size="small">
      {plans.map((plan, i, arr) => {
        const lastItem = i + 1 === arr.length;
        return (
          <MenuItem key={plan} divider={lastItem} value={plan}>
            {plan}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default PlanSelector;
