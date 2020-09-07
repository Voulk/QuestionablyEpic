
import Player from "./Player";
import ls from "local-storage";
// On app start, load player data. 
// First, we will check if they are signed in and have character data. 
// If they do, load that, if they don't, we will try their localstorage instead. 
// If we can't find anything, let's send them directly to the character creation page. 

// Each character import includes their spec, stat weights, and an optional log URL. If we find a log URL then automatically load the last fight. 

//const [allChar, updateChars] = UseState(new Player("Voulk", "Druid"));

// This entire component class might be scrapped and replaced. Beware edits. 

class PlayerChars  {
    constructor() {
        
        this.allChar = JSON.parse(ls.get("allChar")) || [new Player("VoulkThree", "Restoration Druid", 0)];
        this.activeChar = ls.get("activeChar") || 0;
        
        //this.saveAllChar = this.saveAllChar.bind(this);
    };

    allChar = []; // An array of all our characters. 
    activeChar = 0; // The index in the character array of our currently selected character.

    // Return the players active character.
    getActiveChar = () => {
        return this.allChar[this.activeChar];
      };

    setActiveChar = (index) => {
        this.activeChar = index;
        this.saveAllChar();
    }

    // Return an array of all of the players characters.  
    getAllChar = () => {
        return this.allChar;
    }  

    // Save our character array, both to database (when logged in) and to LocalStorage.
    saveAllChar = () => {
        // Database TODO

        // Local Storage
        ls.set("allChar", JSON.stringify(this.allChar))
        ls.set("activeChar", this.activeChar)
    }

    // Add a new character to the array then save it.
    addChar = (name, spec) => {
        //alert("Adding new Character")
        this.allChar.push(new Player(name, spec, this.allChar.length))
        this.saveAllChar();

        //ls.set("allChar", JSON.stringify(this.allChar))
    }

    // Delete the active character.
    delActiveChar = () => {
        this.allChar.splice(this.activeChar, 1)
    }


}

export default PlayerChars;



/// Previous attempt at this module. Will delete soon, but for now left here as a mistake rectified. 

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