import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  Paladin: { color: '#F58CBA' },
  Priest: { color: '#FFFFFF' },
  Shaman: { color: '#0070DE' },
  Monk: { color: '#00FF96' },
  Druid: { color: '#FF7D0A' }
});

const theme = createMuiTheme({
  overrides: {
    // Style sheet name :atom:
    MuiTableCell: {
      root: {
        fontSize: '0.875rem',
      },
      body: {
        fontSize: '0.875rem',
      }, 
    },
    MuiSelect:{
      root: {
        color: '#fff'
      },
    },
    MuiToolbar: {
      regular: {
        minHeight: '64px'
      }
    },
    MuiTimeline: {
      root: {
        marginBlockStart: '0px',
        marginBlockEnd: '0px',
      },
    },
    MuiTimelineOppositeContent: {
      root: {
        flex: 0
      },
    },
    MuiTimelineItem: {
      root: {
        minHeight: '35px'
      },
    },
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#d3bc47',
    },
    secondary: {
      main: '#ff9100',
    },
  },
});

export default function OppositeContentTimeline(props) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Timeline>
          {props.data.map( key => 
            (<TimelineItem>
              <TimelineOppositeContent>
                <Typography color="textSecondary"> {moment(key.timestamp).format("mm:ss")}  </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography className={classes[key.class]}> {key.name} </Typography>
              </TimelineContent>
            </TimelineItem>)
          )}
        </Timeline>
      </ThemeProvider>
    </React.Fragment>
  );
}