import Player from "./Player";
import * as ls from "local-storage";
import ClassicPlayer from "./ClassicPlayer";
import { reportError } from "General/SystemTools/ErrorLogging/ErrorReporting";
// On app start, load player data.
// First, we will check if they are signed in and have character data.
// If they do, load that, if they don't, we will try their localstorage instead.
// If we can't find anything, let's send them directly to the character creation page.

// Each character import includes their spec, stat weights, and an optional log URL. If we find a log URL then automatically load the last fight.

//const [allChar, updateChars] = UseState(new Player("Voulk", "Druid"));

// This entire component class might be scrapped and replaced. Beware edits.


export function createPlayerChars(): PlayerChars {
  const playerChars: PlayerChars = {
    allChar: [],
    activeChar: 0,
    
    init() {
      let playerChars = JSON.parse(ls.get("allChar")) || [];
      let specsAdded: String[] = [];
      let charArray: Player[] = [];
      let index = 0;
      if (playerChars.length !== 0) {
        playerChars.forEach(function (player: any) {
          if (player.gameType === "Classic" || player.gameType === "BurningCrusade") {
            //charArray.push(new ClassicPlayer(player.charName, player.spec, index, player.region, player.realm, player.race, player.statWeights));
          }
          else {
            let newChar = new Player(player.charName, player.spec, index, player.region, player.realm, player.race, player.statWeights);
            if (player.activeModelID) newChar.initializeModels(player.activeModelID.Raid, player.activeModelID.Dungeon);
            if (player.savedPTRString) newChar.savedPTRString = player.savedPTRString;
            specsAdded.push(player.spec);
            charArray.push(newChar);
          }
          index += 1;
        });
      } else {
        charArray = [];
      }
      
      // Auto-add any missing specs.
      ["Holy Paladin", "Restoration Druid", "Preservation Evoker",  "Discipline Priest", "Holy Priest", "Restoration Shaman", "Mistweaver Monk"].forEach(spec => {
          if (!(specsAdded.includes(spec))) {
            const newName = spec.replace("Restoration", "Resto").replace("Discipline", "Disc").replace("Preservation", "Pres");
            let newChar = new Player(newName, spec, charArray.length, "US", "Default", "Default");
            if (spec === "Discipline Priest") newChar.getActiveModel("Raid").setRampInfo(newChar.activeStats, []);
            charArray.push(newChar);
          }
      })

      this.allChar = charArray;
      this.activeChar = ls.get("activeChar") || 0;
      this.setupChars();
      return this;
    },
  
    getActiveChar() {
      if (this.allChar.length === 0) {
        return null;
      }
      else if (this.allChar[this.activeChar] !== undefined) {
        return this.allChar[this.activeChar];
      }
      else if (this.allChar[0] !== undefined) {
        this.setActiveChar(0);
        reportError("", "PlayerChars", "Active Char not found", JSON.stringify(this.allChar));
        return this.allChar[0];
      }
      else {
        console.error("No valid characters found");
        reportError("", "PlayerChars", "No Valid characters found", JSON.stringify(this.allChar));
      }
    },
  
    setActiveChar(index) {
      this.activeChar = index;
      this.saveAllChar();
    },
  
    setupChars() {
      this.allChar.forEach(char => {
        if (char.spec === "Discipline Priest") char.getActiveModel("Raid").setRampInfo(char.activeStats, []);
        //char.setPlayerAvatars();
      });
    },
  
    getAllChar(gameType = "All") {
      if (gameType === "All") return this.allChar;
      else return this.allChar.filter(filter => filter.gameType === gameType);
    },
  
    updatePlayerChar(player) {
      for (let i = 0; i < this.allChar.length; i++) {
        if (this.allChar[i].charID === player.charID) {
          this.allChar[i] = player;
        }
      }
    },
  
    setLowestChar(gameType) {
      let index = 0;
      for (let i = 0; i < this.allChar.length; i++) {
        if (this.allChar[i].gameType === gameType) {
          index = i;
          break;
        }
      }
      this.setActiveChar(index);
    },
  
    saveAllChar() {
      ls.set("allChar", JSON.stringify(this.allChar));
      ls.set("activeChar", this.activeChar);
    },
  
    addChar(name, spec, region, realm, race, gameType) {
      if (gameType === "Classic" || gameType === "BurningCrusade") {
        this.allChar.push(new ClassicPlayer(name, spec, this.allChar.length, region, realm, race));
      }
      else {
        let newChar = new Player(name, spec, this.allChar.length, region, realm, race);
        newChar.setPlayerAvatars();
        if (spec === "Discipline Priest") newChar.getActiveModel("Raid").setRampInfo(newChar.activeStats, []);
        this.allChar.push(newChar);
      }
      this.saveAllChar();
    },
  
    delActiveChar() {
      this.allChar.splice(this.activeChar, 1);
    },
  
    delSpecificChar(unique) {
      let delIndex = 0;
      let tempArray = this.allChar.filter(char => char.uniqueHash !== unique);
      delIndex = this.allChar.findIndex(player => player.uniqueHash === unique);
      for (let i = this.allChar.length - 1; i > delIndex; i--) {
        this.allChar[i].charID -= 1;
      }
      this.allChar = tempArray;
      this.activeChar = 0;
    }
  };
  playerChars.init();
  return playerChars;
}
