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
import ClassCooldownMenuItems from './ClassCooldownMenuItems'
import { Select } from '@material-ui/core'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import abilityicons from '../CooldownTable/AbilityIcons'
import classicons from '../CooldownTable/ClassIcons'
import moment from 'moment';
import { healerCooldownsDetailed } from '../Data/Data'
import { classColoursJS } from '../CooldownTable/ClassColourFunctions'
import { classMenus } from '../CooldownTable/ClassMenuItems' 
import './Table.css'


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0.5),
    whiteSpace: 'nowrap',
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}
));

const themecooldowntable = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        padding: '0px 16px 0px 16px'
      },
    },
    MuiIconButton: {
      root: {
        padding: '4px'
      }
    },

  },
  palette: {
    type: 'dark',
    primary: { main: '#d3bc47' },
    secondary: { main: '#e0e0e0' }
  }
});

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
  const classes = useStyles();
  const { useState } = React;
  let wowClass = 0
  const [columns, setColumns] = useState([
    {
      title: 'Name',
      field: 'name',
      render: rowData => (
        <div style={{ color: classColoursJS(rowData.class) }}>
          {rowData.name}
        </div>),
      editComponent: props => (
        <TextField
          size="small"
          id="standard-basic"
          label="Name"
          value={props.value}
          style={{ whiteSpace: 'nowrap', width: '100%' }}
          onChange={e => props.onChange(e.target.value)}
        />
      )
    },
    {
      title: 'Class',
      field: 'class',
      render: rowData => (
        <div style={{ color: classColoursJS(rowData.class) }}>
          {classicons(rowData.class, 20)}
          {rowData.class}
        </div>),
      editComponent: props => (
        <ThemeProvider theme={themecooldowntable}>
          <FormControl className={classes.formControl}>
            <InputLabel id="HealerClassSelector">Class</InputLabel>
            <Select
              value={props.value}
              onChange={e => {
                props.onChange(e.target.value); wowClass = e.target.value
              }}>
              {classMenus}
            </Select>
          </FormControl>
        </ThemeProvider>
      )
    },
    {
      title: 'Ability',
      field: 'Cooldown',
      render: rowData => (abilityicons(rowData.Cooldown)),
      editComponent: props => (
        <ThemeProvider theme={themecooldowntable}>
          <FormControl className={classes.formControl}>
            <InputLabel id="HealerAbilitySelector">Ability</InputLabel>
            <Select
              value={props.value }
              onChange={e => { props.onChange(e.target.value); console.log(e.target.value) }}>
              {ClassCooldownMenuItems(wowClass) || []}
            </Select>
          </FormControl>
        </ThemeProvider>
      )
    },
    {
      title: 'Time',
      field: 'time',
      editComponent: props => (
        <TextField
          size="small"
          id="standard-basic"
          label="Cast Time"
          placeholder="Format: mm:ss"
          value={props.value}
          style={{ whiteSpace: 'nowrap', width: '100%' }}
          onChange={e => props.onChange(e.target.value)}
        />
      )
    },
    {
      title: 'Next Available',
      render: rowData => (
        <div>
          {moment(rowData.time, 'mm:ss').add(healerCooldownsDetailed.filter(obj => {
            return obj.name === rowData.Cooldown
          }).map(obj => obj.cooldown).toString(), 's').format("mm:ss")}
        </div>)
    },
    {
      title: 'Notes',
      field: 'notes',
      editComponent: props => (
        <TextField
          size="small"
          id="standard-basic"
          label="Notes"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      )
    },
  ]);

  const [data, setData] = useState([]);

  useEffect(() => {
    props.update(data)
  }, [data]);

  return (
    <ThemeProvider theme={themecooldowntable}>
      <MaterialTable
        icons={tableIcons}
        title="Cooldown Planner"
        columns={columns}
        data={data}
        style={{
          boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
          fontSize: '0.8 rem',
        }}
        options={{
          headerStyle: {
            borderBottom: '2px solid #6d6d6d',
            padding: '0px 16px 0px 16px',
            fontSize: '0.8 rem',
          },
          cellStyle: {
            borderBottom: '1px solid #6d6d6d',
            fontSize: '0.8 rem',
            whiteSpace: 'nowrap',
            padding: '0px 16px 0px 16px'
          },
          rowStyle: {
            borderBottom: '1px solid #6d6d6d',
            fontSize: '0.8 rem',
            padding: '0px 16px 0px 16px'
          },
          searchFieldStyle: {
            borderBottom: '1px solid #6d6d6d',
            color: '#ffffff',
          },
          actionCellStyle: {
            borderBottom: '1px solid #6d6d6d',
          },
          actionsColumnIndex: 7,
          paging: false
        }}
        editable={{
          cellStyle: { padding: '0px 16px 0px 16px' },
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
