import React, { Component } from 'react';
import './App.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';
import ButtonClicker from './ButtonClicker/ButtonClicker';
import DropDown from './DropDown/DropDown';
import axios from 'axios';
import chroma from 'chroma-js';
import Chart from './Chart/Chart'
import moment from 'moment';

class App extends Component {
  constructor() {
    super()
    this.handler = this.handler.bind(this)
    this.updatechartdata = this.updatechartdata.bind(this)

    this.state = {
      apikey: '92fc5d4ae86447df22a8c0917c1404dc',
      data: [],
      defaultdatas: [
        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }],
      logactuallink: null,
      loglink: 'Insert Log Here',
      reportid: null,
      showcharts: false,
      time: null,
      timeend: null,
      datahere: null,
      nextpage: null,
      updatedarray: [],
      abilitylist: 'none',
      boss: null,
    }
  }

    useless = () => {
    }

    updatechartdata = async (starttime, endtime) => {
      const API = 'https://www.warcraftlogs.com:443/v1/report/events/damage-taken/';
      const START = '?start='
      const END = '&end='
      const API2 = '&api_key=92fc5d4ae86447df22a8c0917c1404dc'

      // original Call for the base of the import
      await axios.get(API + this.state.reportid + START + starttime + END + endtime + API2)
        .then(result => {
          this.setState({
            data: Object.keys(result.data.events).filter(key => (result.data.events[key].sourceIsFriendly !== true)).map(key => (result.data.events[key]))
          })
          this.setState({
            nextpage: result.data.nextPageTimestamp
          })
        })
        .catch(function (error) {
          console.log(error)
        });
      // Loop of the import updating the next page until the next page is undefined (no next page from json return)
      do {
        await axios.get(API + this.state.reportid + START + this.state.nextpage + END + endtime + API2)
          .then(result => {
            this.setState({
              data: this.state.data.concat(Object.keys(result.data.events).filter(key =>(result.data.events[key].sourceIsFriendly !== true)).map(key => (result.data.events[key])))
            })
            this.setState({
              nextpage: result.data.nextPageTimestamp
            })
          })
          .catch(function (error) {
            console.log(error)
          });
      } while (this.state.nextpage != undefined)

      this.setState({
        updatedarray: this.state.data.map(key =>({ timestamp: moment(this.mather(this.state.time, key.timestamp)).format("mm:ss"), [key.ability.name]: key.unmitigatedAmount, ability: key.unmitigatedAmount })),
      })

      this.setState({
        abilitylistold: (this.state.data.map(key =>(key.ability.name)))
      })
      let uniqueArray = Array.from(new Set(this.state.abilitylistold));
      this.setState({
        abilitylist: uniqueArray
      })
    }

  handler = (info, info2, bossname) => {
    this.setState({
      time: info,
      timeend: info2,
      nextpage: info,
      boss: bossname,
    })
  }
  usernameChangedHandler = (event) => {
    let actuallink = event.target.value 
    this.setState({ logactuallink: event.target.value });
    this.setState({ reportid: actuallink.substring(37,53) });
  }
  reportidHandler = () => {
    this.setState({ logactuallink: this.state.loglink })
    this.setState({ reportid: this.state.loglink.substring(37,53) })
  }
  msToTime = (s) => {
    let ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = s % 60;
    s = (s - secs) / 60;
    let mins = s % 60;
    // let hrs = (s - mins) / 60;
    return mins + ':' + secs;
  }
  mather = (time1, time2) => {
    let time = (time2 - time1)
    return time
  }
  render() {
    let { chartdata } = this.state.updatedarray
    return (
      <div className='App' align={'center'} >
        <div style={{ color: 'white', fontWeight: 'bold' }}> Paste Warcraftlog Link Here </div>
        <UserInput
          changed={this.usernameChangedHandler} />
        <UserOutput
          logactuallink = {this.state.logactuallink}
          reportid = {this.state.reportid}
          time = {this.state.time}
          timeend = {this.state.timeend}
          boss = {this.state.boss}
        />
        <DropDown
          reportid = {this.state.reportid}
          clicky={this.handler}
          update={this.updatechartdata}/>
        <div/>
        <Chart chart={this.state.updatedarray} abilitylist={this.state.abilitylist} />
        <div/>

      </div>
    )
  }
}

export default App;

 // <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5"/>

