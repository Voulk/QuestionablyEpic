import React, { Component, useState } from 'react';
import './App.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import UserInput from './UserInput/UserInput';
import axios from 'axios';
import chroma from 'chroma-js';
import Chart from './Chart/Chart'
import moment from 'moment';
import ControlledOpenSelect from './DropDown/buttonnew';
import { Button, Backdrop, Typography, Collapse, Container } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import LoadingOverlay from 'react-loading-overlay';
import CustomEditComponent from './CooldownTable/Table';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import InteractiveList from './Lists/ListGen'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { damageExclusions, healerCooldownsDetailed } from './Data/Data'
import CustomizedMenus from './DropDown/button';
import Checkboxes from './BasicComponents/checkBox'






class App extends Component {
  constructor() {
    super()
    this.damageTableShow = this.damageTableShow.bind(this)
    this.healTableShow = this.healTableShow.bind(this)
    this.handler = this.handler.bind(this)
    this.updatechartdata = this.updatechartdata.bind(this)
    this.tablehandler = this.tablehandler.bind(this)
    this.state = {
      apikey: '92fc5d4ae86447df22a8c0917c1404dc',
      updatedarray: [
        { timestamp: 1000, Melee: 100 },
        { timestamp: 2000, Melee: 200 },
        { timestamp: 5000, Melee: 100 },
        { timestamp: 9000, Melee: 200 },
        { timestamp: 70000, Melee: 100 }],
      logactuallink: null,
      loglink: 'Insert Log Here',
      reportid: null,
      time: null,
      times: [{timestamp: 0}],
      timeend: null,
      abilitylist: ['Melee'],
      cooldownlist: ['none'],
      loadingcheck: false,
      boss: null,
      classes: ['Paladin', 'Rogue', 'Warrior', 'Mage', 'Warlock', 'Druid', 'Priest', 'Demon Hunter', 'Monk'],
      healernames: [],
      checked: false,
      tabledata: [],
      cooldownhelper: [],
      cooldownhelperfinal:[],
      cooldownlistcustom2: ['none'],
      currentEndTime: 0,
      currentStartTime: 0,
      damageTableShow: false,
      healTableShow: false
    }

  }

    useless = () => {
    }

    updatechartdata = async (starttime, endtime) => {
      this.setState({ loadingcheck: true })
      const APIdamagetaken = 'https://www.warcraftlogs.com:443/v1/report/events/damage-taken/';
      const APICast = 'https://www.warcraftlogs.com:443/v1/report/events/casts/';
      const APIHEALING = 'https://www.warcraftlogs.com:443/v1/report/tables/healing/';
      const apiMonk = '&sourceclass=Monk'
      const apiPaladin = '&sourceclass=Paladin'
      const apiDruid = '&sourceclass=Druid'
      const apiPriest = '&sourceclass=Priest'
      const apiShaman = '&sourceclass=Shaman'
      const START = '?start='
      const END = '&end='
      const HOSTILITY = '&hostility=0'
      const API2 = '&api_key=92fc5d4ae86447df22a8c0917c1404dc'
      const CastAPI2 = '&hostility=0&api_key=92fc5d4ae86447df22a8c0917c1404dc'
      let damage = []
      let healers = []
      let healerdurations = []
      let cooldowns = []
      let nextpage = 0
      let sortedData = []
      let sortedData2 = []


      await axios.get(APIHEALING + this.state.reportid + START + starttime + END + endtime + apiMonk + API2)
        .then(result => {
          healers = Object.keys(result.data.entries)
            .filter(key => (
              result.data.entries[key].icon === "Monk-Mistweaver"))
            .map(key => (result.data.entries[key]))
        })
        .catch(function (error) {
          console.log(error)
        });

      await axios.get(APIHEALING + this.state.reportid + START + starttime + END + endtime + apiPaladin + API2)
        .then(result => {
          healers = healers.concat(Object.keys(result.data.entries)
            .filter(key => (
              result.data.entries[key].icon === "Paladin-Holy"))
            .map(key => (result.data.entries[key])))
        })
        .catch(function (error) {
          console.log(error)
        });

      await axios.get(APIHEALING + this.state.reportid + START + starttime + END + endtime + apiDruid + API2)
        .then(result => {
          healers = healers.concat(Object.keys(result.data.entries)
            .filter(key => (
              result.data.entries[key].icon === "Druid-Restoration"))
            .map(key => (result.data.entries[key])))
        })
        .catch(function (error) {
          console.log(error)
        });

      await axios.get(APIHEALING + this.state.reportid + START + starttime + END + endtime + apiPriest + API2)
        .then(result => {
          healers = healers.concat(Object.keys(result.data.entries)
            .filter(key => (
              result.data.entries[key].icon === "Priest-Holy"
            || result.data.entries[key].icon === "Priest-Discipline"))
            .map(key => (result.data.entries[key])))
        })
        .catch(function (error) {
          console.log(error)
        });

      await axios.get(APIHEALING + this.state.reportid + START + starttime + END + endtime + apiShaman + API2)
        .then(result => {
          healers = healers.concat(Object.keys(result.data.entries)
            .filter(key => (
              result.data.entries[key].icon === "Shaman-Restoration"))
            .map(key => (result.data.entries[key])))
        })
        .catch(function (error) {
          console.log(error)
        });

      let healerIDName = healers.map(key => ({ id: key.id, name: key.name }))
      let healerID = healers.map(key => key.id)


      // original Call for the base of the import
      await axios.get(APIdamagetaken + this.state.reportid + START + starttime + END + endtime + HOSTILITY + API2)
        .then(result => {
          damage = Object.keys(result.data.events)
            .filter(key => (
              damageExclusions.includes(result.data.events[key].ability.guid) === false
              // Has to Have unmitigatedAmount
              && result.data.events[key].unmitigatedAmount
            ))
            .map(key => (result.data.events[key]))
          nextpage = result.data.nextPageTimestamp
        })
        .catch(function (error) {
          console.log(error)
        });
      // Loop of the import updating the next page until the next page is undefined (no next page from json return)
      do {
        await axios.get(APIdamagetaken + this.state.reportid + START + nextpage + END + endtime + HOSTILITY + API2)
          .then(result => {
            damage = damage.concat(Object.keys(result.data.events)
              .filter(key =>(
                damageExclusions.includes(result.data.events[key].ability.guid) === false
              // Has to Have unmitigatedAmount
              && result.data.events[key].unmitigatedAmount
              ))
              .map(key => (result.data.events[key])))
            nextpage = result.data.nextPageTimestamp
          })
          .catch(function (error) {
            console.log(error)
          });
      } while (nextpage != undefined)

      // Reset nextpage for the cooldown import
      nextpage = 0

      await axios.get(APICast + this.state.reportid + START + starttime + END + endtime + CastAPI2)
        .then(result => {
          cooldowns = Object.keys(result.data.events)
            .filter(key =>
              (healerCooldownsDetailed.map(obj => obj.guid).includes(result.data.events[key].ability.guid) && healerID.includes(result.data.events[key].sourceID))
            )
            .map(key =>
              (result.data.events[key]))
          nextpage = result.data.nextPageTimestamp
        })
        .catch(function (error) {
          console.log(error)
        });
      // Loop of the import updating the next page until the next page is undefined (no next page from json return)
      let i = 0
      do {
        await axios.get(APICast + this.state.reportid + START + nextpage + END + endtime + CastAPI2)
          .then(result => {
            cooldowns = cooldowns.concat(Object.keys(result.data.events)
              .filter(key =>
                (healerCooldownsDetailed.map(obj => obj.guid).includes(result.data.events[key].ability.guid) && healerID.includes(result.data.events[key].sourceID))
              )
              .map(key =>
                (result.data.events[key])))
            nextpage = result.data.nextPageTimestamp
          })
          .catch(function (error) {
            console.log(error)
          });
        i = i + 1
      } while (
        nextpage != undefined);

      let abilitylistold = damage.map(key =>(key.ability.name));
      let cooldownlistold = cooldowns.map(key =>(healerIDName.filter(obj => {
        return obj.id === key.sourceID
      }).map(obj => obj.name) + ' - ' + key.ability.name));
      let uniqueArray = Array.from(new Set(abilitylistold));
      let uniqueArrayCD = Array.from(new Set(cooldownlistold));

      let updatedarray = damage.map(key =>({
        timestamp: moment(this.mather(this.state.time, key.timestamp)).startOf('second').valueOf(),
        [key.ability.name]: key.unmitigatedAmount }));

      let updateddatacasts = cooldowns.map(key =>({ 
        ability: key.ability.name,
        timestamp: moment(this.mather(this.state.time, key.timestamp)).startOf('second').valueOf(),
        [healerIDName.filter(obj => {
          return obj.id === key.sourceID
        }).map(obj => obj.name) + ' - ' + key.ability.name]: 1 }));

      updateddatacasts.map(key => healerdurations.push(this.durationmaker(key.ability, key.timestamp, Object.getOwnPropertyNames(key).slice(2), moment(this.mather(starttime, endtime)).startOf('second').valueOf())));
      let cooldownwithdurations = healerdurations.flat();

      let times = this.addMissingTimestamps(this.fightDurationCalculator(endtime, starttime));
      let gg = updatedarray.concat(times);
      let damageFromLogWithTimesAddedAndCooldowns = updatedarray.concat(cooldownwithdurations, times);

      damageFromLogWithTimesAddedAndCooldowns.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1);

      let dataReformater = this.reduceTimestamps(damageFromLogWithTimesAddedAndCooldowns);

      gg.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1);

      let dataReformater2 = this.reduceTimestamps(gg);

      Object.keys(dataReformater).forEach(element => sortedData.push(dataReformater[element]));
      Object.keys(dataReformater2).forEach(element => sortedData2.push(dataReformater2[element]));
      this.setState({
        cooldownhelper: sortedData2,
        cooldownhelperfinal: sortedData2,
        updatedarray: sortedData,
        Updateddatacasts: updateddatacasts,
        abilitylist: uniqueArray,
        cooldownlist: uniqueArrayCD,
        loadingcheck: false,
        healernames: healers.map(key => key.name + ' - ' + key.icon),
        currentEndTime: endtime,
        currentStartTime: starttime
      });
    }

  reduceTimestamps = (array) => { 
    let timestampSum = array.reduce((acc, cur) => {
      acc[cur.timestamp] = array.reduce((x, n) => {
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
    return timestampSum
  }

  // need to cap durations made at end of report
  durationmaker = (ability, originalTimestamp, abilityname, endtime) => {  
    let duration = healerCooldownsDetailed.filter(obj => { return obj.name === ability }).map(obj => obj.duration)
    console.log(duration)
    let toesisstupid = [{ timestamp: originalTimestamp, [abilityname]: 1 }]
    let tickcount = originalTimestamp;   
    for (let i = 0; i < duration; i++) {
      console.log(endtime, tickcount)
      if (endtime !== tickcount) {
      tickcount = tickcount + 1000
      toesisstupid.push({ timestamp: tickcount, [abilityname]: 1 })
    }
    }
    return toesisstupid
  }

  addMissingTimestamps = (loglength) => {
    let toesisstupid = [{ timestamp: 0 }]
    let ticks = [];
    let tickcount = 0;
    let length = moment(loglength).startOf('second') / 1000;
    for (let i = 0; i < length; i++) {
      ticks = ticks.concat(tickcount + 1000)
      tickcount = tickcount + 1000
    }
    ticks.forEach(element => toesisstupid.push({ timestamp: element }))
    return toesisstupid
  }

   fightDurationCalculator = (time1,time2) => {
     let time = (time1 - time2)
     return time
   }
  handler = (info, info2, bossname) => {
    this.setState({
      time: info,
      timeend: info2,
      nextpage: info,
      boss: bossname,
      damageTableShow: true,
      healTableShow: true
    })
  }

  damageTableShow = (event) => {
    this.setState({ damageTableShow: event });
  }

    healTableShow = (event) => {
    this.setState({ healTableShow: event });
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

  tablehandler = (element) => {
    let customcooldown = []
    let cooldownlistcustom = element.map(key => key.name + " - " + key.Cooldown)
    let cooldownlistcustom2 = Array.from(new Set(cooldownlistcustom))
    let newthing = element.map(key => ({ ability: key.Cooldown, timestamp: moment.duration("00:" + key.time).asMilliseconds(), abilityname: key.name + " - " + key.Cooldown }))
    newthing.map(key => customcooldown.push(this.durationmaker(key.ability, key.timestamp, key.abilityname, moment(this.mather(this.state.currentStartTime, this.state.currentEndTime)).startOf('second').valueOf() )))
    let newthing2 = customcooldown.flat()
    let concat2 = this.state.cooldownhelper
    console.log(concat2)
    let fuckthisshit = concat2.concat(newthing2)
    console.log(fuckthisshit)
    fuckthisshit.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1)
    let datarReformater2 = fuckthisshit.reduce((acc, cur) => {
      acc[cur.timestamp] = fuckthisshit.reduce((x, n) => {
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
    let sortedData2 = []
    Object.keys(datarReformater2).forEach(element2 => sortedData2.push(datarReformater2[element2]))
    this.setState({ 
      cooldownhelperfinal: sortedData2,
      cooldownlistcustom2: cooldownlistcustom2 })
  }

  render() {
    let ss = "00:" + "03:05"
    console.log(ss)
    console.log(moment.duration(moment("03:05").format("MM:SS")).asMilliseconds())
    let spinnershow = this.state.loadingcheck;
    return (
      <div className='App'>
        <Box bgcolor="#272c34" style={{ borderRadius: 4, boxShadow: '0px 0px 1px 1px #1e1d1f' }}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1} >   
            <Grid item xs={'auto'} padding={1}>           
              <UserInput
                changed={this.usernameChangedHandler} 
                float={"left"}
                position={"relative"}/>
            </Grid>   
            <Grid item xs={'auto'} padding={1}>
              <ControlledOpenSelect
                reportid={this.state.reportid}
                clicky={this.handler}
                update={this.updatechartdata}
                float={"right"}
                position={"relative"}
                />
            </Grid>  
            <Grid item xs={'auto'} padding={1}>
              <InteractiveList heals={this.state.healernames} />
            </Grid>  
            <Grid item xs={'auto'} padding={1}>
              <Checkboxes check={this.damageTableShow} label={"Show Log Table"}/>
            </Grid>
            <Grid item xs={'auto'} padding={1}>
              <Checkboxes check={this.healTableShow} label={"Show Custom Table"}/>
            </Grid>    
          </Grid>  
        </Box>
        <div style={{ height: 10 }}/>
        <Collapse in={this.state.damageTableShow}>
          <LoadingOverlay
            active={spinnershow}
            spinner={<CircularProgress color="secondary" />}>
            <Chart
              chart={this.state.updatedarray}
              abilitylist={this.state.abilitylist}
              cooldown={this.state.cooldownlist}
              endtime={this.state.timeend}
              showcds={true} />
          </LoadingOverlay>
        </Collapse>
        <div style={{ height: 6 }}/>
        <Collapse in={this.state.healTableShow}>
          <LoadingOverlay
            active={spinnershow}
            spinner={<CircularProgress color="secondary" />}>
            <Chart
              chart={this.state.cooldownhelperfinal}
              abilitylist={this.state.abilitylist}
              cooldown={this.state.cooldownlistcustom2}
              endtime={this.state.timeend}
              showcds={true} />
          </LoadingOverlay>
        </Collapse>
        <div style={{ height: 6 }}/>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={1} >   
          <Grid item xs={6} padding={1}>
            <CustomEditComponent update={this.tablehandler} />
          </Grid>  
          <Grid item xs={6} padding={1}>
            <Box bgcolor="#272c34" style={{ borderRadius: 4, boxShadow: '0px 0px 1px 1px #1e1d1f' }}>
              <Typography variant="h1" component="h2" style={{ fontSize: '1.5rem', color: 'white' }}>
                Cooldown Export for ERT Notes
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </div>
    )
  }
}


export default App;

