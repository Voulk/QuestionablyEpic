import React, { Component } from 'react';
import './LogImport.css';
import moment from 'moment';
import MenuItem from '@material-ui/core/MenuItem';

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
    } else {
      this.setState({ reportid: this.props.reportid })
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
   } else {
     return 'Kill!'
   }
 }


 render(props) {
   const { fights } = this.state;
   if (this.state.reportid === null) {
     return (<MenuItem value='Fight'>"No Report Loaded"</MenuItem>);
   } else {
    let menuitems = fights.filter(name => name.boss !== 0).map((fight) =>
                 (
                  <MenuItem 
                    value={1} 
                    key={fight.id} 
                    onClick={() => {this.props.clicker(fight.start_time, fight.end_time, fight.name, moment(this.mather(fight.end_time, fight.start_time)).format("mm:ss"), this.killwipe(fight.kill)); this.props.update(fight.start_time, fight.end_time)}}
                  >
                    {fight.name}-{moment(this.mather(fight.end_time, fight.start_time)).format("mm:ss")}-{this.killwipe(fight.kill)}-{fight.bossPercentage / 100 + '%'}
                  </MenuItem>
                 )
                )
     return menuitems
   }
 }
}


export default LogImport;
