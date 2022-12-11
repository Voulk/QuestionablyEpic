import Player from "./Player";
import ls from "local-storage";
import ClassicPlayer from "./ClassicPlayer";
// On app start, load player data.
// First, we will check if they are signed in and have character data.
// If they do, load that, if they don't, we will try their localstorage instead.
// If we can't find anything, let's send them directly to the character creation page.

// Each character import includes their spec, stat weights, and an optional log URL. If we find a log URL then automatically load the last fight.

//const [allChar, updateChars] = UseState(new Player("Voulk", "Druid"));

// This entire component class might be scrapped and replaced. Beware edits.

class PlayerChars {
  constructor() {
    // Check our local storage for our characters.
    let playerChars = JSON.parse(ls.get("allChar")) || []; // DF

    //
    let charArray = [];
    // If we have characters in storage, loop through them and create a new Player object for each.
    // We can't load our players in directly because if we don't instantiate new Player objects they won't have the necessary functions
    // that we need for each module.
    if (playerChars.length !== 0) {
      let index = 0;
      playerChars.forEach(function (player) {
        // This could be changed later if we end up storing more information about a character. Say, the most recent log they were in.
        if (player.gameType === "Classic" || player.gameType === "BurningCrusade") {
          charArray.push(new ClassicPlayer(player.charName, player.spec, index, player.region, player.realm, player.race, player.statWeights));
        }
        else {
          let newChar = new Player(player.charName, player.spec, index, player.region, player.realm, player.race, player.statWeights);
          if (player.activeModelID) newChar.initializeModels(player.activeModelID.Raid, player.activeModelID.Dungeon);
          if (player.spec === "Discipline Priest") newChar.getActiveModel("Raid").setRampInfo(newChar.activeStats, [])
          newChar.setPlayerAvatars();
          charArray.push(newChar);
        }
        
        index += 1;
      });
    } else {
      // If we don't have any characters stored, initilize an empty array. For now we have a demo character inserted but on live
      // you'll just start without characters and it'll prompt you to create your first.
      charArray = [];
      //charArray = [new Player("VoulkDemo", "Restoration Druid", 0, "QE", "Shadowlands", "Night Elf")]
    }

    this.allChar = charArray;
    /*this.allChar = JSON.parse(ls.get("allChar")) || [new Player("VoulkThree", "Restoration Druid", 0)]; // This is the previous code. To be eventually removed */
    this.activeChar = ls.get("activeChar") || 0; //activeCharDF
  }

  allChar = []; // An array of all our characters.
  activeChar = 0; // The index in the character array of our currently selected character.

  // Return the players active character.
  getActiveChar = () => {
    if (this.allChar[this.activeChar] !== undefined) return this.allChar[this.activeChar];
    else {
      this.setActiveChar(0);
      return this.allChar[0];
    }
  };

  setActiveChar = (index) => {
    this.activeChar = index;
    this.saveAllChar();
  };

  // Return an array of all of the players characters.
  getAllChar = (gameType = "All") => {
    if (gameType === "All") return this.allChar;
    else return this.allChar.filter((filter) => filter.gameType === gameType)
  };

  updatePlayerChar = (player) => {
    for (let i = 0; i < this.allChar.length; i++) {
      if (this.allChar[i].charID === player.charID) {
        this.allChar[i] = player;
      }
    }
  };

  setLowestChar = (gameType) => {
    let index = 0;
    for (let i = 0; i < this.allChar.length; i++) {
      if (this.allChar[i].gameType === gameType) {
        index = i;
        break;
      }
    }
    this.setActiveChar(index);
  }

  // Save our character array, both to database (when logged in) and to LocalStorage.
  saveAllChar = () => {
    // Database TODO

    // Local Storage - Optional DF
    ls.set("allChar", JSON.stringify(this.allChar));
    ls.set("activeChar", this.activeChar);
  };

  // Add a new character to the array then save it.
  addChar = (name, spec, region, realm, race, gameType) => {
    //alert("Adding new Character")
    if (gameType === "Classic" || gameType === "BurningCrusade") {
      this.allChar.push(new ClassicPlayer(name, spec, this.allChar.length, region, realm, race))
    }
    else {
      let newChar = new Player(name, spec, this.allChar.length, region, realm, race)
      newChar.setPlayerAvatars();
      if (spec === "Discipline Priest") newChar.getActiveModel("Raid").setRampInfo(newChar.activeStats, []);
      this.allChar.push(newChar);

    }
    
    this.saveAllChar();

    //ls.set("allChar", JSON.stringify(this.allChar))
  };

  // Delete the active character. This will require shifting the character IDs of the others in the array to keep them unique.
  delActiveChar = () => {
    this.allChar.splice(this.activeChar, 1);
  };

  delSpecificChar = (unique) => {
    let delIndex = 0;
    let tempArray = this.allChar.filter(function (char) {
      return char.uniqueHash !== unique;
    });
    delIndex = this.allChar.findIndex((player) => player.uniqueHash === unique);

    for (var i = this.allChar.length - 1; i > delIndex; i--) {
      this.allChar[i].charID -= 1;
    }
    this.allChar = tempArray;
    this.activeChar = 0;
  };
}

export default PlayerChars;
