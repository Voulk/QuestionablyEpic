import React, { Component } from "react";
import moment from "moment";
import { Divider, MenuItem } from "@material-ui/core";
import bossIcons from "../../Functions/IconFunctions/BossIcons";
import { fightDurationCalculator } from "../../Functions/Functions";
import { bossList } from "../../Data/Data";

const API = "https://www.warcraftlogs.com:443/v1/report/fights/";
const API2 = "?api_key=92fc5d4ae86447df22a8c0917c1404dc";
class LogImport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportid: this.props.reportid,
      fights: [],
      reportidnew: this.props.reportid,
    };
  }
  componentDidMount = () => {
    if (this.state.reportid === null) {
      this.setState({ fights: "No Report" });
    }
    this.setState({ reportid: this.props.reportid });
    fetch(API + this.state.reportid + API2)
      .then((response) => response.json())
      .then((data) => this.setState({ fights: data.fights }));
  };

  mather = (time1, time2) => {
    let time = time1 - time2;
    return time;
  };

  killwipe = (check) => {
    if (check === false) {
      return "Wipe";
    }
    return "Kill!";
  };

  render(props) {
    const { fights } = this.state;
    if (this.state.reportid === null) {
      return (
        <MenuItem key={99} value="Fight">
          "No Report Loaded"
        </MenuItem>
      );
    }
    let menuItems = fights
      .filter((name) => name.boss !== 0)
      .map((fight, i) => (
        <MenuItem
          key={i}
          onClick={() => {
            this.props.clicker([
              fight.start_time,
              fight.end_time,
              fight.name,
              moment(fightDurationCalculator(fight.end_time, fight.start_time)).format("mm:ss"),
              this.killwipe(fight.kill),
              fight.boss,
              fight.difficulty,
              fight.keystoneLevel,
              fight.zoneID ||
                bossList
                  .filter((obj) => {
                    return obj.id === fight.boss;
                  })
                  .map((obj) => obj.zoneID),
            ]);
            this.props.close();
            this.props.update(fight.start_time, fight.end_time, this.state.reportid);
          }}
        >
          {bossIcons(fight.boss)}
          {fight.name +
            " - " +
            moment(this.mather(fight.end_time, fight.start_time)).format("mm:ss") +
            " - " +
            this.killwipe(fight.kill) +
            " - " +
            fight.bossPercentage / 100 +
            "%"}
        </MenuItem>
      ))
      .map((key, i) => [key, <Divider key={i + 200} />]);
    return menuItems;
  }
}

export default LogImport;
