import React, { useEffect, forwardRef } from "react";
import MaterialTable from 'material-table';
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
import HolyPaladinIcon from '../Images/HolyPaladin.jpg'
import DiscPriestIcon from '../Images/DisciplinePriest.jpg'
import HolyPriestIcon from '../Images/HolyPriest.jpg'
import MistweaverIcon from '../Images/MistWeaverMonk.jpg'
import RestorationDruidIcon from '../Images/RestorationDruid.jpg'
import RestorationShamanIcon from '../Images/RestorationShaman.jpg'
import classcds from './classcds'
import TimePicker from 'rc-time-picker';
import MenuItem from '@material-ui/core/MenuItem';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import { Select } from '@material-ui/core'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    // Style sheet name :atom:
    MuiTableCell: {
      root: {
        fontSize: '0.875rem',
      },
      body: {
        fontSize: '0.875rem',
      }, 
    },
    MuiSelect:{
      root: {
        color: '#fff'
      },
    },
    MuiToolbar: {
      regular: {
        minHeight: '64px'
      }
    },
    //  MuiIconButton: {
    //   root: {
    //     padding: '0px'
    //   },
    // },
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#d3bc47',
    },
    secondary: {
      main: '#ff9100',
    },
  },
});

const items = [
  <MenuItem
    style={{ color: '#F58CBA' }}
    value={'Holy Paladin'}>
    <img
      style={{ height: 18, width: 18, padding: 5 }}
      src={HolyPaladinIcon}
    />
      Holy Paladin
  </MenuItem>,
  <MenuItem
    style={{ color: '#FF7D0A' }}
    value={'Restoration Druid'}>
    <img
      style={{ height: 18, width: 18, padding: 5 }}
      src={RestorationDruidIcon}
    />
      Restoration Druid
  </MenuItem>,
  <MenuItem
    style={{ color: '#FFFFFF' }}
    value={'Holy Priest'}>
    <img
      style={{ height: 18, width: 18, padding: 5 }}
      src={HolyPriestIcon}
    />
      Holy Priest
  </MenuItem>,
  <MenuItem
    style={{ color: '#FFFFFF' }}
    value={'Discispline Priest'}>
    <img
      style={{ height: 18, width: 18, padding: 5 }}
      src={DiscPriestIcon}
    />
      Discispline Priest
  </MenuItem>,
  <MenuItem
    style={{ color: '#0070DE' }}
    value={'Restoration Shaman'}>
    <img
      style={{ height: 18, width: 18, padding: 5 }}
      src={RestorationShamanIcon}
    />
      Restoration Shaman
  </MenuItem>,
  <MenuItem
    style={{ color: '#00FF96' }}
    value={'Mistweaver Monk'}>
    <img
      style={{ height: 18, width: 18, padding: 5 }}
      src={MistweaverIcon}
    />
      Mistweaver Monk
  </MenuItem>

]

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} style={{ color: '#ffee77' }} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} style={{ color: '#ffee77' }} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} style={{ color: '#ffee77' }} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} style={{ color: '#ffee77' }} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} style={{ color: '#ffee77' }} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} style={{ color: '#ffee77' }} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} style={{ color: '#ffee77' }} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} style={{ color: '#ffee77' }} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} style={{ color: '#ffee77' }} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} style={{ color: '#ffee77' }} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} style={{ color: '#ffee77' }} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} style={{ color: '#ffee77' }} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} style={{ color: '#ffee77' }} />),
  Search: forwardRef((props, ref) => <Search {...props} style={{ color: '#ffee77' }} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} style={{ color: '#ffee77' }} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} style={{ color: '#ffee77' }} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} style={{ color: '#ffee77' }} ref={ref} />)
};

export default function CustomEditComponent(props) {

  const { useState } = React;
  let a = 0
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
    // { field: 'imageUrl', render: rowData => <img src={rowData.imageUrl} style={{ width: 18, borderRadius: '50%' }}/> },
    {
      title: 'Class',
      field: 'class',
      editComponent: props => (
        <ThemeProvider theme={theme}>
          <Select 
            value={props.value}
            onChange={e => {
              props.onChange(e.target.value); a = e.target.value
            }}>
            {items}
          </Select>
        </ThemeProvider>
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
    { name: 'Ptolemy', class: 'Holy Paladin', Cooldown: 'Avenging Wrath', time: "00:05", imageUrl: HolyPaladinIcon },
    { name: 'Voulk', class: 'Restoration Druid', Cooldown: 'Tranquility', time: "00:06" },
  ]);

  

  useEffect(() => {
    props.update(data)
  }, [data]);

  return (
    <ThemeProvider theme={theme}>
      <MaterialTable
        icons={tableIcons}
        title="Cooldown Assigner"
        columns={columns}
        data={data}
        style={{
          backgroundColor: '#333',
          color: '#ffffff',
          borderBottom: '1px solid #6d6d6d',
          boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
          fontSize: '0.8 rem',
        }}
        options={{
          // tableLayout: 'fixed',
          headerStyle: {
            backgroundColor: '#333',
            color: '#ffffff',
            padding: '0px 16px 0px 16px',
            borderBottom: '2px solid #6d6d6d',
            fontSize: '0.8 rem',
          },
          cellStyle: {
            borderBottom: '1px solid #6d6d6d',
            padding: '0px 16px 0px 16px',
            fontSize: '0.8 rem',
          },
          rowStyle: {
            borderBottom: '1px solid #6d6d6d',
            fontSize: '0.8 rem',
          },
          searchFieldStyle: {
            borderBottom: '1px solid #6d6d6d',
            color: '#ffffff',
          },
          actionsCellStyle: {
            borderBottom: '1px solid #6d6d6d',
            padding: 0
          },
          actionsColumnIndex: 5,
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
      </ThemeProvider>
  )
}
