import React, { forwardRef } from "react";
import MaterialTable, { MTableToolbar, MTableActions } from "material-table";
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
import { Select, Typography } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import classIcons from "../Functions/IconFunctions/ClassIcons";
import { classColoursJS } from "../Functions/ClassColourFunctions";
import { classMenus } from "../Menus/ClassMenuItems";
import { useTranslation } from "react-i18next";
import { localizationFR } from "../../../locale/fr/TableLocale";
import { localizationEN } from "../../../locale/en/TableLocale";
import { localizationRU } from "../../../locale/ru/TableLocale";
import { localizationCH } from "../../../locale/ch/TableLocale";
import ls from "local-storage";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  formControl: {
    whiteSpace: "nowrap",
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const themeCooldownTable = createMuiTheme({
  overrides: {
    MuiTableCell: {
      // regular: {
      //   padding: "0px 8px 0px 8px",
      // },
      root: {
        padding: "4px 4px 4px 4px",
      },
    },
    MuiIconButton: {
      root: {
        padding: "4px",
      },
    },
    MuiToolbar: {
      regular: {
        "@media (min-width: 600px)": {
          minHeight: "0px",
        },
        minHeight: 0,
      },
      root: {
        padding: "4px 4px 4px 4px",
        color: "#c8b054",
      },
    },
  },
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

export default function HealTeam(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { useState } = React;

  let columns = [
    {
      title: t("Name"),
      field: "name",
      width: "16%",
      cellStyle: {
        whiteSpace: "nowrap",
        paddingLeft: 8,
      },
      headerStyle: {
        paddingLeft: 8,
        textAlign: "center",
      },
      render: (rowData) => (
        <div style={{ color: classColoursJS(rowData.class) }}>
          {rowData.name}
        </div>
      ),
      editComponent: (props) => (
        <TextField
          size="small"
          variant="outlined"
          id="standard-basic"
          label={t("Name")}
          value={props.value}
          style={{ whiteSpace: "nowrap", width: "100%" }}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },
    {
      title: t("Class"),
      field: "class",
      width: 250,
      cellStyle: {
        whiteSpace: "nowrap",
      },
      headerStyle: {
        textAlign: "center",
      },
      render: (rowData) => (
        <div style={{ color: classColoursJS(rowData.class) }}>
          {classIcons(rowData.class, 20)}
          {t("CooldownPlannerClasses." + rowData.class)}
        </div>
      ),
      editComponent: (props) => (
        <ThemeProvider theme={themeCooldownTable}>
          <FormControl
            className={classes.formControl}
            size="small"
            variant="outlined"
          >
            <InputLabel id="HealerClassSelector">{t("Class")}</InputLabel>
            <Select
              label={t("Class")}
              value={props.value}
              onChange={(e) => {
                props.onChange(e.target.value);
              }}
            >
              {classMenus}
            </Select>
          </FormControl>
        </ThemeProvider>
      ),
    },
    {
      title: t("HDTableLabels.NotesLabel"),
      field: "notes",
      cellStyle: {
        whiteSpace: "nowrap",
        // borderRight: "1px solid rgb(81 81 81)",
      },
      headerStyle: {
        // borderRight: "1px solid #515151",
        textAlign: "center",
      },
      editComponent: (props) => (
        <TextField
          variant="outlined"
          size="small"
          id="standard-basic"
          label="Notes"
          value={props.value}
          style={{ width: "100%" }}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },
  ];

  const [data, setData] = useState(ls.get("healerInfo") || []);

  let updateStorage = (props) => {
    ls.set("healerInfo", props);
  };

  let curLang = (lang) => {
    if (lang === "en") {
      return localizationEN;
    } else if (lang === "ru") {
      return localizationRU;
    } else if (lang === "ch") {
      return localizationCH;
    } else if (lang === "fr") {
      return localizationFR;
    }
  };

  return (
    <ThemeProvider theme={themeCooldownTable}>
      <MaterialTable
        icons={tableIcons}
        title={t("HDTableLabels.HealTeamHeader")}
        columns={columns}
        data={data}
        style={{
          padding: 10,
        }}
        options={{
          search: false,
          showTitle: true,
          headerStyle: {
            border: "1px solid #c8b054",
            padding: "0px 8px 0px 8px",
            backgroundColor: "#c8b054",
            color: "#000",
          },
          rowStyle: (rowData, index) => {
            if (index % 2) {
              return {
                backgroundColor: "#515151",
                borderBottom: "1px solid #515151",
                borderLeft: "1px solid #515151",
                borderRight: "1px solid #515151",
              };
            }
            return {
              borderBottom: "1px solid #515151",
              borderLeft: "1px solid #515151",
              borderRight: "1px solid #515151",
            };
          },
          searchFieldStyle: {
            borderBottom: "1px solid #515151",
            color: "#ffffff",
          },
          actionCellStyle: {
            borderBottom: "1px solid #515151",
          },
          actionsColumnIndex: 7,
          // tableLayout: "fixed",
          paging: false,
        }}
        components={{
          Container: (props) => <Paper {...props} elevation={0} />,
          Toolbar: (props) => (
            <div style={{ marginBottom: 8 }}>
              <MTableToolbar {...props} />
              <Divider />
            </div>
          ),
        }}
        localization={curLang(props.curLang)}
        // components={{
        //   Toolbar: (props) => (
        //     <div style={{ display: "inline-flex", width: "100%", justifyContent: "flex-end" }}>
        //       <Typography color="primary" variant="h6" style={{marginRight: "45%"}}>Healing Team</Typography>
        //       <div
        //         style={{
        //           height: "0px",
        //         }}
        //       >
        //         <MTableToolbar {...props} />
        //       </div>
        //     </div>
        //   ),
        // }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                updateStorage([...data, newData]);
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                updateStorage([...dataUpdate]);
                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                updateStorage([...dataDelete]);
                resolve();
              }, 1000);
            }),
        }}
      />
    </ThemeProvider>
  );
}
