import { useTranslation } from "react-i18next";
import { classColoursJS } from "General/Modules/CooldownPlanner/Functions/ClassColourFunctions";
import classIcons from "General/Modules/CooldownPlanner/Functions/IconFunctions/ClassIcons";
import { defensiveDB } from "Databases/DefensiveDB";
import WowheadTooltip from "General/Modules/1. GeneralComponents/WHTooltips.tsx";

export const defensiveColumns = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  let columns = [
    {
      title: t("Name"),
      field: "name",
      cellStyle: {
        whiteSpace: "nowrap",
        padding: "2px 0px",
        fontSize: 14,
      },
      headerStyle: {
        fontSize: 14,
      },
      render: (rowData) => (
        <div style={{ color: classColoursJS(rowData.class), display: "inline-flex", verticalAlign: "middle" }}>
          {classIcons(rowData.class, { height: 20, width: 20, padding: "0px 5px 0px 5px", verticalAlign: "middle", borderRadius: 4 })}
          {rowData.name}
        </div>
      ),
    },
    {
      field: "class",
      hidden: true,
    },
    {
      title: t("Defensive"),
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
        <div style={{ display: "inline" }}>
          <WowheadTooltip type="spell" id={rowData.guid} domain={currentLanguage}>
            <img
              style={{
                height: 20,
                width: 20,
                padding: "0px 5px 0px 5px",
                verticalAlign: "middle",
              }}
              src={defensiveDB
                .filter((obj) => {
                  return obj.guid === rowData.guid;
                })
                .map((obj) => obj.icon)}
              alt={defensiveDB
                .filter((obj) => {
                  return obj.guid === rowData.guid;
                })
                .map((obj) => obj.icon)}
            />
          </WowheadTooltip>
          {defensiveDB
            .filter((obj) => {
              return obj.guid === rowData.guid;
            })
            .map((obj) => obj.name[currentLanguage])}
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
    },
  ];

  return columns;
};
