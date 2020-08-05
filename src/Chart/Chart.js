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

  //   handleMouseEnter(o) {
  //   const { dataKey } = o;
  //   const { opacity } = this.state;
    
  //   this.setState({
  //     opacity: { ...opacity, [dataKey]: 0.5 },
  //   });
  // },
  
  // handleMouseLeave(o) {
  //   const { dataKey } = o;
  //   const { opacity } = this.state;
    
  //   this.setState({
  //     opacity: { ...opacity, [dataKey]: 1 },
  //   });
  // },

  // getAxisYDomain = (from, to, ref, offset) => {
  //   const refData = this.state.data.slice(from - 1, to);
  //   let [bottom, top] = [refData[0][ref], refData[0][ref]];
  //   refData.forEach((d) => {
  //     if (d[ref] > top) top = d[ref];
  //     if (d[ref] < bottom) bottom = d[ref];
  //   });

  //   return [(bottom | 0) - offset, (top | 0) + offset];
  // };


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
    let colorCodeCooldowns = chroma.scale('Paired').colors(len2)
    // let paladincolours = chroma.scale('#F58CBA').colors(len2)
    // let shamancolours = chroma.scale('#0070DE').colors(len2)
    // let druidcolours = chroma.scale('#FF7D0A').colors(len2)
    // let holypriestcolours = chroma.scale('#FFFFFF ').colors(len2)
    // let monkColours = chroma.scale('#00FF96').colors(len2)

    // if (paladinCooldownNames.includes(i)) {
    //   return paladincolours
    // }
    // if (shamanCooldownNames.includes(i)) {
    //   return shamancolours
    // }
    // if (druidCooldownNames.includes(i)) {
    //   return druidcolours
    // }
    // if (priestCooldownNames.includes(i)) {
    //   return holypriestcolours
    // }
    // if (monkCooldownNames.includes(i)) {
    //   return monkColours
    // }


    for (let i in dataSet) { 
      if (dataSet.hasOwnProperty(i)) {
        areaArr.push(
          <Area
            type='linear'
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

if (this.props.showcds === true) {
    for (let i in dataset2) {
      if (dataset2.hasOwnProperty(i)) {
        areaArr.push(
          <Area
            type='step'
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

  // zoom() {
  //   let { refAreaLeft, refAreaRight, data } = this.state;

  //   if (refAreaLeft === refAreaRight || refAreaRight === '') {
  //     this.setState(() => ({
  //       refAreaLeft: '',
  //       refAreaRight: '',
  //     }));
  //     return;
  //   }

  //   // xAxis domain
  //   if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

  //   // yAxis domain
  //   const [bottom, top] = this.getAxisYDomain(refAreaLeft, refAreaRight, 'Melee', 1);
  //   const [bottom2, top2] = this.getAxisYDomain(refAreaLeft, refAreaRight, 'impression', 50);

  //   this.setState(() => ({
  //     refAreaLeft: '',
  //     refAreaRight: '',
  //     data: data.slice(),
  //     left: refAreaLeft,
  //     right: refAreaRight,
  //     bottom,
  //     top,
  //     bottom2,
  //     top2,
  //   }));
  // }

  // zoomOut() {
  //   const { data } = this.state;
  //   this.setState(() => ({
  //     data: data.slice(),
  //     refAreaLeft: '',
  //     refAreaRight: '',
  //     left: 'dataMin',
  //     right: 'dataMax',
  //     top: 'dataMax+1',
  //     bottom: 'dataMin',
  //     top2: 'dataMax+50',
  //     bottom2: 'dataMin+50',
  //   }));
  // }

  componentDidMount() {
    this.setState({ data: this.props.chart })
    
  }

  render() {

    const { opacity } = this.state;

    const {
      data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2,
    } = this.state;

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
          margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
          // onMouseDown={e => this.setState({ refAreaLeft: e.activeLabel })}
          // onMouseMove={e => this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel })}
          // onMouseUp={this.zoom.bind(this)}
        >
          <XAxis
            dataKey='timestamp'
            scale='time'
            ticks={this.customticks(this.props.endtime)}
            type='number'
            tickFormatter={timeStr => moment(timeStr).format('mm:ss')}
            stroke='#f5f5f5'
            label={{ position: 'bottom', offset: 0, value: 'Timestamp', fill: '#f5f5f5', fontWeight: 'bold' }}
            // domain={[left, right]}
            domain={[0, this.props.timeend]}
          />
          <YAxis
            yAxisId='1'
            stroke='#f5f5f5'
            tickFormatter={DataFormater}
            label={{ offset: 0, value: 'Unmitigated Damage', angle: -90, fill: '#f5f5f5', fontWeight: 'bold', position: 'insideLeft' }}
            // domain={[bottom, top]}
          />
          <YAxis
            yAxisId='2'
            orientation='right'
            stroke='#f5f5f5'
            // hide={true}
            tick={false}
            // label={{offset: 0, value: 'Cooldowns', angle: -90, fill: '#f5f5f5', fontWeight: 'bold', position: 'insideTopLeft' }}
            domain={['dataMin', 5]}
          />
          <Legend
            verticalAlign='top'
            height={36}
            padding={10}
            iconType='plainline'
            iconSize={8}
          />
          <Tooltip
            labelStyle={{ color: '#ffffff' }}
            contentStyle={{ backgroundColor: '#1b1b1b', border: '1px solid #1b1b1b' }}
            labelFormatter={timeStr => moment(timeStr).format('mm:ss')}
            // formatter={DataFormater}
          />
          {this.drawAreas()}
        </AreaChart>

      </ResponsiveContainer>
    )
  }
}

export default Chart;
