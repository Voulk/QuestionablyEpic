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
import abilityicons from "../../Functions/IconFunctions/AbilityIcons.js";
import { localizationRU, localizationCH } from "../TableLocalization.js";
import moment from "moment";
import { healerCooldownsDetailed } from "../../Data/Data.js";

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
    return {};
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
          {
            title: "Name",
            field: "name",
            cellStyle: {
              whiteSpace: "nowrap",
              borderRight: "1px solid rgb(81 81 81)",
              padding: "0px 8px 0px 8px",
            },
            headerStyle: {
              borderRight: "1px solid #6d6d6d",
              textAlign: "center",
            },
          },
          {
            title: "Ability",
            field: "ability",
            cellStyle: {
              whiteSpace: "nowrap",
              borderRight: "1px solid rgb(81 81 81)",
              padding: "0px 8px 0px 8px",
            },
            headerStyle: {
              borderRight: "1px solid #6d6d6d",
              textAlign: "center",
            },
            render: (rowData) => (
              <div>
                {abilityicons(rowData.guid)}
                {rowData.ability}
              </div>
            ),
          },
          {
            title: "Cast",
            field: "timestamp",
            width: "2%",
            cellStyle: {
              whiteSpace: "nowrap",
              borderRight: "1px solid rgb(81 81 81)",
              padding: "0px 8px 0px 8px",
            },
            headerStyle: {
              borderRight: "1px solid #6d6d6d",
              textAlign: "center",
            },
          },
          {
            title: "Avail.",
            width: "2%",
            cellStyle: {
              whiteSpace: "nowrap",
              padding: "0px 8px 0px 8px",
            },
            headerStyle: {
              textAlign: "center",
            },
            render: (rowData) => (
              <div>
                {moment(rowData.timestamp, "mm:ss")
                  .add(
                    healerCooldownsDetailed
                      .filter((obj) => {
                        return obj.guid === rowData.guid;
                      })
                      .map((obj) => obj.cooldown)
                      .toString(),
                    "s"
                  )
                  .format("mm:ss")}
              </div>
            ),
          },
        ]}
        title="Timeline"
        header={true}
        data={props.data}
        style={{
          marginTop: "8px",
          borderRadius: 4,
          color: "#ffffff",
          boxShadow:
            "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
          fontSize: "0.8 rem",
          whiteSpace: "nowrap",
          paddingBottom: 8,
        }}
        localization={curLang(props.curLang)}
        options={{
          showTitle: false,
          toolbar: false,
          header: true,
          search: false,
          headerStyle: {
            color: "#ffffff",
            padding: "0px 8px 0px 8px",
            borderBottom: "2px solid #6d6d6d",
            fontSize: "0.8 rem",
            whiteSpace: "nowrap",
            borderRadius: "4px 0px",
          },
          cellStyle: {
            borderBottom: "1px solid #6d6d6d",
            padding: "0px 8px 0px 8px",
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
          // tableLayout: "fixed",
        }}
      />
    </ThemeProvider>
  );
}