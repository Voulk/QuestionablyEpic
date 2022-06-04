import React from "react";
import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";

import { cooldownDB } from "../Data/CooldownDB";

export default function ClassCooldownMenuItems(props) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  let menuItems = cooldownDB
    .filter((obj) => {
      if (props === undefined || props === "" || props === 0) {
        return obj.class === "" && obj.cdPlannerMenuActive === true;
      }
      if (props === "DisciplinePriest" || props === "HolyPriest") {
        return (obj.class === props || obj.class === "Priest") && obj.cdPlannerMenuActive === true; // return spells that are spec only and spells shared by the class
      } else {
        return obj.class === props && obj.cdPlannerMenuActive === true; // return everything for that class
      }
    })
    .map((map, i, arr) => {
      let lastItem = i + 1 === arr.length ? false : true;
      return (
        <MenuItem divider={lastItem} value={map.guid} key={map.name[currentLanguage]}>
          <a data-wowhead={"spell=" + map.guid}>
            {map.guid === "" ? (
              ""
            ) : (
              <img
                style={{
                  height: 20,
                  width: 20,
                  margin: "0px 5px 0px 0px",
                  verticalAlign: "middle",
                  border: "1px solid #595959",
                  borderRadius: 4,
                }}
                src={map.icon}
                alt={map.name[currentLanguage]}
              />
            )}
          </a>
          {map.name[currentLanguage]}
        </MenuItem>
      );
    });

  return menuItems;
}
