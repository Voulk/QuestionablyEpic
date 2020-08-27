import React, { Component } from 'react';
import './App.css';
import HolyDiver from './Modules/HolyDiverModules/HolyDiverModule'
import QEMainMenu from './Modules/QEModules/QEMainMenu.js';
import TrinketCompare from './Modules/QEModules/TrinketCompare.js';
import LegendaryCompare from './Modules/QEModules/LegendaryCompare.js';
import Player from './Modules/QEModules/Player/Player';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#d3bc47' },
    secondary: { main: '#e0e0e0' }
  }
});


class App extends Component {
  constructor() {
    super()

    this.state = {
      player: new Player("Voulk", "Druid")

    }
  }

  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <div className='App'>
            <Switch> 
              <Route exact path="/" render={() => <QEMainMenu pl={this.state.player} />} />
              <Route path="/holydiver" component={HolyDiver} />
              <Route path="/trinkets" render={() => <TrinketCompare pl={this.state.player} />} />
              <Route path="/legendaries" render={() => <LegendaryCompare pl={this.state.player} />} />

            </Switch>
          </div>
        </ThemeProvider>
      </Router>
    )
  }
}

export default App;
