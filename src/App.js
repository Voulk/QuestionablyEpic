import React, { Component } from 'react';
import './App.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';
import ButtonClicker from './ButtonClicker/ButtonClicker';
import DropDown from './DropDown/DropDown';
import DropDownCommon from './DropDown/DropDown2';
import axios from 'axios';
import chroma from 'chroma-js';
import Chart from './Chart/Chart'
import moment from 'moment';
import { Button } from '@material-ui/core';
import ControlledOpenSelect from './DropDown/buttonnew';


class App extends Component {
  constructor() {
    super()
    this.handler = this.handler.bind(this)
    this.updatechartdata = this.updatechartdata.bind(this)

    this.state = {
      apikey: '92fc5d4ae86447df22a8c0917c1404dc',
      data: [],
      datacasts: [],
      updatedarray: [
        { timestamp: 1000, Melee: 100 },
        { timestamp: 2000, Melee: 200 },
        { timestamp: 2000, Melee: 0 },
        { timestamp: 5000, Melee: 100 },
        { timestamp: 9000, Melee: 200 },
        { timestamp: 70000, Melee: 100 }],
      logactuallink: null,
      loglink: 'Insert Log Here',
      reportid: null,
      showcharts: false,
      time: null,
      timeend: null,
      datahere: null,
      nextpage: null,
      abilitylist: ['Melee'],
      cooldownlist: ['none'],
      boss: null,
      classes: ['Paladin','Rogue', 'Warrior', 'Mage', 'Warlock', 'Druid', 'Priest', 'Demon Hunter', 'Monk'],
    }
  }

    useless = () => {
    }

    updatechartdata = async (starttime, endtime) => {
      const APIdamagetaken = 'https://www.warcraftlogs.com:443/v1/report/events/damage-taken/';
      const APICast = 'https://www.warcraftlogs.com:443/v1/report/events/casts/';
      const START = '?start='
      const END = '&end='
      const API2 = '&api_key=92fc5d4ae86447df22a8c0917c1404dc'
      const CastAPI2 = '&hostility=0&api_key=92fc5d4ae86447df22a8c0917c1404dc'

      // original Call for the base of the import
      await axios.get(APIdamagetaken + this.state.reportid + START + starttime + END + endtime + API2)
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
        await axios.get(APIdamagetaken + this.state.reportid + START + this.state.nextpage + END + endtime + API2)
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


      //

      await axios.get(APICast + this.state.reportid + START + starttime + END + endtime + CastAPI2)
        .then(result => {
          this.setState({
            datacasts: Object.keys(result.data.events).filter(key => result.data.events[key].ability.guid === 64844).map(key => (result.data.events[key]))
          })

          this.setState({
            nextpage: result.data.nextPageTimestamp
          })
        })
        .catch(function (error) {
          console.log(error)
        });
      // Loop of the import updating the next page until the next page is undefined (no next page from json return)
      let i = 0
      do {
        await axios.get(APICast + this.state.reportid + START + this.state.nextpage + END + endtime + CastAPI2)
          .then(result => {
            this.setState({
              datacasts: this.state.datacasts.concat(Object.keys(result.data.events).filter(key => result.data.events[key].ability.guid === 64844).map(key => (result.data.events[key])))
            })
            this.setState({
              nextpage: result.data.nextPageTimestamp
            })
          })
          .catch(function (error) {
            console.log(error)
          });
        i = i + 1
      } while (this.state.nextpage != undefined)

      let abilitylistold = this.state.data.map(key =>(key.ability.name));
      let cooldownlistold = this.state.datacasts.map(key =>(key.ability.name));
      let uniqueArray = Array.from(new Set(abilitylistold));
      let uniqueArrayCD = Array.from(new Set(cooldownlistold));
      let updatedarray = this.state.data.map(key =>({ timestamp: moment(this.mather(this.state.time, key.timestamp)).startOf('second').valueOf(), [key.ability.name]: key.unmitigatedAmount, ability: key.ability.name }));
      let updateddatacasts = this.state.datacasts.map(key =>({ timestamp: moment(this.mather(this.state.time, key.timestamp)).startOf('second').valueOf(), [key.ability.name]: 1, ability: key.ability.name }));
      let concat = updatedarray.concat(updateddatacasts)
      let concatabilitylist = uniqueArray.concat(uniqueArrayCD)
      concat.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1)
      let test = new Set(concat.map(time => ({timestamp: time.timestamp})))   
      this.setState({
        updatedarray: concat,
        Updateddatacasts: updateddatacasts,
        abilitylist: uniqueArray,
        cooldownlist: uniqueArrayCD,
      })     
      console.log(this.state.datacasts)
      console.log(concat)
      console.log(this.groupBy(concat, "timestamp"))

 let testy = concat.reduce((basket, fruit) => {
    for (const [ability, unmitigate] of Object.entries(fruit)) {
        if (!basket[ability]) {
            basket[ability] = 0;
        }

        basket[ability] += unmitigate;
    }

    return basket;
}, {})

 console.log(testy)


    }

 groupBy = function(xs, key) {
   return xs.reduce(function(rv, x) {
     (rv[x[key]] = rv[x[key]] || []).push(x);
     return rv;
   }, {});
 };


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
        <div style={{ color: 'Black', fontWeight: 'bold' }}> Paste Warcraftlog Link Here </div>
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

        <Chart chart={this.state.updatedarray} abilitylist={this.state.abilitylist} cooldown={this.state.cooldownlist} endtime={this.state.timeend} />
        <div/>
         <ControlledOpenSelect reportid={this.state.reportid} clicky={this.handler} update={this.updatechartdata}/>

      </div>  

    )
  }
}


export default App;

 // <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5"/>


        // <div className="container">
        //   <ul className="list-group text-center">
        //     {
        //       Object.keys(this.state.classes).map(function(key) {
        //         return <li className="list-group-item list-group-item-info">{this.state.classes[key]}</li>
        //       }.bind(this))
        //     }
        //   </ul>
        // </div>
                // <DropDownCommon />