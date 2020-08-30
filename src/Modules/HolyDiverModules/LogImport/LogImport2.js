import React from "react";
import moment from "moment";
import MenuItem from "@material-ui/core/MenuItem";
import bossIcons from "../CooldownTable/BossIcons";
import { fightDurationCalculator, killOrWipe } from "../Functions/Functions";

export default function LogImport(props) {
//send report id as props...have not tested as yet
  const API = "https://www.warcraftlogs.com:443/v1/report/fights/";
  const API2 = "?api_key=92fc5d4ae86447df22a8c0917c1404dc";
  const [reportid, setReportid] = React.useState(props);
  const [menuItems, setMenuItems] = React.useState(
    <MenuItem value="Fight">"No Report Loaded"</MenuItem>
  );
  const [fightData, setfightData] = React.useState([]);

  if (reportid !== null) {
    setReportid(props);
    fetch(API + reportid + API2) // DEFAULT_QUERY
      .then((response) => response.json())
      .then((data) => setfightData(data.fights));

    setMenuItems(
      fightData
        .filter((name) => name.boss !== 0)
        .map((fight) => (
          <MenuItem
            value={1}
            key={fight.id}
            onClick={() => {
              this.props.clicker([
                fight.start_time,
                fight.end_time,
                fight.name,
                moment(
                  fightDurationCalculator(fight.end_time, fight.start_time)
                ).format("mm:ss"),
                killOrWipe(fight.kill),
                fight.boss,
              ]);
              this.props.update(fight.start_time, fight.end_time);
            }}
          >
            {bossIcons(fight.boss)}
            {fight.name +
              " - " +
              moment(this.mather(fight.end_time, fight.start_time)).format(
                "mm:ss"
              ) +
              " - " +
              this.killwipe(fight.kill) +
              " - " +
              fight.bossPercentage / 100 +
              "%"}
          </MenuItem>
        ))
    );
  }

  return menuItems;
}