import React, { Component } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, } from 'recharts';

const API = 'https://www.warcraftlogs.com:443/v1/report/fights/';
const START = '?start='
const END = '&end='
const API2 = '?api_key=92fc5d4ae86447df22a8c0917c1404dc'

class Chart extends Component {
  constructor(props) {
    super(props)
    console.log(props.chartdata)
  }

  render(props){
    const {chartdata} = this.props.chartdata
 

    return (
      
    )
  }
}

export default Chart;




    // const testy = this.props.data
    // let datatest = testy.
    // this.setState({ data: datatest })
    // data.fights.map(fight =>
    // //         (<li key={fight.id}>
    // //           <a>{fight.start_time},{fight.end_time}</a>
    // //         </li>)
    // //       )