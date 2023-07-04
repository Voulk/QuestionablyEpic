import React from "react";
import { MenuItem, ListSubheader } from "@mui/material";
import { useTranslation } from "react-i18next";
import WowheadTooltip from "General/Modules/1. GeneralComponents/WHTooltips.tsx";

import { cooldownDB } from "../Data/CooldownDB";

export default function ClassCooldownMenuItems(props) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const ClassSpecs = {
    Paladin: ["Holy"],
    Priest: ["Holy", "Discipline", "Shadow"],
    Druid: ["Restoration", "Druid"],
    Evoker: ["Preservation", "Evoker"],
    DemonHunter: ["DemonHunter"],
    Warrior: ["Warrior"],
    Monk: ["Mistweaver", "Monk"],
    Shaman: ["Restoration", "Shaman"],
    DeathKnight: ["DeathKnight"],
  };

  if (props === undefined || props === "" || props === 0) {
    return cooldownDB
      .filter((obj) => {
        if (props === undefined || props === "" || props === 0) {
          return obj.class === "" && obj.cdPlannerMenuActive === true;
        }
      })
      .map((map, i, arr) => {
        let lastItem = i + 1 === arr.length ? false : true;
        return (
          <MenuItem divider={lastItem} value={map.guid} key={map.name[currentLanguage]}>
            <WowheadTooltip type="spell" id={map.guid}>
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
            </WowheadTooltip>
            {map.name[currentLanguage]}
          </MenuItem>
        );
      });
  }

  let menuItems = ClassSpecs[props].map((spec) => {
    const header = <ListSubheader key={spec}>{t(spec)}</ListSubheader>;
    const menulist = cooldownDB
      .filter((obj) => {
        return obj.spec === spec && obj.class === props && obj.cdPlannerMenuActive === true; // return everything for that class
      })
      .map((map, i, arr) => {
        let lastItem = i + 1 === arr.length ? false : true;
        return (
          <MenuItem divider={lastItem} value={map.guid} key={map.name[currentLanguage]}>
            <WowheadTooltip type="spell" id={map.guid} domain={currentLanguage}>
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
            </WowheadTooltip>
            {map.name[currentLanguage]}
          </MenuItem>
        );
      });

    return [header, menulist];
  });

  return menuItems;
}
