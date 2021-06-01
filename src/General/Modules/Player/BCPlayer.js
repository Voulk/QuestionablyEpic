import Player from './Player';
import CastModel from "./CastModel";

class BCPlayer extends Player {
    constructor(playerName, specName, charID, region, realm, race, statWeights = "default") {
        super(playerName, specName, charID, region, realm, race, statWeights, "BurningCrusade")
        this.gameType = "BurningCrusade"
        this.setupDefaults(specName);

        if (statWeights !== "default" && statWeights.DefaultWeights === false) this.statWeights = statWeights;
    }

    setupDefaults = (spec) => {
        this.castModel = {
            Raid: new CastModel(spec, "Raid"),
            Dungeon: new CastModel(spec, "Dungeon"), // Unused in BC.
        };
        // These are starter weights, and can and will change during the engine calculation process.
        if (spec === "Restoration Druid BC") {
            this.statWeights = {
                Raid: {
                    intellect: 0.83,
                    hps: 1,
                    bonushealing: 0.88,
                    mp5: 1.9,
                    spelldamage: 0.88,
                    spirit: 0.85,
                    crit: 0,
                    spellcrit: 0.03,
                    stamina: 0.01,
                    haste: 0.1,
                },
                Dungeon: {
                },
                DefaultWeights: true,
              };
        }
        else if (spec === "Holy Paladin BC") {
            this.statWeights = {
                Raid: {
                    intellect: 0.36,
                    hps: 1,
                    bonushealing: 0.352,
                    mp5: 1.4,
                    spelldamage: 0.352,
                    spirit: 0.04,
                    crit: 0,
                    spellcrit: 0.436,
                    stamina: 0.01,
                    haste: 0.31,
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
                    stamina: 0.01,
                    mp5: 1.9,
                    haste: 0.7,
                },
                Dungeon: {
                },
                DefaultWeights: true,
              };
        }

    }

}

export default BCPlayer;