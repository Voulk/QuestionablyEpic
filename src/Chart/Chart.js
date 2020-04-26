import React, { Component } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, } from 'recharts';

const API = 'https://www.warcraftlogs.com:443/v1/report/fights/';
const START = '?start='
const END = '&end='
const API2 = '?api_key=92fc5d4ae86447df22a8c0917c1404dc'

class Chart extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      reportid: this.props.reportid,
      chartdata: null,
      start: this.props.times,
      end: this.props.timeends,
      data: this.props.data,
    }
  }

  render() {

    return (
         <AreaChart
        width={1600}
        height={400}
        data={this.state.data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5"/>
        <XAxis dataKey="id" stroke="#f5f5f5"/>
        <YAxis stroke="#f5f5f5"/>
        <Tooltip />
        <Area type="monotone" dataKey="start_time" stackId="1" stroke='null' fill="#8884d8" />
        <Area type="monotone" dataKey="end_time" stackId="1" stroke='null' fill="#82ca9d" />
        <Area type="monotone" dataKey="amt" stackId="1" stroke='null' fill="#ffc658" />
        <Area type="monotone" dataKey="abc" stackId="1" stroke='null' fill="#C12424" />
        <Area type="monotone" dataKey="abc" stackId="1" stroke='null' fill="#00BAD0" />
      </AreaChart>
    )
  }
}

  


export default Chart;


