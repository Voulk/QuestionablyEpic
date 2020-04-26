import React, { Component } from 'react';
import './App.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';
import ButtonClicker from './ButtonClicker/ButtonClicker';
import DropDown from './DropDown/DropDown';
import Chart from './Chart/Chart';
import RenderPropApproach from './LogImport/ImportLog';

const API = 'https://www.warcraftlogs.com:443/v1/report/fights/';
const START = '?start='
const END = '&end='
const API2 = '?api_key=92fc5d4ae86447df22a8c0917c1404dc'

class App extends Component {
  constructor() {
    super()
    this.handler = this.handler.bind(this)
    this.state = {
      loglink: 'Insert Log Here',
      logactuallink: null,
      reportid: null,
      time: null,
      apikey: '92fc5d4ae86447df22a8c0917c1404dc',
      timeend: null,
      showcharts: false,
      defaultdatas: [
        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
      ],
    }
  }

  handler = (info, info2) => {
    this.setState({
      time: info,
      timeend: info2,
      showcharts: true,
    })
    console.log(this.state.showcharts)
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
    const datatest = this.state.showcharts;
    console.log(datatest)
    let datashow;
    if (datatest) {
      console.log(API + this.state.reportid + API2)
      datashow = (<RenderPropApproach url={API + this.state.reportid + API2}/>);
      console.log('test')
    } else {
      datashow = 'null'
      console.log('test2')
    }
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
          time = {this.state.time}
          timeend = {this.state.timeend}
        />
        <DropDown
          reportid = {this.state.reportid}
          clicky={this.handler}/>           
        <Chart
          reportid={this.state.reportid}
          times={this.state.time}
          timeends={this.state.timeend}
          data={this.state.defaultdatas}
        />
        <div />
        {datashow}
      </div>
    )
  }
}

export default App;
