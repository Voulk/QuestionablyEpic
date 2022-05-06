import React from "react";
import { cooldownDB } from "../../Data/CooldownDB";
import moment from "moment";

export default function CooldownTimeRender(rowData, cooldown, cooldownTime) {
  /* -------------------------------- Handles no name defined -------------------------------- */
  if (rowData[cooldown] === "" || rowData[cooldown] === undefined) {
    return null;
  }

  /* --- Function to Show the time Cooldowns will be available again (Currently Column Hidden) --- */
  const timeCheck = (castTime, cooldown) => {
    /* --------------------------- Get get the cast time as "mm:ss" format -------------------------- */
    let time = moment.utc(castTime, "mm:ss")
      /* ---------- Filter the CD array to get the Cooldown time and add it to the cast time --------- */
      .add(
        cooldownDB
          .filter((obj) => {
            return obj.guid === cooldown;
          })
          .map((obj) => obj.cooldown)
          .toString(),
        "s",
      )
      .format("mm:ss");

    /* ---------- Mui Table returns Invalid Date, as this is a time we change the response to Time ---------- */
    if (time === "Invalid date") {
      return "Invalid Time";
    }
    return time;
  };

  return (
    <div>
      {rowData[cooldown] === "" || rowData[cooldown] === undefined
        ? ""
        : timeCheck(rowData[cooldownTime] === "" || rowData[cooldownTime] === undefined ? rowData.time : rowData[cooldownTime], rowData[cooldown])}
    </div>
  );
}
