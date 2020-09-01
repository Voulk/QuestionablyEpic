import React, { useEffect } from "react";
import moment from "moment";
import MenuItem from "@material-ui/core/MenuItem";
import bossIcons from "../CooldownTable/BossIcons";
import { fightDurationCalculator, killOrWipe } from "../Functions/Functions";

export default function LogImport(props) {
  const API = "https://www.warcraftlogs.com:443/v1/report/fights/";
  const API2 = "?api_key=92fc5d4ae86447df22a8c0917c1404dc";
  let menuItems = "";
  const [fightData, setfightData] = React.useState([]);

  useEffect(() => {
    if (props.reportid) {
      fetch(API + props.reportid + API2) // DEFAULT_QUERY
        .then((response) => response.json())
        .then((data) => setfightData(data.fights));
    }
  });

  if (props.reportid !== null) {
    menuItems = fightData
      .filter((name) => name.boss !== 0)
      .map((fight) => (
        <MenuItem
          value={1}
          key={fight.id}
          onClick={(e) => {
            props.clicker([
              fight.start_time,
              fight.end_time,
              fight.name,
              moment(
                fightDurationCalculator(fight.end_time, fight.start_time)
              ).format("mm:ss"),
              killOrWipe(fight.kill),
              fight.boss,
            ]);
            props.update(fight.start_time, fight.end_time);
            props.close(e);
          }}
        >
          {bossIcons(fight.boss)}
          {fight.name +
            " - " +
            moment(
              fightDurationCalculator(fight.end_time, fight.start_time)
            ).format("mm:ss") +
            " - " +
            killOrWipe(fight.kill) +
            " - " +
            fight.bossPercentage / 100 +
            "%"}
        </MenuItem>
      ));
  } else {
    menuItems = <MenuItem value="Fight">"No Report Loaded"</MenuItem>;
  }

  return menuItems;
}