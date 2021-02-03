import React, { forwardRef } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import abilityIcons from "../../Functions/IconFunctions/AbilityIcons.js";
import { localizationFR } from "../../../../locale/fr/TableLocale";
import { localizationEN } from "../../../../locale/en/TableLocale";
import { localizationRU } from "../../../../locale/ru/TableLocale";
import { localizationCH } from "../../../../locale/ch/TableLocale";
import { Divider, Paper } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { ArrowDownward, ChevronRight, FilterList } from "@material-ui/icons";

const theme = createMuiTheme({
  overrides: {
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

const tableIcons = {
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} style={{ color: "#ffee77" }} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} style={{ color: "#ffee77" }} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
};

export default function EnemyCastsTimeline(props) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

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
    <ThemeProvider theme={theme}>
      <MaterialTable
        icons={tableIcons}
        columns={[
          {
            title: t("Enemy"),
            field: "name",
            cellStyle: {
              whiteSpace: "nowrap",
              padding: "2px 0px",
              fontSize: 14,
            },
            headerStyle: {
              fontSize: 14,
            },
            defaultGroupOrder: 0,
          },
          {
            title: t("Ability"),
            field: "ability",
            cellStyle: {
              whiteSpace: "nowrap",
              padding: "2px 8px",
              fontSize: 14,
            },
            headerStyle: {
              fontSize: 14,
            },
            render: (rowData) => (
              <div>
                {abilityIcons(rowData.guid)}
                {rowData.ability}
              </div>
            ),
          },
          {
            title: t("CooldownPlanner.TableLabels.CastTimeLabel"),
            field: "timestamp",
            width: "2%",
            cellStyle: {
              whiteSpace: "nowrap",
              padding: "2px 8px",
              fontSize: 14,
            },
            headerStyle: {
              fontSize: 14,
            },
            filtering: false,
          },
          {
            field: "id",
            hidden: true,
          },
        ]}
        title={t("CooldownPlanner.Headers.EnemyCastTimeline")}
        icons={tableIcons}
        header={true}
        data={props.data}
        style={{
          color: "#ffffff",
          fontSize: "0.8 rem",
          whiteSpace: "nowrap",
          padding: 8,
        }}
        localization={curLang()}
        components={{
          Container: (props) => <Paper {...props} elevation={0} />,
          Toolbar: (props) => (
            <div style={{ marginBottom: 8 }}>
              <MTableToolbar {...props} />
              <Divider />
            </div>
          ),
        }}
        options={{
          showTitle: true,
          toolbar: true,
          header: true,
          search: false,
          searchFieldVariant: "outlined",
          filtering: false,
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
