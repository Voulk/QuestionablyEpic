import React, { Component } from 'react';
const API = 'https://www.warcraftlogs.com:443/v1/report/fights/';
const API2 = '?api_key=92fc5d4ae86447df22a8c0917c1404dc'

class LogImport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportid: this.props.reportid, //props.reportid,
      fights: [],
      reportidnew: this.props.reportid,
    };
  }
  componentDidMount = () => {
    if (this.state.reportid === null) {
      this.setState({ fights: 'No Report' })
      console.log('1')
    } else {
      this.setState({ reportid: this.props.reportid})
      console.log('2')
      fetch(API + this.state.reportid + API2) // DEFAULT_QUERY
        .then(response => response.json())
        .then(data => this.setState({ fights: data.fights }));
    }
  }
  render() {
    const { fights } = this.state;
    if (this.state.reportid === null) {
      return "No Report Loaded";
    } else {
      return (
        <ul>
          {fights.map(fight =>
            (<li
              key={fight.id}
              id={fight.id}
              boss={fight.name}
              start={fight.start_time}
              end={fight.end_time}>
              <l> {fight.id} - {fight.name} </l>
            </li>))}
        </ul>
      );
    }
  }
}


export default LogImport;
