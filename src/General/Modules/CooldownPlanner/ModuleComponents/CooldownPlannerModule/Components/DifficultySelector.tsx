import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";

interface DifficultySelectorProps {
  currentDifficulty: string;
  changeDifficulty: (difficulty: string) => void;
  disabled: boolean;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ currentDifficulty, changeDifficulty, disabled }) => {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeDifficulty(e.target.value);
  };

  return (
    <TextField sx={{ minWidth: 100, width: "100%" }} select label={t("Difficulty")} value={currentDifficulty} onChange={handleChange} disabled={disabled} size="small">
      {["Heroic", "Mythic"].map((difficulty, i, arr) => {
        const lastItem = i + 1 === arr.length;
        return (
          <MenuItem key={difficulty} divider={lastItem} value={difficulty}>
            {difficulty}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default DifficultySelector;
