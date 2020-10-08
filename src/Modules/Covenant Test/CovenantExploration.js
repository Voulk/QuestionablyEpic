import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import InnerVerticalTabs from "./InnerCovenantTabs"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    display: "block",
    marginLeft: "20%",
    marginRight: "20%",
    marginTop: "2%",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          variant="fullWidth"
        >
          <Tab label="Kyrian" {...a11yProps(0)} />
          <Tab label="Night Fae" {...a11yProps(1)} />
          <Tab label="Venthyr" {...a11yProps(2)} />
          <Tab label="Necrolords" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {/* Kyrian */}
        <InnerVerticalTabs soulbind1={"Pelagos"} soulbind2={"Kleia"} soulbind3={"Mikanikos"}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      {/* Night Fae */}
        <InnerVerticalTabs soulbind1={"Niya"} soulbind2={"Dreamweaver"} soulbind3={"Korayn"}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      {/* Venthyr */}
        <InnerVerticalTabs soulbind1={"Nadjia"} soulbind2={"Theotar"} soulbind3={"General Draven"}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
      {/* Necrolords */}
        <InnerVerticalTabs soulbind1={"Plague Deviser Marileth"} soulbind2={"Emeni"} soulbind3={"Bonesmith Heirmir"}/>
      </TabPanel>
    </div>
  );
}