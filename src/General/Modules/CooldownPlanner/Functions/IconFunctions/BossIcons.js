import React from "react";

import { bossList } from "../../Data/CooldownPlannerBossList";

export default function bossIcons(props) {
  let source = null;
  let alt = "";

  const getBossIcon = (bossID) => {
    let icon = bossList
      .filter((obj) => {
        return obj.DungeonEncounterID === bossID;
      })
      .map((obj) => obj.icon);

    return icon;
  };

  const getBossID = (bossID) => {
    let id = bossList
      .filter((obj) => {
        return obj.DungeonEncounterID === bossID;
      })
      .map((obj) => obj.DungeonEncounterID);

    return id;
  };

  return (
    <img
      style={{
        height: 17,
        width: 17,
        margin: "0px 5px 0px 5px",
        verticalAlign: "middle",
        borderRadius: 4,
        border: "1px solid rgb(89, 89, 89)",
      }}
      src={getBossIcon(props)}
      alt={getBossID(props)}
    />
  );
}
