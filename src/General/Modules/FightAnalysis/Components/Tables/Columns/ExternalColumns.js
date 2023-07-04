import classIcons from "General/Modules/CooldownPlanner/Functions/IconFunctions/ClassIcons";
import { classColoursJS } from "General/Modules/CooldownPlanner/Functions/ClassColourFunctions";
import { externalsDB } from "Databases/ExternalsDB";
import moment from "moment";
import { useTranslation } from "react-i18next";
import WowheadTooltip from "General/Modules/1. GeneralComponents/WHTooltips.tsx";

export const externalColumns = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  let columns = [
    {
      title: t("Caster"),
      field: "caster",
      cellStyle: {
        whiteSpace: "nowrap",
        // borderRight: "1px solid rgb(81 81 81)",
        padding: "2px 0px",
        fontSize: 14,
      },
      headerStyle: {
        fontSize: 14,
      },
      render: (rowData) => (
        <div style={{ color: classColoursJS(rowData.casterClass), display: "inline-flex", verticalAlign: "middle" }}>
          {classIcons(rowData.casterClass, { height: 20, width: 20, padding: "0px 5px 0px 5px", verticalAlign: "middle", borderRadius: 4 })}
          {rowData.caster}
        </div>
      ),
    },
    {
      field: "casterClass",
      hidden: true,
    },
    {
      field: "targetClass",
      hidden: true,
    },

    {
      title: t("External"),
      field: "ability",
      cellStyle: {
        whiteSpace: "nowrap",
        // borderRight: "1px solid rgb(81 81 81)",
        padding: "2px 8px",
        fontSize: 14,
      },
      headerStyle: {
        fontSize: 14,
      },
      render: (rowData) => (
        <div style={{ display: "inline" }}>
          <WowheadTooltip type="spell" id={rowData.guid} domain={currentLanguage}>
            <img
              style={{
                height: 20,
                width: 20,
                padding: "0px 5px 0px 5px",
                verticalAlign: "middle",
              }}
              src={externalsDB
                .filter((obj) => {
                  return obj.guid === rowData.guid;
                })
                .map((obj) => obj.icon)}
              alt={externalsDB
                .filter((obj) => {
                  return obj.guid === rowData.guid;
                })
                .map((obj) => obj.icon)}
            />
          </WowheadTooltip>
          {externalsDB
            .filter((obj) => {
              return obj.guid === rowData.guid;
            })
            .map((obj) => obj.name[currentLanguage])}
        </div>
      ),
    },
    {
      title: t("Target"),
      field: "target",
      cellStyle: {
        whiteSpace: "nowrap",
        // borderRight: "1px solid rgb(81 81 81)",
        padding: "2px 0px",
        fontSize: 14,
      },
      headerStyle: {
        fontSize: 14,
      },
      render: (rowData) => (
        <div style={{ color: classColoursJS(rowData.targetClass), display: "inline-flex", verticalAlign: "middle" }}>
          {classIcons(rowData.targetClass, { height: 20, width: 20, padding: "0px 5px 0px 5px", verticalAlign: "middle", borderRadius: 4 })}
          {rowData.target}
        </div>
      ),
    },
    {
      title: t("CooldownPlanner.TableLabels.CastTimeLabel"),
      field: "timestamp",
      width: "2%",
      cellStyle: {
        whiteSpace: "nowrap",
        // borderRight: "1px solid rgb(81 81 81)",
        padding: "2px 8px",
        fontSize: 14,
      },
      headerStyle: {
        fontSize: 14,
      },
    },
    {
      title: t("CooldownPlanner.TableLabels.OffCooldownLabel"),
      width: "2%",
      hidden: true,
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
          {moment
            .utc(rowData.timestamp, "mm:ss")
            .add(
              externalsDB
                .filter((obj) => {
                  return obj.guid === rowData.guid;
                })
                .map((obj) => obj.cooldown)
                .toString(),
              "s",
            )
            .format("mm:ss")}
        </div>
      ),
    },
  ];

  return columns;
};
