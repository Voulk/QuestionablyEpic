import React, { Component } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Brush, ResponsiveContainer, Tooltip, Legend, ReferenceArea} from 'recharts';
import chroma from 'chroma-js';
import './Chart.css';
import moment from 'moment';


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
    let cooldowns = this.props.cooldown
    let dataSet = abilities
    let dataset2 = cooldowns
    let areaArr = []  
    let count = 0
    let len = dataSet.length
    let len2 = dataset2.length
    let colorCodes = chroma.scale('Spectral').colors(len)
    let colorCodeCooldowns = chroma.scale('Accent').colors(len2)
    for (let i in dataSet) {
      if (dataSet.hasOwnProperty(i)) {
        areaArr.push(
          <Area
            type='monotone'
            fillOpacity={0.5}
            dataKey={abilities[i]}
            stackId='1'
            key={count}
            stroke={null}
            fill={colorCodes[i]}
            animationDuration={300}
            yAxisId='1'
            connectNulls={true}
          />)
        count = count + 1
      }
    }
    for (let i in dataset2) {
      if (dataset2.hasOwnProperty(i)) {
        areaArr.push(
          <Area
            type='monotone'
            fillOpacity={0.5}
            dataKey={cooldowns[i]}
            stackId='1' key={count}
            stroke={null}
            fill={colorCodeCooldowns[i]}
            animationDuration={300}
            yAxisId='2'
            connectNulls={true}
          />)
        count = count + 1
      }
    }
    return areaArr;
  }

  customticks = (loglength) => {
    let ticks = [];
    let tickcount = 0;
    let length = moment(loglength).startOf('second') / 1000;
    for (let i = 0; i < length; i++) {
      ticks = ticks.concat(tickcount + 1000)
      tickcount = tickcount + 1000
    }
    return { ...ticks }
  }

  componentDidMount() {
    this.setState({ data: this.props.chart })
  }

  render() {
    return (

      <ResponsiveContainer className='ResponsiveContainer' width='100%' height={400} >
        <AreaChart
          width={1500}
          height={300}
          data={this.props.chart}
          margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
        >
          <XAxis
            dataKey='timestamp'
            scale='time'
            ticks={this.customticks(this.props.endtime)}
            type='number'
            tickFormatter={timeStr => moment(timeStr).format('mm:ss')}
            stroke='#f5f5f5'
            label={{ value: 'Timestamp', fill: '#f5f5f5', fontWeight: 'bold' }}
            domain={[0, this.props.timeend]}
          />
          <YAxis
            yAxisId='1'
            stroke='#f5f5f5'
            label={{ offset: 0, value: 'Unmitigated Damage', angle: -90, fill: '#f5f5f5', fontWeight: 'bold', position: 'insideLeft' }}
          />
          <YAxis
            yAxisId='2'
            orientation='right'
            stroke='#f5f5f5'
            label={{offset: 0, value: 'Cooldowns', angle: -90, fill: '#f5f5f5', fontWeight: 'bold', position: 'insideRight' }}
            domain={['dataMin', 3]}
          />
          <Legend
            verticalAlign='top'
            height={36}
            padding={10}
          />
          <Tooltip
            labelStyle={{ color: '#ffffff' }}
            contentStyle={{ backgroundColor: '#1b1b1b', border: '1px solid #1b1b1b' }}
            labelFormatter={timeStr => moment(timeStr).format('mm:ss')}
          />
          {this.drawAreas()}
        </AreaChart>
      </ResponsiveContainer>
    )
  }
}

export default Chart;
