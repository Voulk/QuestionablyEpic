import React, { Component, PureComponent } from 'react';
import './App.css';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';
import ButtonClicker from './ButtonClicker/ButtonClicker';
import DropDown from './DropDown/DropDown';
import LogImport from './LogImport/LogImport';

// Coooldown data table here
const cooldowndata = [
  { cooldownname: 'Aura Mastery', class: 'Paladin', Duration: '00:00:08', Cooldown: '00:03:00' }

];

// graph data here
const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400, abc: 23231 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
];

class App extends PureComponent {

  state = {
    loglink: 'Insert Log Here',
    logactuallink: null,
    reportid: null,
    apikey: '92fc5d4ae86447df22a8c0917c1404dc'

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


  render() {
    return (


      <div className='App'>
        <div align={'left'}> Paste Warcraftlog Link Here </div>
        <UserInput
          changed={this.usernameChangedHandler} />
        <div />
        <ButtonClicker
          clicked={this.logChangedHandler}
        />    
        <UserOutput
          logactuallink = {this.state.logactuallink}
          reportid = {this.state.reportid}
        />
        <DropDown 
          reportid = {this.state.reportid}
        />
        <AreaChart
          width={1600}
          height={400}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stackId="1" stroke='null' fill="#8884d8" />
          <Area type="monotone" dataKey="pv" stackId="1" stroke='null' fill="#82ca9d" />
          <Area type="monotone" dataKey="amt" stackId="1" stroke='null' fill="#ffc658" />
          <Area type="monotone" dataKey="abc" stackId="1" stroke='null' fill="#C12424" />
          <Area type="monotone" dataKey="abc" stackId="1" stroke='null' fill="#00BAD0" />
        </AreaChart>     

      </div>
    );
  }
}

export default App;
