import React from "react";
import { Translation } from "react-i18next";
import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";

import { cooldownDB } from "../Data/CooldownDB";

// TODO this should be converted to a map at some point

export default function ClassCooldownMenuItems(props) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  if (props === 0) {
    return [<MenuItem key={0}> No Class Selected </MenuItem>];
  }

  let menuItems = cooldownDB
    .filter((obj) => {
      if (props === "DisciplinePriest" || props === "HolyPriest") {
        // return spells that are spec only and spells shared by the class
        return (obj.class === props || obj.class === "Priest") && obj.cdPlannerMenuActive === true;
      } else {
        // return everything for that class
        return obj.class === props && obj.cdPlannerMenuActive === true;
      }
    })
    .map((map, i, arr) => {
      let lastItem = i + 1 === arr.length ? false : true;
      return (
        <MenuItem divider={lastItem} value={map.guid} key={map.name[currentLanguage]}>
          <a data-wowhead={"spell=" + map.guid}>
            <img
              style={{
                height: 20,
                width: 20,
                margin: "0px 5px 0px 0px",
                verticalAlign: "middle",
              }}
              src={map.icon}
              alt={map.name[currentLanguage]}
            />
          </a>
          {map.name[currentLanguage]}
        </MenuItem>
      );
    });

  return menuItems;
}
