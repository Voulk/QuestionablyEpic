import React from "react";
import { talentDB } from "Databases/TalentDB";
import WowheadTooltip from "General/Modules/1. GeneralComponents/WHTooltips.tsx";

export default function talentIcons(props) {
  const getBossIcon = (props) => {
    let icon = talentDB
      .filter((obj) => {
        return obj.guid === props;
      })
      .map((obj) => obj.icon);

    return icon;
  };

  const getName = (props) => {
    let name = talentDB
      .filter((obj) => {
        return obj.guid === props;
      })
      .map((obj) => obj.name);

    return name;
  };

  return (
    <WowheadTooltip type="spell" id={props}>
      <img
        style={{
          height: 30,
          width: 30,
          margin: 4,
          verticalAlign: "middle",
          borderRadius: "4px",
          border: "1px solid rgb(89, 89, 89)",
        }}
        src={getBossIcon(props)}
        alt={getName(props)}
      />
    </WowheadTooltip>
  );
}
