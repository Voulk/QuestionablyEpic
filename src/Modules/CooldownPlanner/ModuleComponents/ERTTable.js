import React, { forwardRef, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import SaveAlt from "@material-ui/icons/SaveAlt";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { localizationFR } from "../../../locale/fr/TableLocale";
import { localizationEN } from "../../../locale/en/TableLocale";
import { localizationRU } from "../../../locale/ru/TableLocale";
import { localizationCH } from "../../../locale/ch/TableLocale";
import { useTranslation } from "react-i18next";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const theme = createMuiTheme({
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
        minHeight: 0,
        "@media (min-width: 600px)": {
          minHeight: "0px",
        },
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

const useStyles = makeStyles((theme) => ({
  formControl: {
    whiteSpace: "nowrap",
    width: "100%",
  },
}));

const SearchFieldOverride = createMuiTheme({
  overrides: {
    MuiOutlinedInput: {
      input: { padding: 10 },
    },
    MuiToolbar: {
      regular: {
        minHeight: 0,
        "@media (min-width: 600px)": {
          minHeight: "0px",
        },
      },
    },
  },
  palette: {
    type: "dark",
    primary: { main: "#d3bc47" },
    secondary: { main: "#e0e0e0" },
  },
});

const menuStyle = {
  style: { marginTop: 5 },
  MenuListProps: {
    style: { paddingTop: 0, paddingBottom: 0 },
  },
  PaperProps: {
    style: {
      border: "1px solid rgba(255, 255, 255, 0.23)",
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  getContentAnchorEl: null,
};

const tableIcons = {
  Export: forwardRef((props, ref) => (
    <SaveAlt {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  Copy: forwardRef((props, ref) => (
    <FileCopyIcon {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  SortArrow: forwardRef((props, ref) => (
    <ArrowDownward {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
};

export default function ERTTable(props) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [ertType, setErtType] = useState("Time - No Icons");

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

  const copyToClipboard = (ertType) => {
    let data = ertFormat(ertType);
    const copyText = data.map((key) => key.ert, <br />);
    console.log(copyText);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(copyText).then(
        () => {
          console.log("copy success");
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      data.select();
      document.execCommand("copy");
    }
  };

  const ertFormat = (ertType) => {
    switch (ertType) {
      case "Time - No Icons":
        return props.ertListTimeNoIcons;
      case "Time - Icons":
        return props.ertListTimeIcons;
      case "Boss Ability - No Icons":
        return props.ertListBossAbility;
      case "Boss Ability - Icons":
        return props.ertListAbilityNoTimeIconsAll;
      default:
        return props.ertListTimeNoIcons;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <MaterialTable
        icons={tableIcons}
        columns={[
          {
            title: "Time",
            field: "bossAbility",
            hidden: true,
            customSort: (a, b) =>
              moment(a, "mm:ss").milliseconds() -
              moment(b, "mm:ss").milliseconds(),
          },
          {
            title: "Sort by Time",
            field: "ert",
            cellStyle: {
              whiteSpace: "nowrap",
              paddingLeft: 8,
            },
          },
          {
            title: "Time",
            field: "time",
            hidden: true,
            customSort: (a, b) =>
              moment(a, "mm:ss").milliseconds() -
              moment(b, "mm:ss").milliseconds(),
          },
        ]}
        title="ERT Note"
        header={true}
        data={ertFormat(ertType)}
        style={{
          borderRadius: 4,
          whiteSpace: "nowrap",
          padding: 10,
        }}
        localization={curLang(props.curLang)}
        components={{
          Container: (props) => <Paper {...props} elevation={0} />,
          Toolbar: (props) => (
            <Grid container spacing={1} direction="row" justify="space-between">
              <Grid item xs={2}>
                <Typography
                  variant="h6"
                  color="primary"
                  style={{ paddingLeft: 24 }}
                >
                  ERT Export
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs="auto">
                    <FormControl
                      style={{ minWidth: 200 }}
                      variant="outlined"
                      size="small"
                    >
                      <InputLabel id="BossSelector">
                        {t("CooldownPlannerTableLabels.TypeSelector")}
                      </InputLabel>
                      <Select
                        labelId="BossSelector"
                        value={ertType}
                        onChange={(e) => setErtType(e.target.value)}
                        label={t("CooldownPlannerTableLabels.TypeSelector")}
                        MenuProps={menuStyle}
                      >
                        <MenuItem key={"ert1"} value={"Time - No Icons"}>
                          Time - No Icons
                        </MenuItem>
                        <Divider />
                        <MenuItem key={"ert2"} value={"Time - Icons"}>
                          Time - Icons
                        </MenuItem>
                        <MenuItem
                          key={"ert3"}
                          value={"Boss Ability - No Icons"}
                        >
                          Boss Ability - No Icons
                        </MenuItem>
                        <Divider />
                        <MenuItem key={"ert4"} value={"Boss Ability - Icons"}>
                          Boss Ability - Icons
                        </MenuItem>
                        <Divider />
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs="auto">
                <ThemeProvider theme={SearchFieldOverride}>
                  <MTableToolbar {...props} />
                </ThemeProvider>
              </Grid>
            </Grid>
          ),
        }}
        actions={[
          {
            icon: () => (
              <FileCopyIcon {...props} style={{ color: "#ffee77" }} />
            ),
            tooltip: "Copy to Clipboard",
            isFreeAction: true,
            onClick: (event) => copyToClipboard(ertType),
          },
        ]}
        options={{
          padding: "dense",
          showTitle: false,
          toolbar: true,
          header: true,
          search: false,
          headerStyle: {
            border: "1px solid #c8b054",
            padding: "0px 8px 0px 8px",
            backgroundColor: "#c8b054",
            color: "#000",
          },
          rowStyle: (rowData, index) => {
            if (index % 2) {
              return {
                backgroundColor: "#535353",
                border: "1px solid #515151",
              };
            } else {
              return {
                border: "1px solid #515151",
              };
            }
          },
          searchFieldStyle: {
            borderBottom: "1px solid #515151",
            color: "#ffffff",
          },
          actionCellStyle: {
            borderBottom: "1px solid #515151",
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
