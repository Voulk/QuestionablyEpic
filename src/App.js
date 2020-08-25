import React, { Component } from 'react';
import './App.css';
//import HolyDiver from './Modules/HolyDiverModule'
import QEMainMenu from './Modules/QEModules/QEMainMenu.js';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
  }



  render() {
    return (
      <ThemeProvider theme={theme}>
      <div className='App'>
       {/* 
         - QE Live SL -      
               <HolyDiver />
           */}
        <QEMainMenu />   
        
      </div>
      </ThemeProvider>
    )
  }
}

export default App;
