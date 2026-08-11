import React, { useEffect, useState } from "react";
import { AppBar, Tabs, Tab, Box, Paper } from "@mui/material";
import ListedInformationBox from "General/Modules/GeneralComponents/ListedInformationBox";
import ManaSourcesComponent from "./ManaComponent";
import SpellDataAccordion from "./SpellDataAccordion";
import TopGearGemList from "./Panels/TopGearGemPanel";
import ErrorBoundary from "./Panels/PanelErrorBoundary";

// To add a tab: append one entry. Each tab owns its label, colors,
// visibility rule (`show`), and content (`render`). Both `show` and
// `render` receive the full props object passed to TopGearReportTabs.
const TAB_DEFS = [
  {
    label: "Set Notes",
    bg: "#304434",
    accent: "#80ff80",
    show: ({ advice }) => advice && advice.length > 0,
    render: ({ advice }) => (
      <ListedInformationBox
        introText="Here are some notes on your set:"
        bulletPoints={advice}
        color="transparent"
        backgroundCol="transparent"
        title="Insights - Set Notes"
      />
    ),
  },
  {
    label: "Gems",
    bg: "#612B78",
    accent: "#E900FF",
    show: ({ gameType }) => gameType === "Classic",
    render: ({ topSet }) => (
      <ErrorBoundary>
        <TopGearGemList gemData={topSet.socketedGems} />
      </ErrorBoundary>
    ),
  },
  {
    label: "Mana",
    bg: "#304478",
    accent: "#00FFFF",
    show: ({ gameType }) => gameType === "Classic",
    render: ({ manaSources }) => (
      <ManaSourcesComponent manaSources={manaSources} />
    ),
  },
  {
    label: "Spells",
    bg: "#9B3B3B",
    accent: "#ff8888",
    show: ({ gameType }) => gameType === "Classic",
    render: ({ spec, statList }) => (
      <SpellDataAccordion spec={spec} statList={statList} talents={null} />
    ),
  },
];

const a11yProps = (i) => ({
  id: `top-gear-tab-${i}`,
  "aria-controls": `top-gear-tabpanel-${i}`,
});

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

const TopGearReportTabs = (props) => {
  const visibleTabs = TAB_DEFS.filter((def) => def.show(props));
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (tabValue > visibleTabs.length - 1) setTabValue(0);
  }, [visibleTabs.length, tabValue]);

  if (visibleTabs.length === 0) return null;

  const active = visibleTabs[tabValue];

  return (
    <Paper
      elevation={0}
      style={{
        backgroundColor: active.bg,
        border: "1px solid rgba(255, 255, 255, 0.22)",
        borderRadius: 4,
        transition: "background-color 150ms ease",
      }}
    >
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
          TabIndicatorProps={{ style: { backgroundColor: active.accent } }}
        >
          {visibleTabs.map((tab, i) => (
            <Tab
              key={tab.label}
              label={tab.label}
              {...a11yProps(i)}
              sx={{
                backgroundColor: tab.bg,
                "&.Mui-selected": { color: "#bdbdbd", fontWeight: 600 },
              }}
            />
          ))}
        </Tabs>
      </AppBar>
      {visibleTabs.map((tab, i) => (
        <TabPanel key={tab.label} value={tabValue} index={i}>
          {tab.render(props)}
        </TabPanel>
      ))}
    </Paper>
  );
};

export default TopGearReportTabs;
