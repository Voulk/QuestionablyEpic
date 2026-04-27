import React, { useEffect, useState } from "react";
import { AppBar, Tabs, Tab, Box, Paper } from "@mui/material";
import ListedInformationBox from "General/Modules/GeneralComponents/ListedInformationBox";
import ManaSourcesComponent from "./ManaComponent";
import SpellDataAccordion from "./SpellDataAccordion";
import TopGearGemList from "./Panels/TopGearGemPanel";
import ErrorBoundary from "./Panels/PanelErrorBoundary";

function a11yProps(index) {
  return {
    id: `top-gear-tab-${index}`,
    "aria-controls": `top-gear-tabpanel-${index}`,
  };
}

const TabPanel = ({ children, value, index }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`top-gear-tabpanel-${index}`}
    aria-labelledby={`top-gear-tab-${index}`}
  >
    {value === index && <Box p={2}>{children}</Box>}
  </div>
);

const TopGearReportTabs = ({ advice, gameType, topSet, statList, manaSources, spec }) => {
  const tabs = [];

  if (advice && advice.length > 0) {
    tabs.push({
      label: "Set Notes",
      content: (
        <ListedInformationBox
          introText="Here are some notes on your set:"
          bulletPoints={advice}
          color="green"
          backgroundCol="#304434"
          title="Insights - Set Notes"
        />
      ),
    });
  }

  if (gameType === "Classic") {
    tabs.push({
      label: "Gems",
      content: (
        <ErrorBoundary>
          <TopGearGemList gemData={topSet.socketedGems} />
        </ErrorBoundary>
      ),
    });
    tabs.push({
      label: "Mana",
      content: <ManaSourcesComponent manaSources={manaSources} />,
    });
    tabs.push({
      label: "Spells",
      content: (
        <SpellDataAccordion spec={spec} statList={statList} talents={null} />
      ),
    });
  }

  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (tabValue > tabs.length - 1) setTabValue(0);
  }, [tabs.length, tabValue]);

  if (tabs.length === 0) return null;

  return (
    <Paper elevation={0} style={{ backgroundColor: "rgba(34, 34, 34, 0.5)", borderRadius: 4 }}>
      <AppBar
        position="static"
        style={{ backgroundColor: "#000", borderRadius: "4px 4px 0 0" }}
        elevation={1}
      >
        <Tabs
          value={tabValue}
          onChange={(_, v) => setTabValue(v)}
          aria-label="top gear report tabs"
          variant="fullWidth"
          TabIndicatorProps={{ style: { backgroundColor: "#F2BF59" } }}
        >
          {tabs.map((tab, i) => (
            <Tab key={tab.label} label={tab.label} {...a11yProps(i)} />
          ))}
        </Tabs>
      </AppBar>
      {tabs.map((tab, i) => (
        <TabPanel key={tab.label} value={tabValue} index={i}>
          {tab.content}
        </TabPanel>
      ))}
    </Paper>
  );
};

export default TopGearReportTabs;
