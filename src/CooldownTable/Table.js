import React, { Component } from "react";
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

  const [columns, setColumns] = useState([
    {
      title: 'Name', field: 'name',
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
      field: 'Class',
      lookup: { 
        1:
          <div>
            <img
              src={'https://wow.zamimg.com/images/wow/icons/tiny/spell_holy_holybolt.gif'}
              alt={''}
            /> 
            Holy Paladin
          </div>,
        2:
          <div>
            <img
              src={'https://wow.zamimg.com/images/wow/icons/tiny/talentspec_druid_restoration.gif'}
              alt={''}
            /> 
            Restoration Druid
          </div>,
        3:
          <div>
            <img
              src={'https://wow.zamimg.com/images/wow/icons/tiny/spell_holy_guardianspirit.gif'}
              alt={''}
            /> 
            Holy Priest
          </div>,
        4:
          <div>
            <img
              src={'https://wow.zamimg.com/images/wow/icons/tiny/spell_holy_wordfortitude.gif'}
              alt={''}
            /> 
            Discispline Priest
          </div>,
        5:
          <div>
            <img
              src={'https://wow.zamimg.com/images/wow/icons/tiny/spell_nature_magicimmunity.gif'}
              alt={''}
            /> 
            Restoration Shaman
          </div>,
        6:
          <div>
            <img
              src={'https://wow.zamimg.com/images/wow/icons/tiny/spell_monk_mistweaver_spec.gif'}
              alt={''}
            /> 
            Mistweaver Monk
          </div>},
    },
    {
      title: 'Cooldown',
      field: 'Cooldown',
      lookup: { 1: 'Holy Paladin', 2: ' Restoration Druid', 3: ' Holy Priest' , 4: 'Discispline Priest' , 5: 'Restoration Shaman' , 6: 'Monk' },
    },
  ]);

  const [data, setData] = useState([
    { name: 'Ptolemy', surname: 'Baran', birthYear: 1987, Class: 1 },
    { name: 'Voulk', surname: 'Baran', birthYear: 2017, Class: 2 },
  ]);

  return (
    <MaterialTable
      icons={tableIcons}
      title="Cooldown Assigner"
      columns={columns}
      data={data}
      style={{ backgroundColor: '#272c34', color: '#fff' }}
      options={{
        headerStyle: {
          backgroundColor: '#272c34',
          color: '#FFF'
        }
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
          }),
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
