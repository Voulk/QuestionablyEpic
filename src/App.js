import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput';
import axios from 'axios';
import Chart from './Chart/Chart'
import moment from 'moment';
import ControlledOpenSelect from './DropDown/buttonnew';
import { Typography, Collapse } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import LoadingOverlay from 'react-loading-overlay';
import CustomEditComponent from './CooldownTable/Table';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import InteractiveList from './Lists/ListGen'
import { damageExclusions, healerCooldownsDetailed } from './Data/Data'
import Checkboxes from './BasicComponents/checkBox'
import Links from './Links/Links'
import GenericTable from './CooldownTable/GenericTable';
import DenseAppBar from './Appbar/Appbar'
import abilityicons from './CooldownTable/AbilityIcons'
import { classColoursERT } from './CooldownTable/ClassColourFunctions'
import { addMissingTimestamps, getUniqueObjectsFromArray, reduceTimestamps, fightDurationCalculator } from './Functions/Functions'
import QEMainMenu from './Modules/QEMainMenu.js';

class App extends Component {
  constructor() {
    super()
    this.damageTableShow = this.damageTableShow.bind(this)
    this.healTableShow = this.healTableShow.bind(this)
    this.handler = this.handler.bind(this)
    this.updatechartdata = this.updatechartdata.bind(this)
    this.tablehandler = this.tablehandler.bind(this)
    this.ertHandler = this.ertHandler.bind(this)
    this.timelineHandler = this.timelineHandler.bind(this)
    this.state = {
      apikey: '92fc5d4ae86447df22a8c0917c1404dc',
      updatedarray: [],
      logactuallink: null,
      loglink: 'Insert Log Here',
      reportid: null,
      time: null,
      times: [{ timestamp: 0 }],
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
      cooldownhelperfinal: [],
      cooldownlistcustom2: ['none'],
      currentEndTime: 0,
      currentStartTime: 0,
      damageTableShow: false,
      healTableShow: false,
      ertList: [],
      currentFighttime: null,
      killWipe: null,
      showname: false,
      Updateddatacasts: [],
      ertshowhide: false,
      timelineshowhide: false,
      legenddata: []
    }
  }

    useless = (starttime, endtime) => {
            this.setState({ loadingcheck: true })

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

      // Class Casts Import

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

      let healerIDName = healers.map(key => ({ id: key.id, name: key.name, class: key.type }))
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

      // Create List of Damaging Abilities from the Damage Import Array
      let abilitylistold = damage.map(key =>(key.ability.name));
      // Create Unique List of Damaging Abilities
      let uniqueArray = Array.from(new Set(abilitylistold));
      // Create List of Healing Cooldowns Used from the Healing Casts Array
      let cooldownlistold = cooldowns.map(key =>( healerIDName.filter(obj => { return obj.id === key.sourceID }).map(obj => obj.name) + ' - ' + key.ability.name));
      // Create Unique List of Healing Cooldowns 
      let uniqueArrayCD = Array.from(new Set(cooldownlistold));

      // Attempting to create a list for Custom legend to use with wowhead tooltip
      // Create Ability List With Guids for legend (Testing)
      let legendAbilityListMap = damage.map(key =>({ value: key.ability.name, id: key.ability.guid }));
      // Get Unique Objects from Ability list for the custom legend
      let uniqueLegendData = getUniqueObjectsFromArray(legendAbilityListMap, 'id')
      // Concat the Unique Ability List with the Cooldown List
      let uniqueArrayNewForLegend = uniqueLegendData.concat(uniqueArrayCD)

      // Map New Data Array Timestamp + ability name & Unmitaged Amount
      let updatedarray = damage.map(
        key =>({
          timestamp: moment(fightDurationCalculator(key.timestamp, this.state.time)).startOf('second').valueOf(),
          [key.ability.name]: key.unmitigatedAmount
        }));

      // Map New Data Array ability, Timestamp, Healer name - ability: 1
      let updateddatacasts = cooldowns.map(
        key =>({ ability: key.ability.name,
          timestamp: moment(fightDurationCalculator(key.timestamp, this.state.time)).startOf('second').valueOf(),
          [healerIDName.filter(obj => {
            return obj.id === key.sourceID
          }).map(obj => obj.name) + ' - ' + key.ability.name]: 1})
      );

      // Map New Array for casts for the timeline.
      let updateddatacastsTimeline = cooldowns.map(key =>({ 
        ability: key.ability.name,
        timestamp: moment(fightDurationCalculator(key.timestamp, this.state.time)).startOf('second').format("mm:ss"),
        name: healerIDName.filter(
          obj => {
            return obj.id === key.sourceID
          }).map(
          obj => obj.name).toString(),
        class: healerIDName.filter(obj => {
          return obj.id === key.sourceID
        }).map(
          obj => obj.class).toString()
      }
      ))

      // Map the data casts using the durationmaker function (returning array of cooldowns duration), then pushing those into the healerdurations array
      updateddatacasts.map(
        key => healerdurations.push(
          this.durationmaker(
            key.ability, key.timestamp,
            Object.getOwnPropertyNames(key).slice(2),
            moment(fightDurationCalculator(endtime, starttime)).startOf('second').valueOf()
          )
        )
      )

      // Flatten the healer duration array 
      let cooldownwithdurations = healerdurations.flat();

      // create missing timestamps from start to end of report selected
      let times = addMissingTimestamps(
        fightDurationCalculator(
          endtime,
          starttime
        )
      )
      // concat the damage array with the cooldown durations with the missing durations
      let damageFromLogWithTimesAddedAndCooldowns = updatedarray.concat(cooldownwithdurations, times)
      // Sort the Array by Timestamp
      damageFromLogWithTimesAddedAndCooldowns.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1)
      // reduce array removing any duplicate timestamps
      let dataReformater = reduceTimestamps(damageFromLogWithTimesAddedAndCooldowns)

      // concat the damage array with the missing durations
      let concatArrayWithMissingTimes = updatedarray.concat(times)
      // Sort the Array by Timestamp
      concatArrayWithMissingTimes.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1)
      // reduce array removing any duplicate timestamps
      let dataReformater2 = reduceTimestamps(concatArrayWithMissingTimes)

      Object.keys(dataReformater).forEach(element => sortedData.push(dataReformater[element]))
      Object.keys(dataReformater2).forEach(element => sortedData2.push(dataReformater2[element]))
      this.setState({
        cooldownhelper: sortedData2,
        cooldownhelperfinal: sortedData2,
        legenddata: uniqueArrayNewForLegend,
        updatedarray: sortedData,
        Updateddatacasts: updateddatacastsTimeline,
        abilitylist: uniqueArray,
        cooldownlist: uniqueArrayCD,
        loadingcheck: false,
        healernames: healers.map(key => key.name + ' - ' + key.icon),
        currentEndTime: endtime,
        currentStartTime: starttime
      });
    }

  durationmaker = (ability, originalTimestamp, abilityname, endtime) => {  
    let duration = healerCooldownsDetailed.filter(obj => { return obj.name === ability }).map(obj => obj.duration)
    let newarray = [{ timestamp: originalTimestamp, [abilityname]: 1 }]
    let tickcount = originalTimestamp;   
    for (let i = 0; i < duration; i++) {
      if (endtime !== tickcount) {
        tickcount = tickcount + 1000
        newarray.push({ timestamp: tickcount, [abilityname]: 1 })
      }
    }
    return newarray
  }

  handler = (info, info2, bossname, fighttime, killcheck) => {
    this.setState({
      showname: true,
      time: info,
      timeend: info2,
      nextpage: info,
      boss: bossname,
      damageTableShow: true,
      healTableShow: true,
      currentFighttime: fighttime,
      killWipe: killcheck
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

  ertHandler = () => {
    this.setState(prevState => ({
      ertshowhide: !prevState.ertshowhide
    }))
  }

  timelineHandler = () => {
    this.setState(prevState => ({
      timelineshowhide: !prevState.timelineshowhide
    }))
  }


  tablehandler = (element) => {
    let customcooldown = []
    let cooldownlistcustom = element.map(key => key.name + " - " + key.Cooldown)
    let cooldownlistcustom2 = Array.from(new Set(cooldownlistcustom))
    let newthing = element.map(key => ({ 
      ability: key.Cooldown, 
      timestamp: moment.duration("00:" + key.time).asMilliseconds(), 
      abilityname: key.name + " - " + key.Cooldown }))
    newthing.map(key => customcooldown.push(this.durationmaker(key.ability, key.timestamp, key.abilityname, moment(fightDurationCalculator(this.state.currentEndTime, this.state.currentStartTime)).startOf('second').valueOf())))
    let newthing2 = customcooldown.flat()
    let concat2 = this.state.cooldownhelper
    let joinedarray = concat2.concat(newthing2)
    joinedarray.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1)
    let datarReformater2 = joinedarray.reduce((acc, cur) => {
      acc[cur.timestamp] = joinedarray.reduce((x, n) => {
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
    let abc = element.map(key => ({ ert: '{time:' + key.time + '}' + ' - ' + classColoursERT(key.class) + key.name + '|r' + ' - ' + key.Cooldown, time: key.time }))
    console.log(abc)
    this.setState({ 
      cooldownhelperfinal: sortedData2,
      cooldownlistcustom2: cooldownlistcustom2,
      ertList: abc })
    console.log(this.state.ertList)
  }

  render() {
    let spinnershow = this.state.loadingcheck;

    return (
      <div className='App'>
        {/* 
         - QE Live SL -      
         <QEMainMenu />
           */}
        {/* 
        - Holy Diver - 
          TODO: Move into separate JS file so it can be called from a main menu. 
          TODO: Move logs information into separate JS file.
        */}
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item xs={12} padding={1}>
            <Box bgcolor="#333" style={{ borderRadius: 4, boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)' }}>
              <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
                <Grid item xs={5} padding={1}>
                  <UserInput changed={this.usernameChangedHandler} float={"left"} position={"relative"}/>
                </Grid>
                <Grid item xs={1} padding={1}>
                  <ControlledOpenSelect reportid={this.state.reportid} clicky={this.handler} update={this.updatechartdata} float={"right"} position={"relative"}/>
                </Grid>
                <Grid item xs={1} padding={1} align='center'>
                  {this.state.showname ? (
                    <Typography style={{ fontWeight: 500, fontSize: '1.25rem', color: 'white', padding: '0px 16px 0px 16px' }}>
                      {this.state.boss}
                    </Typography>) : null }
                  {this.state.showname ? (
                    <Typography style={{ fontWeight: 500, fontSize: '0.9rem', color: 'white', padding: '0px 16px 0px 16px', textAlign: 'center' }}>
                      {this.state.currentFighttime + ' - ' + this.state.killWipe}
                    </Typography>) : null }
                </Grid>
                <Grid item xs={2} padding={1}>
                  <InteractiveList heals={this.state.healernames} />
                </Grid>
                <Grid item xs={1} padding={1}>
                  <Checkboxes check={this.damageTableShow} label={"Show Log Table"} />
                  <Checkboxes check={this.healTableShow} label={"Show Custom Table"} />
                </Grid>
                <Grid item xs={2} padding={1}>
                  <Links />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        <div style={{margin: '4px 0px 0px 0px'}}/>

        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item xs={12} padding={1}>  
            <Collapse in={this.state.damageTableShow} >
              <LoadingOverlay active={spinnershow} spinner={<CircularProgress color="secondary" />}>
                <Chart chart={this.state.updatedarray} abilitylist={this.state.abilitylist} legendata={this.state.legenddata} cooldown={this.state.cooldownlist} endtime={this.state.timeend} showcds={true} />
              </LoadingOverlay>
            </Collapse>
          </Grid>
        </Grid>

        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item xs={3} padding={1}>
            <Collapse in={this.state.damageTableShow} >  
              <DenseAppBar onClick={this.timelineHandler} title="Timeline"/>
              <Collapse in={this.state.timelineshowhide}>
                <GenericTable data={this.state.Updateddatacasts} columns={[{ title: 'Name', field: 'name' },{ title: 'Ability', field: 'ability', render: rowData => (abilityicons(rowData.ability)) },{ title: 'Time', field: 'timestamp' }]} title='Timeline' header={true}/>
              </Collapse>
            </Collapse>
          </Grid>
        </Grid>

        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item xs={12} padding={1}>
            <Collapse in={this.state.healTableShow}>
              <LoadingOverlay active={spinnershow} spinner={<CircularProgress color="secondary"/>}>
                <Chart chart={this.state.cooldownhelperfinal} abilitylist={this.state.abilitylist} cooldown={this.state.cooldownlistcustom2} endtime={this.state.timeend} showcds={true} />
              </LoadingOverlay>
            </Collapse>
          </Grid>
        </Grid>

        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item xs={9} padding={1}>
            <CustomEditComponent update={this.tablehandler} />
          </Grid>
          <Grid item xs={3} padding={1}>
            <DenseAppBar onClick={this.ertHandler} title="ERT Note" />
            <Collapse in={this.state.ertshowhide} >
              <GenericTable
                data={this.state.ertList}
                columns={[{ title: 'Sort by Time', field: 'ert' }, { title: 'Time', field: 'time', hidden: true, customSort: (a, b) => moment(a, 'mm:ss').milliseconds() - moment(b, 'mm:ss').milliseconds() } ]}
                title="ERT Note"
                header={true} />
            </Collapse>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default App;
