import React, { Component } from 'react';

const API = 'https://www.warcraftlogs.com:443/v1/report/events/damage-taken/';
const START = '?start='
const END = '&end='
const API2 = '?api_key=92fc5d4ae86447df22a8c0917c1404dc'

class LogImportFull extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportid: this.props.reportid, //props.reportid,
      fightdets: [],
      starttime: this.props.starttime,
      endtime: this.props.endtime,
      reportidnew: this.props.reportid,
    };
    console.log(this.state.reportid)
     console.log(this.state.fightdets)
      console.log(this.state.starttime)
  }
  componentDidMount = () => {
    if (this.state.reportid === null) {
      this.setState({ fightdets: 'No Report' })
    } else {
      this.setState({ reportid: this.props.reportid })
      fetch(API + this.state.reportid + START + this.props.time + END + this.props.timeend + API2)
        .then(response => response.json())
        .then(data => this.setState({ fightdets: data.fightdets }))    
    }
  }

  render() {
    const { fightdets } = this.state;
    return (
      <ul>
        {fightdets.map(fightdet =>
          (<li key={fightdet.timestamp} />
          ))}
      </ul>
    );
  }
}

export default LogImportFull;
