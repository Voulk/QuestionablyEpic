import React, { forwardRef } from "react";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import { ArrowDownward, Clear, Search } from "@mui/icons-material";
import { Divider, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getTableLocale } from "locale/GetTableLocale";
import { cooldownTimelineColumns } from "./Columns/CooldownColumns";
import { defensiveColumns } from "./Columns/DefensiveColumns";
import { externalColumns } from "./Columns/ExternalColumns";

const tableIcons = {
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} style={{ color: "#ffee77" }} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} style={{ color: "#ffee77" }} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} style={{ color: "#ffee77" }} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} style={{ color: "#ffee77" }} />),
};

export default function FightAnalysisTable(props) {
  const { t } = useTranslation();

  const columnSelection = (columns) => {
    switch (columns) {
      case "cooldown":
        return cooldownTimelineColumns();
      case "external":
        return externalColumns();
      case "defensive":
        return defensiveColumns();
      default:
        return [];
        break;
    }
  };

  const titleSelection = (title) => {
    switch (title) {
      case "cooldown":
        return t("CooldownPlanner.Headers.CooldownTimeline");
      case "external":
        return t("CooldownPlanner.Headers.ExternalTimeline");
      case "defensive":
        return "Defensive Timeline";
      default:
        return "";
        break;
    }
  };

  return (
    <MaterialTable
      icons={tableIcons}
      columns={columnSelection(props.type)}
      title={titleSelection(props.type)}
      header={true}
      data={props.data}
      style={{
        color: "#ffffff",
        fontSize: "0.8 rem",
        whiteSpace: "nowrap",
        padding: 8,
      }}
      localization={getTableLocale()}
      components={{
        Container: (props) => <Paper {...props} elevation={0} />,
        Toolbar: (props) => (
          <div style={{ marginBottom: 4 }}>
            <MTableToolbar {...props} />
          </div>
        ),
      }}
      options={{
        showTitle: true,
        toolbar: true,
        header: true,
        search: true,
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
  );
}
