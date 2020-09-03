
import Player from "./Modules/QEModules/Player/Player";
import React, { Component, UseState } from "react";
import ls from "local-storage";
// On app start, load player data. 
// First, we will check if they are signed in and have character data. 
// If they do, load that, if they don't, we will try their localstorage instead. 
// If we can't find anything, let's send them directly to the character creation page. 

// Each character import includes their spec, stat weights, and an optional log URL. If we find a log URL then automatically load the last fight. 

//const [allChar, updateChars] = UseState(new Player("Voulk", "Druid"));

// This entire component class might be scrapped and replaced. Beware edits. 

class PlayerChars  {
    constructor(props) {
        //super(props);
        
        this.allChar = JSON.parse(ls.get("allChar")) || [new Player("VoulkThree", "Druid")];
        this.activeChar = 0;
    };

    allChar = [];
    activeChar = 0;


    getActiveChar = () => {
        return this.allChar[this.activeChar];
      };

    getAllChar = () => {
        return this.allChar;
    }  


}

export default PlayerChars;




/// Old Code
/*
class PlayerChars extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            allChar: JSON.parse(ls.get("allChar")) || [new Player("VoulkThree", "Druid")],
            activeChar: 0
          };
        
        ls.set("allChar", JSON.stringify(this.state.allChar));
    }

    /// Disregard all of this for now.
    setInitial(charArray, loadState) {
        this.setState({allChar : charArray});
        this.setState({activeChar: 9 }, () => {alert("State Set")});
        if (loadState === "New") {
            //ls.set("allChar", JSON.stringify(this.state.allChar));
        }
        
    }

    testFunc = () => {
        this.setState({activeChar: 9 }, () => {alert("State Set")});
    }

    /// Disregard.
    loadChars = () => {
        // Check DB first.

        // Then check LS
        if (ls.get("allChar") !== null && ls.get("allChar") !== '[]') {
            this.setInitial(JSON.parse(ls.get("allchar"), "Load"));
            alert("Found LS" + ls.get("allChar"));
        }
        else {
            this.setInitial([new Player("VoulkTwo", "Druid")], "New");
            //alert("Setting New");
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

    getAllChar = () => {
        return this.state.allChar;
    }

    componentDidMount() {
        alert("Hi");
    }

    render() {
        return null;
    }
 

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

*/