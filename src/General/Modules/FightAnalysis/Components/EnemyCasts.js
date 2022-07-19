import React, { forwardRef } from "react";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import { getTableLocale } from "locale/GetTableLocale";
import { Divider, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ArrowDownward, ChevronRight, FilterList } from "@mui/icons-material";

const tableIcons = {
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} style={{ color: "#ffee77" }} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} style={{ color: "#ffee77" }} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
};

export default function EnemyCastsTimeline(props) {
  const { t } = useTranslation();

  return (
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
              {/* {abilityIcons(rowData.guid, {
                height: 20,
                width: 20,
                padding: "0px 5px 0px 5px",
                verticalAlign: "middle",
              })}
              {rowData.ability} */}
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
      localization={getTableLocale()}
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
  );
}
