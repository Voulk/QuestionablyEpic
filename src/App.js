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
import { Backdrop } from '@material-ui/core';
import { Container } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import LoadingOverlay from 'react-loading-overlay';
import CustomEditComponent from './CooldownTable/Table';


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
      loadingcheck: false,
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
      this.setState({
        loadingcheck: true,
      })

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
      let updatedarray = this.state.data.map(key =>({ timestamp: moment(this.mather(this.state.time, key.timestamp)).startOf('second').valueOf(), [key.ability.name]: key.unmitigatedAmount}));
      let updateddatacasts = this.state.datacasts.map(key =>({ timestamp: moment(this.mather(this.state.time, key.timestamp)).startOf('second').valueOf(), [key.ability.name]: 1 }));
      console.log(endtime)
      let times = this.customticks2(this.mather2(endtime, starttime))
      let concat = updatedarray.concat(updateddatacasts, times)
      let concatabilitylist = uniqueArray.concat(uniqueArrayCD)
      concat.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1)
      let test = new Set(concat.map(time => ({timestamp: time.timestamp})))   

      let datarReformater = concat.reduce((acc, cur) => {
        acc[cur.timestamp] = concat.reduce((x, n) => {
          for (let prop in n) {
            if (cur.timestamp === n.timestamp)  
              if (x.hasOwnProperty(prop)) 
                x[prop] += n[prop]
              else 
                x[prop] = n[prop];
              }
            x.timestamp = cur.timestamp
            return x;
          }, {})
        return acc;
      }, {})
let sortedData = []
Object.keys(datarReformater).forEach(element => sortedData.push(datarReformater[element]))
      this.setState({
        updatedarray: sortedData,
        Updateddatacasts: updateddatacasts,
        abilitylist: uniqueArray,
        cooldownlist: uniqueArrayCD,
      })   




console.log(this.state.updatedarray)




      this.setState({
        loadingcheck: false,
      })
    }

    customticks2 = (loglength) => {
      let toesisstupid = []
      let ticks = [];
      let tickcount = 0;
      let length = moment(loglength).startOf('second') / 1000;
      for (let i = 0; i < length; i++) {
        ticks = ticks.concat(tickcount + 1000)
        tickcount = tickcount + 1000
      }
      ticks.forEach(element => toesisstupid.push({timestamp: element}))
      return toesisstupid
    }

    groupByArray(xs, key) {
      return xs.reduce(function (rv, x) {
        let v = key instanceof Function ? key(x) : x[key];
        let el = rv.find((r) => r && r.key === v);
        if (el) {
          el.values.push(x);
        } else {
          rv.push({
            key: v,
            values: [x]
          });
        }
        return rv;
      }, []);
    }

 groupBy = function (data, key) {
   // `data` is an array of objects, `key` is the key (or property accessor) to group by
   // reduce runs this anonymous function on each element of `data` (the `item` parameter,
   // returning the `storage` parameter at the end
   return data.reduce(function(storage, item) {
   // get the first instance of the key by which we're grouping
     let group = item[key]; 
     // set `storage` for this instance of group to the outer scope (if not empty) or initialize it
     storage[group] = storage[group] || []; 
     // add this item to its group within `storage`
     storage[group].push(item);
     // return the updated storage to the reduce function, which will then loop through the next 
     return storage;
   }, {});
   // {} is the initial value of the storage
 };

 mather2 = (time1,time2) => {
   let time = (time1 - time2)
   return time
 }


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
    let spinnershow = this.state.loadingcheck;
    return (
      <div className='App' align={'center'} >
        <div style={{ color: 'White', fontWeight: 'bold' }}> Paste Warcraftlog Link Here </div>
        <UserInput
          changed={this.usernameChangedHandler} />
        <UserOutput
          logactuallink = {this.state.logactuallink}
          reportid = {this.state.reportid}
          time = {this.state.time}
          timeend = {this.state.timeend}
          boss = {this.state.boss}
        />
        <ControlledOpenSelect reportid={this.state.reportid} clicky={this.handler} update={this.updatechartdata}/>
        <LoadingOverlay
          active={spinnershow}
          spinner={<CircularProgress color="secondary" />}
        >
          <Chart chart={this.state.updatedarray} abilitylist={this.state.abilitylist} cooldown={this.state.cooldownlist} endtime={this.state.timeend} />
        </LoadingOverlay>
        
         <CustomEditComponent />
      </div>
     


    )
  }
}


export default App;

