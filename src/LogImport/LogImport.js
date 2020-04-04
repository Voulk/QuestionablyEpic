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

 msToTime = (s) => {
  let ms = s % 1000;
  s = (s - ms) / 1000;
  let secs = s % 60;
  s = (s - secs) / 60;
  let mins = s % 60;
  let hrs = (s - mins) / 60;

  return mins + ':' + secs;
}

 mather = (time1,time2) => {
   let time = (time1 - time2)
   return time
 }

 killwipe = (check) => {
  if (check === false ) {
    return 'Wipe'
  } {
    return 'Kill!'
  }
 }

 render(props) {
   const { fights } = this.state;
   if (this.state.reportid === null) {
     return ("No Report Loaded");
   } else {
     return (
       <ul>
         {fights.filter(name => name.boss !== 0).map(fight =>
           (<li key={fight.id} onClick={() => this.props.clicker(fight.start_time,fight.end_time)}>
            {fight.name} - {this.msToTime(this.mather(fight.end_time,fight.start_time))} - {this.killwipe(fight.kill)} {fight.bossPercentage / 100 + '%' }
           </li>))}  
       </ul>
     );
   }
 }
}


export default LogImport;
