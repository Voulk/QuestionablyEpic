import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { raidDB } from "General/Modules/CooldownPlanner/Data/CooldownPlannerBossList";

interface RaidSelectorProps {
  currentRaid: number;
  changeRaid: (raid: number) => void;
  expansion: number;
}

const RaidSelector: React.FC<RaidSelectorProps> = ({ currentRaid, changeRaid, expansion }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeRaid(parseInt(e.target.value, 10));
  };

  return (
    <TextField id="RaidSelector" select value={currentRaid} onChange={handleChange} label={t("CooldownPlanner.TableLabels.RaidSelectorLabel")} size="small" sx={{ minWidth: 200, width: "100%" }}>
      {raidDB
        .filter((obj) => obj.expansion === expansion)
        .map((key, i, arr) => {
          let lastItem = i + 1 === arr.length ? false : true;
          return (
            <MenuItem divider={lastItem} key={"RS" + i} value={key.ID}>
              <img
                style={{ height: 18, width: 18, margin: "2px 5px 0px 0px", verticalAlign: "middle", borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }}
                src={key.icon}
                alt={key.name[currentLanguage]}
              />
              {key.name[currentLanguage]}
            </MenuItem>
          );
        })}
    </TextField>
  );
};

export default RaidSelector;
