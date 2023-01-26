import React from "react";
import { ListSubheader, MenuItem } from "@mui/material";
import { getTranslatedClassNameCD, getClassColourCD, getClassIconCD } from "locale/ClassNames";
import { useTranslation } from "react-i18next";

export const classMenus = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const healerClasses = ["Paladin", "Priest", "Druid", "Evoker", "Monk", "Shaman", "DemonHunter", "Warrior", "DeathKnight"];

  const healerHeader = <ListSubheader key={"Header1"}>{t("Class")}</ListSubheader>;
  const healerMenuItems = () => {
    return healerClasses.map((key) => (
      <MenuItem divider style={{ color: getClassColourCD(key) }} value={key} key={key}>
        <img
          style={{
            height: 20,
            width: 20,
            padding: "0px 5px 0px 5px",
            verticalAlign: "middle",
          }}
          src={getClassIconCD(key)}
          alt="Holy Paladin"
        />
        {getTranslatedClassNameCD(key, currentLanguage)}
      </MenuItem>
    ));
  };

  let finalMenu = [healerHeader, healerMenuItems()];

  return finalMenu;
};
