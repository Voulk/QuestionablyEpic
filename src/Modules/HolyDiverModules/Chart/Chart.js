import React, { Component } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import chroma from 'chroma-js';
import './Chart.css';
import moment from 'moment';

class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      abilityList: this.props.abilitylist,
      data: this.props.chartdata,
      left: 'dataMin',
      right: 'dataMax',
      refAreaLeft: '',
      refAreaRight: '',
      top: 'dataMax+1',
      bottom: 'dataMin-1',
      top2: 'dataMax+20',
      bottom2: 'dataMin-20',
      animation: true,
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
    let colorCodeCooldowns = chroma.scale('Pastel1').colors(len2)

    for (let i in dataSet) { 
      if (dataSet.hasOwnProperty(i)) {
        areaArr.push(
          <Area
            type='linear'
            fillOpacity={0.5}
            dataKey={abilities[i]}
            stackId='1'
            key={abilities[i]}
            stroke={null}
            fill={colorCodes[i]}
            animationDuration={300}
            yAxisId='1'
            connectNulls={true}
          />)
        count = count + 1
      }
    }

    if (this.props.showcds === true) {
      for (let i in dataset2) {
        if (dataset2.hasOwnProperty(i)) {
          areaArr.push(
            <Area
              type='step'
              fillOpacity={0.5}
              dataKey={cooldowns[i]}
              stackId='1' 
              key={cooldowns[i]}
              stroke={null}
              fill={colorCodeCooldowns[i]}
              animationDuration={300}
              yAxisId='2'
              connectNulls={true}
            />)
          count = count + 1
        }
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

  renderColorfulLegendText = (value, id) => {
    console.log({ id })
    console.log({ value })
    return (
      <a data-wowhead={'spell=' + id }>
        <span>{value}</span>
      </a>
    )
  }

  render() {
    const DataFormater = (number) => {
      if (number > 1000000000) {
        return (number / 1000000000).toString() + 'B'
      } else if (number > 1000000) {
        return (number / 1000000).toString() + 'M'
      } else if (number > 1000) {
        return (number / 1000).toString() + 'K'
      } else {
        return number.toString()
      }
    }

    return (
      <ResponsiveContainer className='ResponsiveContainer' width='100%' height={300} >
        <AreaChart
          width={1500}
          height={300}
          data={this.props.chart}
          margin={{ top: 15, right: 20, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey='timestamp'
            scale='time'
            ticks={this.customticks(this.props.endtime)}
            type='number'
            tickFormatter={timeStr => moment(timeStr).format('mm:ss')}
            stroke='#f5f5f5'
            domain={[0, this.props.timeend]}
          />
          <YAxis
            yAxisId='1'
            stroke='#f5f5f5'
            tickFormatter={DataFormater}
            label={{ offset: 0, value: 'Unmitigated Damage', angle: -90, fill: '#f5f5f5', fontWeight: 'bold', position: 'insideLeft' }}
          />
          <YAxis
            yAxisId='2'
            orientation='right'
            stroke='#f5f5f5'
            tick={false}
            domain={['dataMin', 5]}
          />
          <Legend
            verticalAlign='top'
            padding={10}
            iconType='square'
            iconSize={8}
            // formatter={this.renderColorfulLegendText}
            // payload={this.props.legendata}
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
