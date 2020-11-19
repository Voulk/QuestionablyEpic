
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
        
        // Check our local storage for our characters.
        let playerChars = JSON.parse(ls.get("allChar")) || [];

        // 
        let charArray = []
        // If we have characters in storage, loop through them and create a new Player object for each.
        // We can't load our players in directly because if we don't instantiate new Player objects they won't have the necessary functions
        // that we need for each module. 
        if (playerChars.length !== 0) {
            
            playerChars.forEach(function(player) {
                
                // This could be changed later if we end up storing more information about a character. Say, the most recent log they were in.
                charArray.push(new Player(player.charName, player.spec, player.charID, player.statWeights))
            }) 
        }
        else {
            // If we don't have any characters stored, initilize an empty array. For now we have a demo character inserted but on live
            // you'll just start without characters and it'll prompt you to create your first.
            charArray = [new Player("VoulkDemo", "Restoration Druid", 0)]
        }

        this.allChar = charArray;
        /*this.allChar = JSON.parse(ls.get("allChar")) || [new Player("VoulkThree", "Restoration Druid", 0)]; // This is the previous code. To be eventually removed */
        this.activeChar = ls.get("activeChar") || 0;
        
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

    updatePlayerChar = (player) => {
        for (let i = 0; i < this.allChar.length; i++) {
            if (this.allChar[i].charID === player.charID) {
                this.allChar[i] = player;
            }
        }

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

    // Delete the active character. This will require shifting the character IDs of the others in the array to keep them unique. 
    delActiveChar = () => {
        this.allChar.splice(this.activeChar, 1)
    }


}

export default PlayerChars;
