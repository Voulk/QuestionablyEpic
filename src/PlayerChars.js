
import Player from "./Modules/QEModules/Player/Player";
import React, { Component, UseState } from "react";
import ls from "local-storage";
// On app start, load player data. 
// First, we will check if they are signed in and have character data. 
// If they do, load that, if they don't, we will try their localstorage instead. 
// If we can't find anything, let's send them directly to the character creation page. 

// Each character import includes their spec, stat weights, and an optional log URL. If we find a log URL then automatically load the last fight. 

//const [allChar, updateChars] = UseState(new Player("Voulk", "Druid"));


class PlayerChars extends Component  {
    constructor() {
        super();
        this.state = {
            allChar: [new Player("Voulk", "Druid")],
            activeChar: 0
          };
    }

    setInitial(charArray) {
        this.setState({allChar : charArray});
    }

    loadChars = () => {
        // Check DB first.

        // Then check LS
        if (ls.get("allChar") !== "") {
            this.setInitial(JSON.parse(ls.get("allchar")));
        }
        else {
            this.setInitial(new Player("Voulk", "Druid"));
        }
        
        

    }

    addCharacter = (newChar) => {
        this.state.allChar.push(newChar);
    }

    // Characters
    handleUpdateCharacters = (allCharacters) => {
        this.setState({allChar: allCharacters});
        ls.set("allChar", JSON.stringify(this.state.allChar));
    };

    getActiveChar = () => {
        return this.state.allChar[this.state.activeChar];
      };
 

};




//ls.set("allChar", JSON.stringify(allChar));
  
const loadPlayer = () => {

}


const credentials = {
    client: {
        id: '1be64387daf6494da2de568527ad82cc'
    }

    //fetch("https://us.battle.net/oauth/authorize?client_id=1be64387daf6494da2de568527ad82cc&redirect_uri=https://localhost:3000/&response_type=code&scope=openid")
    
    



}

export default PlayerChars;