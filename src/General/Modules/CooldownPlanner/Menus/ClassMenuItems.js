import React from "react";
import { ListSubheader, MenuItem } from "@mui/material";
import { getTranslatedClassName, getClassColour, getClassIcon } from "locale/ClassNames";
import { useTranslation } from "react-i18next";

export const classMenus = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const healerClasses = ["HolyPaladin", "RestorationDruid", "HolyPriest", "DisciplinePriest", "RestorationShaman", "MistweaverMonk", "PreservationEvoker"];
  const utilityClasses = ["HavocDemonHunter", "Warrior", "DeathKnight", "Druid", "ShadowPriest", "DevastationEvoker"];

  const healerHeader = <ListSubheader key={"Header1"}>{t("Healers")}</ListSubheader>;
  const healerMenuItems = () => {
    return healerClasses.map((key) => (
      <MenuItem divider style={{ color: getClassColour(key) }} value={key} key={key}>
        <img
          style={{
            height: 20,
            width: 20,
            padding: "0px 5px 0px 5px",
            verticalAlign: "middle",
          }}
          src={getClassIcon(key)}
          alt="Holy Paladin"
        />
        {getTranslatedClassName(key, currentLanguage)}
      </MenuItem>
    ));
  };

  const utilityHeader = <ListSubheader key={"Header2"}>{t("Utility")}</ListSubheader>;
  const utilityMenuItems = () => {
    return utilityClasses.map((key) => (
      <MenuItem divider style={{ color: getClassColour(key) }} value={key} key={key}>
        <img
          style={{
            height: 20,
            width: 20,
            padding: "0px 5px 0px 5px",
            verticalAlign: "middle",
          }}
          src={getClassIcon(key)}
          alt="Holy Paladin"
        />
        {getTranslatedClassName(key, currentLanguage)}
      </MenuItem>
    ));
  };
  let finalMenu = [healerHeader, healerMenuItems(), utilityHeader, utilityMenuItems()];

  return finalMenu;
};
