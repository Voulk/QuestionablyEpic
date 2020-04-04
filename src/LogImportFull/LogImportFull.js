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
      starttime: null,
      endtime: null,
      reportidnew: this.props.reportid,
    };
  }
  componentDidMount = (props) => {
    if (this.state.reportid === null) {
      this.setState({ fightdets: 'No Report' })

    } else {
      this.setState({ reportid: this.props.reportid })

 
      fetch(API + this.state.reportid + START + this.props.starttime + END + this.props.endtime + API2)
      console.log(API + this.state.reportid + START + this.props.starttime + END + this.props.endtime + API2) // DEFAULT_QUERY
        .then(response => response.json())
        .then(data => this.setState({ fightdets: data.fightdets }))
          console.log(this.state.fightdets);
         
    }
  }

  //https://www.warcraftlogs.com:443/v1/report/events/damage-taken/ReportID?start=StartTime&end=EndTime&api_key='+ApiKey,null,'/events/timestamp,/events/sourceIsFriendly,/events/ability/name,/events/unmitigatedAmount'
  render() {
    const { fightdets } = this.state;
    if (this.state.reportid === null) {
      return "No Report Loaded";
    } else {
      return (
        <ul>
          {fightdets.map(fightdet =>
            (<li key={fightdet.timestamp}>           
            </li>))}
        </ul>
      );

    }
  }
}


export default LogImportFull;
