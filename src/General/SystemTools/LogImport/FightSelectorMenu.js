import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { MenuItem, ListSubheader, Collapse, Divider } from "@mui/material";
import bossIcons from "../../Modules/CooldownPlanner/Functions/IconFunctions/BossIcons";
import { fightDuration, logDifficulty } from "../../Modules/CooldownPlanner/Functions/Functions";
import { bossList } from "../../Modules/CooldownPlanner/Data/CooldownPlannerBossList";
import axios from "axios";
import { accessToken } from "./accessToken";
import { makeStyles } from "@mui/styles";

const killwipe = (check) => (check ? "Kill!" : "Wipe ");

const whichWipe = (fight, list) => (fight.kill ? "" : list[fight.encounterID + fight.difficulty].indexOf(fight) + 1);

const formatName = (fight, list) => {
  const start = logDifficulty(fight.difficulty) + " - " + moment.utc(fightDuration(fight.endTime, fight.startTime)).format("mm:ss") + " - ";
  let end = killwipe(fight.kill);
  let styleColor = "#00ff1a";

  if (!fight.kill) {
    end += whichWipe(fight, list) + (fight.kill ? "" : " - " + fight.bossPercentage + "%");
    styleColor = "";
  }

  return <div style={{ color: styleColor }}>{start + end}</div>;
};

const useStyles = makeStyles({
  divider: {
    "&.MuiDivider-root": {
      marginTop: 0,
      marginBottom: 0,
    },
  },
});

const LogImport = ({ reportid, cooldownImportFilter, clicker, close, update }) => {
  const classes = useStyles();
  const [fights, setFights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBoss, setSelectedBoss] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      setIsLoading(true);
      setError(null);
      const REPORT_QUERY = `
        query ReportQuery($reportID: String!) {
          reportData {
            report(code: $reportID) {
              fights(translate:true,killType:Encounters ){
                id  
                encounterID
                difficulty
                name
                startTime
                endTime
                bossPercentage
                fightPercentage
                inProgress
                size
                maps{id }
                kill
                keystoneLevel
                gameZone{id
                name}
            }
            }
          }
        }
      `;

      try {
        const response = await axios({
          url: "https://www.warcraftlogs.com/api/v2/client",
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            query: REPORT_QUERY,
            variables: {
              reportID: reportid,
            },
          },
        });

        setFights(response.data.data.reportData.report.fights);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (reportid !== null) {
      fetchReport();
    } else {
      setFights([]);
    }
  }, [reportid]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredFights = cooldownImportFilter ? fights.filter((name) => name.boss !== 0 && name.difficulty !== 1 && name.difficulty !== 3) : fights.filter((name) => name.boss !== 0);

  const fightsMapped = {};
  filteredFights.forEach((fight) =>
    fightsMapped[fight.encounterID + fight.difficulty] ? fightsMapped[fight.encounterID + fight.difficulty].push(fight) : (fightsMapped[fight.encounterID + fight.difficulty] = [fight]),
  );

  if (fights.length === 0) {
    return (
      <MenuItem key="no-report" value="Fight">
        No Report Loaded
      </MenuItem>
    );
  }

  if (filteredFights.length === 0 && cooldownImportFilter) {
    return (
      <MenuItem key="no-valid" value="noValid">
        No Valid Fights (Only Heroic and Mythic Supported)
      </MenuItem>
    );
  }

  // Group fights by boss and kill status
  const groupedFights = filteredFights.reduce((groups, fight) => {
    const bossGroup = groups[fight.encounterID] || { boss: fight.name, kills: [], wipes: [], encounterID: fight.encounterID };
    fight.kill ? bossGroup.kills.push(fight) : bossGroup.wipes.push(fight);
    groups[fight.encounterID] = bossGroup;
    return groups;
  }, {});

  return Object.entries(groupedFights).map(([bossId, { boss, kills, wipes, encounterID }]) => {
    const isBossSelected = selectedBoss === encounterID;
    const hasWipes = wipes.length > 0;

    return (
      <div key={encounterID}>
        <ListSubheader style={{ padding: "4px 8px", lineHeight: "1.43", fontSize: "0.875rem", letterSpacing: "0.01071em", backgroundColor: "#525252", color: "gold" }}>
          {bossIcons(encounterID)}
          {boss}
        </ListSubheader>
        {kills.map((fight, index) => (
          <div key={fight.id}>
            <MenuItem
              dense
              onClick={() => {
                clicker([
                  fight.startTime,
                  fight.endTime,
                  fight.name,
                  moment.utc(fightDuration(fight.endTime, fight.startTime)).format("mm:ss"),
                  killwipe(fight.kill) + whichWipe(fight, fightsMapped),
                  fight.encounterID,
                  fight.difficulty,
                  fight.keystoneLevel,
                  fight.gameZone.id ||
                    bossList
                      .filter((obj) => {
                        return obj.id === fight.encounterID;
                      })
                      .map((obj) => obj.zoneID),
                  fight.id,
                ]);
                close();
                update(fight.startTime, fight.endTime, reportid, fight.encounterID, fight.difficulty, fight.id);
              }}
            >
              {formatName(fight, fightsMapped)}
            </MenuItem>
            {index < kills.length - 1 && <Divider className={classes.divider} />}
          </div>
        ))}
        {kills.length > 0 && <Divider />}
        {hasWipes && (
          <>
            <ListSubheader style={{ padding: "4px 16px", lineHeight: "1.43", fontSize: "0.875rem", letterSpacing: "0.01071em" }} onClick={() => setSelectedBoss(isBossSelected ? null : encounterID)}>
              Wipes {isBossSelected ? "▲" : "▼"}
            </ListSubheader>
            <Collapse in={isBossSelected}>
              {wipes.map((fight, index) => (
                <div key={fight.id}>
                  {index == 0 && <Divider className={classes.divider} />}
                  <MenuItem
                    dense
                    onClick={() => {
                      clicker([
                        fight.startTime,
                        fight.endTime,
                        fight.name,
                        moment.utc(fightDuration(fight.endTime, fight.startTime)).format("mm:ss"),
                        killwipe(fight.kill) + whichWipe(fight, fightsMapped),
                        fight.encounterID,
                        fight.difficulty,
                        fight.keystoneLevel,
                        fight.gameZone.id ||
                          bossList
                            .filter((obj) => {
                              return obj.id === fight.encounterID;
                            })
                            .map((obj) => obj.zoneID),
                      ]);
                      close();
                      update(fight.startTime, fight.endTime, reportid, fight.encounterID, fight.difficulty, fight.id);
                    }}
                  >
                    {formatName(fight, fightsMapped)}
                  </MenuItem>
                  {index < wipes.length - 1 && <Divider className={classes.divider} />}
                </div>
              ))}
            </Collapse>
          </>
        )}
        {wipes.length > 0 && <Divider />}
      </div>
    );
  });
};

export default LogImport;
