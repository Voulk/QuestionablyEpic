import React, { Component } from 'react';
import './App.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';
import ButtonClicker from './ButtonClicker/ButtonClicker';
import DropDown from './DropDown/DropDown';
import axios from 'axios';

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
    }
  }

    useless = () => {
    }

    updatechartdata = async () => {
      const API = 'https://www.warcraftlogs.com:443/v1/report/events/damage-taken/';
      const START = '?start='
      const END = '&end='
      const API2 = '&api_key=92fc5d4ae86447df22a8c0917c1404dc'

      // original Call for the base of the import
      await axios.get(API + this.state.reportid + START + this.state.time + END + this.state.timeend + API2)
        .then(result => {
          console.log(result.data.nextPageTimestamp)
          this.setState({
            data: Object.keys(result.data.events).map(key => (result.data.events[key]))
          })
          this.setState({
            nextpage: result.data.nextPageTimestamp
          })
        })
        .catch(function (error) {
          console.log(error)
        });

      console.log(this.state.nextpage)
      // Loop of the import updating the next page until the next page is undefined (no next page from json return)
      do {
        await axios.get(API + this.state.reportid + START + this.state.nextpage + END + this.state.timeend + API2)
          .then(result => {
            this.setState({
              data: this.state.data.concat(Object.keys(result.data.events).map(key => (result.data.events[key])))
            })
            this.setState({
              nextpage: result.data.nextPageTimestamp
            })
          })
          .catch(function (error) {
            console.log(error)
          });
      } while (this.state.nextpage != undefined)

      this.setState({ updatedarray: this.state.data.map(key =>({ timestamp: this.msToTime(this.mather(this.state.time, key.timestamp)), [key.ability.name]: key.unmitigatedAmount })) })
      console.log(this.state.updatedarray)
    }
  handler = (info, info2) => {
    this.setState({
      time: info,
      timeend: info2,
      nextpage: info
    })
  }
  usernameChangedHandler = (event) => {
    this.setState({ loglink: event.target.value })
  }
  logChangedHandler = () => {
    this.setState({ logactuallink: this.state.loglink })
    this.setState({ reportid: this.state.loglink.substring(37,54) })
  }
  reportidHandler = () => {
    this.setState({ logactuallink: this.state.loglink })
    this.setState({ reportid: this.state.loglink.substring(37,54) })
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
    let time = (time2 - time1)
    return time
  }
  render() {
    let { chartdata } = this.state.updatedarray
    if (this.state.dataloaded === true) {
      chartdata = this.state.updatedarray
    } else {
      chartdata = this.state.updatedarray
    }
    return (
      <div className='App' align={'center'} >
        <div> Paste Warcraftlog Link Here </div>
        <UserInput
          changed={this.usernameChangedHandler} />
        <div />
        <ButtonClicker
          clicked={this.logChangedHandler}
        />
        <UserOutput
          logactuallink = {this.state.logactuallink}
          reportid = {this.state.reportid}
          time = {this.state.time}
          timeend = {this.state.timeend}
        />
        <DropDown
          reportid = {this.state.reportid}
          clicky={this.handler}/>
        <div/>
        <button onClick={this.updatechartdata}> Click me yo </button>
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <AreaChart
              width={1600}
              height={400}
              data={chartdata}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
             
              <XAxis dataKey="timestamp"  stroke="#f5f5f5"/> 
              <YAxis stroke="#f5f5f5"/>
              <Tooltip />
              <Area type="monotone" dataKey="Illusionary Bolt" stackId="1" stroke='null' fill="#43E24A" />
              <Area type="monotone" dataKey="Eye of Corruption" stackId="1" stroke='null' fill="#8884d3" />
              <Area type="monotone" dataKey="Psychic Outburst" stackId="1" stroke='null' fill="#8884d0" />
              <Area type="monotone" dataKey="Psychic Outburst" stackId="1" stroke='null' fill="#8884d0" />

            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div/>
    
      </div>
    )
  }
}

export default App;

 // <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5"/>