import Player from './Player';
import CastModel from "./CastModel";

// @deprecated
// Just use Player now with Classic hooks instead of a different class.
class ClassicPlayer extends Player {
    constructor(playerName, specName, charID, region, realm, race, statWeights = "default") {
        super(playerName, specName, charID, region, realm, race, statWeights, "Classic")
        this.gameType = "Classic"
        
        this.setupDefaults(specName);

        if (statWeights !== "default" && statWeights.DefaultWeights === false) this.statWeights = statWeights;
    }

    getStatWeight = (contentType, stat) => {
        const lcStat = stat.toLowerCase();
        const weights = this.statWeights["Raid"];
        if (!weights) {
          reportError(this, "Player", "Invalid Stat Weight", stat);
          return 0;
        }
    
        if (lcStat in weights) {
          return weights[lcStat];
        }
    
        return 0;
      };

    setupDefaults = (spec) => {
        this.castModel = {
            Raid: new CastModel(spec, "Raid"),
            Dungeon: new CastModel(spec, "Dungeon"), // Unused in Classic.
        };
        this.castModels.push(new CastModel(spec, "Raid", "Default", 0));
        // These are starter weights, and can and will change during the engine calculation process.
        if (spec === "Restoration Druid Classic") {
            this.statWeights = {
                Raid: {
                    intellect: 0.9,
                    spellpower: 2.28,
                    spelldamage: 2.1,
                    hps: 1,
                    mp5: 2.3,
                    spirit: 0.7,
                    crit: 0.06,
                    stamina: 0.15,
                    haste: 1.54,
                    
                },
                Dungeon: {
                },
                DefaultWeights: true,
              };
        }
        else if (spec === "Holy Paladin Classic") {
            this.statWeights = {
                Raid: {
                    intellect: 0.36,
                    hps: 1,
                    bonushealing: 0.352,
                    mp5: 1.3,
                    spelldamage: 0.352,
                    spirit: 0.04,
                    crit: 0,
                    spellcrit: 0.436,
                    stamina: 0.15,
                    spellhaste: 0.31,
                },
                Dungeon: {
                },
                DefaultWeights: true,
              };
        }
        else if (spec === "Restoration Shaman Classic") {
            this.statWeights = {
                Raid: {
                    intellect: 0.46,
                    hps: 1.9,
                    bonushealing: 1,
                    mp5: 2,
                    spelldamage: 1,
                    spirit: 0.02,
                    crit: 0,
                    spellcrit: 0.59,
                    stamina: 0.15,
                    spellhaste: 1.4,
                },
                Dungeon: {
                },
                DefaultWeights: true,
              };
        }
        else if (spec === "Holy Priest Classic") {
            this.statWeights = {
                Raid: {
                    intellect: 0.55,
                    hps: 1,
                    bonushealing: 0.78,
                    mp5: 1.85,
                    spelldamage: 0.78,
                    spirit: 0.77,
                    crit: 0,
                    spellcrit: 1.46,
                    stamina: 0.15,
                    spellhaste: 0.6,
                },
                Dungeon: {
                },
                DefaultWeights: true,
              };
        }
        else {
            this.statWeights = {
                Raid: {
                    intellect: 1.3,
                    bonushealing: 1,
                    spelldamage: 1,
                    spirit: 0.1,
                    crit: 0,
                    spellcrit: 1.21,
                    stamina: 0.15,
                    mp5: 1.9,
                    spellhaste: 0.7,
                },
                Dungeon: {
                },
                DefaultWeights: true,
              };
        }

    }

}

export default ClassicPlayer;