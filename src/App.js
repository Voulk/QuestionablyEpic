import React, { Component } from 'react';
import './App.css';
import HolyDiver from './Modules/HolyDiverModule'
import QEMainMenu from './Modules/QEMainMenu.js';

class App extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className='App'>
       {/* 
         - QE Live SL -      
               <QEMainMenu />
           */}
        <HolyDiver />
      </div>
    )
  }
}

export default App;
