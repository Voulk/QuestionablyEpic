import React, { Component, Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import paladinicon from '../Images/spell_holy_holybolt.jpg'
import classcds from './classcds'
import TimePicker from 'rc-time-picker';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import 'rc-time-picker/assets/index.css';
import 'rc-time-picker/assets/index.css';
// import BasicTimePicker from '../TimePicker/timePicker'
import moment from 'moment';
import './table.css';

import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  TextField,
  option
} from "@material-ui/core";

const items = [
  <MenuItem value={'Holy Paladin'}> Holy Paladin </MenuItem>,
  <MenuItem value={'Restoration Druid'}> Restoration Druid </MenuItem>,
  <MenuItem value={'Holy Priest'}> Holy Priest </MenuItem>,
  <MenuItem value={'Discispline Priest'}> Discispline Priest </MenuItem>,
  <MenuItem value={'Restoration Shaman'}> Restoration Shaman </MenuItem>,
  <MenuItem value={'Mistweaver Monk'}> Mistweaver Monk </MenuItem>]

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function CustomEditComponent(props) {

  const { useState } = React;
  let [selectedDate, handleDateChange] = useState(0);
  let a = 0
  let z = 0
  const [columns, setColumns] = useState([
    {
      title: 'Name',
      field: 'name',
      editComponent: props => (
        <input
          type="text"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      )
    },
    {
      title: 'Class',
      field: 'class',
      editComponent: props => (
        <Select
          value={props.value}
          onChange={e => { props.onChange(e.target.value); a = e.target.value }}>
          {items}
        </Select>
      )
    },
    {
      title: 'Cooldown',
      field: 'Cooldown',
      editComponent: props => (
        <Select
          type="text"
          value={props.value }
          onChange={e => { props.onChange(e.target.value); console.log(e.target.value) }}>
          {classcds(a) || []}
        </Select>
      )
    },
    {
      title: 'Time',
      field: 'time',
      editComponent: props => (
        <TimePicker
          defaultValue={moment()}
          showHour={false}
          defaultValue={null}
          onChange={e => { props.onChange(moment(e).format("mm:ss"))}} />
      )
    },
  ]);

  const [data, setData] = useState([
    { name: 'Ptolemy', class: 'Holy Paladin', Cooldown: 'Avenging Wrath', time: "00:05" },
    { name: 'Voulk', class: 'Restoration Druid', Cooldown: 'Tranquility', time: "00:06" },
  ]);

  useEffect(() => {
  props.update(data)
}, [data]);


  return (

    <MaterialTable
      icons={tableIcons}
      title="Cooldown Assigner"
      columns={columns}
      data={data}
      // onChange={}
      style={{ 
        backgroundColor: '#272c34',
        color: '#fff',
        boxShadow: '0px 0px 1px 1px #1e1d1f',
        fontSize: '0.8 rem' }}
      options={{
        headerStyle: {
          backgroundColor: '#272c34',
          color: '#FFF',
          padding: '0px',
        },

        cellStyle: {
          padding: '0px',
        },
        paging: false
      }}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setData([...data, newData]);
              resolve();
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);
              resolve();
            }, 1000)
          }
          ),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);
              resolve();
            }, 1000)
          }),
      }}
    />
  )
}
