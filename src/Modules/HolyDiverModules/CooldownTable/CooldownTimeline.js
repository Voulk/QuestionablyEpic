import React, { forwardRef } from "react";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./Table.css";
import abilityicons from "../CooldownTable/AbilityIcons";
import { localizationRU, localizationCH } from "./TableLocalization.js"

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: { main: "#d3bc47" },
    secondary: { main: "#e0e0e0" },
  },
});
const tableIcons = {
  Add: forwardRef((props, ref) => (
    <AddBox {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  Check: forwardRef((props, ref) => (
    <Check {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  Clear: forwardRef((props, ref) => (
    <Clear {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  Delete: forwardRef((props, ref) => (
    <DeleteOutline {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => (
    <Edit {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  Export: forwardRef((props, ref) => (
    <SaveAlt {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  Filter: forwardRef((props, ref) => (
    <FilterList {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  FirstPage: forwardRef((props, ref) => (
    <FirstPage {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  LastPage: forwardRef((props, ref) => (
    <LastPage {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  NextPage: forwardRef((props, ref) => (
    <ChevronRight {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => (
    <Clear {...props} ref={ref} style={{ color: "#ffee77" }} />
  )),
  Search: forwardRef((props, ref) => (
    <Search {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  SortArrow: forwardRef((props, ref) => (
    <ArrowDownward {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  ThirdStateCheck: forwardRef((props, ref) => (
    <Remove {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  ViewColumn: forwardRef((props, ref) => (
    <ViewColumn {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
};

let curLang = (lang) => {
  if (lang === "en") {
    return false;
  } else if (lang === "ru") {
    return localizationRU;
  } else if (lang === "ch") {
    return localizationCH;
  } else {
    return false;
  }
};

export default function CooldownTimeline(props) {
  return (
    <ThemeProvider theme={theme}>
      <MaterialTable
        icons={tableIcons}
        columns={[
          { title: "Name", field: "name" },
          {
            title: "Ability",
            field: "ability",
            render: (rowData) => abilityicons(rowData.ability),
          },
          { title: "Time", field: "timestamp" },
        ]}
        title="Timeline"
        header={true}
        data={props.data}
        style={{
          borderRadius: "0px 0px 4px 4px",
          color: "#ffffff",
          boxShadow:
            "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
          fontSize: "0.8 rem",
          whiteSpace: "nowrap",
        }}
        localization={curLang(props.curLang)}
        options={{
          showTitle: false,
          toolbar: false,
          header: true,
          search: false,
          headerStyle: {
            color: "#ffffff",
            padding: "0px 16px 0px 16px",
            borderBottom: "2px solid #6d6d6d",
            fontSize: "0.8 rem",
            whiteSpace: "nowrap",
          },
          cellStyle: {
            borderBottom: "1px solid #6d6d6d",
            padding: "0px 16px 0px 16px",
            fontSize: "0.8 rem",
            whiteSpace: "nowrap",
          },
          rowStyle: {
            borderBottom: "1px solid #6d6d6d",
            fontSize: "0.8 rem",
            whiteSpace: "nowrap",
          },
          searchFieldStyle: {
            borderBottom: "1px solid #6d6d6d",
            color: "#ffffff",
          },
          actionsCellStyle: {
            borderBottom: "1px solid #6d6d6d",
            padding: 0,
          },
          actionsColumnIndex: 6,
          paging: false,
        }}
      />
    </ThemeProvider>
  );
}