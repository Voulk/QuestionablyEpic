import React, { forwardRef, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
//prettier-ignore
import { AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn, KeyboardArrowDown } from "@material-ui/icons";
import { Select, TextField, InputLabel, FormControl, Divider, Paper } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
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
  Add: forwardRef((props, ref) => <AddBox {...props} style={{ color: "#ffee77" }} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} style={{ color: "#ffee77" }} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} style={{ color: "#ffee77" }} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} style={{ color: "#ffee77" }} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} style={{ color: "#ffee77" }} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} style={{ color: "#ffee77" }} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} style={{ color: "#ffee77" }} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} style={{ color: "#ffee77" }} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} style={{ color: "#ffee77" }} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} style={{ color: "#ffee77" }} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} style={{ color: "#ffee77" }} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} style={{ color: "#ffee77" }} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} style={{ color: "#ffee77" }} />),
  Search: forwardRef((props, ref) => <Search {...props} style={{ color: "#ffee77" }} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} style={{ color: "#ffee77" }} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} style={{ color: "#ffee77" }} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} style={{ color: "#ffee77" }} ref={ref} />),
};

export default function HealTeam(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  let columns = [
    /* ------------------------------------- Healer Name Column ------------------------------------- */
    {
      title: t("Name"),
      field: "name",
      width: "16%",
      cellStyle: {
        whiteSpace: "nowrap",
        paddingLeft: 8,
      },
      render: (rowData) => <div style={{ color: classColoursJS(rowData.class) }}>{rowData.name}</div>,
      editComponent: (props) => (
        <TextField
          size="small"
          variant="outlined"
          id="standard-basic"
          label={t("Name")}
          value={props.value}
          style={{
            whiteSpace: "nowrap",
            width: "100%",
            marginTop: 6,
          }}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },

    /* ---------------------------------------- Class Column ---------------------------------------- */
    {
      title: t("Class"),
      field: "class",
      width: 250,
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (rowData) => (
        <div style={{ color: classColoursJS(rowData.class) }}>
          {classIcons(rowData.class, { height: 20, width: 20, padding: "0px 5px 0px 5px", verticalAlign: "middle", borderRadius: 4 })}
          {t("CooldownPlanner.Classes." + rowData.class)}
        </div>
      ),
      editComponent: (props) => (
        <ThemeProvider theme={themeCooldownTable}>
          <FormControl className={classes.formControl} size="small" variant="outlined" style={{ marginTop: 6 }}>
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

    /* ---------------------------------------- Notes Column ---------------------------------------- */
    {
      title: t("CooldownPlanner.TableLabels.NotesLabel"),
      field: "notes",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      editComponent: (props) => (
        <TextField variant="outlined" size="small" id="standard-basic" label="Notes" value={props.value} style={{ width: "100%", marginTop: 6 }} onChange={(e) => props.onChange(e.target.value)} />
      ),
    },
  ];

  const [data, setData] = useState(ls.get("healerInfo") || []);

  /* ---------------------------------- Update the Local Storage ---------------------------------- */
  let updateStorage = (props) => {
    ls.set("healerInfo", props);
  };

  /* --------------------------- Current Language for Table localization -------------------------- */
  let curLang = () => {
    if (currentLanguage === "en") {
      return localizationEN;
    } else if (currentLanguage === "ru") {
      return localizationRU;
    } else if (currentLanguage === "ch") {
      return localizationCH;
    } else if (currentLanguage === "fr") {
      return localizationFR;
    }
  };

  return (
    <ThemeProvider theme={themeCooldownTable}>
      <MaterialTable
        icons={tableIcons}
        title={t("CooldownPlanner.TableLabels.HealTeamHeader")}
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
          paging: false,
        }}
        components={{
          Container: (props) => <Paper {...props} elevation={0} />,
          Toolbar: (props) => (
            <div style={{ marginBottom: 8 }}>
              <MTableToolbar {...props} />
            </div>
          ),
        }}
        localization={curLang()}
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
