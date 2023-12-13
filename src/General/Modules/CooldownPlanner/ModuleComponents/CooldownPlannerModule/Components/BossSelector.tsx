import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { bossList } from "General/Modules/CooldownPlanner/Data/CooldownPlannerBossList";
import bossIcons from "General/Modules/CooldownPlanner/Functions/IconFunctions/BossIcons";

interface BossSelectorProps {
  currentBoss: number;
  changeBoss: (bossId: number) => void;
  currentRaid: number;
}

const BossSelector: React.FC<BossSelectorProps> = ({ currentBoss, changeBoss, currentRaid }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeBoss(parseInt(e.target.value, 10));
  };

  return (
    <TextField sx={{ minWidth: 100, width: "100%" }} label={t("Boss")} select value={currentBoss} onChange={handleChange} size="small">
      {bossList
        .filter((obj) => obj.zoneID === currentRaid)
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
  );
};

export default BossSelector;
