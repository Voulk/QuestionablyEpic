import React, { Component } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Brush, ResponsiveContainer, Tooltip, Legend, ReferenceArea} from 'recharts';
import chroma from 'chroma-js';
import './Chart.css';
const API = 'https://www.warcraftlogs.com:443/v1/report/fights/';
const START = '?start='
const END = '&end='
const API2 = '?api_key=92fc5d4ae86447df22a8c0917c1404dc'
class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      abilityList: this.props.abilitylist,
      data: this.props.chartdata,
    };
  }

  drawAreas() {
    let abilities = this.props.abilitylist
    let dataSet = abilities
    let areaArr = []  
    let count = 0
    let len = dataSet.length
    let colorCodes = chroma.scale('Spectral').colors(len)
    for (let i in dataSet) {
      if (dataSet.hasOwnProperty(i)) {
        areaArr.push(<Area type='monotone' fillOpacity={0.5} dataKey={abilities[i]} stackId="1" key={i} stroke={null} fill={colorCodes[i]} animationDuration={300}/>)
        count = count + 1
      }
    }
    return areaArr;
  }

  componentDidMount() {
    this.setState({ data: this.props.chart })
    console.log(this.props.chart)
  }

  render() {
    return (

      <ResponsiveContainer className="ResponsiveContainer" width='100%' height={400} >
        <AreaChart
          width={1500}
          height={300}
          data={this.props.chart}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
          <XAxis dataKey="timestamp" stroke="#f5f5f5" label={{ value: 'Timestamp',fill: "#f5f5f5", fontWeight: "Bold" }}/>
          <YAxis stroke="#f5f5f5" label={{ value: 'Unmitifated Damage', angle: -90, fill: "#f5f5f5", fontWeight: "Bold" }}/>
          <Legend  verticalAlign="top" height={36} padding={10}  />
          <Tooltip color="black" />
          <Brush dataKey="timestamp" height={30} stroke="#419363" />
          {this.drawAreas()}
        </AreaChart>
      </ResponsiveContainer>
    )
  }
}

export default Chart;
