import { cooldownDB } from "General/Modules/CooldownPlanner/Data/CooldownDB";
import { useTranslation } from "react-i18next";
import { classColoursJS } from "General/Modules/CooldownPlanner/Functions/ClassColourFunctions";
import classIcons from "General/Modules/CooldownPlanner/Functions/IconFunctions/ClassIcons";
import WowheadTooltip from "General/Modules/1. GeneralComponents/WHTooltips.tsx";

export const cooldownTimelineColumns = () => {
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
      title: t("Cooldown"),
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
              src={
                cooldownDB
                  .filter((obj) => {
                    return obj.guid === rowData.guid;
                  })
                  .map((obj) => obj.icon)[0]
              }
              alt={
                cooldownDB
                  .filter((obj) => {
                    return obj.guid === rowData.guid;
                  })
                  .map((obj) => obj.icon)[0]
              }
            />
          </WowheadTooltip>
          {
            cooldownDB
              .filter((obj) => {
                return obj.guid === rowData.guid;
              })
              .map((obj) => obj.name[currentLanguage])[0]
          }
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
              cooldownDB
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
